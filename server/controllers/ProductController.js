const db = require('../db.json')
const fs = require('fs')

exports.getProducts = (req, res) => {
    let data = [];
    db.products.parts.forEach(elem => {
        let tmp = elem;
        if (db.infos[elem.id] !== undefined) {
            tmp.discount = db.infos[elem.id].discount;
        }
        data.push(tmp);
    });
    res.json(data);
}

exports.getProductById = (req, res) => {
    let data = db.products.parts.find(elem => elem.id === req.params.id);
    if (db.infos[req.params.id] !== undefined) {
        data.discount = db.infos[req.params.id].discount;
    }
    res.json(data);
}