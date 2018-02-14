var trafficMeister = require('../../src/assets/services/database');
import { expect } from 'chai';
import {databaseConnection} from '../../src/assets/services/databaseConnection';
global.trafficMeister = trafficMeister;
describe('Database Connection', () => {
    describe('#initDatabase', () => {
      it('should initialize database and return an array', (done) => {
        databaseConnection.initDatabase(data=>{
          expect(data).to.be.a('Array');
          done();
        });
      });
    });
    describe('#getDatabase', () => {
      it('should return an array with raw database', () => {
        expect(databaseConnection.getDatabase()).to.be.a('Array');
        expect(databaseConnection.getDatabase()).to.have.lengthOf(12);
      });
    });
    describe('#getOptions', () => {
      it('should return an array with 3 values', () => {
        expect(databaseConnection.getOptions()).to.be.a('Array');
        expect(databaseConnection.getOptions()).to.have.lengthOf(3);
      });
      it('should contains type values (type,brand,colors)', () => {
        expect(databaseConnection.getOptions()).to.include("type");
        expect(databaseConnection.getOptions()).to.include("brand");
        expect(databaseConnection.getOptions()).to.include("colors");
      });
    });
    describe('#filterByValues', () => {
      it('filter with empty options', () => {
        expect(databaseConnection.filterByValues({})).to.be.a('Array');
        expect(databaseConnection.filterByValues({})).to.have.lengthOf(12);
      });
      it('filter by type (car)', () => {
        expect(databaseConnection.filterByValues({type:"car"})).to.be.a('Array');
        expect(databaseConnection.filterByValues({type:"car"})).to.have.lengthOf(4);
        databaseConnection.filterByValues({type:"car"}).every(elem => expect(elem).to.have.property('type','car'));
      });
      it('filter by colors (white)', () => {
        expect(databaseConnection.filterByValues({colors:"white"})).to.be.a('Array');
        expect(databaseConnection.filterByValues({colors:"white"})).to.have.lengthOf(6);
        databaseConnection.filterByValues({colors:"white"}).every(elem => {
          expect(elem).to.have.property('colors');
          expect(elem.colors).to.include('white');
        });
      });
      it('filter by brand (Ferrari F40)', () => {
        expect(databaseConnection.filterByValues({brand:"Ferrari F40"})).to.be.a('Array');
        expect(databaseConnection.filterByValues({brand:"Ferrari F40"})).to.have.lengthOf(1);
        databaseConnection.filterByValues({brand:"Ferrari F40"}).every(elem => expect(elem).to.have.property('brand','Ferrari F40'));
      });
      it('filter by type and color (car and red)', () => {
        expect(databaseConnection.filterByValues({type:"car",colors:"red"})).to.be.a('Array');
        expect(databaseConnection.filterByValues({type:"car",colors:"red"})).to.have.lengthOf(2);
        databaseConnection.filterByValues({type:"car",color:'red'}).every(elem => {
          expect(elem).to.have.property('type','car');
          expect(elem).to.have.property('colors');
          expect(elem.colors).to.include('red');
        });
      });
      it('filter by non existing property (motor)', () => {
        expect(databaseConnection.filterByValues({motor:"diesel"})).to.be.a('Array');
        expect(databaseConnection.filterByValues({motor:"diesel"})).to.have.lengthOf(0);
        databaseConnection.filterByValues({motor:"diesel"}).every(elem => expect(elem).to.have.property('motor','diesel'));
      });
    });
    describe('#getOptionsValues', () => {
      it('filter with empty options', () => {
        expect(databaseConnection.getOptionsValues({type:"",brand:"",colors:""})).to.be.a('Object');
        expect(databaseConnection.getOptionsValues({type:"",brand:"",colors:""})).to.have.property('type');
        expect(databaseConnection.getOptionsValues({type:"",brand:"",colors:""})).to.have.property('brand');
        expect(databaseConnection.getOptionsValues({type:"",brand:"",colors:""})).to.have.property('colors');
        expect(databaseConnection.getOptionsValues({type:"",brand:"",colors:""}).type).to.have.lengthOf(3);
        expect(databaseConnection.getOptionsValues({type:"",brand:"",colors:""}).brand).to.have.lengthOf(12);
        expect(databaseConnection.getOptionsValues({type:"",brand:"",colors:""}).colors).to.have.lengthOf(8);
      });
      it('filter by type (car)', () => {
        expect(databaseConnection.getOptionsValues({type:"car",brand:"",colors:""})).to.be.a('Object');
        expect(databaseConnection.getOptionsValues({type:"car",brand:"",colors:""})).to.have.property('type');
        expect(databaseConnection.getOptionsValues({type:"car",brand:"",colors:""})).to.have.property('brand');
        expect(databaseConnection.getOptionsValues({type:"car",brand:"",colors:""})).to.have.property('colors');
        expect(databaseConnection.getOptionsValues({type:"car",brand:"",colors:""}).type).to.have.lengthOf(1);
        expect(databaseConnection.getOptionsValues({type:"car",brand:"",colors:""}).brand).to.have.lengthOf(4);
        expect(databaseConnection.getOptionsValues({type:"car",brand:"",colors:""}).colors).to.have.lengthOf(5);
      });
      it('filter by color (yellow)', () => {
        expect(databaseConnection.getOptionsValues({type:"",brand:"",colors:"yellow"})).to.be.a('Object');
        expect(databaseConnection.getOptionsValues({type:"",brand:"",colors:"yellow"})).to.have.property('type');
        expect(databaseConnection.getOptionsValues({type:"",brand:"",colors:"yellow"})).to.have.property('brand');
        expect(databaseConnection.getOptionsValues({type:"",brand:"",colors:"yellow"})).to.have.property('colors');
        expect(databaseConnection.getOptionsValues({type:"",brand:"",colors:"yellow"}).type).to.have.lengthOf(3);
        expect(databaseConnection.getOptionsValues({type:"",brand:"",colors:"yellow"}).brand).to.have.lengthOf(5);
        expect(databaseConnection.getOptionsValues({type:"",brand:"",colors:"yellow"}).colors).to.have.lengthOf(7);
      });
      it('filter by brand (Bugatti Veyron)', () => {
        expect(databaseConnection.getOptionsValues({type:"",brand:"Bugatti Veyron",colors:""})).to.be.a('Object');
        expect(databaseConnection.getOptionsValues({type:"",brand:"Bugatti Veyron",colors:""})).to.have.property('type');
        expect(databaseConnection.getOptionsValues({type:"",brand:"Bugatti Veyron",colors:""})).to.have.property('brand');
        expect(databaseConnection.getOptionsValues({type:"",brand:"Bugatti Veyron",colors:""})).to.have.property('colors');
        expect(databaseConnection.getOptionsValues({type:"",brand:"Bugatti Veyron",colors:""}).type).to.have.lengthOf(1);
        expect(databaseConnection.getOptionsValues({type:"",brand:"Bugatti Veyron",colors:""}).brand).to.have.lengthOf(1);
        expect(databaseConnection.getOptionsValues({type:"",brand:"Bugatti Veyron",colors:""}).colors).to.have.lengthOf(2);
      });
      it('filter by non existing property (motor)', () => {
        expect(databaseConnection.getOptionsValues({motor:"diesel"})).to.be.a('Object');
        expect(databaseConnection.getOptionsValues({motor:"diesel"})).to.be.empty;
      });
    });
  });
