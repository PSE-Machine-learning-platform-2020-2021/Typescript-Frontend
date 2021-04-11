import Title from "../../components/FinishComponents/Title";
import Body from "../../components/FinishComponents/Diagram";
import Labelling from "../../components/FinishComponents/Input/Labelling";
import 'react-notifications/lib/notifications.css';
import { Page } from "../PageInterface";
import { PageController } from "../../../controller/PageController";
import { State } from "./State";
import ReactDOM from "react-dom";
import { States } from "../State";
import { NotificationContainer } from "react-notifications";
import './index.css'

/**
 * Die Darstellungsseite für die Finishseite der Datenerfasser
 */
export class FinishPage implements Page {
  private state: State;
  private observers: PageController[] = [];

  /**
     * Konstruktor der Darstellungseite
     */
  constructor() {
    this.state = new State();
    this.update();
  }

  /**
    * Update Methode der Darstellungsseite. Diese Methode wird nach jeder Änderung, die kein Seitenwechsel ist, aufgerufen. 
    * Die Methode enthält den Aufbau der Seite und wird von ihr gerendert.
    * Es werden durch notify() alle controller über ein Update informiert und alle Seiten Elemente werden aktualisiert und erneut gerendert. 
    */
  private update() {
    this.notify();
    const VDOM = (
      <div>
        <Title />
        <Body dataRows={this.state.dataRows!} />
        <div className="label-container">
          <Labelling newLabel={this.newLabel.bind(this)} pagedeleteLabel={this.pagedeleteLabel.bind(this)} />
        </div>
        <button className='reload' onClick = {this.reloadPage}>Erneut Erfassen</button>
        <NotificationContainer />
      </div>
    );
    if (document.getElementById('root') !== null) {
      ReactDOM.render(VDOM, document.getElementById('root'));
    }
  }

  private reloadPage() {
    window.location.reload()
  }

  /**
   * Addiere ein neues Label
   * @param label das label, das addiert wird
   */
  newLabel(label: { labelID: number, start: number, end: number, name: string; }) {
    this.state.currentLabel = label;
    this.state.currentState = States.NewLabel;
    this.notify();
  }

  /**
   * Lösche ein Label
   * @param label das label, das gelöscht wird
   */
  pagedeleteLabel(label: { start: number, end: number, name: string, labelID: number; }) {
    var deleteLabel = { labelID: label.labelID, start: label.start, end: label.end, name: label.name };
    this.state.currentLabel = deleteLabel;
    this.state.currentState = States.DeleteLabel;
    this.notify();
  }


  /**
    * Durch diese Methode kann sich ein Controller als Beobachter anmelden.
    * @param oberver neuer Beobachter
    */
  attach(observer: PageController) {
    this.observers.push(observer);
  }

  /**
    * Durch diese Methode kann sich ein Controller als Beobachter abmelden.
    * @param oberver Beobachter der zu entfernen ist
    */
  detach(observer: PageController) {
    const index = this.observers.indexOf(observer, 0);
    if (index > -1) {
      this.observers.splice(index, 1);
    }
  }

  /**
    * Durch diese Methode werden alle Beobachter über eine Änderung auf der Seite informiert.
    */
  notify() {
    for (let index = 0; index < this.observers.length; index++) {
      const element = this.observers[index];
      element.update();
    }
  }

  /**
     * Setzt einen neuen Zustand für die Seite und aktualisiert sie
     * @param state neuer Zustand für die Seite
     */
  getState() {
    return this.state;
  }

  /**
    * Gibt den Status der Seite zurück
    */
  setState(state: any) {
    this.state = state;
    this.update();
  }
}