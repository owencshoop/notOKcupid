from app.models import db, Mismatch, environment, SCHEMA, User


def seed_mismatches():
    owen = User.query.filter(User.username == 'owenshoop').first()
    nic = User.query.filter(User.username == 'nicisherenow').first()
    alex = User.query.filter(User.username == 'alexv').first()
    vince = User.query.filter(User.username == 'vnisanity').first()
    demo = User.query.filter(User.username == 'demo').first()
    demo5 = User.query.filter(User.username == 'Demo5').first()
    demo1 = Mismatch(user1=demo, user2=owen)
    demo2 = Mismatch(user1=demo, user2=nic)
    demo3 = Mismatch(user1=demo, user2=alex)
    demo4 = Mismatch(user1=demo, user2=vince)
    demo51 = Mismatch(user1=demo5, user2=owen)
    demo52 = Mismatch(user1=demo5, user2=nic)
    demo53 = Mismatch(user1=demo5, user2=alex)
    demo54 = Mismatch(user1=demo5, user2=vince)



    mismatches = [demo1, demo2, demo3, demo4, demo51, demo52, demo53, demo54]
    [db.session.add(mismatch) for mismatch in mismatches]
    db.session.commit()


def undo_mismatches():
    if environment == "production":
        db.session.execute(
            f"TRUNCATE table {SCHEMA}.mismatches RESTART IDENTITY CASCADE;")
        db.session.execute(
            f"TRUNCATE table {SCHEMA}.messages RESTART IDENTITY CASCADE;")
    else:
        db.session.execute("DELETE FROM mismatches")
        db.session.execute("DELETE FROM messages")

    db.session.commit()
