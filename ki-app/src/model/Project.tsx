import { AIModel } from "./AIModel";
import { IDataPoint } from "./DataPoint";
import { IDataRowRID, IDataRowST, IDataRowSTRID } from "./DataRow";
import { DataSet, IDataSet } from "./DataSet";
import { ILabel } from "./Label";
import { Session } from "./Session";
import { ISpan } from "./TimeSpan";

/**
 * Diese Klasse speichert alle Informationen zu einem Projekt.
 * Ein Projekt beinhaltet aufgezeichnete Datensätze (DataSet) sowie Informationen zu den Datensätzen.
 */
export class Project {
  private id: number; //Die eindeutige Projekt ID
  private name: string; //Der Name des Projektes
  private session: Session; //Die Session in dem das Projekt arbeitet
  private aiModel: AIModel[] = []; //Das AIModel von dem Projekt
  private dataSet: DataSet[] = []; //Die Datensätze, die zu dem Projekt gehören
  private currentDataSet?: DataSet; //Aktueller Datensatz

  /**
     * Eine bereits existierendes Projekt kann wie folgt in das Model geladen werden.
     * @param projectID Die Projekt ID
     * @param sessionID Die Session ID
     * @param projectName Der Projektnamen
     * @param admin Der Besitzer dieses Projekts für die Session
     * @param aiModelID Die schon existierenden AIModel IDs
     * @param dataSet Die schon existierenden Datensätze
     */
  constructor(projectID: number, sessionID: number, projectName: string, projectData?: IProjectData) {
    this.id = projectID;
    this.name = projectName;
    this.session = new Session(sessionID);
    if (projectData !== undefined) {
      if (projectData.aiModelID !== undefined) {
        for (const id of projectData.aiModelID) {
          this.aiModel.push(new AIModel(id));
        }
      }
      for (const entry of projectData.dataSet) {
        let dataSet: DataSet;
        dataSet = new DataSet(
          entry.dataSetID,
          entry.dataSetName,
          entry.generateDate,
          entry.dataRows,
          entry.label
        );
        this.dataSet.push(dataSet);
      }
    }
  }

  /**
   * Gibt den Projektnamen zurück
   */
  getName(): string {
    return this.name;
  }

  /**
   * Löscht den Datensatz mit der DatensatzID
   * @param dataSetID die Datensatz ID
   */
  deleteDataSet(dataSetID: number): boolean {
    for (let i = 0; i < this.dataSet.length; i++) {
      if (this.dataSet[i].getID() === dataSetID) {
        this.dataSet.splice(i, 1);
        if (this.currentDataSet != null && this.currentDataSet.getID() === dataSetID) {
          delete this.currentDataSet;
        }
        return true;
      }
    }
    return false;
  }

  /**
   * Gibt die Projekt ID zurück.
   */
  getID(): number {
    return this.id;
  }

  /**
   * Erstellt einen neuen Datensatz und setzt diesen als aktuellen Datensatz.
   * @param dataRowSensors die Sensoren, von denen die Daten ausgelesen werden
   * @param dataSetID die eindeutige Datensatz ID
   * @param dataSetName der Datensatznamen
   * @param generateDate die Erstellungszeit von dem Datensatz
   */
  createDataSet(dataSetID: number, dataSetName: string, generateDate: number, dataRow: IDataRowSTRID[]): boolean {
    if (dataRow.length <= 0 || dataSetID < 0 || dataSetName.length <= 0 || (generateDate != null && generateDate < 0)) {
      return false;
    }
    for (let i = 0; i < this.dataSet.length; i++) {
      if (this.dataSet[i].getID() === dataSetID) {
        return false;
      }
    }

    var dataSet: DataSet = new DataSet(dataSetID, dataSetName, generateDate, dataRow);
    this.dataSet.push(dataSet);
    this.currentDataSet = dataSet;
    return true;
  }

  /**
   * Gibt die aktuelle Datensatz ID zurück, falls diese nicht existiert wird -1 zurück gegeben
   */
  getCurrentDataSetID(): number {
    if (this.currentDataSet != null) {
      return this.currentDataSet.getID();
    }
    return -1;
  }

  /**
   * Fügt den übergebenen Datenpunkt dem aktuellen Datensatz hinzu
   * @param dataRowID die DatenreihenID
   * @param datapoint der Datenpunkt
   * @returns true, wenn der Datenpunkt zur Datenreihe hinzugefügt werden konnte
   */
  addDatapoint(dataRowID: number, datapoint: IDataPoint[]): boolean {
    if (this.currentDataSet != null) {
      return this.currentDataSet.addDatapoint(dataRowID, datapoint);
    }
    return false;
  }

  /**
   * Gibt von allen Datensätzen Informationen zurück
   * @returns dataSetID ist die DatensatzID und dataSetName ist der Datensatzname
   */
  getDataSetMetas(): IDataSetInfo[] {
    let dataSetMetas: { dataSetID: number, dataSetName: string; }[] = [];
    for (const dataSet of this.dataSet) {
      dataSetMetas.push({ "dataSetID": dataSet.getID(), "dataSetName": dataSet.getName() });
    }
    return dataSetMetas;
  }

  /**
   * Gibt die Datenreihen der Datensatz ID zurück und setzt diesen Datensatz als aktuellen Datensatz
   * @param dataSetID die Datensatz ID von der die Datenreihen gelesen werden sollen
   * @returns die Sensordaten von der Datenreihe
   */
  getDataRows(dataSetID: number): { dataRows: IDataRowST[]; } {
    for (let i = 0; i < this.dataSet.length; i++) {
      if (this.dataSet[i].getID() === dataSetID) {
        this.currentDataSet = this.dataSet[i];
        return { dataRows: this.dataSet[i].getDataRows() };
      }
    }
    return { dataRows: [] };
  }

  /**
   * Gibt die Datenreihen der aktuellen Datenreihe zurück
   * @returns die Sensordaten von der Datenreihe
   */
  getCurrentDataRows(): { dataRows: IDataRowST[]; } {
    if (this.currentDataSet != null) {
      return { dataRows: this.currentDataSet.getDataRows() };
    }
    return { dataRows: [] };
  }

  /**
   * Gibt die Session ID zurück
   */
  getSessionID(): number {
    return this.session.getID();
  }

  /**
   * Setzt dem Label mit der übergebenen ID neue Werte.
   * @param start Ist die neue Startzeit des Labels.
   * @param end Ist die neue Endzeit des Labels.
   * @param labelID Die Label ID, welche überarbeitet werden soll.
   * @param labelName Ist bei Angabe der neue Name des Labels.
   * @returns falls das Label nicht existiert oder es kein aktuellen Datensatz gibt wird false zurück gegeben
   */
  createLabel(labelID: number, span: ISpan, labelName: string): boolean {
    if (this.currentDataSet != null) {
      return this.currentDataSet.createLabel(labelID, span, labelName);
    }
    return false;
  }

  /**
   * Überschreibt ein bestehendes Label 
   * @param labelID die LabelID von dem zu überschreibenden Label
   * @param span das neue Zeitfenster
   * @param labelName falls das Label neu benannt werden soll
   * @returns 
   */
  setLabel(labelID: number, span: ISpan, labelName?: string): boolean {
    if (this.currentDataSet != null) {
      return this.currentDataSet.setLabel(labelID, span, labelName);
    }
    return false;
  }

  /**
   * Löscht ein bestehendes Label mit der LabelID
   * @param labelID die LabelID, von dem Label das gelöscht werden soll
   * @returns 
   */
  deleteLabel(labelID: number): boolean {
    if (this.currentDataSet != null) {
      return this.currentDataSet.deleteLabel(labelID);
    } else {
      return false;
    }
  }

  /**
   * Gibt alle Daten von allen Labeln vom aktuellen Datensatz zurück.
   * @returns leer, falls kein aktueller Datensatz existiert
   */
  getLabels(): { labels: ILabel[]; } {
    if (this.currentDataSet != null) {
      return { labels: this.currentDataSet.getLabels() };
    }
    return { labels: [] };
  }
}
export interface IDataSetInfo {
  dataSetID: number,
  dataSetName: string;
}
export interface IProjectData {
  aiModelID?: number[],
  dataSet: IDataSet[];
}