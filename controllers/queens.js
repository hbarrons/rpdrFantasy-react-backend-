import { Queen } from "../models/queen.js";

export function addQueen (req, res) {
  Queen.create(req.params)
  .then(queen => {
    queen.name = req.params.queen
    queen.eliminated = false
    queen.save()
    console.log("queen: ", queen)
    res.status(201).json(queen)
  })
  .catch(err => {
    console.log(err)
    res.status(500).json(err)
  })
}

export function index(req,res) {
  Queen.find({})
  .then(queens => res.json(queens))
  .catch(err => {
    console.log(err)
    res.status(500).json(err)
  })
}

export function deleteQueen(req, res) {
  console.log("req.params: ", req.params.queen)
  Queen.findByIdAndDelete(req.params.queen)
  .then(queen => res.json(queen))
  .catch(err => {
    console.log(err)
    res.status(500).json(err)
  })
}