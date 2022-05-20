const {response } = require('express');

const {database} = require('../database/config');

const getVenta = async (req, res) => {
    const {rows} = await database.query('Select * from ventas');
    
    res.json({
        ok: true,
        rows,
        msg: 'Todos las ventas'
    });
}

const postVenta = async (req, res = response) => {
    const {folio, precio, cantidad} = req.body;

    const text = "INSERT INTO ventas(folio, precio, cantidad) VALUES($1, $2, $3) RETURNING *";

    const values = [folio, precio, cantidad];

    try{
        await database.query(text, values);

        res.json({
            ok: true,
            msg: 'Venta Agregada'
        });

    }catch (err){
        console.error(err);
        res.status(500).json({
            ok: false,
            msg: 'Error inesperado... Revisar logs'
        });
    }

}

const putVenta = async (req, res = response) =>{

    const {folio, precio, cantidad} = req.body;

    const text = "UPDATE ventas SET folio = $1, precio = $2, cantidad = $3 WHERE id = $4";

    const values = [folio, precio, cantidad, folio];

    try{
        await database.query(text, values);

        res.json({
            ok: true,
            msg: 'Venta Actualizada'
        });
    }catch (err){
        console.error(err);
        res.status(500).json({
            ok: false,
            msg: 'Error inesperado... Revisar logs'
        });
    }
}

const deleteVenta = async (req, res = response) => {
    const folio = req.params.folio;

   

    const text = "DELETE FROM venta WHERE folio = $1";

    const values = [folio];

    try{
        await database.query(text, values);

        res.json({
            ok: true,
            msg: 'Venta Eliminada'
        });
    }catch (err){
        console.error(err);
        res.status(500).json({
            ok: false,
            msg: 'Error inesperado... Revisar logs'
        });
    }
}

module.exports = {
    getVenta,
    postVenta,
    putVenta,
    deleteVenta
}