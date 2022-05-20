const {Router} = require('express');
const {getCliente, postCliente, putCliente, deleteCliente} = require('../controllers/clientes');

const router = Router();

router.get(
    '/',
    getCliente
)
router.post(
    '/',
    postCliente
)
router.put(
    '/',
    putCliente
)
router.delete(
    '/:nombre',
    deleteCliente
)

module.exports = router;