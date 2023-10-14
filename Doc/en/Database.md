# Database

## Actors 
Facts about actors, their biography, etd.

| Field name       | Type | Description                 |
|------------|-----------|------------------------------|
| id         | INT       |                              |
| full_name  | TINYTEXT  |                              |
| bio        | TEXT      | Short biography of an actor. |
| birth_date | DATE      | YYYY-MM-DD                   |
| height_ft  | TINYINT   | Height in feet               |

## Users
User data.

| Field         | Type          | Description                                          |
| ------------- | ------------- | ---------------------------------------------------- |
| id            | INT           | Unique identifier for records                        |
| nickname      | TINYTEXT      | User's display name visible to others                |
| hashedPassword  | VARCHAR(60)   | Securely hashed password                             |
| email         | VARCHAR       | Unique identifier, used for login and notifications |

### Genre prefers related 


## Titles
| Field         | Type          | Description                                          |
| ------------- | ------------- | ---------------------------------------------------- |
| id            | INT           | Unique identifier for records                        |
| title      | TINYTEXT      | Titles name             |
| rating  | TINYINT   |                      |
| rating_quantity         | INT         |  |
| duration_mins | INT | Duration in minutes, in case of series, duration of average episode |
| release_date | DATE | YYYY-MM-DD |
| description | TEXT | Should not reveal valuable plot twists |
| HULU | TEXT | Link to title on HULU |
| NETFLIX | TEXT | Link to title on NETFLIX |
| MEGOGO | TEXT | Link to title on  MEGOGO |
| AMAZON | TEXT | Link to title on AMAZON |
| genre | | |

## Titles-to-approve
| Field         | Type          | Description                                          |
| ------------- | ------------- | ---------------------------------------------------- |
| id            | INT           | Unique identifier for records                        |
| title      | TINYTEXT      | Titles name             |
| asingee | INT | FOREING KEY, id field of moderator user |
| duration_mins | INT | Duration in minutes, in case of series, duration of average episode |
| release_date | DATE | YYYY-MM-DD |
| description | TEXT | Should not reveal valuable plot twists |
| HULU | TEXT | Link to title on HULU |
| NETFLIX | TEXT | Link to title on NETFLIX |
| MEGOGO | TEXT | Link to title on  MEGOGO |
| AMAZON | TEXT | Link to title on AMAZON |

