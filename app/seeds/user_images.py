from app.models import db, UserImage, environment, SCHEMA


def seed_user_images():
    user1 = UserImage(
        user_id=1, image_url="https://xsgames.co/randomusers/assets/avatars/male/1.jpg")
    user2 = UserImage(
        user_id=2, image_url="https://xsgames.co/randomusers/assets/avatars/male/2.jpg")
    user3 = UserImage(
        user_id=3, image_url="https://xsgames.co/randomusers/assets/avatars/male/3.jpg")
    user4 = UserImage(
        user_id=4, image_url="https://xsgames.co/randomusers/assets/avatars/female/1.jpg")
    user5 = UserImage(
        user_id=5, image_url="https://xsgames.co/randomusers/assets/avatars/female/2.jpg")
    user6 = UserImage(
        user_id=6, image_url="https://xsgames.co/randomusers/assets/avatars/female/3.jpg")
    user7 = UserImage(
        user_id=7, image_url="https://xsgames.co/randomusers/assets/avatars/female/4.jpg")
    user8 = UserImage(
        user_id=8, image_url="https://xsgames.co/randomusers/assets/avatars/female/5.jpg")
    user9 = UserImage(
        user_id=9, image_url="https://xsgames.co/randomusers/assets/avatars/male/4.jpg")
    user10 = UserImage(
        user_id=10, image_url="https://xsgames.co/randomusers/assets/avatars/male/5.jpg")
    user11 = UserImage(
        user_id=11, image_url="https://xsgames.co/randomusers/assets/avatars/male/6.jpg")
    user12 = UserImage(
        user_id=12, image_url="https://xsgames.co/randomusers/assets/avatars/male/7.jpg")
    user13 = UserImage(
        user_id=13, image_url="https://xsgames.co/randomusers/assets/avatars/female/6.jpg")
    user14 = UserImage(
        user_id=14, image_url="https://xsgames.co/randomusers/assets/avatars/female/7.jpg")
    user15 = UserImage(
        user_id=15, image_url="https://xsgames.co/randomusers/assets/avatars/female/8.jpg")
    user16 = UserImage(
        user_id=16, image_url="https://xsgames.co/randomusers/assets/avatars/female/9.jpg")
    user17 = UserImage(
        user_id=17, image_url="https://xsgames.co/randomusers/assets/avatars/female/10.jpg")
    user18 = UserImage(
        user_id=18, image_url="https://xsgames.co/randomusers/assets/avatars/male/8.jpg")
    user19 = UserImage(
        user_id=19, image_url="https://xsgames.co/randomusers/assets/avatars/male/9.jpg")
    user20 = UserImage(
        user_id=20, image_url="https://xsgames.co/randomusers/assets/avatars/male/10.jpg")

    user_images = [user1, user2, user3, user4, user5, user6, user7, user8, user9, user10,
                   user11, user12, user13, user14, user15, user16, user17, user18, user19, user20]

    [db.session.add(image) for image in user_images]
    db.session.commit()


def undo_user_images():
    if environment == "production":
        db.session.execute(
            f"TRUNCATE table {SCHEMA}.user_images RESTART IDENTITY CASCADE;")
    else:
        db.session.execute("DELETE FROM user_images")

    db.session.commit()
