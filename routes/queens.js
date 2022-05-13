import { Router } from 'express'
import * as queensCtrl from '../controllers/queens.js'
import { decodeUserFromToken, checkAuth } from '../middleware/auth.js'

const router = Router()

/*---------- Public Routes ----------*/


/*---------- Protected Routes ----------*/
router.use(decodeUserFromToken)
router.get('/', queensCtrl.index)
router.post('/addqueen/:queen/:leagueNo', checkAuth, queensCtrl.addQueen)
router.delete('/deletequeen/:queen', checkAuth, queensCtrl.deleteQueen)
router.post('/eliminatequeen/:queen', checkAuth, queensCtrl.eleminateQueen)



export { router }