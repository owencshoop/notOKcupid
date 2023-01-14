from flask import Blueprint, jsonify, request
from flask_login import login_required, current_user
from app.models import User, db, Mismatch

user_routes = Blueprint('users', __name__)


@user_routes.route('/')
@login_required
def users():
    """
    Query for all users and returns them in a list of user dictionaries
    """
    users = User.query.all()
    return {'users': [user.to_dict() for user in users]}


@user_routes.route('/<int:id>')
@login_required
def user(id):
    """
    Query for a user by id and returns that user in a dictionary
    """
    user = User.query.get(id)
    return user.to_dict()


# POST dislike
# will send 'disliked_id' from the frontend
@user_routes.route('/<int:id>/dislikes', methods=['POST'])
@login_required
def create_dislike(id):
    
    disliked_user_id = request.json["disliked_id"]

# turn disliked_user_id into integer from incase is not from json
    disliked_user = User.query.get(int(disliked_user_id))

    if disliked_user:
        # add disliked user to dislikes
        current_user.dislikes.append(disliked_user)
        #  check if disiked user is in user likes and if so, remove from there.
        if disliked_user in current_user.likes:
            current_user.likes.remove(disliked_user)

        db.session.add(current_user)
        db.session.commit()
        # if current user is also in disliked users dislikes, create a mismatch
        if current_user in disliked_user.dislikes:
            mismatch = Mismatch(
                user1_id = current_user.id,
                user2_id = disliked_user.id
            )
            db.session.add(mismatch)
            db.session.commit()
            return current_user.to_dict()
        else :
            return current_user.to_dict()
    else:
        return { 'errors': ['Cannot find User']}, 404


# {'errors': ['error']}
    
# DELETE dislike
# will send 'disliked_id' from the frontend
@user_routes.route('/<int:id>/dislikes', methods=['DELETE'])
@login_required
def delete_dislike(id):
    disliked_user_id = request.json["disliked_id"]

    disliked_user = User.query.get(disliked_user_id)
    # query for disliked user
    if disliked_user:

        if disliked_user in current_user.dislikes:
            current_user.dislikes.remove(disliked_user)
            db.session.add(current_user)
            db.session.commit()
            return current_user.to_dict()
        else:
            return { 'errors': ['dislike does not exist']}, 404

    else:
        return { 'errors': ['Cannot find User']}, 404



# POST like
# will send 'liked_id' from the frontend
@user_routes.route('/<int:id>/likes', methods=['POST'])
@login_required
def create_like(id):
    liked_user_id = request.json["liked_id"]

    liked_user = User.query.get(int(liked_user_id))

    if liked_user:
        current_user.likes.append(liked_user)

        if liked_user in current_user.dislikes:
            current_user.dislikes.remove(liked_user)

        db.session.add(current_user)
        db.session.commit()
        return current_user.to_dict()
    else:
        return {'errors': ['User not Found']}, 404


@user_routes.route('/<int:id>/likes', methods=['DELETE'])
@login_required
def delete_like(id):
    liked_user_id = request.json["liked_id"]

    liked_user = User.query.get(int(liked_user_id))

    if liked_user:

        if liked_user in current_user.likes:
            current_user.likes.remove(liked_user)
            db.session.add(current_user)
            db.session.commit()
            return current_user.to_dict()
        else:
            return {'errors': ['dislike does not exist']}, 404

    else:
        return {'errors': ['Cannot find User']}, 404
