import express from 'express';
import bcrypt from 'bcrypt';
import cors from 'cors';
import knex from 'knex';
import Clarifai from 'clarifai';

import register from "./controllers/register.js";
import signin from './controllers/signin.js';
import profile from './controllers/profile.js';
import image from './controllers/image.js';


const clarifai = new Clarifai.App({
    apiKey: process.env.API_CLARIFAI
});



const saltRounds = 10;
const myPlaintextPassword = 's0/\\/\\P4$$w0rD';
const someOtherPlaintextPassword = 'not_bacon';

const PAT = '85896515269a47d7912e5e6b3fdab9c0';
const USER_ID = '112yogi';
const APP_ID = 'facereco';
const MODEL_ID = 'face-detection';
const MODEL_VERSION_ID = '6dc7e46bc9124c5c8824be4822abe105';

const PORT = process.env.PORT || 3000;  // default to 3000 if PORT is not defined

const db = knex({
    client: 'pg',
    connection: {
        host: process.env.DATABASE_HOST,
        port: 5432,
        user: process.env.DATABASE_USER,
        password: process.env.DATABASE_PW,
        database: process.env.DATABASE_DB
    }
});

const app = express();

app.use(express.json());
app.use(cors());

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