import { Queen } from "../models/queen.js";

export function addQueen (req, res) {
  console.log("req.params: ", req.params)
  Queen.create(req.params)
  .then(queen => {
    queen.name = req.params.queen
    queen.eliminated = false
    queen.leagueNo = req.params.leagueNo
    queen.save()
    Queen.find({})
    .then(queens => {
      res.status(201).json({queens, queen})
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
  .then(queen => {
    console.log("deleted queen: ", queen)
    Queen.find({})
    .then(queens => {
      res.json(queens)
    })
  })
  .catch(err => {
    console.log(err)
    res.status(500).json(err)
  })
}

export function eleminateQueen (req,res) {
  console.log(req.params)
  Queen.findById(req.params.queen)
  .then(queen => {
    queen.eliminated = true
    queen.save()
    res.status(201).json(queen)
  })
}

export function undoElim (req,res) {
  console.log("undo elim: ",req.params)
  Queen.findById(req.params.queen)
  .then(queen => {
    queen.eliminated = false
    queen.save()
    res.status(201).json(queen)
  })
}
