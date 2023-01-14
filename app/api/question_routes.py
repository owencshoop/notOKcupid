from flask import Blueprint, jsonify
from flask_login import login_required, current_user
from app.models import UserAnswer, db
from app.forms import QuestionForm
from app.api.auth_routes import validation_errors_to_error_messages

question_routes = Blueprint('questions', __name__)

@question_routes.route('/<int:id>', methods=['PUT'])
@login_required
def question_answered():

  form = QuestionForm()

  if form.validate_on_submit():
    answer = UserAnswer.query.get(form.data['userAnswerId'])
    answer.answer = form.data["answer"]

    db.session.add(answer)
    db.session.commit()

    return current_user.to_dict(), 201

  return {'errors': validation_errors_to_error_messages(form.errors)}, 401
