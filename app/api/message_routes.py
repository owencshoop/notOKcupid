from flask import Blueprint, jsonify, request
from flask_login import login_required, current_user
from app.models import Mismatch, Message, db
from app.forms import MessageForm
from datetime import datetime
from .auth_routes import validation_errors_to_error_messages

message_routes = Blueprint('messages', __name__)


@message_routes.route('/<int:id>', methods=['POST'])
@login_required
def send_message(id):
  mismatch = Mismatch.query.get(id)

  if not mismatch:
    return { "errors": ['mismatch does not exist']}

  form = MessageForm()
  form['csrf_token'].data = request.cookies['csrf_token']

  if form.validate_on_submit():
    new_message = Message(
      sender=current_user.id,
      recipient=mismatch.user1_id if current_user.id != mismatch.user1_id else mismatch.user2_id,
      mismatch_id=mismatch.id,
      text=form.data['text'],
      date_time=datetime.now().strftime("%d/%m/%Y %H:%M:%S")
    )

    db.session.add(new_message)
    db.session.commit()
    return mismatch.to_dict(), 201

  return {'errors': validation_errors_to_error_messages(form.errors)}, 401
