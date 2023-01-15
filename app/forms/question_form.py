from flask_wtf import FlaskForm
from wtforms import StringField, IntegerField

class QuestionForm(FlaskForm):
  userAnswerId = IntegerField('UserAnswer')
  answer = StringField('Answer')
