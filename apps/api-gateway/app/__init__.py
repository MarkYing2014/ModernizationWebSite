"""
API Gateway for the ModernizationWebSite Platform.

This package serves as the main entry point for the ModernizationWebSite platform,
providing authentication, request routing, and WebSocket communication between
clients and backend services.
"""

__version__ = "0.1.0"
__author__ = "ModernizationWebSite Team"
__email__ = "dev@modernization.ai"
__description__ = "API Gateway for the ModernizationWebSite Platform"

# Package level imports
from app.core.config import get_settings

# Version info should be available directly from the package
version_info = {
    "name": "api-gateway",
    "version": __version__,
    "description": __description__,
}
