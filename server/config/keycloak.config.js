const session = require('express-session');
const Keycloak = require('keycloak-connect');

let _keycloak;

const keycloakConfig = {
    clientId: 'omrs-be',
    bearerOnly: true,
    serverUrl: 'https://keycloak.sst.k8s.afcentcloud.us/auth/',
    realm: 'omrs',
    credentials: {
        secret: process.env.KC_TOKEN
    }
};

function initKeycloak() {
    if (_keycloak) {
        console.warn("Trying to init Keycloak again!");
        return _keycloak;
    } 
    else {
        if(process.env.NODE_ENV !== 'test') { 
        console.log("Initializing Keycloak...");
        }
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