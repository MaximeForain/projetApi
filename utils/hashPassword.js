const bcrypt = require("bcrypt");

// Méthode temporere pour hashe les password directment dans la consol et les filer à la DB :)
module.exports.hashPasswordConsol = (password) => {
    bcrypt.hash(password, 10, function(err, hash) {
        console.log(`(${password}) hashed to => ${hash}`);
    });
}


