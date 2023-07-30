from flask import Blueprint

api_blueprint = Blueprint("api", __name__, url_prefix="/api")

# This import loads the api routes.
from ..server import api
