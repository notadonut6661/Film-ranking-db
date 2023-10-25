@echo off
echo Request:
echo POST http://192.168.50.18:4054/FILM -H "Authorization: Basic govno:parasha " -H "Content-Type: application/json" -d @data/test_FILM.json
echo Response:
curl -X POST http://192.168.50.18:4054/approve -H "Authorization: Basic govno:parasha " -H "Content-Type: application/json" -d @data/test_FILM.json

pause