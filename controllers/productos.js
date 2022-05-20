const {response } = require('express');

const {database} = require('../database/config');

const getProducto = async (req, res) => {
    const {rows} = await database.query('Select * from producto');
    console.log(response.rows);
    res.json({  
        ok: true,
        rows,
        msg: 'Todos los productos'
    });
}

const postProducto = async (req, res = response) => {
    const {nombre, marca, modelo, precio, cantidad} = req.body;

    const text = "INSERT INTO producto(nombre, marca, modelo, precio, cantidad) VALUES($1, $2, $3, $4,$5) RETURNING *";

    const values = [nombre, marca, modelo, precio, cantidad];

    try{
        await database.query(text, values);

        res.json({
            ok: true,
            msg: 'Producto Agregado'
        });

    }catch (err){
        console.error(err);
        res.status(500).json({
            ok: false,
            msg: 'Error inesperado... Revisar logs'
        });
    }

}

const putProducto = async (req, res = response) =>{

    const {id, nombre, marca, modelo, precio, cantidad} = req.body;

    const text = "UPDATE producto SET nombre = $1, marca = $2, modelo = $3, precio = $4, cantidad = $5 WHERE id = $6";

    const values = [nombre, marca, modelo, precio, cantidad,id];

    try{
        await database.query(text, values);

        res.json({
            ok: true,
            msg: 'Producto Actualizado'
        });
    }catch (err){
        console.error(err);
        res.status(500).json({
            ok: false,
            msg: 'Error inesperado... Revisar logs'
        });
    }
}

const deleteProducto = async (req, res = response) => {
    const nombre = req.params.nombre;

    console.log(nombre);

    const text = "DELETE FROM producto WHERE nombre = $1";

    const values = [nombre];

    try{
        await database.query(text, values);


        res.json({
            ok: true,
            msg: 'Producto Eliminado'
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
    getProducto,
    postProducto,
    putProducto,
    deleteProducto
}