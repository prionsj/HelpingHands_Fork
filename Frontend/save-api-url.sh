#! /bin/sh

# Kleines Skript zum Übernehmen der Backend-URL beim Start des Containers.
# Wurde die URL über die Umgebungsvariable API_URL mitgegeben, wird sie in
# die Datei /usr/share/nginx/html/api.url geschrieben, damit sie von der
# Frontend-App mit einem fetch()-Aufruf abgerufen werden kann.

if [ -n $API_URL1 ]; then
    echo ">>>> Benutze API-URL 1: $API_URL1"
    echo $API_URL1 > /usr/share/nginx/html/api1.url
fi
if [ -n $API_URL2 ]; then
    echo ">>>> Benutze API-URL 2: $API_URL2"
    echo $API_URL2 > /usr/share/nginx/html/api2.url
fi
