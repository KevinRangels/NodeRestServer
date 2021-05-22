const express = require('express')
const cors = require('cors')

class Server {

    constructor() {
        this.app = express();
        this.port = process.env.PORT;
        this.usersRoutes = '/api/users';
        // Middlewares
        this.middlewares();
        // Routes my aoo
        this.routes();
    }

    middlewares() {
        // CORS
        this.app.use( cors() )

        // Direcciorio public
        this.app.use( express.static('public') );
    }

    routes() {
        this.app.use(this.usersRoutes, require('../routes/user'))
    }

    listen() {
        this.app.listen( this.port, () => {
            console.log('Sever runing in port', this.port);
        })
    }

}

module.exports = Server;