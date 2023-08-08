"use strict"

import restify from "restify";
import OpenApiEnforcer from "openapi-enforcer";
import OpenApiEnforcerMiddleware from "@dschulmeis/restify-openapi-enforcer-middleware";

import DatabaseFactory from "./config/database.js";

//Import Controller
import RootController from "./controller/root.controller.js";
import ChatController from "./controller/chat.controller.js";

//Get directory
import path from "path";
import { fileURLToPath } from "url";
const __dirname = path.dirname(fileURLToPath(import.meta.url));

//Import config-file
import config from './config/config.js'

await DatabaseFactory.init(config.mongo.uri);

/* =============================================================================
* SERVER STARTEN
* =============================================================================*/
const server = restify.createServer({

});

server.use(restify.plugins.acceptParser(server.acceptable));
server.use(restify.plugins.authorizationParser());
server.use(restify.plugins.dateParser());
server.use(restify.plugins.queryParser());
server.use(restify.plugins.jsonp());
server.use(restify.plugins.gzipResponse());
server.use(restify.plugins.bodyParser());
server.use(restify.plugins.throttle({burst: 100, rate: 50, ip: true}));
server.use(restify.plugins.conditionalRequest());


// Protokollzeile für jede HTTP-Anfrage auf der Konsole ausgeben
server.pre((req, res, next) => {
    console.log(new Date(), req.method, req.url, `HTTP ${req.httpVersion}`);
    return next();
});

// Exceptions ebenfalls auf der Konsole protokollieren, um die betroffene
// Quellcodestelle identifizieren zu können.
server.on("restifyError", function(req, res, err, callback) {
    console.error(`${err.stack}\n`);
    return callback();
});

// CORS-Header setzen, um Zugriffe von anderen URLs außer der Backend-URL zuzulassen.
// Außerdem OPTIONS-Anfragen (sog. CORS-Preflight) immer mit Status 200 beantworten,
// damit die Browser ändernde Aufrufe tatsächlich durchführen.
server.use((req, res, next) => {
    res.header("Access-Control-Allow-Origin", req.header("Origin"));
    res.header("Access-Control-Allow-Methods", req.header("Access-Control-Request-Method"));
    res.header("Access-Control-Allow-Headers", req.header("Access-Control-Request-Headers"));
    res.header("Access-Control-Allow-Credentials", "true");
    res.header("Vary", "Origin");
    return next();
});

// Anfragen und Antworten gegen die OpenAPI-Spezifikation prüfen und dabei
// fehlerhafte Anfragen oder Antworten mit einer Exception ablehnen.
const openApiFile = path.relative("", path.join(__dirname, "api", "openapi.yaml"));
const openApiValidation = await OpenApiEnforcer(openApiFile, {fullResult: true});
const openApiEnforcer = await OpenApiEnforcer(openApiFile, {
    hideWarnings: true,
    componentOptions: {
        production: process.env.NODE_ENV === "production"
    },
});

server.use(OpenApiEnforcerMiddleware(openApiEnforcer));

// HTTP-Controller registrieren
new RootController(server, "/");
new ChatController(server, "/helpchat");

// Server starten
server.listen(config.app.port, config.app.host, function() {
    console.log();
    console.log("=============");
    console.log("HelpingHands-Helpchat-Backend");
    console.log("=============");
    console.log();
    console.log("Ausführung mit folgender Konfiguration:");
    console.log();
    console.log(config);
    console.log();
    console.log("Nutzen Sie die folgenden Umgebungsvariablen zum Anpassen der Konfiguration:");
    console.log();
    console.log("  » PORT:    TCP-Port, auf dem der Webserver erreichbar ist");
    console.log("  » HOST:    Hostname oder IP-Addresse, auf welcher der Webserver erreichbar ist");
    console.log("  » MONGODB: URL-String mit den Verbindungsdaten zur Mongo-Datenbank");
    console.log();
    console.log(`OpenAPI-Spezifikation: ${openApiFile}`)

    if (openApiValidation.error) {
        console.error(`${openApiValidation.error}\n`);
    }

    if (openApiValidation.warning) {
        console.warn(`${openApiValidation.warning}\n`);

    }
    console.log();

});
