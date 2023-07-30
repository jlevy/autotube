from .. import create_app

app = create_app()


def app_context():
    """Easy-to-import app context."""
    return app.app_context()
