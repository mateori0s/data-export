const Postmonger = require('postmonger');
let connection;

beforeAll(() => {
    // Simular la inicialización de la conexión
    connection = new Postmonger.Session();
});

connection = new Postmonger.Session();

module.exports = { connection };