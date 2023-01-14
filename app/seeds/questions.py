from app.models import db, Question, environment, SCHEMA

def seed_questions():
    believe = Question(
      question='Do you believe in aliens?', answer1='oh hecks yeah', answer2='no way man'
    )
    best_simpsons_line = Question(
      question='What is your favorite line from the Simpsons?', answer1='eat my shorts', answer2='I hate tv'
    )
    ready10 = Question(
      question='Are you ready to settle down and have kids?', answer1='maybe maybe not', answer2='not yet'
    )
    wyr100 = Question(
      question='Would you rather?', answer1='fight a kitten', answer2='fight a praying mantis'
    )
    wyr101 = Question(
      question='Would you rather?', answer1='eat the same thing every day', answer2='never be able to eat the same thing twice'
    )
    chopsticks = Question(
        question="Do you use chopsticks?",
        answer1="Yes",
        answer2="No"
    )
    walk = Question(
        question="Can you walk around on one foot for over an hour?",
        answer1="Yes",
        answer2="No"
    )
    place = Question(
        question="Where would your rather have a date?",
        answer1="In a tree",
        answer2="On a boat"
    )
    flip = Question(
        question="If forced would you do a front flip or a back flip?",
        answer1="front flip",
        answer2="back flip"
    )
    toiletseat = Question(
        question="Do you leave the toilet seat up or down?",
        answer1="Up",
        answer2="Down"
    )
    rain = Question(
        question="Would you rather walk in rain or hail?",
        answer1="Rain",
        answer2="Hail"
    )
    quest = Question(
        question="Do you like going on quests?", answer1="love it!", answer2="hate it!"
    )
    love = Question(
        question="Do you believe in True Love?", answer1="Definitely!", answer2="Definitely not!"
    )
    swallows = Question(
        question="What is the airspeed velocity of an unladen swallow?", answer1="I have no clue", answer2="a european or an african swallow?"
    )
    wine = Question(
        question="Do you like to drink wine?", answer1="love it!", answer2="hate it!"
    )
    morning_person = Question(
        question="Are you a morning or an evening person?", answer1="definitely a morning person", answer2="evening person all the way"
    )
    pizza = Question(
        question='Do you prefer pizza or wings?',
        answer1='wings',
        answer2='garbage'
    )
    snowboard = Question(
        question="Snowboard or skis?",
        answer1 = 'board',
        answer2 = 'I need 2 edges to stay up'
    )
    windows = Question(
        question = 'Windows or mac?',
        answer1 = 'PC all day',
        answer2 = 'An apple a day keeps the doctor away'
    )
    drunk = Question(
        question='What type of drinker are you?',
        answer1 = 'I drink socially',
        answer2 = 'I drink for the effect'
    )
    island = Question(
        question='If you were stranded on an island, I would rather?',
        answer1 = 'Be alone.',
        answer2 = 'Be with my ex.'
    )

    questions = [chopsticks, walk, place, flip, toiletseat, rain, believe, best_simpsons_line, ready10, wyr100, wyr101, quest, love, swallows, wine, morning_person, pizza, snowboard, windows, drunk, island]

    [db.session.add(question) for question in questions]

    db.session.commit()


def undo_questions():
    if environment == "production":
        db.session.execute(f"TRUNCATE table {SCHEMA}.questions RESTART IDENTITY CASCADE;")
    else:
        db.session.execute("DELETE FROM questions")

    db.session.commit()
