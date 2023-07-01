// ***********************************************
// Diese example commands.js zeigt Ihnen, wie Sie
// verschiedene benutzerdefinierte Befehle erstellen und vorhandene 
// Befehle überschreiben können.
//
// Für umfassendere Beispiele von benutzerdefinierten Befehlen
// lesen Sie bitte hier weiter:
// https://on.cypress.io/custom-commands
// ***********************************************
//
//
// -- Dies ist ein übergeordneter Befehl --
// Cypress.Commands.add('login', (email, password) => { ... })
//
//
// -- Dies ist ein untergeordneter Befehl --
// Cypress.Commands.add('drag', { prevSubject: 'element'}, (subject, options) => { ... })
//
//
// -- Dies ist ein dualer Befehl --
// Cypress.Commands.add('dismiss', { prevSubject: 'optional'}, (subject, options) => { ... })
//
//
// -- Dies wird einen vorhandenen Befehl überschreiben --
// Cypress.Commands.overwrite('visit', (originalFn, url, options) => { ... })