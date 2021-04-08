import { User } from "./User";

/**
 * Diese Klasse Speichert die Session informationen
 */
export class Session {
  private id: number; //Die eindeutige ID der Session
  private connectedUser: User[] = []; //Die User die mit der Projekt der Session interagieren

  /**
   * Erstellt eine Session
   * @param id Diese ID muss global eindeutig sein
   * @param admin Der Admin, dem diese Session gehört
   */
  constructor(id: number) {
    if (id < 0) {
      this.id = -1;
    } else {
      this.id = id;
    }
  }

  /**
   * Fügt eine User als Verbundener User zu der Session hinzu
   * @param user Der User, der hinzugefügt wird
   */
  connectUser(user: User): boolean {
    for (let i = 0; i < this.connectedUser.length; i++) {
      if (this.connectedUser[i].getID() === user.getID()) {
        return false;
      }
    }
    this.connectedUser.push(user);
    return true;
  }

  /**
   * Meldet einen User von der aktuellen Session ab
   * @param user Der User, der abgemeldet werdern soll
   */
  disconnectUser(userID: number): boolean {
    for (let i = 0; i < this.connectedUser.length; i++) {
      if (this.connectedUser[i].getID() === userID) {
        this.connectedUser.splice(i, 1);
        return true;
      }
    }
    return false;
  }

  /**
   * Gibt von allen verbundenen Usern die ID und den Namen zurück
   */
  getConnectedUsers(): { userID: number, userName: string; }[] {
    var users: { userID: number, userName: string; }[] = [];
    for (let i = 0; i < this.connectedUser.length; i++) {
      users.push({ userID: this.connectedUser[i].getID(), userName: this.connectedUser[i].getName() });
    }
    return users;
  }

  /**
   * Gibt die Session ID zurück
   */
  getID(): number {
    return this.id;
  }
}