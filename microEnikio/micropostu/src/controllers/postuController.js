const express = require('express');
const router = express.Router();
const axios = require('axios');
const postuModel = require('../models/postuModel');

router.get('/postu/aptos/:id_apto', async (req, res) => {
    const id_apto = req.params.id_apto;
    const response = await
        axios.get(`http://localhost:3002/aptos/${id_apto}`);
    console.log(response)
    const id_apto2 = response.data.id_apto2
    var result;
    result = await postuModel.postuPorApto(id_apto2);
    res.json(result);
});

//falta el post de postuPorApto



module.exports = router;