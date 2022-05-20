const {Router} = require('express');
const {getTrabajador, postTrabajador, putTrabajador, deleteTrabajador} = require('../controllers/trabajadores');

const router = Router();

router.get(
    '/',
    getTrabajador
)
router.post(
    '/',
    postTrabajador
)
router.put(
    '/',
    putTrabajador
)
router.delete(
    '/:nombre',
    deleteTrabajador
)

module.exports = router;