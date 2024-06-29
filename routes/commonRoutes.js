const experss = require('express')
const router = experss.Router()

const common = require('../controllers/userController/userController')

router.post('/',common.Login)

module.exports = router  