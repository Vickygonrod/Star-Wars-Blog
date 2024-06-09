from flask_sqlalchemy import SQLAlchemy


db = SQLAlchemy()


class Users(db.Model):
    # Atributos
    id = db.Column(db.Integer, primary_key=True)
    email = db.Column(db.String(120), unique=True, nullable=False)
    password = db.Column(db.String(80), unique=False, nullable=False)
    is_active = db.Column(db.Boolean(), unique=False, nullable=False)
    first_name = db.Column(db.String(), unique=False, nullable=True)
    last_name = db.Column(db.String(), unique=False, nullable=True)
        
    def __repr__(self):
        return f'<User {self.email}>'

    def serialize(self):
            # Do not serialize the password, its a security breach
        return {"id": self.id,
                "email": self.email,
                "is_active" : self.is_active}


class Posts(db.Model):
    id = db.Column(db.Integer() , primary_key=True)
    title = db.Column(db.String() , nullable=False)
    user_id = db.Column(db.Integer() , db.ForeignKey('users.id'))
    user_to = db.relationship('Users' , foreign_keys=[user_id])
    description = db.Column(db.String() , nullable=False)
    body = db.Column(db.String() , nullable=True) 
    publication_date = db.Column(db.Date() , nullable=False)
    image_url = db.Column(db.String() , nullable=True)
    
    def __repr__(self):
        return f'<Post {self.title}>'

    def serialize(self):
        return {"id": self.id,
                "title": self.title,
                "user_id" : self.user_id,
                "description" : self.description,
                "body" : self.body, 
                "publication_date" : self.publication_date,
                "image_url" : self.image_url}


class Comments(db.Model):
    id = db.Column(db.Integer() , primary_key=True)
    body = db.Column(db.String() , nullable=False)
    date = db.Column(db.Date() , nullable=False)
    author_id = db.Column(db.Integer(), db.ForeignKey('users.id'))
    to_author_id = db.relationship('Users' , foreign_keys=[author_id])
    post_id = db.Column(db.Integer() , db.ForeignKey('posts.id'))
    to_post_id = db.relationship('Posts' , foreign_keys=[post_id])

    def __repr__(self):
        return f'<Comment {self.body}>'

    def serialize(self):
        return {"id": self.id,
                "body": self.body,
                "date": self.date,
                "author_id" : self.author_id,
                "post_id" : self.post_id}


class Planets(db.Model):
    id = db.Column(db.Integer() , primary_key=True)
    name = db.Column(db.String() , nullable=False)
    diameter = db.Column(db.Float() , nullable=True)
    rotation_period = db.Column(db.Float() , nullable=True)
    orbital_period = db.Column(db.Float() , nullable=True)
    population = db.Column(db.Integer() , nullable=True)
    climate = db.Column(db.String() , nullable=True)
    
    def __repr__(self):
        return f'<Planets {self.name}>'

    def serialize(self):
        return {"id": self.id,
                "name": self.name,
                "diameter": self.diameter,
                "rotation_period" : self.rotation_period,
                "orbital_period" : self.orbital_period,
                "population" : self.population,
                "climate" : self.climate}


class Characters(db.Model):
    id = db.Column(db.Integer() , primary_key=True)
    name = db.Column(db.String() , nullable=False)
    description = db.Column(db.String(), nullable=True)
    height = db.Column(db.Float() , nullable=True)
    home_planet_id = db.Column(db.Integer() , db.ForeignKey('planets.id') )
    to_home_planet = db.relationship('Planets' , foreign_keys=[home_planet_id])

    def __repr__(self):
        return f'<Character {self.name}>'

    def serialize(self):
        return {"id": self.id,
                "name": self.name,
                "description": self.description,
                "height" : self.height,
                "home_planet" : self.home_planet}


class PlanetFavorites(db.Model):
    id = db.Column(db.Integer() , primary_key=True)
    user_id_p = db.Column(db.Integer() , db.ForeignKey('users.id'))
    to_user_id_p = db.relationship('Users' , foreign_keys=[user_id_p])
    planet_id = db.Column(db.Integer() , db.ForeignKey('planets.id'))
    to_planet_id = db.relationship('Planets' , foreign_keys=[planet_id])
  
    def __repr__(self):
        return f'<PlanetFavorite {self.id}>'

    def serialize(self):
        return {"id": self.id,
                "user_id_p": self.user_id_p,
                "planet_id": self.planet_id}


class CharactersFavorites(db.Model):
    id = db.Column(db.Integer() , primary_key=True)
    user_id_c = db.Column(db.Integer() , db.ForeignKey('users.id'))
    to_user_id_c = db.relationship('Users' , foreign_keys=[user_id_c])
    character_id = db.Column(db.Integer() , db.ForeignKey('characters.id'))
    to_character_id = db.relationship('Characters' , foreign_keys=[character_id])
  
    def __repr__(self):
        return f'<CharactersFavorites {self.id}>'

    def serialize(self):
        return {"id": self.id,
                "user_id_c": self.user_id_c,
                "character_id": self.character_id}


class Followers(db.Model):
    id = db.Column(db.Integer() , primary_key=True)
    user_from_id = db.Column(db.Integer() , db.ForeignKey('users.id'))
    to_user_from_id = db.relationship('Users' , foreign_keys=[user_from_id])
    follower_id = db.Column(db.Integer() , db.ForeignKey('users.id'))
    to_follower_id = db.relationship('Users' , foreign_keys=[follower_id])
  
    def __repr__(self):
        return f'<Followers {self.id}>'

    def serialize(self):
        return {"id": self.id,
                "user_from_id": self.user_from_id,
                "follower_id": self.follower_id}
