from flask import render_template
from . import bp
from ..models import Project
from .. import db
import json

@bp.route("/")
def index():

    data = {
        "project": {
            "codProjeto": 123,
            "nome": "Construção X",
            "dataInicio": "01/03/2025",
            "dataEncerramento": "31/12/2025",
            "valor": 150000.00,
            "situacao": "2"
        },
        "pipeline": [
            {"type": "projeto", "title": "Projeto", "subtitle": "Nome do Projeto", "color": "green", "id": "p-123",
             "status": "2"},
            {"type": "requisicao", "title": "Requisição", "subtitle": "Tipo de Requisição", "color": "muted",
             "id": "r-34", "status": "1"},
            {"type": "ordem", "title": "Ordem", "subtitle": "Tipo de Ordem", "color": "yellow", "id": "o-987",
             "status": "2"},
            {"type": "contrato", "title": "Contrato", "subtitle": "0042/2025 - Fulano", "color": "muted",
             "id": "c-0042", "status": "1"}
        ],
        "orders": [
            {"cod": 987, "tipo": "Compra", "data": "15/04/2025", "valor": 12000, "situacao": "2"},
            {"cod": 988, "tipo": "Serviço", "data": "20/05/2025", "valor": 8000, "situacao": "1"}
        ]
    }
    return render_template("dashboard/dashboard.html", data=data)

@bp.route("/new")
def create():
    return render_template("dashboard/main.html")