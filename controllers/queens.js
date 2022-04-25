import { Queen } from "../models/queen.js";

export function addQueen (req, res) {
  Queen.create(req.params)
  .then(queen => {
    queen.name = req.params.queen
    queen.eliminated = false
    queen.save()
    console.log("queen: ", queen)
  })
}