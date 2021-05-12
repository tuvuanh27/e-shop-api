const router = require('express-promise-router')()

const userController = require('../controllers/user')

const {
  schemas,
  validateParam,
  validateBody
} = require('../helpers/routerHelper')

const passport = require('passport')
const passportConfig = require('../middewares/passport')

router.route('/')
  .get(userController.getUsers)
  .post( validateBody(schemas.userSchema) , userController.newUser)

module.exports = router