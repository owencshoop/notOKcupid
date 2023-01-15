from app.models import db, Mismatch, environment, SCHEMA


def seed_mismatches():
    mismatch1 = Mismatch(user1_id=11, user2_id=10)
    mismatch2 = Mismatch(user1_id=11, user2_id=4)
    mismatch3 = Mismatch(user1_id=11, user2_id=2)
    mismatch4 = Mismatch(user1_id=11, user2_id=9)
    mismatch5 = Mismatch(user1_id=20, user2_id=10)
    mismatch6 = Mismatch(user1_id=20, user2_id=19)
    mismatch7 = Mismatch(user1_id=20, user2_id=18)
    mismatch8 = Mismatch(user1_id=20, user2_id=16)

    mismatches = [mismatch1, mismatch2, mismatch3, mismatch4,
                  mismatch5, mismatch6, mismatch7, mismatch8]
    [db.session.add(mismatch) for mismatch in mismatches]
    db.session.commit()


def undo_mismatches():
    if environment == "production":
        db.session.execute(
            f"TRUNCATE table {SCHEMA}.users RESTART IDENTITY CASCADE;")
    else:
        db.session.execute("DELETE FROM users")

    db.session.commit()
