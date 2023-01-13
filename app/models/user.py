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
    age = db.Column(db.Integer, nullable=False)
    first_name = db.Column(db.String(50), nullable=False)
    gender = db.Column(db.String(50), nullable=False)
    preferred_genders = db.Column(db.String(50), nullable=False)
    min_age = db.Column(db.Integer, nullable=False, default=18, min=18)
    max_age = db.Column(db.Integer, nullable=False, default=99)
    zip_code = db.Column(db.Integer, nullable=False)
    radius = db.Column(db.Integer, nullable=False)
    bio = db.Column(db.Text(1000), nullable=False)

    user_answers = db.relationship('UserAnswer', back_populates='user')
    user_images = db.relationship('UserImage', back_populates='user')
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
            'bio': self.bio,
            'userAnswers': self.user_answers.to_dict(),
            'userImages': self.user_images
        }

class UserImage(db.Model):
    __tablename__ = 'user_images'

    if environment == "production":
        __table_args__ = {'schema': SCHEMA}

    id = db.Column(db.Integer, primary_key=True)
    image_url = db.Column(db.Text(1000), nullable=False)
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

    messages = db.relationship('Message', back_populates='mismatch')

    def to_dict(self):
        return {
            'id': self.id,
            'user1Id': self.user1_id,
            'user2Id': self.user2_id,
            'messages': self.messages.to_dict()
        }

class Message(db.Model):
    __tablename__ = 'messages'

    if environment == "production":
        __table_args__ = {'schema': SCHEMA}

    id = db.Column(db.Integer, primary_key=True)
    sender = db.Column(db.Integer, db.ForeignKey(add_prefix_for_prod('users.id')), nullable=False)
    recipient = db.Column(db.Integer, db.ForeignKey(add_prefix_for_prod('users.id')), nullable=False)
    mismatch_id = db.Column(db.Integer, db.ForeignKey(add_prefix_for_prod('mismatches.id')), nullable=False)
    text = db.Column(db.Text(1000), nullable=False)
    date_time = db.Column(db.TIMESTAMP) # TODO

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
    answer = db.Column(db.Integer)

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
