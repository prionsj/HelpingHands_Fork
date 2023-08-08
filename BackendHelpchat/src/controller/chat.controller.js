"use strict"

import {wrapHandler} from "../utils.js";
import RestifyError from "restify-errors";
import ChatService from "../service/chat.service.js";

/**
 * HTTP-Controller-Klasse für Help-Chats.
 * Diese Klasse registriert alle notwendigen URL-Handler beim Webserver
 * für einen einfachen REST-Webservice zum Lesen und Schreiben von
 * Chats, bzw. Nachrichten.
 */

export default class ChatController {

    /**
     * Konstruktor. Hier werden die URL-Handler registriert.
     *
     * @param {Object} server Restify Serverinstanz
     * @param {String} prefix Gemeinsamer Prefix aller URLs
     */

    constructor(server, prefix) {
        this._service = new ChatService();
        this._prefix = prefix;
        // Collection: Help-Chat
        server.get(prefix, wrapHandler(this, this.search));
        server.post(prefix, wrapHandler(this, this.create));

        // Entity: Help-Chat
        server.get(prefix + "/:id", wrapHandler(this, this.read));
        server.put(prefix + "/:id", wrapHandler(this, this.update));
        server.patch(prefix + "/:id", wrapHandler(this, this.patchMessage));
        server.del(prefix + "/:id", wrapHandler(this, this.delete));
    }

    /**
     * Hilfsmethode zum Einfügen von HATEOAS-Links in einen Datensatz.
     * Dem Datensatz wird ein Attribut `_links` gemäß der OpenAPI-Spezifikation
     * hinzugefügt, damit ein Client erkennen kann, wie er die Entität lesen,
     * ändern oder löschen kann.
     *
     * @param {Object} entity Zu verändernder Datensatz.
     */

    _insertHateoasLinks(entity) {
        let url = `${this._prefix}/${entity._id}`;
        entity._links = {
            read: {url: url, method: "GET"},
            update: {url: url, method: "PUT"},
            patch: {url: url, method: "PATCH"},
            delete: {url: url, method: "DELETE"},
        }
    }

    /**
     * GET /helpchat
     * Help-Chat suchen
     *
     * @param {Object} req Anfrageobjekt
     * @param {Object} res Antwortobjekt
     * @param {Object} next Nächster Handler
     */
    async search(req, res, next) {
        let result = await this._service.search(req.query);
        result.forEach(entity => this._insertHateoasLinks(entity));
        res.sendResult(result);
        return next();
    }

    /**
     * POST /helpchat
     * Neuen Chat beginnen und anlegen.
     *
     * @param {Object} req Anfrageobjekt
     * @param {Object} res Antwortobjekt
     * @param {Object} next Nächster Handler
     */

    async create(req, res, next) {
        let result = await this._service.create(req.body);
        this._insertHateoasLinks(result);
        res.status(201);
        res.header("Location", `${this._prefix}/${result._id}`);
        res.sendResult(result);
        return next();
    }

    /**
     * GET /helpchat/:id
     * Help-Chat mit der angegebenen ID auslesen
     *
     * @param {Object} req Anfrageobjekt
     * @param {Object} res Antwortobjekt
     * @param {Object} next Nächster Handler
     */

    async read(req, res, next) {
        let result = await this._service.read(req.params.id);
        this._insertHateoasLinks(result);
        if (result) {
            res.sendResult(result);
        } else {
            throw new RestifyError.NotFoundError("Benutzer nicht gefunden");
        }
        return next();
    }

    /**
     * PUT /benutzer/:id
     * Benutzer mit der angegebenen ID ersetzen
     *
     * @param {Object} req Anfrageobjekt
     * @param {Object} res Antwortobjekt
     * @param {Object} next Nächster Handler
     */

    async update(req, res, next) {
        let result = await this._service.update(req.params.id, req.body);
        this._insertHateoasLinks(result);
        if (result) {
            res.sendResult(result);
        } else {
            throw new RestifyError.NotFoundError("Chat nicht gefunden");
        }
        return next();
    }

    /**
     * PATCH /helpchat/:id
     * Help-Chat mit der angegebenen ID ändern
     *
     * @param {Object} req Anfrageobjekt
     * @param {Object} res Antwortobjekt
     * @param {Object} next Nächster Handler
     */
    async patchMessage(req, res, next){
        let result = await this._service.patchMessage(req.params.id, req.body);
        this._insertHateoasLinks(result);
        if (result) {
            res.sendResult(result);
        } else {
            throw new RestifyError.NotFoundError("Chat nicht gefunden");
        }
        return next();
    }

    /**
     * DELETE /helpchat/:id
     * Help-Chat mit der angegebenen ID löschen
     *
     * @param {Object} req Anfrageobjekt
     * @param {Object} res Antwortobjekt
     * @param {Object} next Nächster Handler
     */

    async delete(req, res, next) {
        await this._service.delete(req.params.id)
        res.status(204);
        res.sendResult({});
        return next();
    }
}