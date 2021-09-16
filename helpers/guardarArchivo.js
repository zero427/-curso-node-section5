const fs = require('fs')
const srcArchivo = './db/data.json';

const guardarDB = (data) => {
    fs.writeFileSync(srcArchivo, JSON.stringify(data))
}

const leerDB = () => {
    if(!fs.existsSync(srcArchivo))
        return null;
        
    const info = fs.readFileSync(srcArchivo, {encoding:'utf-8'});
    const data = JSON.parse(info);
  
    return data;
}

module.exports = {
    guardarDB,
    leerDB
}