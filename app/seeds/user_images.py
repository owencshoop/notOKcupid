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
    user21 = UserImage(
        user_id=21, image_url="https://xsgames.co/randomusers/assets/avatars/male/11.jpg")
    user22 = UserImage(
        user_id=22, image_url="https://xsgames.co/randomusers/assets/avatars/female/11.jpg")
    user23 = UserImage(
        user_id=23, image_url="https://xsgames.co/randomusers/assets/avatars/male/12.jpg")
    user24 = UserImage(
        user_id=24, image_url="https://xsgames.co/randomusers/assets/avatars/female/12.jpg")
    user25 = UserImage(
        user_id=25, image_url="https://xsgames.co/randomusers/assets/avatars/male/13.jpg")
    user26 = UserImage(
        user_id=26, image_url="https://xsgames.co/randomusers/assets/avatars/female/13.jpg")
    user27 = UserImage(
        user_id=27, image_url="https://xsgames.co/randomusers/assets/avatars/male/14.jpg")
    user28 = UserImage(
        user_id=28, image_url="https://xsgames.co/randomusers/assets/avatars/female/14.jpg")
    user29 = UserImage(
        user_id=29, image_url="https://xsgames.co/randomusers/assets/avatars/male/15.jpg")
    user30 = UserImage(
        user_id=30, image_url="https://xsgames.co/randomusers/assets/avatars/female/15.jpg")
    user31 = UserImage(
        user_id=31, image_url="https://xsgames.co/randomusers/assets/avatars/male/16.jpg")
    user32 = UserImage(
        user_id=32, image_url="https://xsgames.co/randomusers/assets/avatars/female/16.jpg")
    user33 = UserImage(
        user_id=33, image_url="https://xsgames.co/randomusers/assets/avatars/male/17.jpg")
    user34 = UserImage(
        user_id=34, image_url="https://xsgames.co/randomusers/assets/avatars/female/17.jpg")
    user35 = UserImage(
        user_id=35, image_url="https://xsgames.co/randomusers/assets/avatars/male/18.jpg")
    user36 = UserImage(
        user_id=36, image_url="https://xsgames.co/randomusers/assets/avatars/female/18.jpg")
    user37 = UserImage(
        user_id=37, image_url="https://xsgames.co/randomusers/assets/avatars/male/20.jpg")
    user38 = UserImage(
        user_id=38, image_url="https://xsgames.co/randomusers/assets/avatars/female/20.jpg")
    user39 = UserImage(
        user_id=39, image_url="https://xsgames.co/randomusers/assets/avatars/male/21.jpg")
    user40 = UserImage(
        user_id=40, image_url="https://xsgames.co/randomusers/assets/avatars/female/21.jpg")
    user41 = UserImage(
        user_id=41, image_url="https://xsgames.co/randomusers/assets/avatars/male/22.jpg")
    user42 = UserImage(
        user_id=42, image_url="https://xsgames.co/randomusers/assets/avatars/female/22.jpg")
    user43 = UserImage(
        user_id=43, image_url="https://xsgames.co/randomusers/assets/avatars/male/23.jpg")
    user44 = UserImage(
        user_id=44, image_url="https://xsgames.co/randomusers/assets/avatars/female/23.jpg")
    user45 = UserImage(
        user_id=45, image_url="https://xsgames.co/randomusers/assets/avatars/male/24.jpg")
    user46 = UserImage(
        user_id=46, image_url="https://xsgames.co/randomusers/assets/avatars/female/24.jpg")
    user47 = UserImage(
        user_id=47, image_url="https://xsgames.co/randomusers/assets/avatars/male/25.jpg")
    user48 = UserImage(
        user_id=48, image_url="https://xsgames.co/randomusers/assets/avatars/female/25.jpg")
    owenImage = UserImage(
        user_id=49, image_url='https://angel.co/cdn-cgi/image/width=200,height=200,format=auto,fit=cover/https://photos.angel.co/users/15919597-original?1675895184'
    )
    nicImage = UserImage(
        user_id=50, image_url='https://angel.co/cdn-cgi/image/width=400,height=400,format=auto,fit=cover/https://photos.angel.co/users/15919158-original?1675893838'
    )
    alexImage = UserImage(
        user_id=51, image_url='https://angel.co/cdn-cgi/image/width=200,height=200,format=auto,fit=cover/https://photos.angel.co/users/15929702-original?1676040171'
    )
    vinceImage = UserImage(
        user_id=52, image_url='https://photos.angel.co/users/14618929-medium_jpg?1675879562'
    )

    user_images = [user1, user2, user3, user4, user5, user6, user7, user8, user9, user10,
                   user11, user12, user13, user14, user15, user16, user17, user18, user19, user20, user21, user22, user23, user24, user25, user26, user27, user28, user29, user30, user31, user32, user33, user34, user35, user36, user37, user38, user39, user40, user41, user42, user43, user44, user45, user46, user47, user48, owenImage, nicImage, alexImage, vinceImage]

    [db.session.add(image) for image in user_images]
    db.session.commit()


def undo_user_images():
    if environment == "production":
        db.session.execute(
            f"TRUNCATE table {SCHEMA}.user_images RESTART IDENTITY CASCADE;")
    else:
        db.session.execute("DELETE FROM user_images")

    db.session.commit()
