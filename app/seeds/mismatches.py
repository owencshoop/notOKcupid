from app.models import db, Mismatch, environment, SCHEMA


def seed_mismatches():
    mismatch1 = Mismatch(user1_id=1, user2_id=11)
    mismatch2 = Mismatch(user1_id=1, user2_id=10)
    mismatch3 = Mismatch(user1_id=1, user2_id=2)
    mismatch4 = Mismatch(user1_id=1, user2_id=3)
    mismatch5 = Mismatch(user1_id=4, user2_id=11)
    mismatch6 = Mismatch(user1_id=4, user2_id=7)
    mismatch7 = Mismatch(user1_id=4, user2_id=5)
    mismatch8 = Mismatch(user1_id=4, user2_id=6)

    mismatches = [mismatch1, mismatch2, mismatch3, mismatch4,
                  mismatch5, mismatch6, mismatch7, mismatch8]
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
