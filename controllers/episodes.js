import { Episode } from '../models/episode.js'

export function addEpisode (req, res) {
  console.log(req.params)
  Episode.create(req.params)
  .then(episode => {
    episode.epNum = req.body.episodeNum
    episode.winner = req.body.winner
    episode.loser = req.body.loser
    episode.leagueNo = req.params.leagueNo
    episode.tops.push(req.body.top1, req.body.top2, req.body.top3)
    episode.bottoms.push(req.body.bottom1, req.body.bottom2, req.body.bottom3)
    episode.save()
    Episode.find({})
    .then(episodes => {
      console.log(episodes)
      res.status(201).json({episodes, episode})
    })
  })
}

export function indexEpisodes (req,res) {
  Episode.find({})
  .then(episodes => res.status(201).json(episodes))
  .catch(err => {
    console.log(err)
    res.status(500).json(err)
  })
}

export function deleteEpisode (req,res) {
  console.log(req.params)
  Episode.findByIdAndDelete(req.params.episode)
  .then(episode => {
    console.log(episode)
    Episode.find({})
    .then(episodes => res.status(201).json(episodes))
  })
}