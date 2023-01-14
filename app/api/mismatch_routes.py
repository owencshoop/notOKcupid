from flask import Blueprint, request
from app.models import db, Mismatch
from sqlalchemy import or_
from flask_login import current_user, login_required

mismatch_routes = Blueprint('mismatches', __name__)


@mismatch_routes.route('/<int:id>')
@login_required
def get_mismatch(id):
    mismatches = Mismatch.query.filter(or_(
        Mismatch.user1_id == id, Mismatch.user2_id == id)).all()
    if not mismatches:
        return {"errors": ["no matches found"]}, 404
    return [mismatch.to_dict() for mismatch in mismatches], 200


@mismatch_routes.route('/<int:id>', methods=['DELETE'])
@login_required
def delete_mismatch(id):
    mismatch = Mismatch.query.get(id)
    if not mismatch:
        return {"errors": ["no matches found"]}, 404

    db.session.delete(mismatch)
    db.session.commit()
    return current_user.to_dict(), 200
