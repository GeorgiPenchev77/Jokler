/*
Script to populate the MongoDB database with example data.
To run, use node *file name* in the terminal.
*/

const mongoose = require('mongoose');
mongoose.set("strictQuery", false);
var MongoURI =  process.env.MONGODB_URI || 'mongodb://localhost:27017/JoklerDB';

//import Mongoose models
const RegisteredUser = require("./models/registered_user");
const UnregisteredUser = require("./models/unregistered_user");
const Post = require("./models/jokle");
const Hashtag = require("./models/hashtag");
const Admin = require("./models/admin");

//create object arrays
const registeredUsers = [];
const unregisteredUsers = [];
const posts = [];
const hashtags = [];
const admins =  [];

main().catch((err) => console.log(err)); // run main and catch any erros

/*  
    since creating a object in the database is a asynchronous functions, we need to make sure we only seed the collections with instances
    after the actual instances are created. Otherwise we would run into major issues that will cause bugs. That is why we use promise to
    "promise" a response for the functions which they will return only when they have been executed. Since the seeding functions await for a response
    we guarantee we should not encounter any synchronization problems.
*/

async function main() {
  console.log("Debug: About to connect");
  await mongoose.connect(MongoURI);
  console.log("Debug: Should be connected?");
  await seedRegisteredUsers();
  await seedUnregisteredUsers();
  await seedAdmins();
  await seedHashtags();
  await seedPosts();
  console.log("Debug: Closing mongoose");
  mongoose.connection.close();
}

async function createRegisteredUser(index, name, pass, bio) {      // the function takes the parameters we want the instances to have                   
    const user = new RegisteredUser({username: name, password: pass, biography: bio});
    await user.save();              // save the instance created
    registeredUsers[index] = user;
    console.log(201);
}

async function createUnregisteredUser(index, example) {    // the function takes the parameters we want the instances to have
    const URuser = new UnregisteredUser({cookies: example});
    await URuser.save();              // save the instance created
    unregisteredUsers[index] = URuser;
    console.log(201);
}

async function createAdmin(index, name, pass){    // the function takes the parameters we want the instances to have
    const admin = new Admin({username: name, password: pass});
    await admin.save();              // save the instance created
    admins[index] = admin;
    console.log(201);
}

async function createHashtag(index, tag){    // the function takes the parameters we want the instances to have
    const hashtag = new Hashtag({tag: tag});
    await hashtag.save();              // save the instance created
    hashtags[index] = hashtag;
    console.log(201);
}

async function createPost(index, type, content, dislikes, rejokles){    // the function takes the parameters we want the instances to have
    const post = new Post({type: type, content: content, dislikes: dislikes, rejokles: rejokles});
    await post.save();              // save the instance created
    posts[index] = post;
    console.log(201);
}

async function seedRegisteredUsers(){
    await Promise.all([
    createRegisteredUser(0, "CringeLord", 'dcsg3145241d', 'I hate my life.' ),
    createRegisteredUser(1, "AlwaysDrunk124141", '4g2t7f0hr9m', 'I hate my life.' ),
    createRegisteredUser(2, "NeverSober420", 'nt493yef', 'I hate my life.' ),
    createRegisteredUser(3, "SendHoofPics", '4d28f3rmjd', 'I hate my life.' ),
    createRegisteredUser(4, "SubmissiveSupport", '23r84u0921', 'I hate my life.' ),
]);
}

async function seedUnregisteredUsers(){
    await Promise.all([
    createUnregisteredUser(0, "Example Valuable Information 0"),
    createUnregisteredUser(1, "Example Valuable Information 1"),
    createUnregisteredUser(2, "Example Valuable Information 2"),
    createUnregisteredUser(3, "Example Valuable Information 3"),
    createUnregisteredUser(4, "Example Valuable Information 4"),
    ]);
}

async function seedAdmins(){
    await Promise.all([
    createAdmin(0, "Autobot1", "UnhackablePassword1"),
    createAdmin(1, "Autobot2", "UnhackablePassword2"),
    createAdmin(2, "Autobot3", "UnhackablePassword3"),
    createAdmin(3, "Autobot4", "UnhackablePassword4"),
    createAdmin(4, "Autobot5", "UnhackablePassword5"),
    ]);
}

async function seedHashtags(){
    await Promise.all([
    createHashtag(0, "Food"),    
    createHashtag(1, "GimmeMyMoneyyyy"),    
    createHashtag(2, "HowToKillBatman"),    
    createHashtag(3, "Spa"),    
    createHashtag(4, "IKnowThatSeatHappy"),    
    ]);
}

async function seedPosts(){
    await Promise.all([
    createPost(0, "public", "I hate my life", 10000000, 0 ),    
    createPost(1, "private", "I hate my life", 111, 11 ),    
    createPost(2, "private", "I hate my life", 6, 9 ),    
    createPost(3, "pshycopaths-only", "I hate my life", 420, 420 ),    
    createPost(4, "private", "I hate my life", 666, 1337 ),
    createPost(5, "public", "I hate my life", 999, 333 ),      
    createPost(6, "pshycopaths-only", "I hate my life", 66, 6 ),    
    createPost(7, "public", "I hate my life", 10, 9 ),      
    ]);
}
    



