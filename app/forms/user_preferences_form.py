from flask_wtf import FlaskForm
from wtforms import StringField, IntegerField
from wtforms.validators import DataRequired, NumberRange

class UserPreferencesForm(FlaskForm):
    preferredGenders = StringField('Preferred Gender', validators=[DataRequired()])
    minAge = IntegerField("Minimum age", validators=[DataRequired(), NumberRange(min=18, max=99, message='Age must be between 18 and 100')])
    maxAge = IntegerField('Maximum age', validators=[DataRequired(), NumberRange(min=18, max=100, message='Age must be between 18 and 100')])
