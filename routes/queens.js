import { Router } from 'express'
import * as queensCtrl from '../controllers/queens.js'
import { decodeUserFromToken, checkAuth } from '../middleware/auth.js'

const router = Router()

/*---------- Public Routes ----------*/


/*---------- Protected Routes ----------*/
router.use(decodeUserFromToken)
router.post('/addqueen/:queen', checkAuth, queensCtrl.addQueen)


export { router }