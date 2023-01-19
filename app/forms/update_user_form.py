from flask_wtf import FlaskForm
from wtforms import StringField, SelectField, IntegerField, TextAreaField
from wtforms.validators import DataRequired, Email, ValidationError, NumberRange, Length, URL
from app.models import User

class UpdateUserForm(FlaskForm):
    firstName = StringField('First Name', validators=[DataRequired(message='Please provide a first name.')])
    age = IntegerField('Age', validators=[DataRequired(message='Please provide an age between 18 and 100 years.'), NumberRange(min=18, max=100, message='Age must be between 18 and 100')])
    gender = SelectField('Gender', choices=['male', 'female', 'nonbinary'], validators=[DataRequired()])
    preferredGenders = StringField('Preferred Gender', validators=[DataRequired()])
    minAge = IntegerField("Minimum age", validators=[DataRequired(), NumberRange(min=18, max=99, message='Age must be between 18 and 100')])
    maxAge = IntegerField('Maximum age', validators=[DataRequired(), NumberRange(min=18, max=100, message='Age must be between 18 and 100')])
    city = StringField('City', validators=[DataRequired(message='Please provide a city.')])
    state = StringField('State', validators=[DataRequired(message='Please provide a state.')])
    bio = TextAreaField('Bio', validators=[DataRequired(message='Please provide a bio.')])
    imageUrl = StringField('Image URL', validators=[DataRequired(message='Please provide a valid profile picture.'), URL(message='Please provide a valid URL.')])


