const {response} = require('express');
const {database} = require('../database/config');

const login = async (req, res = response) => {
    const {usuario, password} = req.body;

    const text = "Select * from usuario where usuario = $1 AND password = $2";

    const values = [usuario, password];

    try {

        const response = await database.query(text, values);

        console.log(response.rows);

        if(response.rows.length > 0){
            res.json({
                ok: true,
                msg: "usuario encontrado"
            });
        }else{

            res.json({
                ok: false,
                msg: "usuario No encontrado"
            });

        }

    } catch (err) {
        console.error(err);
        res.status(500).json({
            ok: false,
            msg: 'Error inesperado... Revisar logs'
        });
    }
}

module.exports = {
    login
}