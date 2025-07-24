#!/usr/bin/env bash
set -eo pipefail

# ModernizationWebSite - Bootstrap Script
# This script sets up the development environment for the ModernizationWebSite monorepo

# Colors for pretty output
GREEN='\033[0;32m'
BLUE='\033[0;34m'
YELLOW='\033[1;33m'
RED='\033[0;31m'
NC='\033[0m' # No Color

# Function to print colored output
print_step() {
  echo -e "${BLUE}==>${NC} $1"
}

print_success() {
  echo -e "${GREEN}✓${NC} $1"
}

print_warning() {
  echo -e "${YELLOW}!${NC} $1"
}

print_error() {
  echo -e "${RED}✗${NC} $1"
}

# Function to check if a command exists
command_exists() {
  command -v "$1" >/dev/null 2>&1
}

# Function to check minimum version
check_version() {
  local cmd="$1"
  local version_cmd="$2"
  local min_version="$3"
  local name="$4"
  
  if ! command_exists "$cmd"; then
    print_error "$name not found. Please install $name $min_version or higher."
    return 1
  fi
  
  local current_version
  current_version=$($version_cmd)
  
  if [[ "$current_version" < "$min_version" ]]; then
    print_error "$name version $current_version is less than minimum required $min_version"
    return 1
  fi
  
  print_success "$name version $current_version"
  return 0
}

# Detect platform
detect_platform() {
  case "$(uname -s)" in
    Linux*)     
      if grep -q Microsoft /proc/version 2>/dev/null; then
        echo "wsl"
      else
        echo "linux"
      fi
      ;;
    Darwin*)    echo "macos";;
    CYGWIN*)    echo "windows";;
    MINGW*)     echo "windows";;
    *)          echo "unknown";;
  esac
}

PLATFORM=$(detect_platform)
print_step "Detected platform: $PLATFORM"

# Check prerequisites
print_step "Checking prerequisites..."

# Check Node.js
if ! check_version "node" "node --version | cut -d 'v' -f 2" "20.0.0" "Node.js"; then
  print_error "Please install Node.js 20 LTS or higher: https://nodejs.org/"
  exit 1
fi

# Check pnpm
if ! check_version "pnpm" "pnpm --version" "8.0.0" "pnpm"; then
  print_warning "pnpm 8.x not found, attempting to install..."
  npm install -g pnpm@8
  if [ $? -ne 0 ]; then
    print_error "Failed to install pnpm. Please install manually: npm install -g pnpm@8"
    exit 1
  fi
  print_success "pnpm installed successfully"
fi

# Check Python
if ! check_version "python3" "python3 --version | cut -d ' ' -f 2" "3.11.0" "Python"; then
  print_error "Please install Python 3.11 or higher: https://www.python.org/downloads/"
  exit 1
fi

# Check Poetry
if ! check_version "poetry" "poetry --version | cut -d ' ' -f 3" "1.6.0" "Poetry"; then
  print_warning "Poetry not found or version < 1.6.0, attempting to install..."
  curl -sSL https://install.python-poetry.org | python3 -
  if [ $? -ne 0 ]; then
    print_error "Failed to install Poetry. Please install manually: https://python-poetry.org/docs/#installation"
    exit 1
  fi
  print_success "Poetry installed successfully"
fi

# Check Docker
if ! command_exists "docker"; then
  print_error "Docker not found. Please install Docker: https://docs.docker.com/get-docker/"
  exit 1
else
  print_success "Docker is installed"
fi

# Check Docker Compose
if ! command_exists "docker compose"; then
  print_warning "Docker Compose V2 not found. Please ensure Docker is up to date."
else
  print_success "Docker Compose is available"
fi

# Install pnpm dependencies
print_step "Installing pnpm dependencies..."
pnpm install --frozen-lockfile
if [ $? -ne 0 ]; then
  print_error "Failed to install pnpm dependencies"
  exit 1
fi
print_success "pnpm dependencies installed"

# Create directory structure if it doesn't exist
print_step "Creating directory structure..."
mkdir -p apps/api-gateway/app/{api,core,models,services,utils}
mkdir -p apps/dashboard-web/src/{components,features,layouts,pages,store,utils}
mkdir -p packages/{ui-kit,config,ts-sdk,python-sdk,ml-common}
mkdir -p infra/{k8s,terraform,sql}
mkdir -p docs/technical-specs
mkdir -p .github/workflows
print_success "Directory structure created"

# Install Python dependencies for each service
print_step "Installing Python dependencies..."
PYTHON_SERVICES=("api-gateway")

for service in "${PYTHON_SERVICES[@]}"; do
  if [ -d "apps/$service" ] && [ -f "apps/$service/pyproject.toml" ]; then
    print_step "Installing dependencies for $service..."
    (cd "apps/$service" && poetry install)
    if [ $? -ne 0 ]; then
      print_error "Failed to install Python dependencies for $service"
      exit 1
    fi
    print_success "Dependencies for $service installed"
  else
    print_warning "Skipping $service - directory or pyproject.toml not found"
  fi
done

# Set up git hooks
print_step "Setting up git hooks..."
# Install husky
npx husky install
if [ $? -ne 0 ]; then
  print_warning "Failed to install Husky. Git hooks may not work properly."
else
  print_success "Husky installed"
fi

# Set up pre-commit
if command_exists "pre-commit"; then
  pre-commit install
  print_success "pre-commit hooks installed"
else
  print_warning "pre-commit not found, installing..."
  pip install pre-commit
  pre-commit install
  print_success "pre-commit installed and hooks configured"
fi

# Create environment files
print_step "Creating environment files..."
if [ -f ".env.example" ]; then
  if [ ! -f ".env.local" ]; then
    cp .env.example .env.local
    print_success "Created .env.local from example"
  else
    print_warning ".env.local already exists, not overwriting"
  fi
else
  print_warning ".env.example not found, creating minimal .env.local"
  cat > .env.local << EOF
ENVIRONMENT=development
LOG_LEVEL=DEBUG
POSTGRES_URL=postgresql://svc:svc@localhost:5432/modernize
REDIS_URL=redis://localhost:6379/0
MINIO_ENDPOINT=http://localhost:9000
MINIO_ACCESS_KEY=localminio
MINIO_SECRET_KEY=localminio123
NEO4J_URI=bolt://localhost:7687
NEO4J_USER=neo4j
NEO4J_PASSWORD=neo4j
JWT_SECRET=dev-secret-change-me
EOF
  print_success "Created minimal .env.local"
fi

# Create SQL init script directory
print_step "Creating initial SQL scripts..."
mkdir -p infra/sql
if [ ! -f "infra/sql/000_init.sql" ]; then
  cat > infra/sql/000_init.sql << EOF
-- Initial database setup for ModernizationWebSite
-- This script is executed when the PostgreSQL container starts

-- Create extensions
CREATE EXTENSION IF NOT EXISTS "uuid-ossp";
CREATE EXTENSION IF NOT EXISTS "citext";
CREATE EXTENSION IF NOT EXISTS "pg_trgm";

-- Create database schema if not exists
CREATE SCHEMA IF NOT EXISTS public;

-- This is a placeholder for the initial schema
-- Actual schema will be managed by Alembic migrations
COMMENT ON SCHEMA public IS 'ModernizationWebSite Schema';
EOF
  print_success "Created initial SQL script"
fi

# Pull Docker images
print_step "Pulling Docker images for local development..."
docker compose -f infra/docker-compose.local.yml pull --ignore-pull-failures
if [ $? -ne 0 ]; then
  print_warning "Some Docker images failed to pull. This is not critical and will be retried when you start the services."
else
  print_success "Docker images pulled successfully"
fi

# Install Playwright browsers if scraper service exists
if [ -d "apps/scraper-svc" ]; then
  print_step "Installing Playwright browsers for scraper service..."
  pnpm exec nx run scraper-svc:install-browsers || true
fi

# Final success message
echo ""
echo -e "${GREEN}=== Bootstrap Complete ===${NC}"
echo ""
echo "Your development environment is ready! Next steps:"
echo ""
echo "1. Start local infrastructure:     docker compose -f infra/docker-compose.local.yml up -d"
echo "2. Start the API Gateway:          pnpm exec nx serve api-gateway"
echo "3. Start the Dashboard:            pnpm exec nx serve dashboard-web"
echo ""
echo "For more details, see the development guide: docs/local-dev.md"
echo ""

exit 0
