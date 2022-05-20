const {response } = require('express');

const {database} = require('../database/config');

const getTrabajador = async (req, res) => {
    const {rows} = await database.query('Select * from trabajador');
    res.json({
        ok: true,
        rows,
        msg: 'Todos los trabajadores'
    });
}

const postTrabajador = async (req, res = response) => {
    const {rfc, nombre, puesto, almacen} = req.body;

    const text = "INSERT INTO trabajador VALUES($1, $2, $3, $4) RETURNING *";

    const values = [rfc, nombre, puesto, almacen];

    try{
        await database.query(text, values);

        res.json({
            ok: true,
            msg: 'Trabajador Agregado'
        });

    }catch (err){
        console.error(err);
        res.status(500).json({
            ok: false,
            msg: 'Error inesperado... Revisar logs'
        });
    }

}

const putTrabajador = async (req, res = response) =>{

    const {rfc, nombre, puesto, almacen} = req.body;

    const text = "UPDATE trabajador SET rfc = $1, nombre = $2, puesto = $3, almacen = $4  WHERE rfc = $5";

    const values = [rfc, nombre, puesto, almacen, rfc];

    try{
        await database.query(text, values);

        res.json({
            ok: true,
            msg: 'Trabajador Actualizado'
        });
    }catch (err){
        console.error(err);
        res.status(500).json({
            ok: false,
            msg: 'Error inesperado... Revisar logs'
        });
    }
}

const deleteTrabajador = async (req, res = response) => {
    const nombre = req.params.nombre;

    console.log(nombre);

    const text = "DELETE FROM trabajador WHERE nombre = $1";

    const values = [nombre];

    try{
        await database.query(text, values);


        res.json({
            ok: true,
            msg: 'Trabajador Eliminado'
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
    getTrabajador,
    postTrabajador,
    putTrabajador,
    deleteTrabajador
}