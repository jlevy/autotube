"""
Management script for flask-migrate.
Do "export FLASK_APP=manage.py" and then run "flask db" to use migrations.
"""

from flask import Flask
from sqlalchemy import MetaData, create_engine, text
from flask_migrate import Migrate
from app.config import get_secret
from app.model.database import db


migrate = Migrate()

app = Flask(__name__)
app.config["SQLALCHEMY_DATABASE_URI"] = get_secret("database_uri")

db.init_app(app)
migrate.init_app(app, db)


@app.cli.command("erase_db_all")
def erase_db_all_command():
    """Clears the database: drops all tables and migration history. Use with caution!"""

    print(f"Current database: {app.config['SQLALCHEMY_DATABASE_URI']}")

    confirmation = input("This will erase the entire database. Type 'yes' to confirm: ")
    if confirmation.lower() != "yes":
        print("Operation cancelled.")
        return

    engine = create_engine(app.config["SQLALCHEMY_DATABASE_URI"])
    metadata = MetaData()

    # Reflect the existing database tables and drop all tables.
    metadata.reflect(bind=engine)
    metadata.drop_all(bind=engine)
    print("Dropped tables.")

    with engine.connect() as connection:
        # Fetch all enum type names
        enum_names = connection.execute(text("SELECT typname FROM pg_type WHERE typtype = 'e';"))

        # Drop all enum types
        for (enum_name,) in enum_names:
            connection.execute(text(f"DROP TYPE IF EXISTS {enum_name} CASCADE;"))
    print("Dropped enums.")

    print("Database has been erased.")


# app.cli.add_command(custom_command)

if __name__ == "__main__":
    app.run()
