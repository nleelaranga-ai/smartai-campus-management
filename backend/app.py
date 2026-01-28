from flask import Flask
from flask_cors import CORS
from flask_sqlalchemy import SQLAlchemy
from flask_jwt_extended import JWTManager
from config import Config

db = SQLAlchemy()
jwt = JWTManager()

def create_app():
    app = Flask(__name__)
    app.config.from_object(Config)

    CORS(app)
    db.init_app(app)
    jwt.init_app(app)

    from app.routes.auth_routes import auth_bp
    app.register_blueprint(auth_bp, url_prefix="/api/auth")

    @app.route("/api/health")
    def health():
        return {"status": "Backend running"}
    # Inside create_app() in app.py, before 'return app'
with app.app_context():
    db.create_all()
    return app

app = create_app()

if __name__ == "__main__":
    app.run(debug=True)
