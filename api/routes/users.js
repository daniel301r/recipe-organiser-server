const express = require('express');
const router = express.Router();
const mongoose = require('mongoose');
const bcrypt = require('bcrypt');

const User = require('../models/users');

// home

router.get('/', (req, res) => {
  return res.send('it is working')
});

router.get('/home/:userId', (req, res) => {
  const id = req.params.userId;
  User.findOne({ _id: id})
    .exec()
    .then(user => {
      // should probably check to see if user has been found
      res.status(202).json({
        message: 'recipes found',
        recipes: user.recipes
      })
    })
    .catch(err => {
      console.log(err)
      res.status(404).json({error: err})
    })

})

// recipe page

router.get('/recipe/:userId/:recipe_id', (req, res) => {
  const { userId, recipe_id } = req.params;
  User.findOne({ _id: userId})
    .exec()
    .then(user => {
      // should probably check to see if user has been found
      const recipe = user.recipes.find(recipe => {
        return recipe._id == recipe_id
      })
      res.status(202).json({
        message: 'recipe found',
        recipe
      })
    })
    .catch(err => {
      console.log(err)
      res.status(404).json({error: err})
    })

})

// all edit recipes

// get recipe data overview

router.get('/editRecipe/overview/:userId/:recipe_id', (req, res) => {
  const { userId, recipe_id } = req.params;
  User.findOne({ _id: userId })
    .exec()
    .then(user => {
      // I had to compare it with '==' this because for some reason I can't convert one of them to strings
      const recipe = user.recipes.find(recipe => {
        return recipe._id == recipe_id
      })
      res.status(202).json({
        message: 'recipe found',
        recipe
      })
    })
    .catch(err => {
      console.log(err)
    })
})

// edit overview change data

router.post('/editRecipe/overview/:userId/:recipe_id', (req, res) => {
  const { userId, recipe_id } = req.params;
  User.findOne({ _id: userId })
    .exec()
    .then(user => {
      // I had to compare it with '==' this because for some reason I can't convert one of them to strings
      let recipe = user.recipes.find(recipe => {
        return recipe._id == recipe_id
      })
      // here I need to add the new data to recipe and then I need to replace it in the 
      const { name, description, recipeTags, comments } = req.body;
      recipe.name = name;
      recipe.description = description;
      recipe.tags = recipeTags;
      recipe.comments = comments;

      user.recipes[recipe_id] = recipe;

      user
      .save()
      .then(response => {
        console.log(response);
        res.status(201).json(response);
      })
      .catch(err => {
        console.log(err, "can't save recipe")
      })
    })

    .catch(err => {
      console.log(err, 'user or recipe not found')
    })     
})

// get recipe data instructions

router.get('/editRecipe/instructions/:userId/:recipe_id', (req, res) => {
  const { userId, recipe_id } = req.params;
  User.findOne({ _id: userId })
    .exec()
    .then(user => {
      // I had to compare it with '==' this because for some reason I can't convert one of them to strings
      const recipe = user.recipes.find(recipe => {
        return recipe._id == recipe_id
      })
      console.log(recipe);
      res.status(202).json({
        message: 'recipe found',
        recipe
      })
    })
    .catch(err => {
      console.log(err)
    })
})

router.post('/editRecipe/instructions/:userId/:recipe_id', (req, res) => {
  const { userId, recipe_id } = req.params;
  User.findOne({ _id: userId })
    .exec()
    .then(user => {
      // I had to compare it with '==' this because for some reason I can't convert one of them to strings
      let recipe = user.recipes.find(recipe => {
        return recipe._id == recipe_id
      })
      // here I need to add the new data to recipe and then I need to replace it in the 
      const { instructions } = req.body;
      recipe.instructions = instructions;

      user.recipes[recipe_id] = recipe;

      user
      .save()
      .then(response => {
        console.log(response);
        res.status(201).json(response);
      })
      .catch(err => {
        console.log(err, "can't save recipe")
      })
    })

    .catch(err => {
      console.log(err, 'user or recipe not found')
    })
})

router.get('/editRecipe/ingredients/:userId/:recipe_id', (req, res) => {
  const { userId, recipe_id } = req.params;
  User.findOne({ _id: userId })
    .exec()
    .then(user => {
      // I had to compare it with '==' this because for some reason I can't convert one of them to strings
      const recipe = user.recipes.find(recipe => {
        return recipe._id == recipe_id
      })
      console.log(recipe);
      res.status(202).json({
        message: 'recipe found',
        recipe
      })
    })
    .catch(err => {
      console.log(err)
    })
})

router.post('/editRecipe/ingredients/:userId/:recipe_id', (req, res) => {
  const { userId, recipe_id } = req.params;
  User.findOne({ _id: userId })
    .exec()
    .then(user => {
      // I had to compare it with '==' this because for some reason I can't convert one of them to strings
      let recipe = user.recipes.find(recipe => {
        return recipe._id == recipe_id
      })
      // here I need to add the new data to recipe and then I need to replace it in the 
      const { ingredients } = req.body;
      recipe.ingredients = ingredients;

      user.recipes[recipe_id] = recipe;

      user
      .save()
      .then(response => {
        console.log(response);
        res.status(201).json(response);
      })
      .catch(err => {
        console.log(err, "can't save recipe")
      })
    })

    .catch(err => {
      console.log(err, 'user or recipe not found')
    })
})

// sign up

router.post('/signup', (req, res) =>{
  const { name, email } = req.body;
  User.find({ email: email })
    .exec()
    .then(user => {
      if (user.length >= 1) { // we do this because it returns an array even if it doesn't find something so we check to see if there is actually one
        return res.status(422).json({
          message: 'Mail already exists',
          user: user
        });
      } else {
        bcrypt.hash(req.body.password, 10, function(err, hash){
          if (err) {
            return res.status(500).json({error: err})
          } else {
            const user = new User({
              _id: new mongoose.Types.ObjectId(),
              name,
              email,
              password: hash,
              joined: new Date()
            });
            user
              .save() // this saves user to database
              .then(user => {
                console.log(user);
                res.status(201).json(user);
              })
              .catch(err => {
                console.log(err);
                res.status(500).json({error: err})
              }); 
          }
        }) 
      }
    })
    .catch(err => {
      console.log(err);
      res.status(500).json({ error: err })
    })
})

// sign in
router.post('/signin', (req, res) => {
  User.find({ email: req.body.email })
    .exec()
    .then(user => {
      if (user.length < 1){
        return res.status(401).json({
          message: 'Auth failed'
        })
      }
      bcrypt.compare(req.body.password, user[0].password, (err, result) =>{
        if (err){
          return res.status(401).json({
            message: 'Auth failed'
          });
        }
        if (result) {
          return res.status(200).json({
            message: 'Auth successful',
            user: user
          });
        }
        res.status(401).json({
          message: 'Auth failed'
        })
      });
    })
    .catch(err => {
      console.log(err);
      res.status(500).json({error: err})
    });
});

// add recipe to database

// should this be post or put?
router.put('/addRecipe/instructions', (req, res) => {
  const { userId, recipe } = req.body;
  User.findOne({ _id: userId })
    .exec()
    .then(user => {
      // probably should check here if the user has been found
      user.recipes.push({
        _id: new mongoose.Types.ObjectId(),
        name: recipe.name,
        description: recipe.description,
        tags: recipe.tags,
        comments: recipe.comments,
        ingredients: recipe.ingredients,
        instructions: recipe.instructions
      })
      user
        .save()
        .then(user => {
          console.log(user);
          res.status(200).json({
            message: 'Success',
            user: user
          })
        })
    })
    .catch(err => {
      console.log(err);
      res.status(500).json({error: err})
    })
})

module.exports = router;