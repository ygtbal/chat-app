import fs from 'fs';
import path from 'path';

const basename = path.basename(__filename);
const db = {};
  fs.readdirSync(__dirname)
  .filter((file) => {
    return (file.indexOf('.') !== 0) && 
    (file !== basename) && (file.slice(-3) === '.js');
  }).forEach((file) => {
    const model = require(path.join(__dirname, file));
    db[file.substr(0, file.indexOf('.'))] = model;
  })


  export default db;
