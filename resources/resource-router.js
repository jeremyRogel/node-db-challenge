const express = require('express');

const Resources = require('./resource-model');

const router = express.Router();

router.get('/', (req, res) => {
    Resources.findAllResources()
    .then(resources => res.status(200).json(resources))
    .catch(err => res.status(500).json({ message: err }))
})