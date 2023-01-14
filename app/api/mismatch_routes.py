from flask import Blueprint, request
from app.models import db, Mismatch
from sqlalchemy import or_

mismatch_routes = Blueprint('mismatches', __name__)


@mismatch_routes.route('/<int:id>')
def get_mismatch(id):
    mismatches = Mismatch.query.filter(or_(
        Mismatch.user1_id == id, Mismatch.user2_id == id)).all()
    if not mismatches:
        return {"errors": ["no matches found"]}, 404
    return [mismatch.to_dict() for mismatch in mismatches], 200


@mismatch_routes.route('/<int:id>', methods=['DELETE'])
def delete_mismatch(id):
    mismatch = Mismatch.query.get(id)
    if not mismatch:
        return {"errors": ["no matches found"]}, 404

    db.session.delete(mismatch)
    db.session.commit()
    return {"messsage": "successfully unmatched"}, 200
