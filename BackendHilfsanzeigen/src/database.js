"use strict"

import { MongoClient } from "mongodb";

/**
 * Singleton-Klasse zum Zugriff auf das MongoDB-Datenbankobjekt, ohne dieses
 * ständig als Methodenparameter durchreichen zu müssen. Stattdessen kann
 * einfach das Singleton-Objekt dieser Klasse importiert und das Attribut
 * `mongodb` oder `database` ausgelesen werden.
 */

class DatabaseFactory {

    /**
     * Ersatz für den Konstruktor, damit aus dem Hauptprogramm heraus die
     * Verbindungs-URL der MongoDB übergeben werden kann. Hier wird dann
     * die Verbindung hergestellt.
     *
     * @param {String} connectionUrl URL-String mit den Verbindungsdaten
     */

    async init(connectionUrl) {

        // Datenbankverbindung herstellen
        this.client = new MongoClient(connectionUrl);
        await this.client.connect();
        this.database = this.client.db("helpinghands");

        await this._createDemoData();
    }

    /**
     * Hilfsmethode zum Anlegen von Demodaten.
     */

    async _createDemoData() {

        //Demodaten von Hilfsanzeigen
        let hilfsanzeige = this.database.collection("hilfsanzeige");
        if (await hilfsanzeige.estimatedDocumentCount() === 0) {
            hilfsanzeige.insertMany([
                {
                    titel: "Rasenmähen",
                    beschreibung: "Mein Rasen muss gemäht werden. Bitte um Hilfe!",
                    kategorie: "Garten",
                    zeitraum: "31.05.2023",
                    standort:"Karlsruhe",
                    nutzername: "peter.k"
                },
                {
                    titel: "Regal aufbauen",
                    beschreibung: "Ich brauche einen Handwerker. Bitte um Hilfe!",
                    kategorie: "Möbel",
                    zeitraum: "29.05.2023",
                    standort:"Landau",
                    nutzername: "hans.m"
                },
            ]);
        }

    }

}

export default new DatabaseFactory();
