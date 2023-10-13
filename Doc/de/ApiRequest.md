# Requests

## GET

### Film
``` sh
  curl -d "https://api.ffrdb.ua/api/TOKEN/film/FILM_ID"
```
#### Example: 
``` sh
  curl -d "https://api.ffrdb.ua/api/c2356069e9d1e79ca924378153cfbbfb4d4416b1f99d41a2940bfdb66c5319db/film/2564"
``` 

### Series
``` sh
  curl -d "https://api.ffrdb.ua/api/TOKEN/series/FILM_ID"
```
#### Example: 
``` sh
  curl -d "https://api.ffrdb.ua/api/c2356069e9d1e79ca924378153cfbbfb4d4416b1f99d41a2940bfdb66c5319db/series/2564"
``` 

## POST
``` json
  { 
    "token": "c2356069e9d1e79ca924378153cfbbfb4d4416b1f99d41a2940bfdb66c5319db",
    "editor_user_id": 745,
    "page": {
      "film_name": "Back to the future",
      "cast": [{"name": }],
      "description": "A young guy went to 1960s after dr. Emmet Brown has been killed by terrorists. And then his mother falls in love with him. He has to bring her and his dad together to continue living, and also he has to get back in 1980s, but time machine has no fuel.\n",
      "watch_on": {
        "Megogo": null,
        "Netflix": "https://www.netflix.com/watch/60010110"   
      }
    } 
  }
```