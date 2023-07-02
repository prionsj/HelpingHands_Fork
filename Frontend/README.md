Helping Hands: Frontend
====================

Inhaltsverzeichnis
------------------

 1. [Kurzbeschreibung](#kurzbeschreibung)
 1. [Node.js-Kommandozeilenbefehle](#nodejs-kommandozeilenbefehle)
 1. [Probleme unter Windows und iOS](#probleme-unter-windows-und-ios)


Kurzbeschreibung
----------------

Das Frontend-Verzeichnis dient der Übersichtlichkeit und ist das hierarchisch übergeordnete Verzeichnis der helpinghandsapp, eine mit dem Framework React erstellte, webbasierte Applikation.


Node.js-Kommandozeilenbefehle
-----------------------------

Diese App nutzt Node.js und den esbuild-Bundler zur Verwaltung von Abhängigkeiten
(im Quellcode verwendete, externe Bibliothekten und Frameworks) sowie zum Bauen
einer deploybaren Version. Hierfür werden die folgenden Kommandozeilenbefehle
bereitgestellt:

 * `npm install` zur Installation aller benötigten Module
 * `npm update` zur Aktualisierung aller Abhängigkeiten


Probleme unter Windows und iOS
-------------------------------

Sollten es Probleme mit node.js geben, müssen die node_modules in allen Verzeichnissen (Wurzelverzeichnis, BackendBenutzer, BackendHilfsanzeigen, Frontend, helpinghandsapp) neu installiert werden. ZUerst muss zur Deinstallation `npm -g rm` in allen Verzeichnissen ausgeführt werden, sowie die package.json und node-modules-ordner gelöscht werden. Mit `npm install` in allen Verzeichnissen können dann alle node-modules neu installiert werden.

