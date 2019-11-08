const express = require('express');
const helmet = require('helmet');

const db = require('./data/db-config');

const ProjectRouter = require('./projects/project-router');

const server = express();

server.use(helmet());
server.use(express.json());
server.use('/api/projects', ProjectRouter);
server.use('/api/resources', ResourceRouter);

module.exports = server;