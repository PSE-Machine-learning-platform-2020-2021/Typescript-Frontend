import { Session } from "../Session";
import { Admin, AIModelUser, Dataminer } from "../User";

/**
 * Prüft die einfache Nutzung, erstellen und prüfen ob der getter dies wieder zurück gibt
 */
test("create and getter", () => {
    var session = new Session(18);
    expect(session.getId()).toBe(18);
    session = new Session(-29);
    expect(session.getId()).toBe(-1);
});

/**
 * Prüft, ob connectUser und disconnectUser fehlerfrei läuft
 */
test("connectUser & disconnectUser", () => {
    var session = new Session(33);
    var user1 = new Admin(12, 17, "Bernd", "Bernd@hot.de");
    var user2 = new Dataminer(13, 22, "Beate");
    var user3 = new AIModelUser(14, 34);
    expect(session.connectUser(user1)).toBeTruthy();
    expect(session.connectUser(user2)).toBeTruthy();
    expect(session.connectUser(user3)).toBeTruthy();
    expect(session.getConnectedUsers()[0].userID).toBe(12);
    expect(session.getConnectedUsers()[1].userID).toBe(13);
    expect(session.getConnectedUsers()[2].userID).toBe(14);
    expect(session.getConnectedUsers()[0].userName).toBe("Bernd");
    expect(session.getConnectedUsers()[1].userName).toBe("Beate");
    expect(session.getConnectedUsers()[2].userName).toBe("");
    expect(session.connectUser(user1)).toBeFalsy();
    expect(session.connectUser(user2)).toBeFalsy();
    expect(session.connectUser(user3)).toBeFalsy();

    expect(session.getConnectedUsers().length).toBe(3);
    expect(session.disconnectUser(user1.getID())).toBeTruthy();
    expect(session.getConnectedUsers().length).toBe(2);
    expect(session.connectUser(user1)).toBeTruthy();
    expect(session.connectUser(user2)).toBeFalsy();
    expect(session.connectUser(user3)).toBeFalsy();
    //disconnectUser
    expect(session.disconnectUser(-1)).toBeFalsy();
    expect(session.disconnectUser(user3.getID())).toBeTruthy();
    expect(session.disconnectUser(user3.getID())).toBeFalsy();
    expect(session.disconnectUser(user1.getID())).toBeTruthy();
    expect(session.disconnectUser(user2.getID())).toBeTruthy();
    expect(session.disconnectUser(user1.getID())).toBeFalsy();
    expect(session.disconnectUser(user2.getID())).toBeFalsy();
    expect(session.getConnectedUsers().length).toBe(0);
    expect(session.getId()).toBe(33);
});