const { Router } = require('express')
const contactController = require('../controllers/contactControllers')
const router = Router()

router.route('/').get(contactController.get_contacts).post(contactController.create_contact)
router.route('/:id').get(contactController.get_contact).put(contactController.update_contact).delete(contactController.delete_contact)

module.exports = router;

