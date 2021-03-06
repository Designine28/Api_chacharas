const {Router} = require('express');
const {getUsuario, postUsuario, putUsuario, deleteUsuario} = require('../controllers/usuarios');

const router = Router();

router.get(
    '/',
    getUsuario
)
router.post(
    '/',
    postUsuario
)
router.put(
    '/',
    putUsuario
)
router.delete(
    '/:nombre',
    deleteUsuario
)

module.exports = router;