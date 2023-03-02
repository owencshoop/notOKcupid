from app.models import db, Mismatch, environment, SCHEMA, User


def seed_mismatches():
    owen = User.query.filter(User.username == 'owenshoop').first()
    nic = User.query.filter(User.username == 'nicisherenow').first()
    alex = User.query.filter(User.username == 'alexv').first()
    vince = User.query.filter(User.username == 'vinsanity').first()
    demo = User.query.filter(User.username == 'demo').first()
    demo5 = User.query.filter(User.username == 'Demo5').first()
    demo1 = Mismatch(user1_id=demo.id, user2_id=owen.id)
    demo2 = Mismatch(user1_id=demo.id, user2_id=nic.id)
    demo3 = Mismatch(user1_id=demo.id, user2_id=alex.id)
    demo4 = Mismatch(user1_id=demo.id, user2_id=vince.id)
    demo51 = Mismatch(user1_id=demo5.id, user2_id=owen.id)
    demo52 = Mismatch(user1_id=demo5.id, user2_id=nic.id)
    demo53 = Mismatch(user1_id=demo5.id, user2_id=alex.id)
    demo54 = Mismatch(user1_id=demo5.id, user2_id=vince.id)
    
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
