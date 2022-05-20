const {Router} = require('express');
const {getProducto, postProducto, putProducto, deleteProducto} = require('../controllers/productos');

const router = Router();

router.get(
    '/',
    getProducto
)
router.post(
    '/',
    postProducto
)
router.put(
    '/',
    putProducto
)
router.delete(
    '/:nombre',
    deleteProducto
)

module.exports = router;