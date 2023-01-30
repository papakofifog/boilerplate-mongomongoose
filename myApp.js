require('dotenv').config();

let mongoose=require('mongoose');

let express= require('express')
let app=express()


mongoose.connect(process.env['MONGO_URI'],{ useNewUrlParser: true, useUnifiedTopology: true });

const personSchema= new mongoose.Schema({
  name: {
    type: String,
    required:true,
    unique: true
  },
  age: {
    type: Number
  },
  favoriteFoods: {
    type: [String]
  }
  
});

const Person=mongoose.model('Person',personSchema)


//let Person;



const createAndSavePerson = (done) => {
  let Person1= new Person({
    name:'Alex',
    age:22,
    favoriteFoods:['Waakye','Fuufu and Palm Nut Soup']
  })
  
  Person.save(function(err,data){
    if(err) return console.error(err);
    done(null,data)
  })
  
  
};

let arrayofPeople= [
      {
        name:'James',
        age:22,
        favoriteFoods:['Rice','carrot','appleMix'],
      },
      {
        name:'Felix',
        age:54,
        favoriteFoods:['Fufu','Onions','Flour'],
      },
      {
        name:'Josh',
        age:12,
        favoriteFoods:['face the wall','rice','yam'],
      },
      {
        name:'Lara',
        age:25,
        favoriteFoods:['Omutuo','rice'],
      }
    ]

const createManyPeople = (arrayOfPeople, done) => {
  Person.create(arrayOfPeople,function(err,data){
    if(err) return console.err(error)
    done(null,data)
  })

};



const findPeopleByName = function(personName, done) {
  Person.find({name: personName}, function (err, personFound) {
    if (err) return console.log(err);
    done(null, personFound);
  });
};




const findOneByFood = (food, done) => {
  //console.log(food);
  Person.findOne({favoriteFoods: food}, function(err,data){
    if(err) return console.error(err)
    done(null,data)
  })
};

const findPersonById = (personId, done) => {
  Person.findById(personId, function(err,data){
    if (err) return console.error(err);
    done(null,data);
  })
};

const findEditThenSave = (personId, done) => {
  const foodToAdd = "hamburger";
  Person.findById(personId,function(err,person){
    if (err) return console.error(err)
    person.favoriteFoods.push(foodToAdd);

    person.save(function(err,data){
      if(err) return console.error(err);
      done(null,data)
    })
    
  });
  
  
};

const findAndUpdate = (personName, done) => {
  const ageToSet = 20;
  Person.findOneAndUpdate({name: personName}, {age: ageToSet},{ new:  true},function(err,updatedDoc){
    if(err) return console.error(err);
    done(null,updatedDoc)
  })
};

const removeById = (personId, done) => {
  Person.findByIdAndRemove(personId, function(err,removedDoc){
    if(err) return console.error(err)
    done(null,removedDoc);
  })
  
};



const removeManyPeople = (done) => {
  let nameToRemove = "Mary";
  Person.remove({name:  nameToRemove }, function(err,response){
    if(err) return console.error(err);
    done(null,response);
  })
};

const queryChain = (done) => {
  const foodToSearch = "burrito";

  done(null /*, data*/);
};


/** **Well Done !!**
/* You completed these challenges, let's go celebrate !
 */

//----- **DO NOT EDIT BELOW THIS LINE** ----------------------------------

exports.PersonModel = Person;
exports.createAndSavePerson = createAndSavePerson;
exports.findPeopleByName = findPeopleByName;
exports.findOneByFood = findOneByFood;
exports.findPersonById = findPersonById;
exports.findEditThenSave = findEditThenSave;
exports.findAndUpdate = findAndUpdate;
exports.createManyPeople = createManyPeople;
exports.removeById = removeById;
exports.removeManyPeople = removeManyPeople;
exports.queryChain = queryChain;
