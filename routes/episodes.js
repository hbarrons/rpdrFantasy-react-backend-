import { Router } from 'express'
import * as episodesCtrl from '../controllers/episodes.js'
import { decodeUserFromToken, checkAuth } from '../middleware/auth.js'

const router = Router()

/*---------- Public Routes ----------*/


/*---------- Protected Routes ----------*/
router.use(decodeUserFromToken)
router.get('/', checkAuth, episodesCtrl.indexEpisodes)
router.post('/addepisode/:episode/:leagueNo', checkAuth, episodesCtrl.addEpisode)
router.delete('/deleteepisode/:episode', checkAuth, episodesCtrl.deleteEpisode)



export { router }