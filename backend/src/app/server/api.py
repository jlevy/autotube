import logging
from flask import jsonify, request

from .api_errors import validate
from .app_blueprints import api_blueprint


log = logging.getLogger(__name__)


# Sample endpoint
@api_blueprint.route("/action", methods=["POST"])
@validate()
def action_route():
    params = request.json
    log.info("Action: params: %s", params)
    if not params:
        raise ValueError("Missing JSON body")

    item_id = params.get("item_id")
    action_key = params.get("action_key")

    if not item_id or not action_key:
        raise ValueError("Missing item_id or action_key")

    # TODO
    result = []

    return jsonify(result)
