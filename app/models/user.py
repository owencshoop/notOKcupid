from .db import db, environment, SCHEMA, add_prefix_for_prod
from werkzeug.security import generate_password_hash, check_password_hash
from flask_login import UserMixin

def add_prefix_for_prod(attr):
    if environment == "production":
        return f"{SCHEMA}.{attr}"
    else:
        return attr

dislikes = db.Table(
    'dislikes',
    db.Column('disliker_id', db.Integer, db.ForeignKey(add_prefix_for_prod('users.id'))),
    db.Column('disliked_id', db.Integer, db.ForeignKey(add_prefix_for_prod('users.id')))
)

likes = db.Table(
    'likes',
    db.Column('liker_id', db.Integer, db.ForeignKey(add_prefix_for_prod('users.id'))),
    db.Column('liked_id', db.Integer, db.ForeignKey(add_prefix_for_prod('users.id')))
)

class User(db.Model, UserMixin):
    __tablename__ = 'users'

    if environment == "production":
        __table_args__ = {'schema': SCHEMA}

    id = db.Column(db.Integer, primary_key=True)
    username = db.Column(db.String(40), nullable=False, unique=True)
    email = db.Column(db.String(255), nullable=False, unique=True)
    hashed_password = db.Column(db.String(255), nullable=False)
    birthday = db.Column(db.Date, nullable=False)
    first_name = db.Column(db.String(50), nullable=False)
    gender = db.Column(db.String(50), nullable=False)
    preferred_genders = db.Column(db.String(50), nullable=False)
    min_age = db.Column(db.Integer, nullable=False, default=18, min=18)
    max_age = db.Column(db.Integer, nullable=False, default=99)
    zip_code = db.Column(db.Integer, nullable=False)
    radius = db.Column(db.Integer, nullable=False)
    bio = db.Column(db.Text(1000), nullable=False)

    dislikes = db.relationship(
        "User",
        secondary=dislikes,
        primaryjoin=(dislikes.c.disliker_id == id),
        secondaryjoin=(dislikes.c.disliked_id == id),
        backref=db.backref('disliked_user', lazy='dynamic'),
        lazy='dynamic'
    )

    likes = db.relationship(
        "User",
        secondary=likes,
        primaryjoin=(likes.c.liker_id == id),
        secondaryjoin=(likes.c.liked_id == id),
        backref=db.backref('liked_user', lazy='dynamic'),
        lazy='dynamic'
    )



    @property
    def password(self):
        return self.hashed_password

    @password.setter
    def password(self, password):
        self.hashed_password = generate_password_hash(password)

    def check_password(self, password):
        return check_password_hash(self.password, password)

    def to_dict(self):
        return {
            'id': self.id,
            'username': self.username,
            'email': self.email,
            'birthday': self.birthday,
            'firstName': self.first_name,
            'gender': self.gender,
            'preferredGenders': self.preferred_genders,
            'minAge': self.min_age,
            'maxAge': self.max_age,
            'zipCode': self.zip_code,
            'radius': self.radius,
            'bio': self.bio
        }

class UserImages(db.Model):
    __tablename__ = 'user_images'

    if environment == "production":
        __table_args__ = {'schema': SCHEMA}

    id = db.Column(db.Integer, primary_key=True)
    image_url = db.Column(db.Text(1000), nullable=False)
    user_id = db.Column(db.Integer, db.ForeignKey(add_prefix_for_prod('users.id')), nullable=False)

    def to_dict(self):
        return {
            'id': self.id,
            'imageUrl': self.image_url,
            'userId': self.user_id
        }


# class Dislikes(db.Model):
#     __tablename__ = 'dislikes'

#     if environment == "production":
#         __table_args__ = {'schema': SCHEMA}

#     disliker_id = db.Column(db.Integer, db.ForeignKey(add_prefix_for_prod('users.id')))
#     disliked_id = db.Column(db.Integer, db.ForeignKey(add_prefix_for_prod('users.id')))


# class Likes(db.Model):
#     __tablename__ = 'likes'

#     if environment == "production":
#         __table_args__ = {'schema': SCHEMA}

#     liker_id = db.Column(db.Integer, db.ForeignKey(add_prefix_for_prod('users.id')))
#     liked_id = db.Column(db.Integer, db.ForeignKey(add_prefix_for_prod('users.id')))
