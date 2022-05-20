const {response } = require('express');

const {database} = require('../database/config');

const getCliente = async (req, res) => {
    const {rows} = await database.query('Select * from cliente');
    
    res.json({
        ok: true,
        rows,
        msg: 'Todos los clientes'
    });
}

const postCliente = async (req, res = response) => {
    const {folio, nombre, descuento} = req.body;

    const text = "INSERT INTO cliente(folio, nombre, descuento) VALUES($1, $2, $3) RETURNING *";

    const values = [folio, nombre, descuento];

    try{
        await database.query(text, values);

        res.json({
            ok: true,
            msg: 'Cliente Agregado'
        });

    }catch (err){
        console.error(err);
        res.status(500).json({
            ok: false,
            msg: 'Error inesperado... Revisar logs'
        });
    }

}

const putCliente = async (req, res = response) =>{

    const {id, folio, nombre, descuento} = req.body;

    const text = "UPDATE cliente SET folio = $1, nombre = $2, descuento = $3 WHERE id = $4";

    const values = [folio, nombre, descuento, id];

    try{
        await database.query(text, values);

        res.json({
            ok: true,
            msg: 'Cliente Actualizado'
        });
    }catch (err){
        console.error(err);
        res.status(500).json({
            ok: false,
            msg: 'Error inesperado... Revisar logs'
        });
    }
}

const deleteCliente = async (req, res = response) => {
    const nombre = req.params.nombre;

    console.log(nombre);

    const text = "DELETE FROM cliente WHERE nombre = $1";

    const values = [nombre];

    try{
        await database.query(text, values);

        res.json({
            ok: true,
            msg: 'Cliente Eliminado'
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
    getCliente,
    postCliente,
    putCliente,
    deleteCliente
}