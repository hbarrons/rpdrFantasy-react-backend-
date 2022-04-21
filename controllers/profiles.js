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
  Profile.findById(req.params.userId)
  .then(profile => {
    profile.league.push({name: req.body.leagueName, leagueNo: req.body.leagueNo, isAdmin: true})
    profile.isAdmin = true
    profile.save()
    console.log(profile)
    res.status(201).json(profile)
  })
  .catch(err => {
    console.log(err)
    res.status(500).json(err)
  })
}

export function joinLeague (req,res) {
  Profile.findById(req.body.userId)
  .then(profile => {
    profile.league.push({
      name: req.body.leagueInfo.leagueName,
      leagueNo: req.body.leagueInfo.leagueNo,
      isAdmin: false
    })
    profile.save()
    console.log(profile.league[0])
    res.status(201).json(profile)
  })
  .catch(err => {
    console.log(err)
    res.status(500).json(err)
  })
}


