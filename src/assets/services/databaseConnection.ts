import {Injectable} from "@angular/core";
declare var trafficMeister: any;

@Injectable()
export class databaseConnection {
  static database: any;
  

  constructor() {
  }

  static initDatabase(callback) {
    trafficMeister.fetchData((err, data) => {
      const fetchData = data;
      this.database = !err ? fetchData : [];
      callback(fetchData);
    });
  }
  
  static getOptions(): Array<string> {
    let options:Array<string> = [];
    let execeptions:Array<String> = ['id','img'];
    console.info(this.database);
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

  static getOptionsValues(values): any {
    let filtered = this.database.filter(elem => {
      let includes = true;
      Object.keys(values).forEach(val=>{
        includes = includes && (values[val] ? elem[val].includes(values[val]) : true);
      });
      return includes;
    });
    let result = {};
    if(filtered.length===1){
      result["img"] = filtered[0].img;
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
  static getDatabase(): any {
    return this.database;
  }
}