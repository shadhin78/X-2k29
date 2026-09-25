const fs = require('fs');
const path = require('path');

module.exports = function handler(req, res) {
  res.setHeader('Content-Type', 'application/json');
  res.setHeader('Cache-Control', 'no-cache, no-store, must-revalidate');
  res.setHeader('Pragma', 'no-cache');
  res.setHeader('Expires', '0');

  let firebaseConfig = null;
  const configPath = path.join(__dirname, '..', 'firebase-applet-config.json');
  if (fs.existsSync(configPath)) {
    try {
      firebaseConfig = JSON.parse(fs.readFileSync(configPath, 'utf8'));
    } catch (e) {}
  }

  res.status(200).json({
    mode: 'cloud',
    firebaseEnabled: true,
    firebaseConfig: firebaseConfig
  });
};


