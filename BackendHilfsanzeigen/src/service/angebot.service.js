"use strict"

import DatabaseFactory from "../database.js";
import {ObjectId} from "mongodb";

/**
* Geschäftslogik zur Verwaltung der angebotenen Hilfe.
* Die Angebote werden in einer MongoDB abgelegt.
*/

export default class AngebotService {

  /**
  * Konstruktor.
  */

  constructor() {
    this._angebot = DatabaseFactory.database.collection("angebot");
  }

  /**
  * Angebote suchen.
  * Unterstützt wird lediglich eine ganz einfache Suche, bei der einzelne
  * Felder auf exakte Übereinstimmung geprüft werden. 
  *
  * @param {Object} query Optionale Suchparameter
  * @return {Promise} Liste der gefundenen Angebote
  */

  async search(query) {
    let cursor = this._angebot.find(query, {
      sort: {
        titel: 1,
      }
    });
    return cursor.toArray();
  }

  /**
  * Speichern eines neuen Angebots.
  *
  * @param {Object} angebot Zu speichernde Angebotsdaten
  * @return {Promise} Gespeicherte Angebotsdaten
  */

  async create(angebot) {
    angebot = angebot || {};

    let newAngebot = {
      titel:               angebot.titel         || "",
      standort:            angebot.standort      || "",
      ersteller:           angebot.ersteller     || "",
      nutzername:          angebot.nutzername    || ""
    };

    let result = await this._angebot.insertOne(newAngebot);
    return await this._angebot.findOne({_id: result.insertedId});
  }

  /**
  * Auslesen eines vorhandenen Angebots anhand seiner ID.
  *
  * @param {String} id ID des gesuchten Angebots
  * @return {Promise} Gefundene Angebotsdaten
  */

  async read(id) {
    let result = await this._angebot.findOne({_id: new ObjectId(id)});
    return result;
  }

}
