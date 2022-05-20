const {Router} = require('express');
const {getVenta, postVenta, putVenta, deleteVenta} = require('../controllers/ventas');

const router = Router();

router.get(
    '/',
    getVenta
)
router.post(
    '/',
    postVenta
)
router.put(
    '/',
    putVenta
)
router.delete(
    '/:folio',
    deleteVenta
)

module.exports = router;