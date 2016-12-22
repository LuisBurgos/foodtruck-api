import mongoose from 'mongoose'
import { Router } from 'express'
import FoodTruck from '../model/foodtruck'

export default({ config, db }) => {
  let api = Router()

  // "/v1/foodtruck/add"
  api.post('/add', (req, res) => {
    let newFoodTruck = new FoodTruck()
    newFoodTruck.name = req.body.name
    newFoodTruck.foodtype = req.body.foodtype
    newFoodTruck.avgcost = req.body.avgcost
    newFoodTruck.geometry.coordinates = req.body.geometry.coordinates

    newFoodTruck.save(err => {
      if(err){
        res.send(err)
      } else {
        res.json({
          message: "FoodTruck saved successfully"
        })
      }
    })
  })

  // "/v1/foodtruck/"
  api.get('/', (req, res) => {
    FoodTruck.find({}, (err, foodtrucks) => {
      if(err){
        res.send(err)
      } else {
        res.json(foodtrucks)
      }
    })
  })

  // "/v1/foodtruck/id"
  api.get('/:id', (req, res) => {
    FoodTruck.findById(req.params.id, (err, foodtruck) => {
      if(err){
        res.send(err)
      } else {
        res.json(foodtruck)
      }
    })
  })

  // "/v1/foodtruck/id"
  api.put('/:id', (req, res) => {
    FoodTruck.findById(req.params.id, (err, foodtruck) => {
      if(err){
        res.send(err)
      } else {
        foodtruck.name = req.body.name
        foodtruck.foodtype = req.body.foodtype
        foodtruck.avgcost = req.body.avgcost
        foodtruck.geometry.coordinates = req.body.geometry.coordinates
        
        foodtruck.save(err => {
          if(err){
            res.send(err)
          } else {
            res.json({
              message: "FoodTruck info updated"
            })
          }
        })
      }
    })
  })

  // "/v1/foodtruck/id"
  api.delete('/:id', (req, res) => {
    FoodTruck.remove({
      _id: req.params.id
    }, (err, foodtruck) => {
      if(err){
        res.send(err)
      } else {
        res.json({
          message: "FoodTruck successfully removed"
        })
      }
    })
  })

  // Add Review for a specific truck id
  // "/v1/foodtruck/reviews/add/:id"
  api.post('reviews/add/:id', (req, res) => {
    FoodTruck.findById(req.params.id, (err, foodtruck) => {
      if(err){
        res.send(err)
      } else {
        let newReview = new Review()
        newReview.title = req.body.title
        newReview.text = req.body.text
        newReview.foodtruck = foodtruck._id

        newReview.save((err, review) => {
          if(err){
            res.send(err)
          }
          foodtruck.reviews.push(newReview)
          foodtruck.save(err => {
            if(err){
              res.send(err)
            } else {
              res.json({
                message: "FoodTruck review saved"
              })
            }
          })
        })
      }
    })
  })


  return api
}
