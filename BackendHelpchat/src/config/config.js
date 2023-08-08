'use strict'

let config =  {
    app: {
        version: `0.1`,
        name: 'backend_helpchat',
        env: process.env.NODE_ENV || 'development',
        port: process.env.PORT || 3002
    },

    mongo: {
        port: 27017,
        host: "localhost",
        name: "mongodb_helpchat",
        uri: process.env.MONGODB_URI || 'mongodb://dbuser:dbpass@mongodb-helpchat:27017'
        //uri: process.env.MONGODB_URI || 'mongodb://localhost:27017' //App außerhalb von Docker starten
    }
}

export default config