#!/usr/bin/env python3
"""
Custom exception classes for the API Gateway service.

This module defines exception classes that are used throughout the API Gateway
to provide consistent error handling and responses to clients.
"""

from typing import Any, Dict, List, Optional, Union

from fastapi import HTTPException, status


class APIError(HTTPException):
    """
    Base class for all API errors.
    
    Extends FastAPI's HTTPException to include an error code and
    additional context for structured error responses.
    """
    
    def __init__(
        self,
        status_code: int,
        detail: str,
        code: str,
        headers: Optional[Dict[str, str]] = None,
        context: Optional[Dict[str, Any]] = None,
    ):
        """
        Initialize an API error.
        
        Args:
            status_code: HTTP status code
            detail: Human-readable error message
            code: Machine-readable error code
            headers: Optional HTTP headers to include in the response
            context: Optional additional context for logging/debugging
        """
        super().__init__(status_code=status_code, detail=detail, headers=headers)
        self.code = code
        self.context = context or {}


class AuthenticationError(APIError):
    """Error raised when authentication fails."""
    
    def __init__(
        self,
        detail: str = "Authentication failed",
        code: str = "auth_failed",
        headers: Optional[Dict[str, str]] = None,
        context: Optional[Dict[str, Any]] = None,
    ):
        super().__init__(
            status_code=status.HTTP_401_UNAUTHORIZED,
            detail=detail,
            code=code,
            headers=headers,
            context=context,
        )


class AuthorizationError(APIError):
    """Error raised when a user lacks permission for an action."""
    
    def __init__(
        self,
        detail: str = "You don't have permission to perform this action",
        code: str = "forbidden",
        headers: Optional[Dict[str, str]] = None,
        context: Optional[Dict[str, Any]] = None,
    ):
        super().__init__(
            status_code=status.HTTP_403_FORBIDDEN,
            detail=detail,
            code=code,
            headers=headers,
            context=context,
        )


class ResourceNotFoundError(APIError):
    """Error raised when a requested resource doesn't exist."""
    
    def __init__(
        self,
        detail: str = "Resource not found",
        code: str = "not_found",
        headers: Optional[Dict[str, str]] = None,
        context: Optional[Dict[str, Any]] = None,
    ):
        super().__init__(
            status_code=status.HTTP_404_NOT_FOUND,
            detail=detail,
            code=code,
            headers=headers,
            context=context,
        )


class ValidationError(APIError):
    """Error raised when request validation fails."""
    
    def __init__(
        self,
        detail: Union[str, List[Dict[str, Any]]] = "Validation error",
        code: str = "validation_error",
        headers: Optional[Dict[str, str]] = None,
        context: Optional[Dict[str, Any]] = None,
    ):
        super().__init__(
            status_code=status.HTTP_422_UNPROCESSABLE_ENTITY,
            detail=detail,
            code=code,
            headers=headers,
            context=context,
        )


class RateLimitError(APIError):
    """Error raised when a rate limit is exceeded."""
    
    def __init__(
        self,
        detail: str = "Rate limit exceeded",
        code: str = "rate_limited",
        headers: Optional[Dict[str, str]] = None,
        context: Optional[Dict[str, Any]] = None,
    ):
        super().__init__(
            status_code=status.HTTP_429_TOO_MANY_REQUESTS,
            detail=detail,
            code=code,
            headers=headers,
            context=context,
        )


class ServiceUnavailableError(APIError):
    """Error raised when a required service is unavailable."""
    
    def __init__(
        self,
        detail: str = "Service temporarily unavailable",
        code: str = "service_unavailable",
        headers: Optional[Dict[str, str]] = None,
        context: Optional[Dict[str, Any]] = None,
    ):
        super().__init__(
            status_code=status.HTTP_503_SERVICE_UNAVAILABLE,
            detail=detail,
            code=code,
            headers=headers,
            context=context,
        )


class ConflictError(APIError):
    """Error raised when there's a conflict with the current state of a resource."""
    
    def __init__(
        self,
        detail: str = "Resource conflict",
        code: str = "conflict",
        headers: Optional[Dict[str, str]] = None,
        context: Optional[Dict[str, Any]] = None,
    ):
        super().__init__(
            status_code=status.HTTP_409_CONFLICT,
            detail=detail,
            code=code,
            headers=headers,
            context=context,
        )


class BadRequestError(APIError):
    """Error raised for malformed requests."""
    
    def __init__(
        self,
        detail: str = "Bad request",
        code: str = "bad_request",
        headers: Optional[Dict[str, str]] = None,
        context: Optional[Dict[str, Any]] = None,
    ):
        super().__init__(
            status_code=status.HTTP_400_BAD_REQUEST,
            detail=detail,
            code=code,
            headers=headers,
            context=context,
        )


class InternalServerError(APIError):
    """Error raised for unexpected server errors."""
    
    def __init__(
        self,
        detail: str = "Internal server error",
        code: str = "internal_error",
        headers: Optional[Dict[str, str]] = None,
        context: Optional[Dict[str, Any]] = None,
    ):
        super().__init__(
            status_code=status.HTTP_500_INTERNAL_SERVER_ERROR,
            detail=detail,
            code=code,
            headers=headers,
            context=context,
        )
