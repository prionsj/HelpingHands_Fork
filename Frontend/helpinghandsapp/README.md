HelpingHands: helpinghandsapp
====================

Inhaltsverzeichnis
------------------

1. [Kurzbeschreibung](#kurzbeschreibung)
1. [Responsive HelpingHands](#responsive-helpinghands)
1. [Node.js-Kommandozeilenbefehle](#nodejs-kommandozeilenbefehle)
1. [Probleme unter Windows und iOS](#probleme-unter-windows-und-ios)
1. [Unit Tests im Frontend](#unit-tests-im-frontend)
1. [UI Tests im Frontend](#ui-tests-im-frontend)
1. [Verfügbare Skripte](#verfügbare-skripte)
Kurzbeschreibung
----------------

Dies ist die webbasierte React-App mit dem Frontend der HelpingHands-App.
Es handelt sich dabei um eine  Webanwendung, die mit JavaScript und zusätzlich dem modernen Framework react realisiert wurde.

Dieses Projekt wurde mit [Create React App](https://github.com/facebook/create-react-app) gebootstrapped.


Responsive HelpingHands
----------------

Die HelpingHands-React App soll zukünftig responsive sein. Aktuell ist dieses MVP allerdings nur auf die Bildschirmgröße 375x790 optimiert. Die Entwickler bitten um Verständnis sowie darum, dies zu beachten und die App möglichst in dieser optimierten Größe zu verwenden, um verschobene oder verdeckte Elemente in der App zu vermeiden.


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


Probleme unter Windows und iOS
-------------------------------

Sollten es Probleme mit node.js geben, müssen die node_modules in allen Verzeichnissen (Wurzelverzeichnis, BackendBenutzer, BackendHilfsanzeigen, Frontend, helpinghandsapp) neu installiert werden. ZUerst muss zur Deinstallation `npm -g rm` in allen Verzeichnissen ausgeführt werden, sowie die package.json und node-modules-ordner gelöscht werden. Mit `npm install` in allen Verzeichnissen können dann alle node-modules neu installiert werden.


Unit Tests im Frontend
----------------------

Um die Unit Tests im Frontend auszuführen, muss im Verzeichnis helpinghandsapp oder im Wurzelverzeichnis (für alle Unit Tests, auch im Backend) `npm test` ausgeführt werden. In der Konsole werden die Ergebnisse der Tests angezeigt. Die Unit Tests wurden mit dem Framework Jest erstellt (mehr Informationen: siehe Architekturdokumentation). Installiert wird Jest mit dem Befehl `npm install jest` im Verzeichnis helpinghandsapp, Frontend, BackendHilfsanzeigen und im Wurzelverzeichnis.


UI Tests im Frontend
--------------------

Um die UI Tests im Frontend auszuführen, muss im Verzeichnis helpinghandsapp eines der folgenden Befehle ausgeführt werden:

 * `npx cypress open` öffnet die Benutzeroberfläche von Cypress. Nach der Auswahl des component-Tests und dem favorisierten Browser können die einzelnen UI-Tests einzelnd getestet werden.
 * `npx cypress open --component --browser ***` ohne die Verwendung der Cypress Benutzeroberfläche. Der favorisierte Browser ersetzt '***'. In diesem die einzelnen UI-Tests einzelnd getestet werden. Der Befehl würde für Chrome so aussehen: `npx cypress open --component --browser chrome`.
 * `npx cypress run --component` zum starten aller UI Tests. In der Konsole werden die Ergebnisse der Tests angezeigt. 

Die UI Tests wurden mit dem Framework Cypress erstellt (mehr Informationen: siehe Architekturdokumentation). Installiert wird Cypress mit dem Befehl `npm install cypress` im Verzeichnis helpinghandsapp.


Verfügbare Skripte
------------------

Im Projektverzeichnis können folgende Kommandozeilenbefehle ausgeführt werden:

* `npm start` zum Starten der Anwendung im Entwicklungsmodus
        Für die Anzeige im Browser [http://localhost:8080](http://localhost:8080) öffnen.
        Bei Änderungen wird die Seite neugeladen und Lint-Fehler können in der Konsole eingesehen werden.

* `npm test` zum Starten eines Test-Runners im interativen Überwachungsmodus
        Weitere Informationen können im Abschnitt [running tests](https://facebook.github.io/create-react-app/docs/running-tests) gefunden werden.

* `npm run build` zum Bauen der Anwendung für den Produktivbetrieb in den `build` Ordner
        Es bündelt React korrekt im Produktionsmodus und optimiert den build für die beste Leistung.
        Die Dateinamen enthalten die Hashes und der build ist minimiert. Die App ist bereit für das Deployment!
        Weitere Informationen können im Abschnitt [deployment](https://facebook.github.io/create-react-app/docs/deployment) gefunden werden.

Hinweis: Dies ist ein einseitiger Vorgang. Sobald Sie "eject", können Sie nicht mehr zurückgehen!
* `npm run eject` zum entfernen einzelner Build-Abhängigkeiten
        Im Fall einer Unzufriedenheit der Wahl des Build-Tools und der Konfiguration, kann diese jederzeit entfernt werden.

Stattdessen werden alle Konfigurationsdateien und die transitiven Abhängigkeiten (webpack, Babel, ESLint, etc.) direkt in Ihr Projekt kopiert, so dass Sie die volle Kontrolle über sie haben. Alle Befehle mit Ausnahme von "eject" funktionieren weiterhin, aber sie verweisen auf die kopierten Skripte, so dass Sie sie anpassen können. An diesem Punkt sind Sie auf sich allein gestellt.

Sie müssen `eject` nicht verwenden. Der kuratierte Funktionssatz ist für kleine und mittlere Einsätze geeignet, und Sie sollten sich nicht verpflichtet fühlen, diese Funktion zu nutzen. Wir verstehen jedoch, dass dieses Werkzeug nicht nützlich wäre, wenn Sie es nicht anpassen könnten, wenn Sie dazu bereit sind.
