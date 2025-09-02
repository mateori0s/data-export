const Postmonger = require('postmonger');
const { connection } = require('../public/js/postmongerTest');

describe('Connection Initialization', () => {

    test('should initialize connection as an instance of Postmonger.Session', () => {
        expect(connection).toBeInstanceOf(Postmonger.Session);
    });
});
