const experss = require('express')
const router = experss.Router()

const admin = require('../controllers/admincontroller/adminController')

const admnGet = require('../controllers/admincontroller/allGet.Controller')

const tockenCheck = require('../middlewares/tockencheck')

router.post('/addDesignation',tockenCheck,admin.addDesignation)
router.post('/addLocation' , tockenCheck ,admin.addLocation)
router.post('/addUser', tockenCheck, admin.addUser)


router.delete('/deleteUser', tockenCheck, admin.deleteUser)

router.get('/getDesignation', tockenCheck, admnGet.getDesignation)
router.get('/getLocation',tockenCheck, admnGet.getLocation)
router.get('/getUsers',tockenCheck, admnGet.getUsers)
router.get('/getsingleUser',tockenCheck, admnGet.getsingleUser)
router.get('/getdeletedUsers',tockenCheck ,admnGet.getdeletedUsers)


module.exports = router  