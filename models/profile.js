import mongoose from 'mongoose'

const rosterSchema = new mongoose.Schema({
  queen: {
    type: String,
  },
})

const guessSchema = new mongoose.Schema({
  queen1: {
    type: String,
  },
  queen2: {
    type: String,
  },
  episode: {
    type: Number,
    min: 1,
    max: 17,
  },
}, {
  timestamps: true
})

const leagueSchema = new mongoose.Schema({
  name: String,
  leagueNo: Number,
  isAdmin: {
    type: Boolean,
  },
})

const scoreSchema = new mongoose.Schema({
  episodeNum: Number,
  score: Number,
})

const profileSchema = new mongoose.Schema({
  email: {type: String, required: true, lowercase: true, unique: true},
  name: String,
  avatar: String,
  weeklyDrop:{
    type: Boolean,
    default: false,
  },
  score: [scoreSchema],
  league: [leagueSchema],
  roster: [rosterSchema],
  guessEpisode: [guessSchema],
  totalScore: {
    type: Number,
    default: 0,
  }
}, {
  timestamps: true
})

const Profile = mongoose.model('Profile', profileSchema)

export {
  Profile
}