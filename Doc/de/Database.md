# Database

## Actors 
Fakten über Schauspielers, ihre biografie.

| Field name       | Type | Description                 |
|------------|-----------|------------------------------|
| id         | INT       |                              |
| full_name  | TINYTEXT  |                              |
| bio        | TEXT      | Kurzbiografie eines Schauspielers|
| birth_date | DATE      | YYYY-MM-DD                   |
| height_ft  | TINYINT   | Höhe in Fuß             |

## Users
| Field         | Type          | Description                                          |
| ------------- | ------------- | ---------------------------------------------------- |
| id            | INT           |                     |
| nickname      | TINYTEXT      | Der Anzeigename des Benutzers ist für andere sichtbar            |
| hashedPassword  | VARCHAR(60) | Gehasht  Passwort                           |
| email         | VARCHAR       | Für Anmeldung und Benachrichtigungen |

### Genre prefers related 


