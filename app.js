const Router = require('./route');
const express = require('express');
//var cors = require('cors');
const app = express();
//const port = 3001;

app.use(cors());
app.use(express.json());
app.use(Router);



// app.listen(port, () => {
//     console.log(`Example app listening at http://localhost:${port}`);
// });



// Méthode temporaire pour hacher les password à mettre dans la DB
// doit rester décomenté
/****************************************************************/
const {hashPasswordConsol} = require('./utils/hashPassword');
hashPasswordConsol("userPassword");
hashPasswordConsol("user2Password");
hashPasswordConsol("user3Password");
hashPasswordConsol("adminPassword");
/****************************************************************/




