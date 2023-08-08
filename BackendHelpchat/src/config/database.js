"use strict"

import { MongoClient } from "mongodb";

import config from "./config.js"

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
        this.database = this.client.db(config.mongo.name);

        await this._createDemoData();
    }

        async _createDemoData() {
            //Demodaten von Help-Chats
            let helpchat = this.database.collection("Help-Chat");
            if (await helpchat.estimatedDocumentCount() === 0) {
                await helpchat.insertMany([
                    {
                        helpentry: "helpentryId",
                        userHelpentry: "elrond",
                        userResponder: "frodo",
                        title: "Chat - Ring wegbringen",
                        messages: [{
                            timestamp: "2023-06-30T23:59:60Z",
                            belongsToUser: "frodo",
                            messageText: "Ich nehme den Ring! Ich bringe den Ring nach Mordor!"
                        }],
                        messageCount: 1
                    },
                    {
                        helpentry: "helpentryId_2",
                        userHelpentry: "user-helpEntry",
                        userResponder: "user-responder",
                        title: "Chat - Test Database",
                        messages: [{
                            timestamp: "2023-03-12T15:00:00Z",
                            belongsToUser: "user-responder",
                            messageText: "1. Hallo"
                        }, {
                            timestamp: "2023-03-12T15:30:30Z",
                            belongsToUser: "user-helpEntry",
                            messageText: "2. Hallo"
                        }, {
                            timestamp: "2023-03-20T03:33:12Z",
                            belongsToUser: "user-helpEntry",
                            messageText: "3. Hallo?"
                        }],
                        messageCount: 3
                    },
                ]);
            }
    }




}

export default new DatabaseFactory();