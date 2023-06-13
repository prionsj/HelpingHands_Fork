HelpingHands: Backend
===================

Inhaltsverzeichnis
------------------

 1. [Kurzbeschreibung](#kurzbeschreibung)
 1. [Start mit Docker Compose](#start-mit-docker-compose)
 1. [Probleme unter Windows und iOS](#probleme-unter-windows-und-ios)
 1. [Node.js-Kommandozeilenbefehle](#nodejs-kommandozeilenbefehle)
 1. [Produktives Container Image bauen](#produktives-container-image-bauen)

Kurzbeschreibung
----------------

Dies ist der backendseitige Microservice für die Daten der Benutzer der HelpingHands-WebApp.
Es handelt sich um ein nodeJS-Projekt mit dem Webframework [Restify](http://restify.com/).
Die Schnittstelle des Webservices ist in der Datei `src/api/openapi.yaml`
beschrieben.

Start mit Docker Compose
------------------------

Am einfachsten lässt sich die HelpingHands-WebApp mit Docker Compose aus dem Wurzelverzeichnis
heraus starten. Das dort abgelegte README beschreibt die dafür notwendigen
Befehle im Detail:

 * `docker-compose -f docker-compose.yml up -d` zum Starten aller Dienste
 * `docker-compose -f docker-compose.yml down` zum Stoppen aller Dienste
 * `docker system prune` zum Aufräumen nicht mehr benötigter Dateien


Probleme unter Windows und iOS
-------------------------------

node_modules neu installieren
npm -g rm
npm install


Node.js-Kommandozeilenbefehle
-----------------------------

Dieser Service nutzt Node.js bzw. den Node Package Manager zur Verwaltung von
Abhängigkeiten (im Quellcode verwendete, externe Bibliothekten und Frameworks)
und seiner Ausführung. Hierfür stehen folgende Kommandozeilenbefehle zur
Verfügung:

 * `npm install` zur Installation aller benötigten Module
 * `npm update` zur Aktualisierung aller Abhängigkeiten
 * `npm start` zum Starten eines Entwicklungsservers auf Port 3000

Dank `nodemon` werden Änderungen am Quellcode werden sofort aktiv, indem der
Service automatisch neugestartet wird. Zusätzlich kann der Standardport 9230
zur Anbindung eines JavaScript-Debuggers verwendet werden.

`npm install` wird auch im `Dockerfile` während dem Bauen des Container Images
ausgeführt. In der `../docker-compose.yml` werden hingegen die Befehle
`npm install` und `npm start` ausgeführt.


Produktives Container-Image bauen
---------------------------------

Für den Produktivbetrieb konfiguriert das beigefügte `Dockerfile` eine produktive
Node.js-Laufzeitumgebung mit dem Quellcode des Backend-Services und allen seinen
Abhängigkeiten. Der Container kann somit direkt in eine produktive Systemlandschaft
überführt werden. Folgende Befehle werden hierfür benötigt:

 * `docker build -t helpinghands-backend .` zum Bauen des Containers
 * `docker run -d -p 3001:3001 --net helpinghands --name backend helpinghands-backend` zum Ausführen des Containers
 * `docker container stop backend` zum Stoppen des Containers
 * `docker system prune` zum Aufräumen nicht mehr benötigter Daten

Das `Dockerfile` wird auch verwendet, wenn im Wurzelverzeichnis mit Docker
Compose die Datei `docker-compose.prod.yml` ausgeführt wird. Der Container wird
im Grunde genommen damit auch auf die gleiche Art gestartet.
