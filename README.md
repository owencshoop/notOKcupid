# notOKcupid

## Our project name is notOKcupid
Here is the link! [notOKcupid](https://not-ok-cupid.onrender.com/)

Our site is a clone of the [OkCupid](https://www.okcupid.com/) site. [notOKcupid](https://not-ok-cupid.onrender.com/) can be used create a user, view current users,
message mismatches(people who you have disliked and have also disliked you back), answer some cheeky personality questions, and just enjoy yourself while browsing the page.

## Form usage:
Forms are all handled as modals and they are seemingly larger than life. For the preview image portions available a web image url works just fine.

## Tech Stack utilized:
- Javascript
- Node.js
- Flask.js
- React
- Redux
- SQLalchemy
- Python 3
- Alembic
- JSX
- SQLite3
- Html/CSS

### Database:
[Postgres](https://www.postgresql.org/)

## Wiki Links:
- [API endpoints](https://github.com/owencshoop/notOKcupid/wiki/API-Routes)
- [Redux Store Shape](https://github.com/owencshoop/notOKcupid/wiki/notOKcupid-Redux-Store-Shape)
- [Frontend endpoints and current features](https://github.com/owencshoop/notOKcupid/wiki/MVP-Feature-List)
- [DB schema with relationships](https://github.com/owencshoop/notOKcupid/wiki/DB-Schema)
- [User Stories](https://github.com/owencshoop/notOKcupid/wiki/User-Stories)

## Hosting:
[Render](https://render.com/)

## Landing Page:
You can Sign up, login, or even take a gander at the currently available singles. Maybe you'll find someone you like, or if you're really lucky, someone you dislike. If you would just like to peruse, there is a demo user login.
<img width="1200" alt="image" src="https://user-images.githubusercontent.com/110574773/213533004-3ef491c9-15ff-4cb1-9cf5-dc18b76f090e.png">

## Running the app locally:

1. Clone this repository

2. Install dependencies

      ```bash
      pipenv install -r requirements.txt
      ```

3. Create a **.env** file based on the example with proper settings for your
   development environment

4. Make sure the SQLite3 database connection URL is in the **.env** file

5. This starter organizes all tables inside the `flask_schema` schema, defined
   by the `SCHEMA` environment variable.  Replace the value for
   `SCHEMA` with a unique name, **making sure you use the snake_case
   convention**.

6. Get into your pipenv, migrate your database, seed your database, and run your Flask app

   ```bash
   pipenv shell
   ```

   ```bash
   flask db upgrade
   ```

   ```bash
   flask seed all
   ```

   ```bash
   flask run
   ```

7. To run the React App in development, in a different terminal, cd inside the `react-app` directory and type npm start.

## Contact us:
Owen Shoop
- [LinkedIn](https://www.linkedin.com/in/owen-shoop-62ba36231/)
- [Github](https://github.com/owencshoop)

Alex Vance
- [LinkedIn](https://www.linkedin.com/in/alex-vance-503537234/)
- [Github](https://github.com/alexvance9)

Vince Viet
- [LinkedIn](https://www.linkedin.com/in/vincent-viet-72349272/)
- [Github](https://github.com/vinceviet)

Nicholas Talbot
- [LinkedIn](https://www.linkedin.com/in/nicholas-talbot-5441a4242/)
- [Github](https://github.com/nicisherenow)
