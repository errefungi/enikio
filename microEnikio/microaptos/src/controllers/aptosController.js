const express = require('express');
const router = express.Router();
const axios = require('axios');
const aptosModel = require('../models/aptosModel');

//PREGUNTAR A ZEIDA: como pasarle ese data a Select.html 
router.get('/aptos', (req, res) => {
    res.render('select.html', {
      data: [
        { "nombre": "Universidad Autónoma de Occidente" },
        { "nombre": "Universidad ICESI" },
        { "nombre": "Institución universitaria Antonio José Camacho" },
        { "nombre": "Universidad de San Buenaventura Cali" },
        { "nombre": "Universidad Libre (Sede San Fernando)" },
        { "nombre": "Universidad Cooperativa de Colombia" }
      ]
    });
  });

  //HAY QUE HACER UNIVERSIDADES DENTRO DE APTOS


router.get('/aptos/usuarios/:cc', async (req, res) => {
    const cc = req.params.cc;
    const response = await
        axios.get(`http://localhost:3001/usuarios/${cc}`);
    console.log(response)
    const id_arrendador = response.data.id_arrendador
    var result;
    result = await aptosModel.traerAptoArrendador(id_arrendador);
    res.json(result);
});

router.put('/aptos/:id_apto', async (req, res) => {
    const id_apto = req.params.id_apto;
    const hab_disponibles = req.body.hab_disponibles;
    if (hab_disponibles < 0) {
        res.send("hab_disponibles no puede ser menor de cero");
        return;
    }
    var result = await aptosModel.actualizarApto(id_apto, hab_disponibles);
    res.send("inventario de producto actualizado");
});

router.get('/aptos/:id_apto', async (req, res) => {
  const id_apto = req.params.id_apto;
  var result;
  result = await aptosModel.traerApto(id_apto);
  res.json(result[0]);
});



module.exports = router;