"""
This module takes care of starting the API Server, Loading the DB and Adding the endpoints
"""
from flask import Flask, request, jsonify, url_for, Blueprint
from api.utils import generate_sitemap, APIException
from flask_cors import CORS
from flask_jwt_extended import create_access_token
from flask_jwt_extended import jwt_required
from flask_jwt_extended import get_jwt_identity
from api.models import db, Users, Posts, CharactersFavorites, PlanetFavorites, Characters, Planets, Comments, Posts, Followers


api = Blueprint('api', __name__)
CORS(api) # Allow CORS requests to this API


@api.route('/hello', methods=['GET'])
def handle_hello():
    response_body = {}
    response_body['message'] = "Hello! I'm a message that came from the backend"
    return response_body, 200


# Build a StarWars REST API

@api.route("/characters", methods=["GET"])
def get_characters():
    response_body = {}
    character = db.session.execute(db.select(Characters)).scalars()
    results = [row.serialize() for row in character]
    response_body['results'] = results
    response_body['message'] = 'Character list'
    return response_body, 200


@api.route('/characters/<int:id>', methods=['GET'])
def get_characters_id(id):
    response_body = {}
    character = db.session.execute(db.select(Characters).where(Characters.id == id)).scalar()
    if character:
        response_body['results'] = character.serialize()
        response_body['message'] = 'Character found'
        return response_body, 200
    response_body['message'] = 'Character not found'
    response_body['results'] = {}
    return response_body, 404


@api.route("/planets", methods=["GET"])
def get_planets():
    response_body = {}
    planets = db.session.execute(db.select(Planets)).scalars()
    results = [row.serialize() for row in planets]
    response_body['results'] = results
    response_body['message'] = 'Planets list'
    return response_body, 200


@api.route('/planets/<int:id>', methods=['GET'])
def get_planets_id(id):
    response_body = {}
    planets = db.session.execute(db.select(Planets).where(Planets.id == id)).scalar()
    if planets:
        response_body['results'] = planets.serialize()
        response_body['message'] = 'Planets found'
        return response_body, 200
    response_body['message'] = 'Planets not found'
    response_body['results'] = {}
    return response_body, 404


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

    
@api.route("users/favorites", methods=["GET"])
def get_users_favorites():
    response_body = {}
    planet_favorites = db.session.execute(db.select(PlanetFavorites).where(PlanetFavorites.user_id_p == user_id)).scalars().all()
    characters_favorties = db.session.execute(db.select(CharactersFavorites).where(CharactersFavorites.user_id_c == user_id)).scalars().all()
    all_favorites = planet_favorites + characters_favorties
    results = [row.serialize() for row in all_favorites]
    response_body['results'] = results
    response_body['message'] = 'Users favortie list'
    return response_body, 200


@api.route("/favorites/characters/<int:character_id>", methods=["POST", "DELETE"])
def handle_favorite_character(character_id):
    if request.method == "POST":
        data = request.get_json()
        user_id = data['user_id_c']
        user = db.session.execute(db.select(Users).where(Users.id == user_id)).scalar()
        planet = db.session.execute(db.select(Characters).where(Characters.id == character_id)).scalar()
        existing_favorite = db.session.execute(db.select(CharactersFavorites).where(CharactersFavorites.user_id_c == user_id, CharactersFavorites.character_id == character_id)).scalar()
        if existing_favorite:
            return jsonify({"message": "Favorite character already exists"}), 409
        new_favorite = CharactersFavorites(user_id_c=user_id, character_id=character_id)
        db.session.add(new_favorite)
        db.session.commit()
        return jsonify({"message": "Favorite character added successfully", "favorite": new_favorite.serialize()}), 201
    if request.method == "DELETE":
        data = request.get_json()
        user_id = data['user_id_c']
        user = db.session.execute(db.select(Users).where(Users.id == user_id)).scalar()
        favorite = db.session.execute(db.select(CharactersFavorites).where(CharactersFavorites.user_id_c == user_id, CharactersFavorites.character_id == character_id)).scalar()
        db.session.delete(favorite)
        db.session.commit()
        return jsonify({"message": "Favorite character deleted successfully"}), 200


@api.route("/favorites/planets/<int:planet_id>", methods=["POST" , "DELETE"])
def handle_favorite_planet(planet_id):
    if request.method == "POST":
        data = request.get_json()
        user_id = data['user_id_p']
        user = db.session.execute(db.select(Users).where(Users.id == user_id)).scalar()
        planet = db.session.execute(db.select(Planets).where(Planets.id == planet_id)).scalar()
        existing_favorite = db.session.execute(db.select(PlanetFavorites).where(PlanetFavorites.user_id_p == user_id, PlanetFavorites.planet_id == planet_id)).scalar()
        if existing_favorite:
            return jsonify({"message": "Favorite planet already exists"}), 409
        new_favorite = PlanetFavorites(user_id_p=user_id, planet_id=planet_id)
        db.session.add(new_favorite)
        db.session.commit()
        return jsonify({"message": "Favorite planet added successfully", "favorite": new_favorite.serialize()}), 201
    if request.method == "DELETE":
        data = request.get_json()
        user_id = data['user_id_p']
        user = db.session.execute(db.select(Users).where(Users.id == user_id)).scalar()
        favorite = db.session.execute(db.select(PlanetFavorites).where(PlanetFavorites.user_id_p == user_id, PlanetFavorites.planet_id == planet_id)).scalar()
        db.session.delete(favorite)
        db.session.commit()
        return jsonify({"message": "Favorite planet deleted successfully"}), 200
        
# final REST api entrega

@api.route("/login", methods=["POST"])
def login():
    response_body = {}
    email = request.json.get("email", None)
    password = request.json.get("password", None)
    user = db.session.execute(db.select(Users).where(Users.email == email, Users.password == password, Users.is_active == True)).scalar()
    print(user)
    print(user.serialize())
    if user is None:
        return jsonify({"msg": "Wrong email"}) , 401
    if password != user.password:
        return jsonify({"msg": "Wrong password"}) , 401
    else:
        access_token = create_access_token(identity={'user_id': user.id,
                                                     'email': user.email})
        serialized_data = user.serialize()
        response_body['message'] = 'User logged in'
        response_body['access_token'] = access_token
        response_body['data'] = serialized_data
        return response_body, 200
    

@api.route("/signup", methods=["POST"])
def signup():
    response_body = {}
    body = request.get_json()
    email = body["email"].lower()
    user = Users.query.filter_by(email=email).first()
    if user is None:
        user = Users(email=body["email"], password=body["password"], is_active=True)
        db.session.add(user)
        db.session.commit()
        first_name = body.get("first_name" , " ")
        last_name = body.get("last_name" , " ")
        access_token = create_access_token(identity={'user_id': user.id,
                                                     'email': user.email})
        response_body['access_token'] = access_token
        response_body['data'] = user.serialize()
        response_body['message'] = 'User created and loggedIn'
        return response_body , 200
    else:
        return jsonify({"msg": "User already exists"}) , 401


@api.route("/profile", methods=["GET"])
@jwt_required()
def profile():
    response_body = {}
    current_user = get_jwt_identity()
    print(current_user)
    response_body['message'] = f'User LoggedIn : {current_user}'
    return response_body, 200


@api.route('/users/<int:user_id>', methods=['GET', 'PUT', 'DELETE'])
@jwt_required()
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
