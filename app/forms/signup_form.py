from flask_wtf import FlaskForm
from wtforms import StringField, SelectField, IntegerField, TextAreaField
from wtforms.validators import DataRequired, Email, ValidationError, NumberRange, Length
from app.models import User


def user_exists(form, field):
    # Checking if user exists
    email = field.data
    user = User.query.filter(User.email == email).first()
    if user:
        raise ValidationError('Email address is already in use.')


def username_exists(form, field):
    # Checking if username is already in use
    username = field.data
    user = User.query.filter(User.username == username).first()
    if user:
        raise ValidationError('Username is already in use.')


class SignUpForm(FlaskForm):
    username = StringField(
        'username', validators=[DataRequired(), username_exists])
    email = StringField('email', validators=[DataRequired(), user_exists, Email])
    password = StringField('password', validators=[DataRequired(), Length(min=4, message='Pasword must be atleast 4 characters.')])
    firstName = StringField('First Name', validators=[DataRequired()])
    age = IntegerField('Age', validators=[DataRequired(), NumberRange(min=18, max=100, message='Age must be between 18 and 100')])
    gender = SelectField('Gender', choices=['male', 'female', 'nonbinary'], validators=[DataRequired()])
    preferredGenders = StringField('Preferred Gender', validators=[DataRequired()])
    minAge = IntegerField("Minimum age", validators=[DataRequired(), NumberRange(min=18, max=100, message='Age must be between 18 and 100')])
    maxAge = IntegerField('Maximum age', validators=[DataRequired(), NumberRange(min=18, max=100, message='Age must be between 18 and 100')])
    city = StringField('City', validators=[DataRequired()])
    state = StringField('State', validators=[DataRequired()])
    bio = TextAreaField('Bio', validators=[DataRequired()])
