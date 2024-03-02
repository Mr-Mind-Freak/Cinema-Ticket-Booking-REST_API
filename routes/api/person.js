const router = require('express').Router();
const personController = require('../../controller/personController');
const { uploadPerson } = require('../../middleware/uploadImg');

router.route('/')
    .get(personController.getPersons)
    .post(uploadPerson.single('image'),personController.handleNewPerson)
    .patch(uploadPerson.single('image'),personController.updatePerson)
    .delete(personController.deletePerson);

router.route('/:name').get(personController.getSinglePerson);

module.exports = router;