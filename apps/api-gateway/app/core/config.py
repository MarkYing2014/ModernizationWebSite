#!/usr/bin/env python3
"""
Configuration module for the API Gateway service.

This module uses Pydantic settings to load environment variables and provide
type-safe configuration throughout the application.
"""

import os
from functools import lru_cache
from typing import Any, Dict, List, Optional, Union

from pydantic import AnyHttpUrl, Field, PostgresDsn, RedisDsn, SecretStr, field_validator
from pydantic_settings import BaseSettings, SettingsConfigDict


class Settings(BaseSettings):
    """
    Application settings loaded from environment variables.
    
    Provides configuration for database connections, authentication,
    service endpoints, and other application settings.
    """
    # Core settings
    ENVIRONMENT: str = Field("development", description="Environment (development, staging, production)")
    LOG_LEVEL: str = Field("INFO", description="Logging level")
    DEBUG: bool = Field(False, description="Debug mode")
    API_PREFIX: str = Field("/api", description="API prefix for all endpoints")
    
    # CORS settings
    CORS_ORIGINS: List[str] = Field(
        ["http://localhost:5173", "http://localhost:3000"],
        description="List of allowed origins for CORS"
    )
    
    @field_validator("CORS_ORIGINS", mode="before")
    @classmethod
    def assemble_cors_origins(cls, v: Union[str, List[str]]) -> List[str]:
        """Parse CORS_ORIGINS from string to list if needed."""
        if isinstance(v, str) and not v.startswith("["):
            return [i.strip() for i in v.split(",")]
        elif isinstance(v, (list, str)):
            return v
        raise ValueError(v)
    
    # Database settings
    POSTGRES_URL: PostgresDsn = Field(
        ..., 
        description="PostgreSQL connection string"
    )
    DB_POOL_SIZE: int = Field(5, description="Database connection pool size")
    DB_MAX_OVERFLOW: int = Field(10, description="Maximum database connection overflow")
    DB_POOL_TIMEOUT: int = Field(30, description="Database pool timeout in seconds")
    
    # Redis settings
    REDIS_URL: RedisDsn = Field(
        ...,
        description="Redis connection string"
    )
    REDIS_POOL_SIZE: int = Field(10, description="Redis connection pool size")
    
    # JWT settings
    JWT_SECRET: SecretStr = Field(..., description="Secret key for JWT token signing")
    JWT_ALGORITHM: str = Field("HS256", description="Algorithm for JWT token signing")
    JWT_ACCESS_TOKEN_EXPIRE_MINUTES: int = Field(
        30, 
        description="JWT access token expiration time in minutes"
    )
    JWT_REFRESH_TOKEN_EXPIRE_DAYS: int = Field(
        7, 
        description="JWT refresh token expiration time in days"
    )
    
    # Neo4j settings
    NEO4J_URI: str = Field("bolt://localhost:7687", description="Neo4j connection URI")
    NEO4J_USER: str = Field("neo4j", description="Neo4j username")
    NEO4J_PASSWORD: SecretStr = Field(..., description="Neo4j password")
    
    # MinIO / S3 settings
    MINIO_ENDPOINT: str = Field("http://localhost:9000", description="MinIO endpoint URL")
    MINIO_ACCESS_KEY: str = Field(..., description="MinIO access key")
    MINIO_SECRET_KEY: SecretStr = Field(..., description="MinIO secret key")
    MINIO_SECURE: bool = Field(False, description="Use HTTPS for MinIO connection")
    STORAGE_BUCKET_NAME: str = Field("modernize-web", description="Default storage bucket name")
    
    # Service endpoints
    SCRAPER_SERVICE_URL: Optional[AnyHttpUrl] = Field(
        None, 
        description="URL for the scraper service"
    )
    EXTRACTOR_SERVICE_URL: Optional[AnyHttpUrl] = Field(
        None, 
        description="URL for the content extractor service"
    )
    ANALYZER_SERVICE_URL: Optional[AnyHttpUrl] = Field(
        None, 
        description="URL for the site analyzer service"
    )
    AI_DESIGN_SERVICE_URL: Optional[AnyHttpUrl] = Field(
        None, 
        description="URL for the AI design service"
    )
    
    # Monitoring and observability
    SENTRY_DSN: Optional[str] = Field(None, description="Sentry DSN for error reporting")
    PROMETHEUS_METRICS_ENABLED: bool = Field(True, description="Enable Prometheus metrics")
    
    # Rate limiting
    RATE_LIMIT_PER_MINUTE: int = Field(100, description="API rate limit per minute")
    
    # Job queue settings
    JOB_QUEUE_NAME: str = Field("modernize-web:jobs", description="Redis job queue name")
    JOB_RESULT_TTL: int = Field(86400, description="Job result TTL in seconds (1 day)")
    
    # Crawler settings
    MAX_CRAWL_DEPTH: int = Field(10, description="Maximum depth for website crawling")
    MAX_CRAWL_PAGES: int = Field(1000, description="Maximum pages to crawl per website")
    RESPECT_ROBOTS_TXT: bool = Field(True, description="Respect robots.txt directives")
    
    # Password security settings
    PASSWORD_PEPPER: Optional[SecretStr] = Field(None, description="Pepper added to passwords before hashing")
    ARGON2_TIME_COST: int = Field(3, description="Argon2 time cost parameter")
    ARGON2_MEMORY_COST: int = Field(65536, description="Argon2 memory cost parameter in KiB")
    ARGON2_PARALLELISM: int = Field(4, description="Argon2 parallelism parameter")
    
    # Model config
    model_config = SettingsConfigDict(
        env_file=".env",
        env_file_encoding="utf-8",
        case_sensitive=True,
        extra="ignore",
    )


@lru_cache
def get_settings() -> Settings:
    """
    Returns a cached instance of the settings.
    
    Uses lru_cache to avoid reloading the settings on each call,
    improving performance.
    
    Returns:
        Settings: Application settings loaded from environment variables
    """
    return Settings()
