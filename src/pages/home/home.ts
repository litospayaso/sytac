import { Component } from '@angular/core';
import { LoadingController } from 'ionic-angular';

import { databaseConnection } from '../../assets/services/databaseConnection';

@Component({
  selector: 'page-home',
  templateUrl: 'home.html'
})
export class HomePage {
  finalVehiclePicture: string;
  optionsLabels: string[];
  optionsValues:Object;
  selectValues: Object;

  constructor(public loadingCtrl: LoadingController,
  ) {
    this.restart();
  }

 /**
 * @namespace homePage.initOptions
 * @desc Initialize database (is mandatory to init before interact with database).
 */
  initOptions(){
    this.optionsLabels = databaseConnection.getOptions();
    let values = {};
    this.optionsLabels.forEach(option=>{
      values[option] = "";
    });
    this.optionsValues=values;
    this.selectValues = databaseConnection.getOptionsValues(values);
  }

  /**
   * @namespace homePage.handleOption
   * @desc Handle the change in any select option.
   */
  handleOption(){
    this.selectValues = databaseConnection.getOptionsValues(this.optionsValues);
    if(this.selectValues['img']){
      let finalVehiclePicture = this.selectValues['img'];
      this.finalVehiclePicture = finalVehiclePicture;
    }
  }

  /**
   * @namespace homePage.restart
   * @desc Restart all values and make a new database connection.
   */
  restart(){
    this.selectValues = {};
    this.optionsLabels = [];
    this.optionsValues = {};
    this.finalVehiclePicture = "";
    let loader = this.loadingCtrl.create({
      content:'Loading...'
    });
    loader.present();
    databaseConnection.initDatabase(data => {
      loader.dismiss();
      if(data){
        this.initOptions();
      }else{
        this.optionsLabels = null;
      }
    });
  }
}
