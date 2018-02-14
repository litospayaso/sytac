import {Injectable} from "@angular/core";
declare var trafficMeister: any;

@Injectable()
export class databaseConnection {
  static database: any;
  
  constructor() {
  }

 /**
 * @namespace databaseConnection.initDatabase
 * @desc Initialize database (is mandatory to init before interact with database).
 * @param {function} callback - Callback function to exectute when data is ready.
 */
  static initDatabase(callback) {
    trafficMeister.fetchData((err, data) => {
      const fetchData = data;
      this.database = !err ? fetchData : [];
      callback(fetchData);
    });
  }
  
 /**
 * @namespace databaseConnection.getOptions
 * @desc Get the name of object properties (exclude id & img).
 * @returns {Array<string>} An array with the name of each object property.
 */
static getOptions(): Array<string> {
    let options:Array<string> = [];
    let execeptions:Array<String> = ['id','img']; //those execptions are configurable.
    if(this.database){
      const data = this.database[0];
      Object.keys(data).forEach(option=>{
        if(!execeptions.includes(option)){
          options.push(option);
        }
      });
      return options;
    }
  }

 /**
 * @namespace databaseConnection.filterByValues
 * @desc Filter database by an object values.
 * @param {values} - Object with each value to filter by.
 * @returns {Array<Object>} An array with the name of each object property.
 */
  static filterByValues(values): Array<Object> {
    return this.database.filter(elem => {
      let includes = true;
      Object.keys(values).forEach(val=>{
        includes = includes && (values[val] ? elem[val].includes(values[val]) : true);
      });
      return includes;
    });
  }

/**
 * @namespace databaseConnection.getOptionsValues
 * @desc Get a value list with the posible options filter by values.
 * @param {values} - Object with each value to filter by.
 * @returns {any} Object list with option names and posible values.
 */
  static getOptionsValues(values): any {
    let filtered = this.filterByValues(values);
    let result = {};
    if(filtered.length===1){
      result["img"] = filtered[0]['img'];
    }
    filtered.forEach(elem=>{
      Object.keys(values).forEach(value => {
        result[value] = result[value]?result[value]:[];
        if(typeof(elem[value])==="string"){
          if(!result[value].includes(elem[value]))
            result[value].push(elem[value]);
        }else{
          elem[value].forEach(listElement => {            
            if(!result[value].includes(listElement))
            result[value].push(listElement);
          });
        }
      });
    });
    return result;
  }

 /**
 * @namespace databaseConnection.getDatabase
 * @desc Get raw database with all information.
 * @returns {any} database.
 */
  static getDatabase(): any {
    return this.database;
  }
}