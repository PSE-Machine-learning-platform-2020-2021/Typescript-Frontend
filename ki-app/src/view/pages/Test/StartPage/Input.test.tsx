import Input from "../../../components/StartComponents/Input/index";
import Enzyme, { shallow } from 'enzyme';
import Adapter from '@wojtekmaj/enzyme-adapter-react-17';
import React from "react";

test('Rendert', () => {
  Enzyme.configure({ adapter: new Adapter() });
  let pageChangeSettings = jest.fn();
  let availableSensorTypes = [{ sensorTypID: 5, sensorType: "1", chosen: true }];
  const wrapper = shallow<Input>(<Input pageChangeSettings={pageChangeSettings} availableSensorTypes={availableSensorTypes} />);
});

test('Gültige eingabe', () => {
  Enzyme.configure({ adapter: new Adapter() });
  let pageChangeSettings = jest.fn();
  let availableSensorTypes = [{ sensorTypID: 5, sensorType: "1", chosen: true }];
  const wrapper = Enzyme.mount<Input>(<Input pageChangeSettings={pageChangeSettings} availableSensorTypes={availableSensorTypes} />);

  const leadTime: any = wrapper.find("input").at(0);
  leadTime.instance().value = "5";
  leadTime.simulate("change");
  expect(wrapper.state().leadTime).toBe("5");

  const collectionTime: any = wrapper.find("input").at(1);
  collectionTime.instance().value = "5";
  collectionTime.simulate("change");
  expect(wrapper.state().collectionTime).toBe("5");

  const name: any = wrapper.find("input").at(2);
  name.instance().value = "Name";
  name.simulate("change");
  expect(wrapper.state().name).toBe("Name");

  expect(pageChangeSettings.mock.calls.length).toBe(0);
  const submit: any = wrapper.find("button").at(0);
  submit.simulate("click");
  expect(pageChangeSettings.mock.calls.length).toBe(1);
});

test('Falsche eingabe', () => {
  Enzyme.configure({ adapter: new Adapter() });
  let pageChangeSettings = jest.fn();
  let availableSensorTypes = [{ sensorTypID: 5, sensorType: "1", chosen: true }];
  const wrapper = Enzyme.mount<Input>(<Input pageChangeSettings={pageChangeSettings} availableSensorTypes={availableSensorTypes} />);

  const leadTime: any = wrapper.find("input").at(0);
  leadTime.instance().value = "Falsch";
  leadTime.simulate("change");
  expect(wrapper.state().leadTime).toBe("Falsch");

  const collectionTime: any = wrapper.find("input").at(1);
  collectionTime.instance().value = "Falsch";
  collectionTime.simulate("change");
  expect(wrapper.state().collectionTime).toBe("Falsch");

  const name: any = wrapper.find("input").at(2);
  name.instance().value = "";
  name.simulate("change");
  expect(wrapper.state().name).toBe("");

  expect(pageChangeSettings.mock.calls.length).toBe(0);
  const submit: any = wrapper.find("button").at(0);
  submit.simulate("click");
  expect(pageChangeSettings.mock.calls.length).toBe(0);
});

test('Wählt Sensor', () => {
  Enzyme.configure({ adapter: new Adapter() });
  let pageChangeSettings = jest.fn();
  let availableSensorTypes = [{ sensorTypID: 5, sensorType: "1", chosen: false }];
  const wrapper = Enzyme.mount<Input>(<Input pageChangeSettings={pageChangeSettings} availableSensorTypes={availableSensorTypes} />);
  expect(wrapper.props().availableSensorTypes).toEqual([{ sensorTypID: 5, sensorType: "1", chosen: false }]);
  const checkbox = wrapper.find({ type: 'checkbox' });
  checkbox.simulate('change', { target: { checked: true } });
  expect(wrapper.state().usedSensorTypes).toEqual([]);
});
