import { Dataminer } from "../User";

test("create and getter Dataminer", () => {
    //Mit Name
    var dataminer = new Dataminer(3, 4, "Rudolf");
    expect(dataminer.getID()).toBe(3);
    expect(dataminer.getDevice().device?.getID()).toBe(4);
    expect(dataminer.getName()).toBe("Rudolf");
    //Ohne Name
    var dataminer = new Dataminer(3, 4);
    expect(dataminer.getID()).toBe(3);
    expect(dataminer.getDevice().device?.getID()).toBe(4);
    expect(dataminer.getName()).toBe("");
    //Negative ID mit Name
    var dataminer = new Dataminer(-20, 4, "Rudolf");
    expect(dataminer.getID()).toBe(-1);
    expect(dataminer.getDevice().device?.getID()).toBe(4);
    expect(dataminer.getName()).toBe("Rudolf");
    //Negative ID ohne Name
    var dataminer = new Dataminer(-20, 4);
    expect(dataminer.getID()).toBe(-1);
    expect(dataminer.getDevice().device?.getID()).toBe(4);
    expect(dataminer.getName()).toBe("");
});