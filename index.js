require('dotenv').config();

const express = require('express');
const cors = require('cors');
const logger = require('morgan');

const app = express();

app.use(cors());

// lectura y parseo del body
app.use( express.json() );

app.use(
    '/api/ventas',
    require('./routes/ventas')
)
app.use(
    '/api/trabajadores',
    require('./routes/trabajadores')
)

app.use(
    '/api/clientes',
    require('./routes/clientes')
)

app.use(
    '/api/productos',
    require('./routes/productos')
)

app.use(
    '/api/usuarios',
    require('./routes/usuarios')
)

app.use(
    '/api/login',
    require( './routes/auth' )
);

app.listen(process.env.PORT, () => {
    console.log("Servidor corriendo en el puerto: " + process.env.PORT);
});