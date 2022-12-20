const fs = require('fs');

module.exports = {
  // Write log
  log: (message) => {
    try {
      fs.writeFileSync(process.env.logFolder, message);
      // fichier écrit avec succès
    } catch (err) {
      console.error(err);
    }
  },
};

