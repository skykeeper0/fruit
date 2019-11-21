const express = require('express');
const publicRouter = express.Router();
const db = require('../database');

module.exports.public = publicRouter;

publicRouter.route('/fruits')
    .get((req, res) => {
        const query = req.query;

        let data;

        try {
            data = db.getFruitData();
        } catch (err) {
            return res.status(500).json({ message: err.message })
        }

        if (query.name !== undefined) {
            const queriedData = data.filter(fruit => {
                return fruit.name.toLowerCase() === query.name.toLowerCase()
            });
            return res.status(200).json(queriedData);
        }

        return res.status(200).json(data);
    })

publicRouter.route('/fruit-list')
    .get((req, res) => {
        let data;

        try {
            data = db.getFruitData();
        } catch (err) {
            return res.status(500).json({ message: err.message })
        }

        return res.status(200).json(data.map(fruit => fruit.name));
    })
