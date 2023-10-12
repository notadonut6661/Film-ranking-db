# Database

## Actors 
Facts about actors, their biography, etd.

| Name       | Data type | Description                  |
|------------|-----------|------------------------------|
| id         | INT       |                              |
| full_name  | TINYTEXT  |                              |
| bio        | TEXT      | Short biography of an actor. |
| birth_date | DATE      | YYYY-MM-DD                   |
| height_ft  | TINYINT   |                              |
|            |           |                              |

## Users
User data.

- id INT
- nickname TINYTEXT, name that will show to others
- passwordHash VARCHAR(60)
- email, unique identifier, real email adress, used for loging in and to send useful notifications

### Genre prefers related 
