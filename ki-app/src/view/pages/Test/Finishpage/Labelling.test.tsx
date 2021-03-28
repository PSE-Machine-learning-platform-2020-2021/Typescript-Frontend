import Enzyme, { shallow } from 'enzyme';
import Adapter from '@wojtekmaj/enzyme-adapter-react-17';
import Labelling from '../../../components/FinishComponents/Input/Labelling';

test('Rendert', () => {
    Enzyme.configure({ adapter: new Adapter() });
    let newLabel = jest.fn();
    let pagedeleteLabel = jest.fn();
    const wrapper = shallow<Labelling>(<Labelling newLabel={newLabel} pagedeleteLabel={pagedeleteLabel} />);
});

test('Gültige eingabe', () => {
    Enzyme.configure({ adapter: new Adapter() });
    let newLabel = jest.fn();
    let pagedeleteLabel = jest.fn();
    const wrapper = Enzyme.mount<Labelling>(<Labelling newLabel={newLabel} pagedeleteLabel={pagedeleteLabel} />);

    const start: any = wrapper.find("input").at(0);
    start.instance().value = "5";
    start.simulate("change");
    expect(wrapper.state().newStart).toBe("5");

    const end: any = wrapper.find("input").at(1);
    end.instance().value = "6";
    end.simulate("change");
    expect(wrapper.state().newEnd).toBe("6");

    const name: any = wrapper.find("input").at(2);
    name.instance().value = "Name";
    name.simulate("change");
    expect(wrapper.state().newName).toBe("Name");

    expect(wrapper.state().labels).toEqual([]);
    const add: any = wrapper.find({ className: "add" });
    add.simulate("click");
    expect(wrapper.state().labels).toEqual([{ labelID: 0, start: 5, end: 6, name: "Name" }]);

    const deleteLabel: any = wrapper.find({ className: "delete" });
    deleteLabel.simulate("click");
    expect(wrapper.state().labels).toEqual([]);
});