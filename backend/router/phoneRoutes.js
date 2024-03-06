const express = require('express');
const router = express.Router();
const productController = require('../controllers/phoneController');
const auth = require('../middleware/auth');

router.get('/getAll', auth, productController.getAllPhones);
router.get('/get/:id', auth, productController.getPhoneById);
router.post('/create', auth, productController.createPhone);
router.patch('/update/:id', auth, productController.updatePhone);
router.delete('/delete/:id', auth, productController.deletePhone);

module.exports = router;