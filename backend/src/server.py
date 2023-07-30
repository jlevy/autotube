from app import config
from app import search, create_app

config.setup()


app = create_app()


def load():
    with app.app_context():
        search.load_autocomplete_indices()


if __name__ == "__main__":
    load()
    # TODO: Providing hostname via Flask's SERVER_NAME
    # does not work with Blueprint routes for some reason,
    # leading to 404s on all routes.
    app.run(config.get_secret("hostname"), debug=True)
