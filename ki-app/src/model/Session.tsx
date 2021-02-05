import { Admin, User } from "./User";

/**
 * Diese Klasse Speichert die Session informationen
 */
class Session {
  private id: number; //Die eindeutige ID der Session
  private admin: Admin; //Der Admin dem das Projekt der Session gehört
  private connectedUser: User[] = new Array(); //Die User die mit der Projekt der Session interagieren

  /**
   * Erstellt eine Session
   * @param id Diese ID muss global eindeutig sein
   * @param admin Der Admin, dem diese Session gehört
   */
  constructor(id: number, admin: Admin) {
    this.id = id;
    this.admin = admin;
  }

  /**
   * Fügt eine User als Verbundener User zu der Session hinzu
   * @param user Der User, der hinzugefügt wird
   */
  connectUser(user: User): void {
    this.connectedUser.push(user);
  }

  /**
   * Meldet einen User von der aktuellen Session ab
   * @param user Der User, der abgemeldet werdern soll
   */
  disconnectUser(user: User): boolean {
    for (let i = 0; i < this.connectedUser.length; i++) {
      if (this.connectedUser[i].getID() == user.getID()) {
        delete this.connectedUser[i];
        return true;
      }
    }
    return false;
  }

  /**
   * Gibt von allen verbundenen Usern die ID und den Namen zurück
   */
  getConnectedUsers(): { userID: number, userName: string; }[] {
    var users: { userID: number, userName: string; }[] = new Array();
    for (let i = 0; i < this.connectedUser.length; i++) {
      users.push({ userID: this.connectedUser[i].getID(), userName: this.connectedUser[i].getName() });
    }
    return users;
  }

  /**
   * Gibt die Session ID zurück
   */
  getId(): number {
    return this.id;
  }
} export { Session };