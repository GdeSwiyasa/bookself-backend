const hapi = require("@hapi/hapi");
const routes = require('./routes');

require("dotenv").config();
const { PORT, BASE_URL } = process.env;

const apps = async (host, port) => {
    const server = hapi.server({
        port,
        host,
        routes: {
            cors: {
                origin: ['*']
            }
        }
    });
    server.route(routes);
    await server.start();
    console.log(`$Server running on http://${host}:${port}`);
}

apps(BASE_URL, PORT);