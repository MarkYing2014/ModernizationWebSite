#!/usr/bin/env python3
"""
Logging configuration for the API Gateway service.

This module configures structured logging using structlog and
integrates with the standard library logging module.
"""

import logging
import sys
import time
from typing import Any, Dict, List, Optional, Union

import structlog
from structlog.stdlib import ProcessorFormatter
from structlog.types import Processor


def configure_logging(log_level: str = "INFO") -> None:
    """
    Configure structured logging for the application.
    
    Sets up structlog with appropriate processors based on the environment
    (development vs production) and configures the log level.
    
    Args:
        log_level: The logging level to use (DEBUG, INFO, WARNING, ERROR, CRITICAL)
    """
    # Convert string log level to logging constant
    level = getattr(logging, log_level.upper(), logging.INFO)
    
    # Configure standard library logging
    logging.basicConfig(
        format="%(message)s",
        stream=sys.stdout,
        level=level,
    )
    
    # Shared processors for structlog
    shared_processors: List[Processor] = [
        # Add timestamp to logs
        structlog.processors.TimeStamper(fmt="iso"),
        # Add log level to logs
        structlog.stdlib.add_log_level,
        # Add logger name to logs
        structlog.stdlib.add_logger_name,
        # Add process ID, thread ID
        structlog.processors.StackInfoRenderer(),
        # Add callsite parameters
        structlog.processors.CallsiteParameterAdder(
            parameters=["filename", "lineno", "func_name"]
        ),
    ]
    
    # Determine if we're in a development or production environment
    # In development, use a human-readable format
    # In production, use JSON for better integration with log aggregators
    is_dev = level <= logging.DEBUG
    
    if is_dev:  # Development environment
        # Use ConsoleRenderer for human-readable logs
        processors = shared_processors + [
            structlog.dev.ConsoleRenderer(colors=True, exception_formatter=structlog.dev.plain_traceback),
        ]
    else:  # Production environment
        # Use JSONRenderer for machine-readable logs
        processors = shared_processors + [
            structlog.processors.dict_tracebacks,
            structlog.processors.JSONRenderer(),
        ]
    
    # Configure structlog
    structlog.configure(
        processors=processors,
        context_class=dict,
        logger_factory=structlog.stdlib.LoggerFactory(),
        wrapper_class=structlog.stdlib.BoundLogger,
        cache_logger_on_first_use=True,
    )
    
    # Configure standard library logging to use structlog formatter
    formatter = ProcessorFormatter(
        processor=structlog.processors.JSONRenderer() if not is_dev else structlog.dev.ConsoleRenderer(colors=True),
        foreign_pre_chain=shared_processors,
    )
    
    # Get the root logger and set the formatter
    handler = logging.StreamHandler()
    handler.setFormatter(formatter)
    
    # Remove existing handlers and add our configured one
    root_logger = logging.getLogger()
    for hdlr in root_logger.handlers:
        root_logger.removeHandler(hdlr)
    root_logger.addHandler(handler)
    
    # Set log level for third-party libraries
    for logger_name in ["uvicorn", "uvicorn.error", "fastapi"]:
        logging.getLogger(logger_name).setLevel(level)
    
    # Silence noisy loggers
    for logger_name in ["httpx"]:
        logging.getLogger(logger_name).setLevel(logging.WARNING)


def get_logger(name: str) -> structlog.stdlib.BoundLogger:
    """
    Get a configured structlog logger with the given name.
    
    Args:
        name: The name of the logger
        
    Returns:
        A configured structlog logger
    """
    return structlog.get_logger(name)


class LoggingMiddleware:
    """
    FastAPI middleware for logging requests and responses.
    
    This middleware logs the incoming request details and the outgoing
    response details, including timing information.
    """
    
    def __init__(self, app):
        self.app = app
        self.logger = get_logger("api")
    
    async def __call__(self, scope, receive, send):
        if scope["type"] != "http":
            return await self.app(scope, receive, send)
        
        request = scope.get("path", "")
        method = scope.get("method", "")
        start_time = time.time()
        
        # Log the request
        self.logger.info(
            "Request started",
            path=request,
            method=method,
        )
        
        # Process the request
        response_status = None
        
        async def wrapped_send(message):
            nonlocal response_status
            if message["type"] == "http.response.start":
                response_status = message["status"]
            await send(message)
        
        try:
            await self.app(scope, receive, wrapped_send)
        except Exception as e:
            # Log the exception
            self.logger.error(
                "Request failed",
                path=request,
                method=method,
                error=str(e),
                exc_info=True,
            )
            raise
        finally:
            # Log the response
            duration_ms = round((time.time() - start_time) * 1000, 2)
            self.logger.info(
                "Request finished",
                path=request,
                method=method,
                status_code=response_status,
                duration_ms=duration_ms,
            )
