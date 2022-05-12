import mongoose from 'mongoose'

const queenSchema = new mongoose.Schema({
  leaguNo: Number,
  name: String,
  eliminated: Boolean,
}, {
  timestamps: true
})

const Queen = mongoose.model('Queen', queenSchema)

export {
  Queen
}
