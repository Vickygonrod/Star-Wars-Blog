"""
This module takes care of starting the API Server, Loading the DB and Adding the endpoints
"""
from flask import Flask, request, jsonify, url_for, Blueprint
from api.utils import generate_sitemap, APIException
from flask_cors import CORS
from flask_jwt_extended import create_access_token
from flask_jwt_extended import jwt_required
from flask_jwt_extended import get_jwt_identity
from api.models import db, Users, Posts


api = Blueprint('api', __name__)
CORS(api) # Allow CORS requests to this API


@api.route('/hello', methods=['GET'])
def handle_hello():
    response_body = {}
    response_body['message'] = "Hello! I'm a message that came from the backend"
    return response_body, 200


@api.route("/login", methods=["POST"])
def login():
    response_body = {}
    email = request.json.get("email", None)
    password = request.json.get("password", None)
    user = db.session.execute(db.select(Users).where(Users.email == email, Users.password == password, Users.is_active == True))
    if user:
        access_token = create_access_token(identity=email)
        response_body['message'] = 'user logged in'
        response_body['access_token'] = access_token
        return response_body, 200
    response_body['message'] = "Bad username or password"  
    return response_body , 401


@api.route("/profile", methods=["GET"])
@jwt_required()
def profile():
    response_body = {}
    # Access the identity of the current user with get_jwt_identity
    current_user = get_jwt_identity()
    print(current_user)
    response_body['message'] = f'User Logged : {current_user}'
    return response_body, 200


@api.route('/users', methods=['GET', 'POST'])  # El POST de users lo haremos en el /signup
def handle_user():
    response_body = {}
    if request.method == 'GET':
        # Aquí tengo que hacer la lógica para mostrar los usuarios que tengo en mi DB.
        rows = db.session.execute(db.select(Users)).scalars()
        results = [row.serialize() for row in rows]  # Utilizo List Comprehension
        response_body['results'] = results
        response_body['message'] = 'Listado de Usuarios'
        return response_body, 200
    if request.method == 'POST':
        response_body['message'] = 'Este endpoint no es válido. Ud debe hacer un /signup'
        return response_body, 200


@api.route('/users/<int:user_id>', methods=['GET', 'PUT', 'DELETE'])
def handle_users(user_id):
    response_body = {}
    if request.method == 'GET':
        user = db.session.execute(db.select(Users).where(Users.id == user_id)).scalar()
        if user:
            response_body['results'] = user.serialize()
            response_body['message'] = 'Usuario encontrado'
            return response_body, 200
        response_body['message'] = 'Usario inexistente'
        response_body['results'] = {}
        return response_body, 404
    if request.method == 'PUT':
        data = request.json
        # TODO: Validación de datos recibidos 
        print(data)
        user = db.session.execute(db.select(Users).where(Users.id == user_id)).scalar()
        if user:
            user.email = data['email']
            user.is_active = data['is_active']
            user.last_name = data['last_name']
            user.first_name = data['first_name']
            db.session.commit()
            response_body['message'] = 'Datos del usuario actualizados'
            response_body['results'] = user.serialize()
            return response_body, 200
        response_body['message'] = 'Usario inexistente'
        response_body['results'] = {}
        return response_body, 404
    if request.method == 'DELETE':
        user = db.session.execute(db.select(Users).where(Users.id == user_id)).scalar()
        if user:
            # db.session.delete(user)
            user.is_active = False
            db.session.commit()
            response_body['message'] = 'Usuario eliminado'
            response_body['results'] = {}
        response_body['message'] = 'Usuario inexistente'
        response_body['results'] = {}
        return response_body, 200


@api.route('/posts', methods=['GET' , 'POST'])
def handle_posts():
    response_body = {}
    if request.method == 'GET':
        posts = db.session.execute(db.select(Posts)).scalars()
        results = [row.serialize() for row in posts]
        response_body['results'] = results
        response_body['message'] = "Listado de posts"
        return response_body, 200
    return response_body, 200        


@api.route('/posts/<int:id>', methods=['GET' , 'PUT' , 'DELETE'])
def handle_post(id):
    response_body = {}
    if reques.method == 'GET':
        response_body['message'] = "users/id GET"
        return response_body, 200
    if reques.method == 'PUT':
        response_body['message'] = "users/id PUT"
        return response_body, 200
    if reques.method == 'DELETE':
        response_body['message'] = "users/id DELETE"
        return response_body, 200
    return response_body , 200

