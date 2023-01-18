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

if environment == 'production':
    likes.schema = SCHEMA
    dislikes.schema = SCHEMA

class User(db.Model, UserMixin):
    __tablename__ = 'users'

    if environment == "production":
        __table_args__ = {'schema': SCHEMA}

    id = db.Column(db.Integer, primary_key=True)
    username = db.Column(db.String(40), nullable=False, unique=True)
    email = db.Column(db.String(255), nullable=False, unique=True)
    hashed_password = db.Column(db.String(255), nullable=False)
    age = db.Column(db.Integer, nullable=False)
    first_name = db.Column(db.String(50), nullable=False)
    gender = db.Column(db.String(50), nullable=False)
    preferred_genders = db.Column(db.String(255), nullable=False)
    min_age = db.Column(db.Integer, nullable=False, default=18)
    max_age = db.Column(db.Integer, nullable=False, default=99)
    city = db.Column(db.String(50), nullable=False)
    state = db.Column(db.String(50), nullable=False)
    bio = db.Column(db.Text, nullable=False)

    user_answers = db.relationship('UserAnswer', back_populates='user', cascade="all, delete-orphan")
    user_images = db.relationship('UserImage', back_populates='user', cascade="all, delete-orphan")

    dislikes = db.relationship(
        "User",
        secondary=dislikes,
        primaryjoin=(dislikes.c.disliker_id == id),
        secondaryjoin=(dislikes.c.disliked_id == id),
        backref=db.backref('disliked_user', lazy='dynamic'),
        lazy='dynamic',
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
            'age': self.age,
            'firstName': self.first_name,
            'gender': self.gender,
            'preferredGenders': self.preferred_genders,
            'minAge': self.min_age,
            'maxAge': self.max_age,
            'city': self.city,
            'state': self.state,
            'bio': self.bio,
            'userAnswers': [user_answer.to_dict() for user_answer in self.user_answers],
            'userImages': [user_image.to_dict() for user_image in self.user_images],
            'dislikes': [dislike.to_like_dict() for dislike in self.dislikes],
            'likes': [like.to_like_dict() for like in self.likes],
            'dislikedUser':[dislike.to_like_dict() for dislike in list(self.disliked_user) if dislike],
            'likedUser': [like.to_like_dict() for like in list(self.liked_user) if like]
        }

    def to_like_dict(self):
        return {
            'id': self.id,
            'username': self.username,
            'email': self.email,
            'age': self.age,
            'firstName': self.first_name,
            'gender': self.gender,
            'preferredGenders': self.preferred_genders,
            'city': self.city,
            'state': self.state,
            'location': f'{self.city}, {self.state}',
            'bio': self.bio,
            'userAnswers': [user_answer.to_dict() for user_answer in self.user_answers],
            'userImages': [user_image.to_dict() for user_image in self.user_images],
        }

class UserImage(db.Model):
    __tablename__ = 'user_images'

    if environment == "production":
        __table_args__ = {'schema': SCHEMA}

    id = db.Column(db.Integer, primary_key=True)
    image_url = db.Column(db.Text, nullable=False)
    user_id = db.Column(db.Integer, db.ForeignKey(add_prefix_for_prod('users.id')), nullable=False)

    user = db.relationship('User', back_populates='user_images')

    def to_dict(self):
        return {
            'id': self.id,
            'imageUrl': self.image_url,
            'userId': self.user_id
        }

class Mismatch(db.Model):
    __tablename__ = 'mismatches'

    if environment == "production":
        __table_args__ = {'schema': SCHEMA}

    id = db.Column(db.Integer, primary_key=True)
    user1_id = db.Column(db.Integer, db.ForeignKey(add_prefix_for_prod('users.id')), nullable=False)
    user2_id = db.Column(db.Integer, db.ForeignKey(add_prefix_for_prod('users.id')), nullable=False)

    user1 = db.relationship("User", foreign_keys=[user1_id])
    user2 = db.relationship("User", foreign_keys=[user2_id])

    messages = db.relationship('Message', back_populates='mismatch')

    def to_dict(self):
        return {
            'id': self.id,
            'user1Id': self.user1_id,
            'user2Id': self.user2_id,
            'user1': self.user1.to_like_dict(),
            'user2': self.user2.to_like_dict(),
            'messages': [message.to_dict() for message in self.messages]
        }

class Message(db.Model):
    __tablename__ = 'messages'

    if environment == "production":
        __table_args__ = {'schema': SCHEMA}

    id = db.Column(db.Integer, primary_key=True)
    sender = db.Column(db.Integer, db.ForeignKey(add_prefix_for_prod('users.id')), nullable=False)
    recipient = db.Column(db.Integer, db.ForeignKey(add_prefix_for_prod('users.id')), nullable=False)
    mismatch_id = db.Column(db.Integer, db.ForeignKey(add_prefix_for_prod('mismatches.id')), nullable=False)
    text = db.Column(db.Text, nullable=False)
    date_time = db.Column(db.String(255))

    mismatch = db.relationship('Mismatch', back_populates="messages")

    def to_dict(self):
        return {
            'id': self.id,
            'sender': self.sender,
            'recipient': self.recipient,
            'mismatchId': self.mismatch_id,
            'text': self.text,
            'dateTime': self.date_time,
        }


class UserAnswer(db.Model):
    __tablename__ = 'user_answers'

    if environment == "production":
        __table_args__ = {'schema': SCHEMA}

    id = db.Column(db.Integer, primary_key=True)
    user_id = db.Column(db.Integer, db.ForeignKey(add_prefix_for_prod('users.id')), nullable=False)
    question_id = db.Column(db.Integer, db.ForeignKey(add_prefix_for_prod('questions.id')), nullable=False)
    answer = db.Column(db.String)

    user = db.relationship('User', back_populates='user_answers')
    question = db.relationship('Question', back_populates='user_answers')

    def to_dict(self):
        return {
            'id': self.id,
            'userId': self.user_id,
            'questionId': self.question_id,
            'answer': self.answer,
            'question': self.question.to_dict()
        }

class Question(db.Model):
    __tablename__ = 'questions'

    if environment == "production":
        __table_args__ = {'schema': SCHEMA}

    id = db.Column(db.Integer, primary_key=True)
    question = db.Column(db.String(255), nullable=False)
    answer1 = db.Column(db.String(255), nullable=False)
    answer2 = db.Column(db.String(255), nullable=False)

    user_answers = db.relationship('UserAnswer', back_populates='question')

    def to_dict(self):
        return {
            'id': self.id,
            'question': self.question,
            'answer1': self.answer1,
            'answer2': self.answer2
        }
