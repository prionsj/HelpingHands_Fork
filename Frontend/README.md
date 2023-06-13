HelpingHands: Frontend
====================

Inhaltsverzeichnis
------------------

 1. [Kurzbeschreibung](#kurzbeschreibung)
 1. [Node.js-Kommandozeilenbefehle](#nodejs-kommandozeilenbefehle)


Kurzbeschreibung
----------------

Dies ist die webbasierte React-App mit dem Frontend der HelpingHands-App.
Es handelt sich dabei um eine  Webanwendung, die mit JavaScript und zusätzlich dem modernen Framework react realisiert wurde.


Node.js-Kommandozeilenbefehle
-----------------------------

Diese App nutzt Node.js und den esbuild-Bundler zur Verwaltung von Abhängigkeiten
(im Quellcode verwendete, externe Bibliothekten und Frameworks) sowie zum Bauen
einer deploybaren Version. Hierfür werden die folgenden Kommandozeilenbefehle
bereitgestellt:

 * `npm install` zur Installation aller benötigten Module
 * `npm update` zur Aktualisierung aller Abhängigkeiten
 * `npm start` zum Starten eines Entwicklungsservers auf Port 8080
 * `npm run build` zum Bauen der Anwendung für den Produktivbetrieb
 * `npm run clean` zum Löschen des Build-Verzeichnisses

Änderungen am Quellcode werden sofort aktiv. Es muss lediglich die Seite im
Browser neugeladen werden.

Die mit `npm run build` gebaute Anwendung wird im Verzeichnis `build` abgelegt
und kann von dort auf einen beliebigen Webserver hochgeladen werden. Insbesondere
`npm install` und `npm run build` werden daher im `Dockerfile` während dem Bauen
des Container Images ausgeführt. In der `../docker-compose.yml` werden
hingegen die Befehle `npm install` und `npm start` ausgeführt.




