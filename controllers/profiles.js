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
    profile.roster?.map(queen => {
      console.log(queen)
      if (queen.queen === req.params.queen) {
        queen.remove()
      }
    })
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
  console.log("MAKE GUESS SANITY CHECK")
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
    Profile.find({})
    .then(profiles => {
      res.status(201).json(profiles)
    })
  })
}

export function submitScores (req,res) {
  console.log(req.params)
  console.log(req.body)
  req.body.map(scoreInfo => {
    Profile.findById(scoreInfo.profile)
    .then(profile => {
      profile.score.push({
        episodeNum: req.params.episodenum,
        score: scoreInfo.weeklyScore,
      })
      profile.totalScore += scoreInfo.weeklyScore
      profile.save()
    })
  })
  Profile.find({})
  .then(profiles => {
    res.status(201).json(profiles)
  })
}

export function deleteScores (req,res) {
  let weeklyScore = 0
  console.log("delete score", req.params)
  Profile.find({})
  .then(profile => {
    for (let i=0; i<profile.length; i++) {
      if (profile[i].league[0].leagueNo === parseInt(req.params.leaguenum)) {
        for (let j=0; j < profile[i].score.length; j++) {
          // console.log("score to delete", profile[i].score[j])
          if (profile[i].score[j].episodeNum === parseInt(req.params.episodenum)) {
            console.log("score to delete", profile[i].score[j].score)
            weeklyScore = profile[i].score[j].score
            profile[i].totalScore -= weeklyScore 
            profile[i].score[j].remove()
            // profile[i].score.save()
          }
        }
      }
      profile[i].save()
    }
  })
  Profile.find({})
  .then(profiles => {
    res.status(201).json(profiles)
  })
}

export function makeAdmin (req,res) {
  console.log("makeAdmin req.params: ", req.params)
  Profile.findById(req.params.profileid)
  .then(profile => {
    profile.league[0].isAdmin = true
    profile.save()
    console.log("makeAdmin profile isAdmin?: ", profile.league[0].isAdmin)
  })
  Profile.find({})
  .then(profiles => {
    res.status(201).json(profiles)
  })
}

export function removeAdmin (req,res) {
  console.log("makeAdmin req.params: ", req.params)
  Profile.findById(req.params.profileid)
  .then(profile => {
    profile.league[0].isAdmin = false
    profile.save()
    console.log("removeAdmin profile isAdmin?: ", profile.league[0].isAdmin)
  })
  Profile.find({})
  .then(profiles => {
    res.status(201).json(profiles)
  })
}

export function updateRoster (req,res) {
  console.log(req.params)
  Profile.find({})
  .then(profiles => {
    profiles.map(profile => {
      if (profile.league[0].leagueNo === parseInt(req.params.leaguenum)) {
        for (let i=0; i<profile.roster.length; i++) {
          console.log(req.params.queen, profile.roster[i])
          if (profile.roster[i].queen === req.params.queen) {
            console.log("sanity check",profile.roster[i]._id, req.params.queen)
            profile.roster.splice(i, 1)
            console.log(profile.roster)
          }
        }
        profile.save()
      }
    })
  })
  Profile.find({})
  .then(profiles => {
    res.status(201).json(profiles)
  })
}

export function weeklyDrop (req,res) {
  console.log("SANITY CHECK", req.params)
  Profile.findById(req.params.user)
  .then(profile => {
    profile.weeklyDrop = true
    profile.save()
  })
  Profile.find({})
  .then(profiles => {
    res.status(201).json(profiles)
  })
}

export function updateWeeklyDrop (req,res) {
  console.log(req.params)
  Profile.find({})
  .then(profiles => {
    profiles.map(profile => {
      console.log(profile.league[0].leagueNo, req.params.leaguenum)
      if (profile.league[0].leagueNo === parseInt(req.params.leaguenum)) {
        profile.weeklyDrop = false
        profile.save()
      }
    })
  })
  Profile.find({})
  .then(profiles => {
    res.status(201).json(profiles)
  })
}

export function unlockRoster (req,res) {
  console.log(req.params)
}

