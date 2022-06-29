import mongoose from 'mongoose'

const episodeSchema = new mongoose.Schema({
  leagueNo: Number,
  epNum: {
    type: Number,
    unique: false,
  },
  winner: {
    type: String,
  },
  loser: {
    type: String,
  },
  tops: {
    type: []
  },
  bottoms: {
    type: []
  }
}, {
  timestamps: true
})

const Episode = mongoose.model('Episode', episodeSchema)

export {
  Episode
}
