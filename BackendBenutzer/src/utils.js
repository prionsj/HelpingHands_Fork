"use strict";

/**
 *
 * Stellt sicher, dass der Parameter `this` in den Methoden tatsächlich auf
 * das Controller-Objekt zeigt, sowie dass Ausnahmen sauber an das Restify
 * Framework weitergereicht werden.
 *
 * @param {Function} func Asynchrone Handler-Funktion
 * @return {Function} Synchrone Handler-Funktion mit Callback-Mechanismus
 */

export function wrapHandler(that, func) {
    func = func.bind(that);

    return (req, res, next) => {
        try {
            return func(req, res, next)?.catch((ex) => {
                return next(ex);
            });
        } catch (ex) {
            return next(ex);
        }
    };
    
};
