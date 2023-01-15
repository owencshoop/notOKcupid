from app.models import db, User, environment, SCHEMA, Question, UserAnswer


# Adds a demo user, you can add other users here if you want
def seed_users():
    riktor = User(
        username='riktor', email='demo@user.io', password='password', age=20, first_name='riktor',
        gender='male', preferred_genders='female', min_age=20, max_age=40, zip_code=90210, radius=5, bio='I like to run fast'
    )
    viktor = User(
        username='viktor', email='viktor@aa.io', password='password', age=20, first_name='viktor',
        gender='male', preferred_genders='female', min_age=20, max_age=40, zip_code=90210, radius=5, bio='I like to jump high'
    )
    edktor = User(
        username='edktor', email='edktor@aa.io', password='password', age=20, first_name='edktor',
        gender='male', preferred_genders='female', min_age=20, max_age=40, zip_code=90210, radius=5, bio='I like to eat fast'
    )
    abcde = User(
        username='abcde', email='abcde@aa.io', password='password', age=20, first_name='abcde',
        gender='female', preferred_genders='male', min_age=20, max_age=40, zip_code=90210, radius=5, bio="It's pronounced ab city"
    )
    optimusa = User(
        username='optimusa', email='optimusa@aa.io', password='password', age=20, first_name='optimusa',
        gender='female', preferred_genders='male', min_age=20, max_age=40, zip_code=90210, radius=5, bio='My mom really liked transformers'
    )
    camden = User(
        username="camcam", email="camcam@gmail.com", password="camcam",
        age=22, first_name="Camden", gender="male", preferred_genders="female",
        min_age=18, max_age=30, zip_code=94014, radius=20, bio="Like to look toward the future and travels lots."
    )
    tam = User(
        username="tamtam", email="tamtam@gmail.com", password="tamtam",
        age=25, first_name="Tam", gender="female", preferred_genders="female, male",
        min_age=20, max_age=35, zip_code=94014, radius=30, bio="All I do all day is sit on my butt and watch my cats."
    )
    jack = User(
        username="jack_bauer", email="jack_bauer@gmail.com", password="jack_bauer",
        age=22, first_name="Jack", gender="male", preferred_genders="female",
        min_age=18, max_age=30, zip_code=94014, radius=20, bio="I am running out of time! tick tock tick tock"
    )
    micheal = User(
        username="littlekidlover", email="bestboss@gmail.com", password="1234",
        age=40, first_name="Micheal", gender="male", preferred_genders="female",
        min_age=30, max_age=50, zip_code=94014, radius=30, bio="I want kids, lots of them if you cannot tell by my user name. I am a manager, comedian, and a friend."
    )
    cupid = User(
        username="thecupid", email="okstupid@gmail.com", password="okstupid",
        age=25, first_name="Cupid", gender="nonbinary", preferred_genders="nonbinary",
        min_age=18, max_age=100, zip_code=94014, radius=100, bio="This cupid is loved by all and loves all"
    )
    demo5 = User(
        username="Demo5", email="demo5@aa.io", password="password", age=35, first_name="Demaux", gender="nonbinary", preferred_genders="nonbinary", min_age=26, max_age=36, zip_code=94014, radius=5, bio="I love being a demo user!"
    )
    alpal = User(
        username="alpal", email="alpal@aa.io", password="password", age=26, first_name="Alex", gender="female", preferred_genders="male, female, nonbinary", min_age=26, max_age=38, zip_code=94014, radius=2, bio="brb learning to code")
    wesley = User(
        username="dreadPirate", email="dread_pirate@aa.io", password="password", age=25, first_name="Wesley", gender="male", preferred_genders="female", min_age=18, max_age=30, zip_code=94014, radius=10, bio="I am on a quest to save my love Buttercup from Prince Humperdink! But hmu might have time to take a stroll through the fire swamp")
    buttercup = User(
        username="princess", email="princess@aa.io", password="password", age=20, first_name="Buttercup", gender="female", preferred_genders="male", min_age=20, max_age=45, zip_code=94014, radius=2, bio="Waiting for my Wesley to come save me. Will you get here first?")
    inigo = User(
        username="inigo_montoya", email="inigo_montoya@aa.io", password="password", age=35, first_name="Inigo", gender="male", preferred_genders="female, male, nonbinary", min_age=25, max_age=55, zip_code=94014, radius=7, bio="My name is Inigo Montoya. You killed my father. Prepare to die.")
    brett = User(
        username='brett', email='brett@aa.io', password='password', age=51, first_name='Brett', gender='male', preferred_genders='female', min_age=30, max_age=80, zip_code=90210, radius=100, bio='I like pickleball and long walks on the beach. #retiredlyf', dislikes=[buttercup, tam], likes=[inigo, optimusa, abcde]
    )
    lyn = User(
        username='lyn', email='lyn@aa.io', password='password', age=53, first_name='Lyn', gender='female', preferred_genders='male', min_age='30', max_age=85, zip_code=90210, radius=100, bio='Cats are my thing. I foster all types of animals. Ex-field hockey pro', dislikes=[brett, riktor, alpal], likes=[edktor, cupid]
    )
    conner = User(
        username='conner', email='conner@aa.io', password='password', age=28, first_name='Conner', gender='male', preferred_genders='male, female, nonbinary', min_age=18, max_age=99, zip_code=90210, radius=100, bio='Call me dungeon master. Started with world of warcraft and now I run my own games. You can find me in that fresh powpow', dislikes=[viktor, demo5, buttercup], likes=[jack, camden]
    )
    eddy = User(
        username='eddy', email='eddy@aa.io', password='password', age=22, first_name='Eddy', gender='female', preferred_genders='male, female', min_age=18, max_age=50, zip_code=90210, radius=100, bio='I am studying to be a nurse practitioner. I used to play lacrosse but now I hate it with a passion. #cape', dislikes=[tam, alpal, wesley], likes=[edktor, demo5, cupid]
    )
    demo = User(
        username='demo', email='demo@aa.io', password='password', age=35, first_name='Demo', gender='male', preferred_genders='male', min_age=18, max_age=99, zip_code='90210', radius=100, bio='I will demolish you.', dislikes=[cupid, brett, conner, eddy, riktor, optimusa, micheal, demo5, buttercup, alpal], likes=[camden, wesley, edktor]
    )

    users = [demo, brett, lyn, conner, eddy, riktor, viktor, edktor, abcde, optimusa,
             camden, tam, jack, micheal, cupid, demo5, alpal, wesley, buttercup, inigo]

    [db.session.add(user) for user in users]
    questions = Question.query.all()
    [[UserAnswer(user=user, question=question) for question in questions] for user in users]
    db.session.commit()


# Uses a raw SQL query to TRUNCATE or DELETE the users table. SQLAlchemy doesn't
# have a built in function to do this. With postgres in production TRUNCATE
# removes all the data from the table, and RESET IDENTITY resets the auto
# incrementing primary key, CASCADE deletes any dependent entities.  With
# sqlite3 in development you need to instead use DELETE to remove all data and
# it will reset the primary keys for you as well.
def undo_users():
    if environment == "production":
        db.session.execute(
            f"TRUNCATE table {SCHEMA}.users RESTART IDENTITY CASCADE;")
    else:
        db.session.execute("DELETE FROM users")

    db.session.commit()
