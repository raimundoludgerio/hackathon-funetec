from flask import render_template
from . import bp
from ..models import Project
from .. import db

@bp.route("/")
def index():
    # minimal demo: carregar primeiro projeto para o dashboard
    project = Project.query.first()
    # ao integrar com API/DB real, passe os dados reais
    example_data = {
        "project": {
            "codProjeto": project.cod_projeto if project else 0,
            "nome": project.nome if project else "—",
            "valor": float(project.valor) if project else 0
        },
        "pipeline": [],
        "orders": []
    }
    return render_template("dashboard/dashboard.html", data=example_data)
