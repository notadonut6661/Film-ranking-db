# Database

## Actors 
Facts about actors, their biography, etd.

- id INT
- full_name TINYTEXT
- bio TEXT
- birth_date DATE
- profile_picture TEXT, path to
- height_ft INT
- 
## Users
User data.

- id INT
- nickname TINYTEXT, name that will show to others
- passwordHash VARCHAR(60)
- email, unique identifier, real email adress, used for loging in and to send useful notifications

### Genre prefers related 
