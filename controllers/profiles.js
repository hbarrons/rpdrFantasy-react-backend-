import { Profile } from '../models/profile.js'

export function index(req, res) {
  Profile.find({})
  .then(profiles => res.json(profiles))
  .catch(err => {
    console.log(err)
    res.status(500).json(err)
  })
}

export function createLeague(req,res) {
  console.log("body: ", req.body)
  console.log("req.params: ", req.params)
  // Profile.findById(req.params.userId)
  // .then(profile => console.log("profile: ", profile))
  // .catch(err => {
  //   console.log(err)
  //   res.status(500).json(err)
  // })
}


