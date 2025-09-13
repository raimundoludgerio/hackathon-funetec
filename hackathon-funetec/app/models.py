from . import db
from datetime import datetime
from decimal import Decimal

class Project(db.Model):
    __tablename__ = "projects"
    cod_projeto = db.Column(db.Integer, primary_key=True)
    nome = db.Column(db.String(200), nullable=False)
    data_inicio = db.Column(db.Date, nullable=True)
    data_encerramento = db.Column(db.Date, nullable=True)
    valor = db.Column(db.Numeric(12, 2), default=Decimal('0.00'))
    situacao = db.Column(db.String(2), default='1')

    requisitions = db.relationship("Requisition", back_populates="project", cascade="all, delete-orphan")

class Requisition(db.Model):
    __tablename__ = "requisitions"
    cod_requisicao = db.Column(db.Integer, primary_key=True)
    cod_projeto = db.Column(db.Integer, db.ForeignKey('projects.cod_projeto'), nullable=False)
    tipo = db.Column(db.String(80))
    data_solicitacao = db.Column(db.Date, default=datetime.utcnow)
    situacao = db.Column(db.String(2), default='1')

    project = db.relationship("Project", back_populates="requisitions")
    orders = db.relationship("Order", back_populates="requisition", cascade="all, delete-orphan")

class Order(db.Model):
    __tablename__ = "orders"
    cod_ordem = db.Column(db.Integer, primary_key=True)
    cod_requisicao = db.Column(db.Integer, db.ForeignKey('requisitions.cod_requisicao'), nullable=False)
    tipo = db.Column(db.String(80))
    data_emissao = db.Column(db.Date, default=datetime.utcnow)
    valor = db.Column(db.Numeric(12,2), default=Decimal('0.00'))
    situacao = db.Column(db.String(2), default='1')

    requisition = db.relationship("Requisition", back_populates="orders")
    items = db.relationship("OrderItem", back_populates="order", cascade="all, delete-orphan")
    contract = db.relationship("Contract", back_populates="order", uselist=False)

class OrderItem(db.Model):
    __tablename__ = "order_items"
    id = db.Column(db.Integer, primary_key=True)
    cod_ordem = db.Column(db.Integer, db.ForeignKey('orders.cod_ordem'), nullable=False)
    descricao = db.Column(db.String(300))
    quantidade = db.Column(db.Integer, default=1)
    valor_unitario = db.Column(db.Numeric(12,2), default=Decimal('0.00'))

    order = db.relationship("Order", back_populates="items")

class Contract(db.Model):
    __tablename__ = "contracts"
    num_contrato = db.Column(db.String(20), primary_key=True)  # e.g. '0001/2025'
    cod_ordem = db.Column(db.Integer, db.ForeignKey('orders.cod_ordem'), nullable=False, unique=True)
    descricao = db.Column(db.String(400))
    cpfcnpj = db.Column(db.String(20))  # store numbers only, normalized
    contratado = db.Column(db.String(200))
    tipo_pessoa = db.Column(db.Integer, default=1)  # 1=PF, 2=PJ
    data_inicio = db.Column(db.Date, nullable=True)
    data_fim = db.Column(db.Date, nullable=True)
    valor = db.Column(db.Numeric(12,2), default=Decimal('0.00'))
    parcelas = db.Column(db.Integer, default=0)
    situacao = db.Column(db.String(2), default='1')

    order = db.relationship("Order", back_populates="contract")
    installments = db.relationship("Installment", back_populates="contract", cascade="all, delete-orphan")

class Installment(db.Model):
    __tablename__ = "installments"
    id = db.Column(db.Integer, primary_key=True)
    num_contrato = db.Column(db.String(20), db.ForeignKey('contracts.num_contrato'), nullable=False)
    num_parcela = db.Column(db.Integer, nullable=False)
    data_vencimento = db.Column(db.Date, nullable=True)
    valor_parcela = db.Column(db.Numeric(12,2), default=Decimal('0.00'))
    valor_pago = db.Column(db.Numeric(12,2), default=Decimal('0.00'))
    data_pagamento = db.Column(db.Date, nullable=True)
    situacao = db.Column(db.String(2), default='1')  # ex: 1=pendente, 2=parcial, 3=liquidado

    contract = db.relationship("Contract", back_populates="installments")
