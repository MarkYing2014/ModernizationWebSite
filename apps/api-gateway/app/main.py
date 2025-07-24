#!/usr/bin/env python3
"""
API Gateway for ModernizationWebSite Platform

This is the main entry point for the API Gateway service, which provides:
- Authentication and authorization
- Request routing to microservices
- Rate limiting and request validation
- WebSocket handling for real-time updates
- Health checks and observability
"""

import logging
from contextlib import asynccontextmanager
from typing import Annotated, Any, Dict, List

import sentry_sdk
import structlog
import uvicorn
from fastapi import Depends, FastAPI, HTTPException, Request, status
from fastapi.middleware.cors import CORSMiddleware
from fastapi.responses import JSONResponse
from prometheus_fastapi_instrumentator import Instrumentator
from pydantic import ValidationError
from sentry_sdk.integrations.fastapi import FastApiIntegration

from app.core.config import Settings, get_settings
from app.core.exceptions import APIError
from app.core.logging import configure_logging


@asynccontextmanager
async def lifespan(app: FastAPI):
    """
    Lifecycle manager for the FastAPI application.
    Handles startup and shutdown events.
    """
    # Startup
    settings = get_settings()
    
    # Configure logging
    configure_logging(settings.LOG_LEVEL)
    logger = structlog.get_logger("api_gateway")
    logger.info("Starting API Gateway", environment=settings.ENVIRONMENT)
    
    # Initialize Sentry if configured
    if settings.SENTRY_DSN:
        logger.info("Initializing Sentry")
        sentry_sdk.init(
            dsn=settings.SENTRY_DSN,
            environment=settings.ENVIRONMENT,
            integrations=[FastApiIntegration()],
            traces_sample_rate=0.2,
        )
    
    logger.info("API Gateway startup complete")
    yield
    
    # Shutdown
    logger.info("Shutting down API Gateway")
    logger.info("API Gateway shutdown complete")


def create_application() -> FastAPI:
    """
    Factory function to create and configure the FastAPI application.
    """
    settings = get_settings()
    
    app = FastAPI(
        title="ModernizationWebSite API Gateway",
        description="API Gateway for the ModernizationWebSite Platform",
        version="0.1.0",
        lifespan=lifespan,
        docs_url="/docs" if settings.ENVIRONMENT != "production" else None,
        redoc_url="/redoc" if settings.ENVIRONMENT != "production" else None,
    )
    
    # CORS middleware
    app.add_middleware(
        CORSMiddleware,
        allow_origins=settings.CORS_ORIGINS,
        allow_credentials=True,
        allow_methods=["*"],
        allow_headers=["*"],
    )
    
    # Register exception handlers
    @app.exception_handler(APIError)
    async def api_error_handler(request: Request, exc: APIError) -> JSONResponse:
        return JSONResponse(
            status_code=exc.status_code,
            content={"success": False, "error": exc.detail, "code": exc.code},
        )
    
    @app.exception_handler(ValidationError)
    async def validation_error_handler(request: Request, exc: ValidationError) -> JSONResponse:
        return JSONResponse(
            status_code=status.HTTP_422_UNPROCESSABLE_ENTITY,
            content={"success": False, "error": exc.errors(), "code": "validation_error"},
        )
    
    @app.exception_handler(HTTPException)
    async def http_exception_handler(request: Request, exc: HTTPException) -> JSONResponse:
        return JSONResponse(
            status_code=exc.status_code,
            content={"success": False, "error": exc.detail, "code": "http_error"},
        )
    
    # Register metrics
    Instrumentator().instrument(app).expose(app, include_in_schema=False)
    
    # Basic health check route
    @app.get("/healthz", tags=["Health"])
    async def healthz() -> Dict[str, str]:
        """
        Basic health check endpoint.
        
        Returns a simple status response to indicate the service is running.
        """
        return {"status": "ok"}
    
    @app.get("/", tags=["Root"])
    async def root() -> Dict[str, str]:
        """
        Root endpoint.
        
        Returns basic API information.
        """
        return {
            "name": "ModernizationWebSite API Gateway",
            "version": "0.1.0",
            "status": "online",
        }
    
    # API versioning prefix
    prefix = settings.API_PREFIX
    
    # Include routers - these will be added in Sprint 1.1
    # app.include_router(auth.router, prefix=f"{prefix}/auth", tags=["Authentication"])
    # app.include_router(users.router, prefix=f"{prefix}/users", tags=["Users"])
    # app.include_router(projects.router, prefix=f"{prefix}/projects", tags=["Projects"])
    
    return app


app = create_application()


if __name__ == "__main__":
    # For local development only
    uvicorn.run(
        "app.main:app",
        host="0.0.0.0",
        port=8000,
        reload=True,
        log_level="info",
    )
