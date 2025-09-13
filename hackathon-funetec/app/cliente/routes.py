from flask import render_template, request, redirect, url_for, flash
from . import bp
from .. import db
from ..models import Project
from datetime import datetime

@bp.route("/new", methods=["GET", "POST"])
def create():
    print("chamou pelo menos!!!!")
    return render_template("clientes/cadastro-cliente.html")

@bp.route("/comparativo", methods=["GET", "POST"])
def comparativo():
    print("chamou pelo menos!!!!")
    return render_template("comparativo_previsto/comparativo_previsto.html")

@bp.route("/custos_realizados", methods=["GET", "POST"])
def custos_realizados():
    print("chamou pelo menos!!!!")
    return render_template("custos_realizados/custos_realizados.html")

@bp.route("/projetos", methods=["GET", "POST"])
def projetos():
    print("chamou pelo menos!!!!")
    return render_template("projetos/projetos.html")

@bp.route("/prestador", methods=["GET", "POST"])
def prestador():
    print("chamou pelo menos!!!!")
    return render_template("prestador/cadastro.html")

@bp.route("/pagamento_unico", methods=["GET", "POST"])
def pagamento_unico():
    print("chamou pelo menos!!!!")
    return render_template("pagamento_unico/pagamento_unico.html")

@bp.route("/pagamento_duas", methods=["GET", "POST"])
def pagamento_duas():
    print("chamou pelo menos!!!!")
    return render_template("pagamento_duas/pagamento_duas.html")