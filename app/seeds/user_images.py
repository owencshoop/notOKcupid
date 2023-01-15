from app.models import db, UserImage, environment, SCHEMA


def seed_user_images():
    user1 = UserImage(
        user_id=1, image_url="https://xsgames.co/randomusers/assets/avatars/male/1.jpg")
    user2 = UserImage(
        user_id=1, image_url="https://xsgames.co/randomusers/assets/avatars/male/2.jpg")
    user3 = UserImage(
        user_id=1, image_url="https://xsgames.co/randomusers/assets/avatars/male/3.jpg")
    user4 = UserImage(
        user_id=1, image_url="https://xsgames.co/randomusers/assets/avatars/female/1.jpg")
    user5 = UserImage(
        user_id=1, image_url="https://xsgames.co/randomusers/assets/avatars/female/2.jpg")

    user_images = [user1, user2, user3, user4, user5]

    [db.session.add(image) for image in user_images]
    db.session.commit()


def undo_user_images():
    if environment == "production":
        db.session.execute(
            f"TRUNCATE table {SCHEMA}.users RESTART IDENTITY CASCADE;")
    else:
        db.session.execute("DELETE FROM users")

    db.session.commit()
