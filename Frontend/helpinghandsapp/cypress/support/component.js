// ***********************************************************
// Diese Beispiel-Datei support/component.js wird automatisch
//  vor Ihrer Testdateien verarbeitet und geladen.
//
// Dies ist ein großartiger Ort, um globale Konfigurationen und
// Verhaltensweisen einzufügen, die Cypress modifizieren.
//
// Sie können den Speicherort dieser Datei ändern oder das 
// automatische Laden von Support-Dateien mit der Konfigurationsoption
// 'supportFile' deaktivieren.
//
// Weitere Informationen finden Sie hier:
// https://on.cypress.io/configuration
// ***********************************************************

// Importieren von commands.js mit ES2015-Syntax:
import './commands'

// Alternativ können Sie auch die CommonJS-Syntax verwenden:
// require('./commands')

import { mount } from 'cypress/react18'

// Fügen Sie den Befehl 'mount' zu Cypress.Commands hinzu:
Cypress.Commands.add('mount', mount)

// Beispielhafte Verwendung:
// cy.mount(<MyComponent />)