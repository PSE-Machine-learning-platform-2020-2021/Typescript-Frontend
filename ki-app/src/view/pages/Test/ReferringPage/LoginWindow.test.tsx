import Enzyme, { shallow } from 'enzyme';
import Adapter from '@wojtekmaj/enzyme-adapter-react-17';
import LoginWindow from '../../../components/ReferringComponents/LoginWindow'

test('Rendert', () => {
    Enzyme.configure({ adapter: new Adapter() });

    let pageRegister = jest.fn()
    let pageLogin = jest.fn()
    const wrapper = shallow<LoginWindow>(<LoginWindow pageRegister={pageRegister} pageLogin={pageLogin} />)
    expect(wrapper.state().openNewWindow).toBe(false)
    expect(wrapper.state().username).toBe('')
    expect(wrapper.state().email).toBe('')
    expect(wrapper.state().password).toBe('')
});

test('register', () => {
    Enzyme.configure({ adapter: new Adapter() });
    let pageRegister = jest.fn()
    let pageLogin = jest.fn()
    const wrapper = shallow<LoginWindow>(<LoginWindow pageRegister={pageRegister} pageLogin={pageLogin} />)

    const create: any = wrapper.find("button").at(0);
    create.simulate("click");
    expect(wrapper.state().openNewWindow).toBe(true)

    const username: any = wrapper.find("input").at(0);
    username.simulate('change', { target: { value: "testusername" } })
    expect(wrapper.state().username).toBe("testusername")

    const email: any = wrapper.find("input").at(1);
    email.simulate('change', { target: { value: "testemail" } })
    expect(wrapper.state().email).toBe("testemail")

    const password: any = wrapper.find("input").at(2);
    password.simulate('change', { target: { value: "testpassword" } })
    expect(wrapper.state().password).toBe("testpassword")

    expect(pageRegister.mock.calls.length).toBe(0)
    const register: any = wrapper.find("button").at(1);
    register.simulate("click");
    expect(wrapper.state().openNewWindow).toBe(false)
    expect(pageRegister.mock.calls.length).toBe(1)
});

test('login', () => {
    Enzyme.configure({ adapter: new Adapter() });
    let pageRegister = jest.fn()
    let pageLogin = jest.fn()
    const wrapper = shallow<LoginWindow>(<LoginWindow pageRegister={pageRegister} pageLogin={pageLogin} />)

    const create: any = wrapper.find("button").at(0);
    create.simulate("click");
    expect(wrapper.state().openNewWindow).toBe(true)

    expect(pageLogin.mock.calls.length).toBe(0)
    const login: any = wrapper.find("button").at(2);
    login.simulate("click");
    expect(wrapper.state().openNewWindow).toBe(false)
    expect(pageLogin.mock.calls.length).toBe(1)
});
