import { Router } from 'express'
import * as episodesCtrl from '../controllers/episodes.js'
import { decodeUserFromToken, checkAuth } from '../middleware/auth.js'

const router = Router()

/*---------- Public Routes ----------*/


/*---------- Protected Routes ----------*/
router.use(decodeUserFromToken)
router.get('/', episodesCtrl.indexEpisodes)
router.post('/addepisode/:episode', checkAuth, episodesCtrl.addEpisode)



export { router }