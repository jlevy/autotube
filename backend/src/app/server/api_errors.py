from functools import wraps
import logging
from flask import jsonify, request


log = logging.getLogger(__name__)


class NotFound(ValueError):
    pass


def validate(*validators):
    """General API validation decorator with custom error boundary."""

    def decorator(f):
        @wraps(f)
        def decorated_function(*args, **kwargs):
            try:
                # Execute each validation function in sequence
                for validator in validators:
                    error_response = validator()
                    if error_response:
                        return jsonify(*error_response)
                # If all validations pass, proceed with the original function
                return f(*args, **kwargs)
            except NotFound as e:
                log.info("Not found in request %s", request, exc_info=True)
                return jsonify({"error": str(e)}), 404
            except Exception as e:
                log.warn("Exception handling request %s", request, exc_info=True)
                # Provide an error boundary for other unforeseen cases
                return jsonify({"error": str(e)}), 500

        return decorated_function

    return decorator
