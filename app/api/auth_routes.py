from flask import Blueprint, jsonify, session, request
from app.models import User, db, UserAnswer, Question, UserImage, Mismatch
from app.forms import LoginForm
from app.forms import SignUpForm
from flask_login import current_user, login_user, logout_user, login_required

auth_routes = Blueprint('auth', __name__)


def validation_errors_to_error_messages(validation_errors):
    """
    Simple function that turns the WTForms validation errors into a simple list
    """
    errorMessages = []
    for field in validation_errors:
        for error in validation_errors[field]:
            errorMessages.append(f'{field} : {error}')
    return errorMessages


@auth_routes.route('/')
def authenticate():
    """
    Authenticates a user.
    """
    if current_user.is_authenticated:
        return current_user.to_dict()
    return {'errors': ['Unauthorized']}


@auth_routes.route('/login', methods=['POST'])
def login():
    """
    Logs a user in
    """
    form = LoginForm()
    # Get the csrf_token from the request cookie and put it into the
    # form manually to validate_on_submit can be used
    form['csrf_token'].data = request.cookies['csrf_token']
    if form.validate_on_submit():
        # Add the user to the session, we are logged in!
        user = User.query.filter(User.email == form.data['email']).first()
        login_user(user)
        return user.to_dict()
    return {'errors': validation_errors_to_error_messages(form.errors)}, 401


@auth_routes.route('/logout')
def logout():
    """
    Logs a user out
    """
    logout_user()
    return {'message': 'User logged out'}


@auth_routes.route('/signup', methods=['POST'])
def sign_up():
    """
    Creates a new user and logs them in
    """
    form = SignUpForm()
    form['csrf_token'].data = request.cookies['csrf_token']
    if form.validate_on_submit():
        user = User(
            username=form.data['username'],
            email=form.data['email'],
            password=form.data['password'],
            first_name=form.data['firstName'],
            age=form.data['age'],
            gender=form.data['gender'],
            preferred_genders=form.data['preferredGenders'],
            min_age=form.data['minAge'],
            max_age=form.data['maxAge'],
            city=form.data['city'],
            state=form.data['state'],
            bio=form.data['bio']
        )
        demo1 = User.query.get(1)
        demo2 = User.query.get(9)
        db.session.add(user)
        demo1.dislikes.append(user)
        demo2.dislikes.append(user)
        user.dislikes.append(demo1)
        user.dislikes.append(demo2)
        mismatch1 = Mismatch(user1=demo1, user2=user)
        mismatch2 = Mismatch(user1=demo2, user2=user)
        db.session.add(mismatch1)
        db.session.add(mismatch2)
        UserImage(image_url=form.data['imageUrl'], user=user)
        questions = Question.query.all()
        [db.session.add(UserAnswer(user=user, question=question, answer=None)) for question in questions]
        db.session.commit()
        login_user(user)
        return user.to_dict()
    return {'errors': validation_errors_to_error_messages(form.errors)}, 401


@auth_routes.route('/unauthorized')
def unauthorized():
    """
    Returns unauthorized JSON when flask-login authentication fails
    """
    return {'errors': ['Unauthorized']}, 401
