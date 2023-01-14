from flask_wtf import FlaskForm
from wtforms import StringField, SelectField, IntegerField, SelectMultipleField, TextAreaField
from wtforms.validators import DataRequired, Email, ValidationError
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
    email = StringField('email', validators=[DataRequired(), user_exists])
    password = StringField('password', validators=[DataRequired()])
    firstName = StringField('First Name', validators=[DataRequired()])
    age = IntegerField('Age', validators=[DataRequired()])
    gender = SelectField('Gender', choices=['male', 'female', 'nonbinary'], validators=[DataRequired()])
    preferredGenders = StringField('Preferred Gender', validators=[DataRequired()])
    minAge = IntegerField("Minimum age", validators=[DataRequired()])
    maxAge = IntegerField('Maximum age', validators=[DataRequired()])
    zipCode = IntegerField('Zip Code', validators=[DataRequired()])
    radius = IntegerField('Distance', validators=[DataRequired()])
    bio = TextAreaField('Bio', validators=[DataRequired()])
