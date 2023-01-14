from flask_wtf import FlaskForm
from wtforms import TextField
from wtforms.validators import DataRequired

class MessageForm(FlaskForm):
  text = TextField('Text', validators=[DataRequired()])
