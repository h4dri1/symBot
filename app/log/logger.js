const fs = require('fs');
require("dotenv").config({ path: "~/dev/symBot/.env" })

module.exports = {
  // Write log
  log: (message) => {
    try {
      fs.writeFileSync(process.env.LogFolder, message);
      console.log(message);
      // fichier écrit avec succès
    } catch (err) {
      console.error(err);
    }
  },
};

