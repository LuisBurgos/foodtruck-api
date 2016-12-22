import mongoose from 'mongoose'
import { Router } from 'express'
import FoodTruck from '../model/foodtruck'

export default({ config, db }) => {
  let api = Router()

  // "/v1/foodtruck/add"
  api.post('/add', (req, res) => {
    let newFoodTruck = new FoodTruck()
    newFoodTruck.name = req.body.name

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

  return api
}
