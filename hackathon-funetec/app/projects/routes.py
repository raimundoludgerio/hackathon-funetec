from flask import render_template, request, redirect, url_for, flash
from . import bp
from .. import db
from ..models import Project
from datetime import datetime

@bp.route("/")
def list_projects():
    projects = Project.query.order_by(Project.cod_projeto.desc()).all()
    return render_template("projects/list.html", projects=projects)

@bp.route("/<int:cod_projeto>")
def detail(cod_projeto):
    project = Project.query.get_or_404(cod_projeto)
    return render_template("projects/detail.html", project=project)

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
