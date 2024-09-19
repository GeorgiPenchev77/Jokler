const mongoose = require('mongoose');
const db = connect('mongodb://localhost:27017/JoklerDB');
//import schemas
const RegisteredUser = require("./models/registered_user");
const UnregisteredUser = require("./models/unregistered_user");
const Post = require("./models/jokler");
const Hashtag = require("./models/hashtag");
const Admin = require("./models/admin");

// Define the seed function
const seedDatabase = async () => {

//create objects
const regUserObj = [
    {username: 'CringeLord' , password: 'dcsg3145241d' , biography: 'I hate my life.' },
    {username: 'AlwaysDrunk124141' , password: '4g2t7f0hr9m' , biography: 'I hate my life.' },
    {username: 'NeverSober420' , password: 'nt493yef' , biography: 'I hate my life.' },
    {username: 'SendHoofPics' , password: '4d28f3rmjd' , biography: 'I hate my life.' },
    {username: 'SubmissiveSupport' , password: '23r84u0921' , biography: 'I hate my life.' },
    ]
    
    const unregUserObj = [
    {valuableInformation: 'GimmeMyMoneyyy'},
    {valuableInformation: 'GimmeMyMoneyyy'},
    {valuableInformation: 'GimmeMyMoneyyy'},
    {valuableInformation: 'GimmeMyMoneyyy'},
    {valuableInformation: 'GimmeMyMoneyyy'},    
    ]
    
    const postObj = [
    {type: 'public', content: 'I hate my life', dislikes: 10000000, rejokles: 0},
    {type: 'private', content: 'I hate my life', dislikes: 10000000, rejokles: 0},
    {type: 'physcopaths-only', content: 'I hate my life', dislikes: 6, rejokles: 9},
    {type: 'public', content: 'I hate my life', dislikes: 111, rejokles: 1},
    {type: 'private', content: 'I hate my life', dislikes: 0, rejokles: 1000000},
    {type: 'public', content: 'I hate my life', dislikes: 666, rejokles: 1337},
    {type: 'public', content: 'I hate my life', dislikes: 42, rejokles: 0},    
    ]
    
    const hashtagObj = [
    {tag: 'Food'},    
    {tag: 'HowToKillTheBatman'},    
    {tag: 'Rich'},    
    {tag: 'Spa'},    
    {tag: 'Fishing'},    
    ]
    
    const adminObj = [
    {username: 'Autobot1', password: 'HackablePassword1'},
    {username: 'Autobot2', password: 'HackablePassword2'},
    {username: 'Autobot3', password: 'HackablePassword3'},
    {username: 'Autobot4', password: 'HackablePassword4'},    
    {username: 'Autobot5', password: 'HackablePassword5'},
    ]

    try {
        // First clear any existing data 
        db.RegisteredUser.deleteMany({});
        db.UnregisteredUser.deleteMany({});
        db.Post.deleteMany({});
        db.Hashtag.deleteMany({});
        db.Admin.deleteMany({});

        dbo.collection("RegisteredUser").insertMany(regUserObj, function(err, res) {
            if (err) throw err;
            console.log("Number of documents inserted: " + res.insertedCount);
        });

        
        dbo.collection("UnregisteredUser").insertMany(unregUserObj, function(err, res) {
            if (err) throw err;
            console.log("Number of documents inserted: " + res.insertedCount);
        });
        
        dbo.collection("Post").insertMany(postObj, function(err, res) {
            if (err) throw err;
            console.log("Number of documents inserted: " + res.insertedCount);
        });
        
        dbo.collection("Hashtag").insertMany(hashtagObj, function(err, res) {
            if (err) throw err;
            console.log("Number of documents inserted: " + res.insertedCount);
        });
        
        dbo.collection("Admin").insertMany(adminObj, function(err, res) {
            if (err) throw err;
            console.log("Number of documents inserted: " + res.insertedCount);
        });
      

        console.log('Database seeded successfully!');
    } catch (error) {
        console.error('Error seeding database:', error);
    } finally {
        db.close();
        mongoose.connection.close();
    }
};

// Export the seed function
module.exports = seedDatabase;
