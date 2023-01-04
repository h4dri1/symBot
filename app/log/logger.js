const fs = require('fs');
require("dotenv").config({ path: './.env' })

module.exports = {
  // Write log
  log: (message) => {
    try {
      fs.writeFileSync(process.env.LogFolder, `${new Date().toLocaleString()} : ${message}\n`, { flag: 'a' });
      console.log(message);
      // fichier écrit avec succès
    } catch (err) {
      console.error(err);
    }
  },
};

