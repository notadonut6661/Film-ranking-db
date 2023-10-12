# Database

## Actors 
Facts about actors, their biography, etd.

| Field name       | Type | Description                 |
|------------|-----------|------------------------------|
| id         | INT       |                              |
| full_name  | TINYTEXT  |                              |
| bio        | TEXT      | Short biography of an actor. |
| birth_date | DATE      | YYYY-MM-DD                   |
| height_ft  | TINYINT   |                              |

## Users
User data.

| Field         | Type          | Description                                          |
| ------------- | ------------- | ---------------------------------------------------- |
| id            | INT           | Unique identifier for records                        |
| nickname      | TINYTEXT      | User's display name visible to others                |
| passwordHash  | VARCHAR(60)   | Securely hashed password                             |
| email         | VARCHAR       | Unique identifier, real email address, used for login and notifications |

### Genre prefers related 


