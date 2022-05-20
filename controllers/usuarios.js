const {response } = require('express');

const {database} = require('../database/config');

const getUsuario = async (req, res) => {
    const {rows} = await database.query('Select * from usuario');
    
    res.json({
        ok: true,
        rows,
        msg: 'Todos los usuarios'
    });
}

const postUsuario = async (req, res = response) => {
    const {nombre, apellidos, usuario, password} = req.body;

    const text = "INSERT INTO usuario(nombre, apellidos, usuario, password) VALUES($1, $2, $3, $4) RETURNING *";

    const values = [nombre, apellidos, usuario, password];

    try{
        await database.query(text, values);

        res.json({
            ok: true,
            msg: 'Usuario Agregado'
        });

    }catch (err){
        console.error(err);
        res.status(500).json({
            ok: false,
            msg: 'Error inesperado... Revisar logs'
        });
    }

}

const putUsuario = async (req, res = response) =>{

    const {id, nombre, apellidos, usuario, password} = req.body;

    const text = "UPDATE usuario SET nombre = $1, apellidos = $2, usuario = $3, password = $4 WHERE id = $5";

    const values = [nombre, apellidos, usuario, password, id];

    try{
        await database.query(text, values);

        res.json({
            ok: true,
            msg: 'Usuario Actualizado'
        });
    }catch (err){
        console.error(err);
        res.status(500).json({
            ok: false,
            msg: 'Error inesperado... Revisar logs'
        });
    }
}

const deleteUsuario = async (req, res = response) => {
    const nombre = req.params.nombre;

    console.log(nombre);

    const text = "DELETE FROM usuario WHERE nombre = $1";

    const values = [nombre];

    try{
        await database.query(text, values);


        res.json({
            ok: true,
            msg: 'Usuario Eliminado'
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
    getUsuario,
    postUsuario,
    putUsuario,
    deleteUsuario
}