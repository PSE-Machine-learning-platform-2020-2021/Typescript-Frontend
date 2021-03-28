import Enzyme, { shallow } from 'enzyme';
import Adapter from '@wojtekmaj/enzyme-adapter-react-17';
import EmailList from '../../../components/DeliveryComponents/EmailList';

test('Rendert', () => {
    Enzyme.configure({ adapter: new Adapter() })
    let delivery = jest.fn()
    const wrapper = shallow<EmailList>(<EmailList delivery={delivery} />)



});


test('delivery', () => {
    Enzyme.configure({ adapter: new Adapter() })
    let delivery = jest.fn()
    window.confirm = jest.fn(() => true)
    const wrapper = shallow<EmailList>(<EmailList delivery={delivery} />)

    const create: any = wrapper.find({ className: "addemail-btn" })
    create.simulate("click");
    expect(wrapper.state().addButtonClick).toBe(true)

    const input: any = wrapper.find({ className: "emailinput" })
    input.simulate('change', { target: { value: '' } });
    expect(wrapper.state().inputempty).toEqual(true)
    input.simulate('change', { target: { value: 'ex@gmail.com' } });
    expect(wrapper.state().inputempty).toEqual(false)
    expect(wrapper.state().inputemail.address).toEqual('ex@gmail.com')
    expect(wrapper.state().inputemail.chosen).toEqual(false)
    input.simulate('keyup', { keyCode: 13 })
    expect(wrapper.state().emails[0].id).toEqual(wrapper.state().inputemail.id)
    expect(wrapper.state().emails[0].address).toEqual(wrapper.state().inputemail.address)
    expect(wrapper.state().emails[0].chosen).toEqual(false)
    expect(wrapper.state().addButtonClick).toBe(false)


    const emailcheck1: any = wrapper.find({ className: "emailitemcheck" }).at(0);
    emailcheck1.simulate('change', { target: { checked: true } })
    expect(wrapper.state().emails[0].chosen).toEqual(true)
    const emailcheck2: any = wrapper.find({ className: "emailitemcheck" }).at(0);
    emailcheck2.simulate('change', { target: { checked: false } })
    expect(wrapper.state().emails[0].chosen).toEqual(false)

    const emailcheck3: any = wrapper.find({ className: "emailitemcheck" }).at(0);
    emailcheck3.simulate('change', { target: { checked: true } })
    expect(delivery.mock.calls.length).toBe(0)
    const deliverybtn: any = wrapper.find({ className: "delivery-btn" })
    deliverybtn.simulate("click");
    expect(delivery.mock.calls.length).toBe(1)

    const allchoose1: any = wrapper.find({ className: "chooseall" }).at(0);
    allchoose1.simulate('change', { target: { checked: false } })
    expect(wrapper.state().emails[0].chosen).toEqual(false)
    const allchoose2: any = wrapper.find({ className: "chooseall" }).at(0);
    allchoose2.simulate('change', { target: { checked: true } })
    expect(wrapper.state().emails[0].chosen).toEqual(true)



    const clearall: any = wrapper.find({ className: "btn-clear" }).at(0);
    clearall.simulate('click')
    expect(wrapper.state().emails).toEqual([])

    const create2: any = wrapper.find({ className: "addemail-btn" })
    create2.simulate("click");
    const input2: any = wrapper.find({ className: "emailinput" })
    input2.simulate('change', { target: { value: 'ex@gmail.com' } });
    input2.simulate('keyup', { keyCode: 13 })
    create2.simulate("click");
    input2.simulate('change', { target: { value: 'ex@gmail.com' } });
    input2.simulate('keyup', { keyCode: 13 })

    const emailcheck4: any = wrapper.find({ className: "emailitemcheck" }).at(0);
    emailcheck4.simulate('change', { target: { checked: true } })
    const deleteitem: any = wrapper.find({ className: "btn-item" }).at(0);
    deleteitem.simulate('click')
    expect(wrapper.state().emails).toEqual([])
});

