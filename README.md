## Developer Setup

### Prerequisites

- have [pyenv installed](https://github.com/pyenv/pyenv)
- poetry [installed manually](https://python-poetry.org/docs/#installation)
- have [nvm installed](https://github.com/nvm-sh/nvm)

Install Python and Node. Tested with these versions:

```
pyenv install 3.11.1
nvm install v20.3.1
```

Also:

```
# For YouTube support (yt_dlp):
brew install ffmpeg
# For Hasura CLI:
curl -L https://github.com/hasura/graphql-engine/raw/stable/cli/get.sh | bash
```


### IDE

Configure VSCode to autoformat:

- Python with black (it should adapt to the backend/pyproject.toml settings)
- ESLint and Prettier installed and run by default.
- Install [TypeScript Import Sorter](https://marketplace.visualstudio.com/items?itemName=mike-co.import-sorter)

VSCode's settings.json for these:

```
    "black-formatter.args": [
        "--line-length",
        "100"
    ],
    "[typescript]": {
        "editor.defaultFormatter": "dbaeumer.vscode-eslint",
        "editor.codeActionsOnSave": [
            "source.formatDocument",
            "source.fixAll.eslint"
        ],
        "editor.formatOnSave": true,
    },
    "[typescriptreact]": {
        "editor.defaultFormatter": "dbaeumer.vscode-eslint",
        "editor.codeActionsOnSave": [
            "source.formatDocument",
            "source.fixAll.eslint"
        ],
        "editor.formatOnSave": true,
    },
    "importSorter.sortConfiguration.customOrderingRules.defaultNumberOfEmptyLinesAfterGroup": 0,
    "importSorter.generalConfiguration.sortOnBeforeSave": true,
    "importSorter.sortConfiguration.removeUnusedImports": true,
    "importSorter.sortConfiguration.removeUnusedDefaultImports": true
```

## Backend

### Installation

```
cd backend
poetry install
poetry shell
```

### Database Setup

Use Postgres 15 locally or in the cloud.

```
createdb XXX
```

Create `secrets/secrets.toml` (using `secrets/secrets.toml.template`) and put an appropriate URI like inside,
like `database_uri = "postgresql://postgres@localhost/XXX"`.

Migrate database:

```
# Setup for database operations:
cd backend/src
export FLASK_APP=manage.py

# First database migration:
flask db upgrade
```

Ensure initial values values for the enum types are inserted
(which is requried by Hasura for the enums):

```
# Idempotent insertion of enums:
python -m load_init_model update_enum_tables
```

### Hasura Setup

Set up Hasura locally or via their cloud offering and connect it to the database.
Use the Relay endpoint (not the regular Hasura endpoint).
Note web UI is very useful but if we make any changes (like relations) we want to save
them as metadata in the hasura/YAML export.

### Database Migrations and Schema Changes

Only required when changing model or schema (can skip this section on initial setup).
Workflow for updating database and GraphQL schemas:

```
# Convenience function for development to fully erase the db and migrations and start over:
flask erase_db_all  # caution!

# To create a new migration after model changes:
flask db migrate -m "Some model change."
# Review migrations/versions for correctness.
# Then apply (and check in updated version file):
flask db upgrade
```

Rerun update_enum_tables (as above) if appropriate.

Configure the backend endpoint environment variables for webhooks, e.g.
```
# Webhooks are configured as {{NEXT_PUBLIC_BACKEND_URL}}/{{NEXT_PUBLIC_BACKEND_API_PREFIX}}/<method>
# in the metadata.
NEXT_PUBLIC_BACKEND_URL=http://127.0.0.1:5000
NEXT_PUBLIC_BACKEND_API_PREFIX=api/v1
```

Make changes in Hasura to adjust enums, relations, etc.
This can be done in the dashboard or via commandline as below.
Then save the changes made from Hasura:

```
# Hasura metadata management:
cd hasura
hasura metadata reload   # Pick up changes to database.
hasura metadata export   # Save changes as YAML.
# Handle meatadata conflicts (usually only needed for significant schema
# deletions/changes):
hasura metadata ic status
hasura metadata ic list
hasura metadata ic drop
```

Finally export the new schema for use in the frontend:

```
cd frontend
npm run schema
```

Now check in the changes (backend migrations, schema.graphql, and Hasura metadata YAML files).

### Keys

Add `secret_openai = "sk-..."` into `secrets/secrets.toml`.

Copy `frontend/env.template` to `frontend/.env.local` and edit with admin secret.

Copy `hasura/env.template` to `hasura/.env` and edit with admin secret.


### Python Updates 

If desired to fully update packages:

```
poetry up --latest
```

Note we're using [the poetry up plugin](https://github.com/MousaZeidBaker/poetry-plugin-up)
to help with updates.


## Frontend

### Building and Running Frontend

```
cd frontend
# Packages and build are from Remix:
npm install
# Hotloading dev server and relay server at once:
npm run relay-dev
# Build and run Relay and Next:
# (use this to catch build errors the dev server may tolerate)
npm run build
npm run start
# Build with React profiling:
npm run build -- --profile
```
