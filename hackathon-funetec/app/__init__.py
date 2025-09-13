from flask import Flask
from flask_sqlalchemy import SQLAlchemy
from flask_migrate import Migrate
from .config import Config

db = SQLAlchemy()
migrate = Migrate()

def create_app(config_class=Config):
    app = Flask(__name__, static_folder="../static", template_folder="../templates")
    app.config.from_object(config_class)

    db.init_app(app)
    migrate.init_app(app, db)

    # register blueprints
    from .main import bp as main_bp
    app.register_blueprint(main_bp)

    from .projects import bp as projects_bp
    app.register_blueprint(projects_bp, url_prefix="/projects")

    from .requisitions import bp as reqs_bp
    app.register_blueprint(reqs_bp, url_prefix="/requisitions")

    from .orders import bp as orders_bp
    app.register_blueprint(orders_bp, url_prefix="/orders")

    from .contracts import bp as contracts_bp
    app.register_blueprint(contracts_bp, url_prefix="/contracts")

    from .cliente import bp as clientes_pb
    app.register_blueprint(clientes_pb, url_prefix="/clientes")

    return app
