from flask import Blueprint, jsonify, request
from flask_login import login_required, logout_user, current_user
from app.models import User, db, Mismatch
from app.forms import SignUpForm

user_routes = Blueprint('users', __name__)

def validation_errors_to_error_messages(validation_errors):
    """
    Simple function that turns the WTForms validation errors into a simple list
    """
    errorMessages = []
    for field in validation_errors:
        for error in validation_errors[field]:
            errorMessages.append(f'{field} : {error}')
    return errorMessages

@user_routes.route('/')
@login_required
def users():
    """
    Query for all users and returns them in a list of user dictionaries
    """
    users = User.query.all()
    return {'users': [user.to_dict() for user in users]}

@user_routes.route('/discover')
@login_required
def discover_users():
    userGenders = current_user.preferred_genders.split(', ')
    discover = User.query.filter(
            ~db.or_(User.id.in_([user.id for user in current_user.likes]), User.id.in_([user.id for user in current_user.dislikes])),
            User.age.between(current_user.min_age, current_user.max_age), User.id != current_user.id, User.gender.in_(userGenders)
            ).all()

    return {'discoverUsers': [user.to_like_dict() for user in discover]}


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
@user_routes.route('/dislikes', methods=['POST'])
@login_required
def create_dislike():

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
@user_routes.route('/dislikes', methods=['DELETE'])
@login_required
def delete_dislike():
    disliked_user_id = request.json["disliked_id"]

    disliked_user = User.query.get(disliked_user_id)
    # query for disliked user

    if disliked_user:

        if disliked_user in current_user.dislikes:
            # remove current user from dislikes
            current_user.dislikes.remove(disliked_user)
            # query for mismatches
            mismatch1 = Mismatch.query.filter(Mismatch.user1_id == current_user.id).filter(Mismatch.user2_id == disliked_user.id)
            mismatch2 = Mismatch.query.filter(Mismatch.user2_id == current_user.id).filter(Mismatch.user1_id == disliked_user.id)
            # if either exists, remove it
            if mismatch1:
                mismatch1.delete()
            elif mismatch2:
                mismatch2.delete()

            db.session.add(current_user)
            db.session.commit()
            return current_user.to_dict()
        else:
            return { 'errors': ['dislike does not exist']}, 404

    else:
        return { 'errors': ['Cannot find User']}, 404



# POST like
# will send 'liked_id' from the frontend
@user_routes.route('/likes', methods=['POST'])
@login_required
def create_like():
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


@user_routes.route('/likes', methods=['DELETE'])
@login_required
def delete_like():
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

@user_routes.route('/<int:id>', methods=['PUT'])
@login_required
def update_user(id):
    """
    Update user info
    """
    user = User.query.get(id)

    if not user:
        return {'errors': ['User does not exist']}

    form = SignUpForm()
    if form.validate_on_submit():
        user.username= form.data['username']
        user.email = form.data['email']
        user.password = form.data['password']
        user.first_name = form.data['firstName']
        user.age= form.data['age']
        user.gender= form.data['gender']
        user.preferred_genders= form.data['preferredGenders']
        user.min_age= form.data['minAge']
        user.max_age= form.data['maxAge']
        user.zip_code= form.data['zipCode']
        user.radius= form.data['radius']
        user.bio= form.data['bio']
        db.session.add(user)
        db.session.commit()
        return user.to_dict()
    return {'errors': validation_errors_to_error_messages(form.errors)}, 401

@user_routes.route('/<int:id>', methods=['DELETE'])
@login_required
def delete_user(id):
    """
    Delete logged in user
    """
    user = User.query.get(id)
    if not user:
        return {'errors': ["user does not exist"]}, 404

    user.delete()
    user = User.query.get(id)
    if not user:
        logout_user()
        return {'message': 'User successfully deleted'}, 200
    return {'message': 'Unable to delete user'}
