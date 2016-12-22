# Beginner API Development in Node, Express, ES6 & MongoDB

This is a simple project of an API implementation.

## Testing the API

### Add a FoodTruck

* Method: POST
* URL: http://localhost:3000/v1/foodtruck/add
* Raw:

```json
{
  "name" : "Some foodtruck name"
}
```

### Get All FoodTrucks

* Method: POST
* URL: http://localhost:3000/v1/foodtruck/

### Get FoodTruck by Id

* Method: POST
* URL: http://localhost:3000/v1/foodtruck/someId

### Update a FoodTruck

* Method: POST
* URL: http://localhost:3000/v1/foodtruck/someId
* Raw:

```json
{
  "name" : "New foodtruck name"
}
```
