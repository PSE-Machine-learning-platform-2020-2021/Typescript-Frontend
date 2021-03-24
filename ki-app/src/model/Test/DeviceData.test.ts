import { Desktop, DeviceData, Smartphone } from "../DeviceData";

/**
 * Prüft die einfache Nutzung, erstellen und prüfen ob der getter dies wieder zurück gibt
 */
test("create and getter", () => {
    var device = DeviceData.loadDevice(29);
    expect(device.getID()).toBe(29);
    device = DeviceData.loadDevice(30, { MACADRESS: "abc", deviceName: "Bernd", firmware: "die Gute", generation: "aktuell", deviceType: "Smartphone" });
    expect(device.getID()).toBe(30);
    expect(device.setDeviceID(12)).toBeFalsy();
    expect(device.setDeviceID(-20)).toBeFalsy();
    expect(device.getID()).toBe(30);
    expect(device.getMACADDRESS()).toBe("abc");
    expect(device.getName()).toBe("Bernd");
    expect(device.getFirmware()).toBe("die Gute");
    expect(device.getGeneration()).toBe("aktuell");
    expect(device instanceof Smartphone).toBeTruthy();

    device = DeviceData.loadDevice(30, { MACADRESS: "abc", deviceName: "Bernd", firmware: "die Gute", generation: "aktuell", deviceType: "Desktop" });
    expect(device.getID()).toBe(30);
    expect(device.getMACADDRESS()).toBe("abc");
    expect(device.getName()).toBe("Bernd");
    expect(device.getFirmware()).toBe("die Gute");
    expect(device.getGeneration()).toBe("aktuell");
    expect(device instanceof Desktop).toBeTruthy();
    device = DeviceData.loadDevice(-20, { MACADRESS: "cdf", deviceName: "Bend", firmware: "dieGute", generation: "aktuelle", deviceType: "Nix da" });
    expect(device.getID()).toBe(-1);
    expect(device.setDeviceID(-20)).toBeFalsy();
    expect(device.getID()).toBe(-1);
    expect(device.setDeviceID(12)).toBeTruthy();
    expect(device.getID()).toBe(12);
    expect(device.getMACADDRESS()).toBe("cdf");
    expect(device.getName()).toBe("Bend");
    expect(device.getFirmware()).toBe("dieGute");
    expect(device.getGeneration()).toBe("aktuelle");
    expect(device instanceof Smartphone).toBeTruthy();
});