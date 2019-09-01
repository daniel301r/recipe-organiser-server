const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const mongoose = require('mongoose');

// Routes
const users = require('./api/routes/users');


const app = express();

app.use(bodyParser.json());
app.use(cors());

app.use('/', users)


// connect to MongoDB
mongoose.connect('mongodb+srv://bobx3256:' + process.env.MONGO_ATLAS_PW + '@cluster0-df2gn.mongodb.net/recipeOrganiser?retryWrites=true&w=majority', {useNewUrlParser: true});

const db = mongoose.connection;
db.on('error', console.error.bind(console, 'connection error:'));
db.once('open', function() {
  console.log('connected')
});

const database = {
    users: [
      {
        id: '123',
        name: 'John',
        email: 'john@gmail.com',
        password: 'cookies',
        recipes: [
          {
            name: "Turnip Noodle Carbonara",
            id: "turnip-carbonara",
            description: "A healthier version of the classic dish that tastes just as good!",
            tags: [
              "Bacon"
            ],
            ingredients: [
              {
                amount: "16",
                unit: "oz",
                name: "turnip noodles"
              },
              {
                amount: "3",
                name: "rashers bacon"
              },
              {
                amount: "5",
                name: "eggs"
              },
              {
                amount: "0.5",
                unit: "cup",
                name: "parmesan",
                preparation: "grated"
              },
              {
                amount: "4",
                name: "cloves garlic",
                preparation: "chopped, optional"
              },
              {
                amount: "0.25",
                unit: "cup",
                name: "heavy cream"
              },
              {
                name: "Salt"
              },
              {
                name: "Pepper",
                preparation: "freshly ground"
              }
            ],
            steps: [
                "Cut the bacon into lardons and sauté until it's lightly cooked.",				
                "While the bacon is cooking, separate the yolks from 4 of the eggs. Whisk 4 yolks, 1 egg, the grated parmesan, the cream, and salt and pepper.",		
                "If using garlic, add it once the bacon is starting to get cooked and saute for a few more minutes until fragrant",				
                "Stir in turnip noodles until they are cooked through to desired doneness",			
                "Turn the heat down to very low and stir in the egg mixture. Stir well until it cooks.",
                "Top with a little more ground pepper and serve!"
            ]
          },
          {
            name: "Spiced lamb chops with mint-mango sauce",
            id: "spiced-lamb-chops-with-mint-mango-sauce",
            description: "Delicious, refreshing, and super quick to make!",
            tags: [
              "Lamb"
            ],
            ingredients: [
              {
                "amount": "8",
                "name": "lamb chops"
              },
              {
                "amount": "0.25",
                "unit": "cup",
                "name": "olive oil"
              },
              {
                "amount": "4",
                "name": "garlic cloves"
              }
            ],
            steps: [
               "In a blender or mini food processor, blend all the sauce ingredients, and chill in the fridge.",
               "Blend the olive oil and garlic and coat the lamb chops.",
              "Make the spice mix, and coat the lamb chops well on both sides.",
              "Grill the lamb chops on a very hot cast iron grill pan (or a BBQ if you have one!) for 2-3 minutes on each side for medium rare.",
              "Done! Serve with the sauce on the side."
            ],
          }
        ]
      },
      {
        id: '124',
        name: 'Sally',
        email: 'sally@gmail.com',
        password: 'bananas',
        recipes: [
          {
          name: "Papoutsakia",
          id: "papoutsakia",
          description: "A traditional Greek dish that tastes very similar to moussaka ",
          tags: [
            "Greek"
          ],
          ingredients: [
            {
              "amount": "3",
              "name": "eggplants"
            },
            {
              "unit": "extra virgin olive oil"
            },
            {
              "name": "thyme"
            },
            {
              "name": "salt, black pepper"
            }
          ],
          steps: [
            "Cut the eggplants in half and scoop out the center. Leave about 1-1.5cm of flesh. Carve the flesh crosswise.",
            "Season the eggplants well with olive oil, salt, pepper, thyme. Use your hands to make sure it goes everywhere. Be fast, because they absorb the oil very quickly!",
            "Put eggplants on a large baking tray, cut side down and bake at 200C (392F) for 30-40 minutes.",
            "**Mince**: \n1. Fry the onions in the butter on high heat.\n2. Once the onions have started to caramelize, add the garlic and fry for a few more minutes.\n3. Add the cinnamon, cloves, allspice, black pepper and give it a stir.\n4. Add the mince and bay leaves and reduce heat to medium.\n5. Once the meat has started to brown, pour in the Metaxa.\n6. Add the tomato pureé, Sukrin Gold, bouillon base, and Worcestershire sauce and stir well.\n5. Reduce heat and simmer for about half an hour or until the tomato tastes cooked and any liquids have been reduced.",
            "**Béchamel:**\n1. Melt the butter in a small pot over low heat\n2. Whisk in the coconut flour, stirring continuously to make a roux\n3. When the roux ingredients are nicely combined, whisk in the cream, adding a little each time to avoid lumps\n4. Cook it over low heat, stirring continuously\n5. When it has thickened, add nutmeg, salt, pepper to taste\n6. Take it off the heat and stir in the yolks and grated cheese",
            "Scoop the minced meat into the eggplants, and top it with the béchamel. Bake for 10 minutes at 200C (392F), checking frequently because ovens vary. You may want to turn on the grill (US: broiler) for the last 5 minutes to give the cheese a nice golden brown."			
          ],
        }]
      }
    ]
  }



app.listen(process.env.PORT || 3001, ()=>{
    console.log(`app is running on ${process.env.PORT}`);
})