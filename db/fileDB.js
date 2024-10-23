import  fs from 'fs';
import path from 'path';


const schemas = {};

const dbFolder = path.join(process.cwd(), 'db');


if (!fs.existsSync(dbFolder)) {
  fs.mkdirSync(dbFolder);
}


export function registerSchema(tableName, schema) {
  schemas[tableName] = schema;

  
  const filePath = path.join(dbFolder, `${tableName}.json`);
  if (!fs.existsSync(filePath)) {
    fs.writeFileSync(filePath, JSON.stringify([])); 
  }
}


export function getTable(tableName) {
  if (!schemas[tableName]) {
    throw new Error(`Schema for table ${tableName} is not registered.`);
  }

  const filePath = path.join(dbFolder, `${tableName}.json`);

  
  function readFile() {
    const data = fs.readFileSync(filePath, 'utf8');
    return JSON.parse(data);
  }
 


  function writeFile(data) {
    fs.writeFileSync(filePath, JSON.stringify(data, null, 2));
  }

  return {
    
    getAll() {
      return readFile();
    },

    
    getById(id) {
      const data = readFile();
      return data.find(item => item.id === id);
    },

    
    create(newRecord) {
      const data = readFile();
      const newId = data.length > 0 ? data[data.length - 1].id + 1 : 1;
      const record = { id: newId, createDate: new Date(), ...newRecord };
      data.push(record);
      writeFile(data);
      return record;
    },

    
    update(id, updatedFields) {
      const data = readFile();
      const recordIndex = data.findIndex(item => item.id === id);

      if (recordIndex === -1) {
        throw new Error(`Record with id ${id} not found`);
      }

      const updatedRecord = { ...data[recordIndex], ...updatedFields };
      data[recordIndex] = updatedRecord;
      writeFile(data);
      return updatedRecord;
    },

    
    delete(id) {
      const data = readFile();
      const updatedData = data.filter(item => item.id !== id);

      if (data.length === updatedData.length) {
        throw new Error(`Record with id ${id} not found`);
      }

      writeFile(updatedData);
      return id;
    }
  };
  
}