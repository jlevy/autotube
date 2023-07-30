import logging
from functools import cache
from flask import Flask
from flask_marshmallow import Marshmallow
from flask_migrate import Migrate

# Having these split out helps avoid circular imports.
from .server.app_blueprints import api_blueprint

# from .model.database import db, config_db

log = logging.getLogger(__name__)

ma = Marshmallow()
migrate = Migrate()


def create_app():
    """Singleton app factory."""

    app = Flask(__name__)

    config_db(app)
    db.init_app(app)
    ma.init_app(app)
    migrate.init_app(app, db)

    # Register models.
    # from app.model import model

    # Register API routes.
    app.register_blueprint(api_blueprint)

    log.info("New Flask app configured")

    return app
