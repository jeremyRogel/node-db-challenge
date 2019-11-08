const db = require('../data/db-config');

module.exports = {
    findAllResources
}

function findAllResources() {
    return db('resources');
} 