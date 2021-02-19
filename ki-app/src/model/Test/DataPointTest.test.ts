import {DataPoint} from "../DataPoint"

test("creat and getter test", () => {
    let datapoint = new DataPoint(12, 5)
    expect(datapoint.getRelativeTime).toBe(12);
    expect(datapoint.getRelativeTime).toBe(5);
  });