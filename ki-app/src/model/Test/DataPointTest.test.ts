import { DataPoint } from "../DataPoint";

test("creat and getter", () => {
  const datapoint = new DataPoint([12, 1, 1.42342], 5);
  expect(datapoint.getValue()[0]).toBe(12);
  expect(datapoint.getValue()[1]).toBe(1);
  expect(datapoint.getValue()[2]).toBe(1.42342);
  expect(datapoint.getRelativeTime()).toBe(5);
});