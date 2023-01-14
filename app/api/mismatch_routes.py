from flask import Blueprint, jsonify
from app.models import db, Mismatch, User

mismatch_routes = Blueprint('mismatches', __name__)


@mismatch_routes.route('/<int:id>')
def get_mismatch(id):
    mismatches = Mismatch.query.filter(
        Mismatch.user1_id == id or Mismatch.user2_id == id).all()
    if not mismatches:
        return {"errors": ["no matches found"]}, 404
    return [mismatch.to_dict() for mismatch in mismatches], 200


@mismatch_routes.route('/<int:id>', methods=['POST'])
def create_mismatch(id):
    user = User.query.get(id)
    new_mismatch = Mismatch(
        user1_id=id,
        user2_id=user.dislikedUser.id
    )

    db.session.add(new_mismatch)
    db.session.commit()

    return new_mismatch.to_dict(), 201


@mismatch_routes.route('/<int:id>', methods=['DELETE'])
def delete_mismatch(id):
    mismatch = Mismatch.query.get(id)
    if not mismatch:
        return {"errors": ["no matches found"]}, 404

    db.session.delete(mismatch)
    db.session.commit()
    return {"messsage": "successfully unmatched"}, 200
