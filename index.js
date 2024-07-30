const express = require('express');
const bcrypt = require('bcrypt');
const saltRounds = 10;
const myPlaintextPassword = 's0/\/\P4$$w0rD';
const someOtherPlaintextPassword = 'not_bacon';
const cors = require('cors');
const knex = require('knex');
const Clarifai = require('clarifai');

import register from "./controllers/register.js"
const signin = require('./controllers/signin');
const profile = require('./controllers/profile');
const image = require('./controllers/image');

const PAT = '85896515269a47d7912e5e6b3fdab9c0';
const USER_ID = '112yogi';
const APP_ID = 'facereco';
const MODEL_ID = 'face-detection';
const MODEL_VERSION_ID = '6dc7e46bc9124c5c8824be4822abe105';

const PORT = process.env.PORT;

const db = knex({
    client: 'pg',
    connection: {
        host: 'dpg-cqkb9l2ju9rs738k42s0-a',
        port: 5432, // Updated to the correct PostgreSQL port
        user: 'db_ma7q_user',
        password: '7Ct32MSqmHkYqRjTLMS8VPTlJmmi2jjd',
        database: 'db_ma7q'
    }
});

// db.select('*').from('users').then(data => {
//     console.log(data);
// });

const app = express();

app.use(express.json());
app.use(cors());

// const database = {
//     users: [
//         {
//             id: '123',
//             name: 'John',
//             email: 'john@gmail.com',
//             password: 'cookies',
//             entries: 0,
//             joined: new Date()
//         },
//         {
//             id: '124',
//             name: 'Sally',
//             email: 'sally@example.com',
//             password: 'banana',
//             entries: 0,
//             joined: new Date()
//         },

//     ]
// }


// app.get('/', (req, res) => {res.send(database.users);});
app.post('/signin', (req, res) => { signin.handleSignin(db, bcrypt)(req, res) });
app.post('/register', (req, res) => { register.registerHandler(req, res, db, bcrypt) });
app.get('/profile/:id', (req, res) => { profile.handleProfile(req, res, db) });
app.put('/image', (req, res) => { image.handleImage(req, res, db) });

app.listen(PORT, () => {
    console.log(`server running on port ${PORT}`);
});


// // Load hash from your password DB.
// bcrypt.compare(myPlaintextPassword, hash, function (err, result) {
//     // result == true
// });
// bcrypt.compare(someOtherPlaintextPassword, hash, function (err, result) {
//     // result == false
// });

/*F
/ - create a fake db
/ - add signin post request
/ - add register post request
/ - user middelware login
/ - test with postman 

/- Do it for the profile page
/- Image PUT request
*/