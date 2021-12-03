require('dotenv').config();
const mongoose = require('mongoose');
const mySecret = process.env.MONGO_URI;
mongoose.connect(mySecret, { useNewUrlParser: true, useUnifiedTopology: true });
const Schema = mongoose.Schema;
const personSchema = new Schema({
  name: { type: String, required: true },
  age: Number,
  favoriteFoods: [String]
});

let Person = mongoose.model("Person", personSchema);

const createAndSavePerson = (done) => {
  var lillysmith = new Person({
    name: "Lilly Smith",
    age: 25,
    favoriteFoods: ["pizaa", "pasta", "cake"]
  })
  lillysmith.save(function(err, data) {
    if (err) return console.error(err);
    done(null, data);
  });
};

var arrayOfPeople = [
  {name: "Mark", age: 14, favoriteFoods: ["Chicken and Rice"]},
  {name: "Erik", age: 34, favoriteFoods: ["Chicken pot pie"]},
  {name: "Mary", age: 20, favoriteFoods: ["chocolate, pizza"]}
];

const createManyPeople = (arrayOfPeople, done) => {
  Person.create(arrayOfPeople, function (err, people) {
    if (err) return console.log(err);
    done(null, people);
  });
};

const findPeopleByName = (personName, done) => {
  Person.find({name: personName}, function (err, personFound) {
    if (err) return console.log(err);
    done(null, personFound);
  });
};

const findOneByFood = (food, done) => {
  Person.findOne({favoriteFoods: food}, function (err, data) {
    if (err) return console.log(err);
    done(null, data);
  });
};


const findPersonById = (personId, done) => {
  Person.findById(personId, function (err, data) {
    if (err) return console.log(err);
    done(null, data);
  });
};

const findEditThenSave = (personId, done) => {
  const foodToAdd = "hamburger";
  Person.findById(personId, function (err, Person) {
    if (err) return console.log(err);
    Person.favoriteFoods.push(foodToAdd);
    Person.save((err, updatedPerson) => {
        if(err) return console.log(err);
        done(null, updatedPerson)
    })
  });
};

const findAndUpdate = (personName, done) => {
  const ageToSet = 20;
  Person.findOneAndUpdate({name: personName}, {age: ageToSet}, {new: true}, (err, updatedDoc) => {
    if(err) return console.log(err);
    done(null, updatedDoc);
  })
};

const removeById = (personId, done) => {
  Person.findByIdAndRemove( personId, function(err, removedDoc){
    if(err) return console.log(err);
      done(null, removedDoc);
  })
};

const removeManyPeople = (done) => {
  const nameToRemove = "Mary";
  Person.remove({name: nameToRemove}, (err, removedDocs) => {
    if(err) return console.log(err);
    done(null, removedDocs);
  })
};

const queryChain = (done) => {
  const foodToSearch = "burrito";
  Person.find({favoriteFoods:foodToSearch})
  .sort({name : 1})
  .limit(2)
  .select({ age: 0 })
  .exec(function(error, data) {
    if(error) return console.log(error);
    done(null, data);
  })
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
