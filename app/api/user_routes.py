from flask import Blueprint, jsonify
from flask_login import login_required, logout_user
from app.models import User, db
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


@user_routes.route('/<int:id>')
@login_required
def user(id):
    """
    Query for a user by id and returns that user in a dictionary
    """
    user = User.query.get(id)
    return user.to_dict()

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
