"use strict"

import DatabaseFactory from "../config/database.js";
import {ObjectId} from "mongodb";

/**
 * Geschäftslogik zur Verwaltung von Help-Chats.
 * Die Help-Chats werden in einer MongoDB abgelegt und basieren auf bestehenden Hilfsanzeigen.
 */

export default class ChatService {

    /**
     * Konstruktor.
     */
    constructor() {
        this._helpchat = DatabaseFactory.database.collection("Help-Chat");
    }

    /**
     * Help-Chat suchen.
     * Unterstützt wird lediglich eine ganz einfache Suche, bei der einzelne
     * Felder auf exakte Übereinstimmung geprüft werden.
     *
     * @param {Object} query Optionale Suchparameter
     * @return {Promise} Liste der gefundenen Hilfsanzeigen
     */
    async search(query) {
        let cursor = this._helpchat.find(query);
        return cursor.toArray();
    }

    /**
     * Speichern eines neuen Help-Chats.
     *
     * @param {Object} helpchat Zu speichernde Objektdaten
     * @return {Promise} Gespeicherte Objektdaten
     */
    async create(helpchat) {
        helpchat = helpchat || {};


        let _messages = [{
            messageText: "",
            timestamp: "",
            belongsToUser: ""
        }];

        let newHelpchat = {
            helpentry: helpchat.helpentry || "",
            userHelpentry: helpchat.userHelpentry || "",
            userResponder: helpchat.userResponder || "",
            title: helpchat.title || _messages,
            messages: helpchat.messages || "",
            latestTimestamp: helpchat.latestTimestamp || _messages.timestamp
        };

        let result = await this._helpchat.insertOne(newHelpchat);
        return await this._helpchat.findOne({_id: result.insertedId});
    }

    /**
     * Suche existierende Help-Chat-Instanz anhand der ID.
     *
     * @param {String} id Help-Chat ID
     * @return {Promise} Help-Chat
     */
    async read(id) {
        let result = await this._helpchat.findOne({_id: new ObjectId(id)});
        return result;
    }

    /**
     * Überschreiben eines Help-Chats. Die ID wird hierbei nicht geändert.
     *
     * @param {String} id ID des gesuchten Chats
     * @param {Object} helpchat Zu speichernde Chat-Metadaten und Nachrichten
     * @return {Promise} Gespeicherte Chat-Daten oder undefined
     */

    async update(id, helpchat) {
        let oldHelpchat = await this._helpchat.findOne({_id: new ObjectId(id)});
        if (!oldHelpchat) return;

        let updateDoc = {
            $set: {},
        }

        if (helpchat.helpentry) updateDoc.$set.helpentry = helpchat.helpentry;
        if (helpchat.userHelpentry) updateDoc.$set.userHelpentry = helpchat.userHelpentry;
        if (helpchat.userResponder) updateDoc.$set.userResponder = helpchat.userResponder;
        if (helpchat.title) updateDoc.$set.title = helpchat.title;
        if (helpchat.messages) updateDoc.$set.messages = helpchat.messages;
        if (helpchat.latestTimestamp) updateDoc.$set.latestTimestamp = helpchat.latestTimestamp;


        await this._helpchat.updateOne({_id: new ObjectId(id)}, updateDoc);
        return this._helpchat.findOne({_id: new ObjectId(id)});
    }


    /**
     * Aktualisierung der Nachrichten eines Help-Chats. Neue Nachricht wird zu bestehenden Einträgen
     * hinzugefügt und das Objekt messages anschließend überschrieben.
     *
     * @param {String} id ID des Chats
     * @param {Object} newMessageJSON
     * @return {Promise} Gespeicherte Daten oder undefined
     */
    async patchMessage(id, newMessageJSON) {
        let newMessage = newMessageJSON.Message;
        //Stand des Helpchats aktualisieren, um keine Nachrichten die in der zwischenzeit eintrafen zu überschreiben.
        let databaseHelpchat = await this._helpchat.findOne({_id: new ObjectId(id)});
        if (!databaseHelpchat) return;

        databaseHelpchat.messages.push({
            messageText: newMessage.messageText,
            timestamp: newMessage.timestamp,
            belongsToUser: newMessage.belongsToUser
        });

        databaseHelpchat.messageCount = databaseHelpchat.messages.length;

        let updateDoc = {
            $set: {
                messages: databaseHelpchat.messages,
                messageCount: databaseHelpchat.messageCount
            },
        }

        await this._helpchat.updateOne({_id: new ObjectId(id)}, updateDoc);
        return this._helpchat.findOne({_id: new ObjectId(id)});
    }

    /**
     * Löschen eines Chats anhand seiner ID.
     *
     * @param {String} id ID des gesuchten Chats
     * @return {number} Anzahl der gelöschten Chats.
     */
    //@return {Promise} Anzahl der gelöschten Datensätze
    async delete(id) {
        let result = await this._helpchat.deleteOne({_id: new ObjectId(id)});
        return result.deletedCount;
    }

}