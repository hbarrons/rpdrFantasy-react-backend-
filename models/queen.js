import mongoose from 'mongoose'

const queenSchema = new mongoose.Schema({
  leagueNo: Number,
  name: String,
  eliminated: Boolean,
}, {
  timestamps: true
})

const Queen = mongoose.model('Queen', queenSchema)

export {
  Queen
}
