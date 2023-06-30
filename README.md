HelpingHands-WebApp
==============================

Inhaltsverzeichnis
------------------

 1. [Kurzbeschreibung](#kurzbeschreibung)
 1. [Start mit Docker Compose](#start-mit-docker-compose)
 1. [Probleme unter Windows und iOS](#probleme-unter-windows-und-ios)
 1. [Unit Tests im Backend und Frontend](#unit-tests-im-backend-und-frontend)
 1. [UI Tests im Frontend](#ui-tests-im-frontend)

Kurzbeschreibung
----------------

Bei dieser Anwendung handelt es sich um eine HelpingHands-WebApp.
Hier wird eine WebApp zur Verwaltung von Hilfsanzeigen, Abgebots- und Benutzer-Datensätzen implementiert, die folgende Entitäten beinhaltet:

  1. Hilfsanzeigen:
        Eine Auflistung aller erstellten Hilfsanzeigen in der HelpingHands-App. Es können neue Hilfsanzeigen erstellt, vorhandene bearbeitet und gelöscht werden.
  2. Angebote:
        Möglichkeit, auf bestimmte Hilfsanzeigen zu reagieren und eigene Hilfe anzubieten. Diese können dann in der Angebotliste eingesehen werden.
  3. Benutzer:
        Möglichkeit, einen Benutzer zu registrieren (erstellen) und sich mit diesem einzuloggen. Eigene Benutzer können bearbeitet oder gelöscht werden.

Diese Version beinhaltet neben der React-App-Benutzeroberfläche zwei Microservices. Einer zur Verwaltung von Hilfsanzeigen und Angeboten, sowie einem Weiteren für die Verwaltung der Benutzerdaten, mit jeweils eigener MongoDB-Datenbankinstanz. 
Die Struktur des Quellcodes folgt modernen Best-Practices wie der Nutzung von npm zur Verwaltung von Abhängigkeiten und der Nutzung eines Bundlers, um diese dem Browser zugänglich zu machen.

Mit Docker und Docker-Compose können die Bestandteile der App einzeln oder als Gesamtprojekt ausgeführt werden. Mit npm start wird die React-App gestartet.


Start mit Docker Compose
------------------------

Das Wurzelverzeichnis beinhaltet zwei Docker-Compose-Files, mit denen die Anwendung im Entwicklungs- oder Produktivmodus gestartet werden kann:

 * `docker-compose.yml`: Entwicklungsmodus mit folgenden Diensten:

     1. MongoDB-Hilfsanzeigen (mongodb://localhost:27017)
     2. MongoGUI-Hilfsanzeigen (erreichbar auf http://localhost:8081)
     3. Backend-Hilfsanzeigen (erreichbar auf http://localhost:3000)
     4. MongoDB-Benutzer (mongodb://localhost:27016)
     5. MongoGUI-Benutzer (erreichbar auf http://localhost:8082)
     6. Backend-Benutzer (erreichbar auf http://localhost:3001)
     7. Frontend (erreichbar auf http://localhost:8080)

 Das Backend führt den lokalen Quellcode in einer einfachen Node.js-Laufzeitumgebung aus. Änderungen werden dadurch sofort aktiv, wobei sich das Backend bei einer Änderung automatisch neustartet. 
 Das Frontend wurde als Webanwendung, mit JavaScript und zusätzlich dem modernen Framework React realisiert.

 * `docker-compose.prod.yml`: Produktivmodus mit denselben Diensten wie im Entwicklungsmodus.

Im Unterschied zum Entwicklungsmodus werden hier anhand der in den jeweiligen Verzeichnissen abgelegten Datei `Dockerfile` eigenständige Container Images für Frontend und Backend gebaut und ausgeführt. 
Der Quellcode wird hierfür einmalig in die Images hinein kopiert, sodass Änderungen erst wirksam werden, wenn die Images neu erstellt werden. 
Dies kann entweder in den jeweiligen Verzeichnissen manuell oder durch Neustarten von Docker-Compose erreicht werden.

Architektur:

```mermaid
graph LR
    E(Externe Aufrufer) --> F[Frontend];
    F[Frontend] --> BH[BackenHilfsanzeigen];
    F[Frontend] --> BB[BackendBenutzer];
    BH[BackendHilfsanzeigen] --> M1[MongoDB];
    BB[BackendBenutzer] --> M2[MongoDB];
```

Das Vorgehen zum Starten und Stoppen der Anwendung ist für beide Modi gleich. Lediglich der Dateiname muss in den folgenden Befehlen angepasst werden:

 * `docker-compose -f docker-compose.yml up -d` zum Starten aller Dienste
 * `docker-compose -f docker-compose.yml down` zum Stoppen aller Dienste
 * `docker system prune` zum Aufräumen nicht mehr benötigter Dateien

Im Falle der Produktivversion werden die Container für Frontend und Backend von Docker Compose nur einmalig gebaut, dann aber nicht mehr erneut gebaut, wenn sich der zugrunde liegende Quellcode verändert. 
Bei Änderungenen müssen sie daher vor der nächsten Ausführung mit folgendem Befehl neu gebaut werden: 

```sh
docker-compose -f docker-compose.prod.yml build
```

In der Produktivversion kann durch Setzen der Umgebungsvariable API_URL die Adresse des Backendservices definiert werden, mit der sich das Frontend zu
verbinden versucht:

```sh
export API_URL=http://api.beispiel.de
docker-compose -f docker-compose.prod.yml up -d
```

Dies funktioniert, indem die Umgebungsvariable in der `docker-compose.prod.yml` an die gleichnamige Umgebungsvariable des Frontend-Containers übergeben 
und bei dessen Start durch ein Startskript ausgewertet wird. Das Skript schreibt den Inhalt in eine statische Datei, die das Frontend unter der Addresse `api.url` abrufen kann. 
Der Mechanismus ist im Grunde genommen derselbe, wie Docker ihn für "Secrets" und "Configs" bereitstellt. Auch diese werden einfach über eine Datei im Container sichtar gemacht. 
Leider bietet Docker diese Funktion aber nur in Zusammenhang mit Docker Swarm an. Zwar lässt sich die App unverändert auch mit Docker Swarm ausführen, dies wird hier allerdings
absichtlicht nicht beschrieben, da es auf Docker Compose aufbaut und Docker Compose davon abgesehen für dieses Projekt zunächst ausreicht.


Probleme unter Windows und iOS
-------------------------------

Sollten es Probleme mit node.js geben, müssen die node_modules in allen Verzeichnissen (Wurzelverzeichnis, BackendBenutzer, BackendHilfsanzeigen, Frontend, helpinghandsapp) neu installiert werden. ZUerst muss zur Deinstallation `npm -g rm` in allen Verzeichnissen ausgeführt werden, sowie die package.json und node-modules-ordner gelöscht werden. Mit `npm install` in allen Verzeichnissen können dann alle node-modules neu installiert werden.


Unit Tests im Backend und Frontend
----------------------------------

Um die Unit Tests im Backend der Hilfanzeigen und im Frontend auszuführen, muss entweder seperat im Verzeichnis BackendHilfsanzeigen sowie im Verzeichnis helpinghandsapp oder gemeinsam im Wurzelverzeichnis `npm test` ausgeführt werden. In der Konsole werden die Ergebnisse der Tests angezeigt. Die Unit Tests wurden mit dem Framework Jest erstellt (mehr Informationen: siehe Architekturdokumentation). Installiert wird Jest mit dem Befehl `npm install jest` im Verzeichnis helpinghandsapp, Frontend, BackendHilfsanzeigen und im Wurzelverzeichnis.


UI Tests im Frontend
--------------------

Um die UI Tests im Frontend auszuführen, siehe README.md im helpinghandsapp-Verzeichnis (unter Frontend/helpingshandsapp).