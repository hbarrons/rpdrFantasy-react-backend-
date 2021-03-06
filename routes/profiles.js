import { Router } from 'express'
import * as profilesCtrl from '../controllers/profiles.js'
import { decodeUserFromToken, checkAuth } from '../middleware/auth.js'

const router = Router()

/*---------- Public Routes ----------*/


/*---------- Protected Routes ----------*/
router.use(decodeUserFromToken)
router.get('/', checkAuth, profilesCtrl.index)
router.post('/createleague/:userId', checkAuth, profilesCtrl.createLeague)
router.post('/joinleague', checkAuth, profilesCtrl.joinLeague)
router.post('/addtoroster/:userId/:queen', checkAuth, profilesCtrl.addToRoster)
router.delete('/removefromroster/:userId/:queen', checkAuth, profilesCtrl.removeFromRoster)
router.post('/makeguess/:user', checkAuth, profilesCtrl.makeGuess)
router.post('/updateguess/:user', checkAuth, profilesCtrl.updateGuess)
router.post('/submitscores/:episodenum', checkAuth, profilesCtrl.submitScores)
router.delete('/deletescores/:episodenum/:leaguenum', checkAuth, profilesCtrl.deleteScores)
router.post('/makeadmin/:profileid', checkAuth, profilesCtrl.makeAdmin)
router.post('/removeadmin/:profileid', checkAuth, profilesCtrl.removeAdmin)
router.post('/updateroster/:queen/:leaguenum', checkAuth, profilesCtrl.updateRoster)
router.post('/weeklydrop/:user', checkAuth, profilesCtrl.weeklyDrop)
router.post('/updateweeklydrop/:leaguenum', checkAuth, profilesCtrl.updateWeeklyDrop)
router.post('/unlockroster/:profileid/:leaguenum', checkAuth, profilesCtrl.unlockRoster)

export { router }
