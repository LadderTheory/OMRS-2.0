const session = require('express-session');
const Keycloak = require('keycloak-connect');

let _keycloak;

const keycloakConfig = {
    clientId: 'omrs-be',
    bearerOnly: true,
    serverUrl: 'http://192.168.1.78:31677/auth',
    realm: 'SST',
    credentials: {
        secret: '9cd7b03a-adda-4253-b467-8f093d03ac38'
    }
};

function initKeycloak() {
    if (_keycloak) {
        console.warn("Trying to init Keycloak again!");
        return _keycloak;
    } 
    else {
        console.log("Initializing Keycloak...");
        var memoryStore = new session.MemoryStore();
        _keycloak = new Keycloak({ store: memoryStore }, keycloakConfig);
        return _keycloak;
    }
}

function getKeycloak() {
    if (!_keycloak){
        console.error('Keycloak has not been initialized. Please called init first.');
    } 
    return _keycloak;
}

module.exports = {
    initKeycloak,
    getKeycloak
};