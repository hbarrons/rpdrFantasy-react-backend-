import { Queen } from "../models/queen.js";

export function addQueen (req, res) {
  Queen.create(req.params)
  .then(queen => {
    queen.name = req.params.queen
    queen.eliminated = false
    queen.save()
    Queen.find({})
    .then(queens => {
      console.log(queens)
      res.status(201).json(queens)
    })
  })
  .catch(err => {
    console.log(err)
    res.status(500).json(err)
  })
}

export function index(req,res) {
  Queen.find({})
  .then(queens => res.status(201).json(queens))
  .catch(err => {
    console.log(err)
    res.status(500).json(err)
  })
}

export function deleteQueen(req, res) {
  console.log("hit")
  Queen.findByIdAndDelete(req.params.queen)
  .then(queen => console.log("deleted queen: ", queen))
  Queen.find({})
  .then(queens => {
    res.json(queens)
    console.log(queens)
  })
  .catch(err => {
    console.log(err)
    res.status(500).json(err)
  })
}