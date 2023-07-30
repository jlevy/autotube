import os
import tomllib
import logging
import sys
import openai
from cachetools import cached
from .model import file_paths
from .model.file_paths import ROOT


@cached(cache={})
def setup():
    """One-time setup of essential keys, directories, and configs. Idempotent."""
    _logging_setup()
    _api_setup()
    file_paths.ensure_dirs_exist()


def _logging_setup():
    log_format = "%(asctime)s - %(levelname)s - %(name)s - %(message)s"
    log_level = logging.INFO

    logging.basicConfig(level=log_level, format=log_format, stream=sys.stdout)


def get_secret(name):
    with open(f"{ROOT}/secrets/secrets.toml", "rb") as f:
        secrets = tomllib.load(f)
    return secrets[name]


def _api_setup():
    secret = get_secret("secret_openai")
    os.environ["OPENAI_API_KEY"] = secret
    openai.api_key = secret
