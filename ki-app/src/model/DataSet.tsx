import { DataRow } from "./DataRow";
import { Label } from "./Label";

//Die Klasse fasst Datenreihen, welche Sensorwerte und deren relative Zeit besitzen, zu einem Datensatz zusammen.
class DataSet{
    private generateDate:Date //Dies ist die Erstellungszeit dieses Datensatzes in Millisekunden.
    private id:number //Dies ist die Datensatz ID.
    private name:string //Dies ist der Name des Datensatzes.
    private dataRow:DataRow[]
    private label:Label[]
  

    constructor(dataRowSensors:Sensor[], dataSetID:number, generateDate:number, dataSetName:string) {}
    //constructor(dataSet:object)
    
    //Gibt die Datensatz ID zurück.
    public getID():number {
      return this.id;
    }

    //Gibt den Datensatz Namen zurück.
    public getName():string {
      return this.name;
    }
    
    public readDataPoint(dataRowID:number):{value:number, relativeTime:number} {
      
    }

    public getDataRows(dataSetID):number[][][] {}

    public createLabel() {
      
    }

    public setLabel(start:number, end:number, labelID:number):Boolean {
      for (let i = 0; i < this.label.length; i++) {
        if(this.label[i].getID() == labelID) {
          this.label[i].setLabel(start, end);
          return true;
        }
      }
      return false;
    }

    public getLabels():{name:string, id:number, start:number, end:number}[] {
      var labelList:{name:string, id:number, start:number, end:number}[] = new Array;
      for (let i = 0; i < this.label.length; i++) {
        labelList.push(this.label[i].getLabel());
      }
      return labelList;
    }

    private getDataRow(dataRowID:number):DataRow {
      for (let i = 0; i < this.dataRow.length; i++) {
        if(this.dataRow[i].getID() == dataRowID) {
          return this.dataRow[i];
        }
      }
      //TODO Was passiert wenn die Datenreihe mit der DatenreihenID nicht existiert?//////////////////////////////////////////////////////////////////////////////////////////
    }
  } export {DataSet}