import { Episode } from '../models/episode.js'

export function addEpisode (req, res) {
  Episode.create(req.params)
  .then(episode => {
    episode.number = req.body.episodeNum
    episode.winner = req.body.winner
    episode.loser = req.body.loser
    episode.tops.push(req.body.top1, req.body.top2, req.body.top3)
    episode.bottoms.push(req.body.bottom1, req.body.bottom2, req.body.bottom3)
    episode.save()
    console.log(episode)
    Episode.find({})
    .then(episodes => {
      res.status(201).json(episodes)
    })
  })
}

export function indexEpisodes (req,res) {
  console.log("req.body: ", req.body)
  console.log("req.params: ", req.params)
}