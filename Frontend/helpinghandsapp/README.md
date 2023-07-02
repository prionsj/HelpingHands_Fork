Helping Hands: helpinghandsapp mit React
====================

Inhaltsverzeichnis
------------------

1. [Kurzbeschreibung](#kurzbeschreibung)
1. [Responsive Helping Hands](#responsive-helping-hands)
1. [Node.js-Kommandozeilenbefehle](#nodejs-kommandozeilenbefehle)
1. [Probleme unter Windows und iOS](#probleme-unter-windows-und-ios)
1. [Unit Tests im Frontend](#unit-tests-im-frontend)
1. [UI Tests im Frontend](#ui-tests-im-frontend)


Kurzbeschreibung
----------------

Dies ist die webbasierte React-App mit dem Frontend der Helping Hands WebApp.
Es handelt sich dabei um eine  Webanwendung, die mit JavaScript und zusätzlich dem modernen Framework react realisiert wurde.

Dieses Projekt wurde mit [Create React App](https://github.com/facebook/create-react-app) gebootstrapped.


Responsive Helping Hands
------------------------

Die Helping Hands App soll zukünftig responsive sein. Aktuell ist dieses MVP allerdings nur auf die Bildschirmgröße 375x790 optimiert. Die Entwickler bitten um Verständnis sowie darum, dies zu beachten und die App möglichst in dieser optimierten Größe zu verwenden, um verschobene oder verdeckte Elemente in der App zu vermeiden. Empfohlen wird, der Browser Chrome zu verwenden.


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