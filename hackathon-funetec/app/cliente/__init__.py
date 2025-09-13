from flask import Blueprint
bp = Blueprint("clientes", __name__, template_folder="../../templates/clientes")
from . import routes
