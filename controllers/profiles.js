import { Profile } from '../models/profile.js'

export function index(req, res) {
  Profile.find({})
  .then(profiles => res.json(profiles))
  .catch(err => {
    console.log(err)
    res.status(500).json(err)
  })
}

export function createLeague(req,res) {
  console.log("body: ", req.body)
  console.log("req.params.userId: ", req.params.userId)
  Profile.findById(req.params.userId)
  .then(profile => {
    profile.league.push({name: req.body.leagueName, leagueNo: req.body.leagueNo})
    profile.save()
    res.status(201).json(profile)
  })
  .catch(err => {
    console.log(err)
    res.status(500).json(err)
  })
}


