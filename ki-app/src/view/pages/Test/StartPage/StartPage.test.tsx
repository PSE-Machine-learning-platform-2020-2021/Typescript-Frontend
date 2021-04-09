import { StartPage } from "../../StartPage";
import { States } from "../../State";

test('changeSettings', () => {
    let page = new StartPage('ex');
    // @ts-ignore
    page.changeSettings({
        newDataSetName: 'exname',
        usedSensorTypes: [-1],
        waitTime: 4,
        readTime: 5,
        availableSensorTypes: [{ sensorTypID: 1, sensorType: 'ex', chosen: false }]
    })

    expect(page.getState().currentState).toEqual(States.ChangeToDataCollection)
    expect(page.getState().recordingSettings).toEqual({
        newDataSetName: 'exname',
        usedSensorTypes: [-1],
        waitTime: 4,
        readTime: 5,
        availableSensorTypes: [{ sensorTypID: 1, sensorType: 'ex', chosen: false }]
    })
});
