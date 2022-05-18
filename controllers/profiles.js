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

export function addToRoster (req,res) {
  console.log(req.params.queen)
  Profile.findById(req.params.userId)
  .then(profile => {
    profile.roster.push({
      queen: req.params.queen
    })
    profile.save()
    console.log(profile)
    Profile.find({})
    .then(profiles => {
      res.status(201).json(profiles)
    })
  })
}

export function removeFromRoster (req, res) {
  console.log(req.params)
  Profile.findById(req.params.userId)
  .then(profile => {
      profile.roster.map(queen => {
        console.log(queen)
        if (queen.queen === req.params.queen) {
          queen.remove()
        }
      })
      console.log(profile)
      profile.save()
  })
  .then(
    Profile.find({})
    .then(profiles => {
      console.log(profiles)
      res.status(201).json(profiles)
    })
  )
}

export function makeGuess (req,res){
  console.log(req.params)
  console.log(req.body)
  Profile.findById(req.params.user)
  .then(profile => {
    profile.guessEpisode.push({
      queen1: req.body.queen1,
      queen2: req.body.queen2,
      episode: req.body.episodeNum
    })
    profile.save()
    console.log(profile)
    Profile.find({})
    .then(profiles => {
      res.status(201).json(profiles)
    })
  })
}

export function updateGuess (req,res){
  console.log(req.params)
  console.log(req.body)
  Profile.findById(req.params.user)
  .then(profile => {
    profile.guessEpisode[profile.guessEpisode.length - 1] = {
      queen1: req.body.queen1,
      queen2: req.body.queen2,
      episode: req.body.episodeNum
    }
    profile.save()
    console.log(profile)
    Profile.find({})
    .then(profiles => {
      res.status(201).json(profiles)
    })
  })
}

