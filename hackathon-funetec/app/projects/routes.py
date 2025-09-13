from flask import render_template, request, redirect, url_for, flash
from . import bp
from .. import db
from ..models import Project
from datetime import datetime

_FAKE_PROJECTS = [
    {"cod_projeto": 123, "nome": "Construção X", "valor": 150000.00, "situacao": "2"},
    {"cod_projeto": 124, "nome": "Reforma Y", "valor": 80000.00, "situacao": "1"},
    {"cod_projeto": 125, "nome": "Ampliação Z", "valor": 40000.00, "situacao": "6"}
]


@bp.route("/")
def list_projects():
    return render_template("projects/list.html", projects=_FAKE_PROJECTS)


@bp.route("/<int:cod_projeto>")
def detail(cod_projeto):
    proj = next((p for p in _FAKE_PROJECTS if p["cod_projeto"] == cod_projeto), None)
    if not proj:
        return "Projeto não encontrado", 404
    data = {
        "project": {
            "codProjeto": proj["cod_projeto"],
            "nome": proj["nome"],
            "valor": proj["valor"],
            "situacao": proj["situacao"]
        },
        "pipeline": [
            {"type": "projeto", "title": "Projeto", "subtitle": proj["nome"], "color": "green",
             "id": f"p-{proj['cod_projeto']}", "status": proj["situacao"]},
            {"type": "requisicao", "title": "Requisição", "subtitle": "Tipo A", "color": "muted", "id": "r-1",
             "status": "1"},
            {"type": "ordem", "title": "Ordem", "subtitle": "Ordem 01", "color": "yellow", "id": "o-11", "status": "2"},
            {"type": "contrato", "title": "Contrato", "subtitle": "—", "color": "muted", "id": "c-—", "status": "1"}
        ],
        "orders": [
            {"cod": 11, "tipo": "Serviço", "data": "10/04/2025", "valor": 5000, "situacao": "2"}
        ]
    }
    return render_template("projects/detail.html", data=data)


@bp.route("/new", methods=["GET", "POST"])
def create():
    if request.method == "POST":
        nome = request.form.get("nome")
        # (validações aqui)
        p = Project(nome=nome)
        db.session.add(p)
        db.session.commit()
        flash("Projeto criado", "success")
        return redirect(url_for("projects.list_projects"))
    return render_template("projects/list.html")
