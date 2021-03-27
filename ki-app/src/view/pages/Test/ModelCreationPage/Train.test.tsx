import Enzyme, { shallow } from 'enzyme';
import Adapter from '@wojtekmaj/enzyme-adapter-react-17';
import { NotificationManager } from 'react-notifications';
import Train from '../../../components/ModelCreationComponents/Train';

test('Rendert', () => {
    Enzyme.configure({ adapter: new Adapter() })
    let train = jest.fn()

    let dataSetMetas = [{ dataSetID: -1, dataSetName: 'ex' }]
    const wrapper = shallow<Train>(<Train dataSetMetas={dataSetMetas} train={train} />)
    expect(wrapper.state().mouse).toEqual(false)
    expect(wrapper.state().openNewWindow).toEqual(false)
    expect(wrapper.state().value).toEqual('')
    expect(wrapper.state().databaseList).toEqual([{
        dataSetID: -1,
        dataSetName: "ex",
        chosen: false,
    }])
    expect(wrapper.state().datasets).toEqual([])
    expect(wrapper.state().imputators).toEqual([
        { name: "Mittel", checked: false, tag: 'MEAN' },
        { name: "Letzer Wert fortgeführt", checked: false, tag: 'FORWARD' },
        { name: "Bewegter Durchschnitt", checked: false, tag: 'MOVING' },
        { name: "Lineare Interpolation", checked: false, tag: 'LINEAR' },
        { name: "Spline Interpolation", checked: false, tag: 'SPLINE' }
    ])
    expect(wrapper.state().scalers).toEqual([
        { name: "Standard Scaler", checked: false, tag: 'STANDARD' },
        { name: "Robust Scaler", checked: false, tag: 'ROBUST' },
        { name: "Min-Max Scaler", checked: false, tag: 'MIN_MAX' },
        { name: "Normalizer", checked: false, tag: 'NORMALIZER' },
        { name: "Anteilstrafo", checked: false, tag: 'SHARE' }
    ])
    expect(wrapper.state().myfeatures).toEqual([
        { name: "Minimum", checked: false, tag: 'MIN' },
        { name: "Maximum", checked: false, tag: 'MAX' },
        { name: "Varianz", checked: false, tag: 'VARIANCE' },
        { name: "Energie", checked: false, tag: 'ENERGY' },
        { name: "Fourier-T", checked: false, tag: 'FOURIER_TRANSFORM' },
        { name: "Mittelwert", checked: false, tag: 'MEAN' },
        { name: "Autoregressiv", checked: false, tag: 'AUTOREGRESSIVE' },
        { name: "Abweichung", checked: false, tag: 'SKEWNESS' },
        { name: "Wölbung", checked: false, tag: 'KURTOSIS' },
        { name: "IQR", checked: false, tag: 'IQR' }
    ])
    expect(wrapper.state().classifiers).toEqual([
        { name: "MLPClassifier", checked: false, tag: 'MLP' },
        { name: "RandomForestClassifier", checked: false, tag: 'RANDOM_FOREST' },
        { name: "KNeighborsClassifier", checked: false, tag: 'K_NEIGHOBORS' },
        { name: "Support Vector Machine", checked: false, tag: 'SVM' }
    ])
    expect(wrapper.state().chosenScaler).toEqual(0)
    expect(wrapper.state().chosenclassifier).toEqual(0)
    expect(wrapper.state().chosenImputator).toEqual(0)

});

test('no choice database', () => {
    Enzyme.configure({ adapter: new Adapter() })
    let train = jest.fn()
    let dataSetMetas = [{ dataSetID: -1, dataSetName: 'ex' }]
    const wrapper = shallow<Train>(<Train dataSetMetas={dataSetMetas} train={train} />)

    const create: any = wrapper.find({ className: "create-btn" })
    create.simulate("click");
    expect(wrapper.state().openNewWindow).toBe(true)

    const testNotificationManager = NotificationManager.info('test')
    const choose: any = wrapper.find({ className: "choose-btn" })
    choose.simulate("click");
    expect(wrapper.state().openNewWindow).toBe(false)
    expect(testNotificationManager).toBe(NotificationManager.error("Kein Wählen!", "", 3000))
});

test('add dataset and choose', () => {
    Enzyme.configure({ adapter: new Adapter() })
    let train = jest.fn()
    let dataSetMetas = [{ dataSetID: -1, dataSetName: 'ex' }]
    const wrapper = shallow<Train>(<Train dataSetMetas={dataSetMetas} train={train} />)

    const create: any = wrapper.find({ className: "create-btn" })
    create.simulate("click");
    expect(wrapper.state().openNewWindow).toBe(true)

    const change: any = wrapper.find('select')
    change.simulate('change', { target: { value: 'ex' } });
    const choose: any = wrapper.find({ className: "choose-btn" })
    choose.simulate("click");
    expect(wrapper.state().datasets).toEqual([{ dataSetID: -1, dataSetName: "ex", chosen: false }])
    expect(wrapper.state().databaseList).toEqual([])

    const datasetcheck1: any = wrapper.find("input").at(0);
    datasetcheck1.simulate('change', { target: { checked: true } })
    expect(wrapper.state().datasets).toEqual([{ dataSetID: -1, dataSetName: "ex", chosen: true }])
    const datasetcheck2: any = wrapper.find("input").at(0);
    datasetcheck2.simulate('change', { target: { checked: false } })
    expect(wrapper.state().datasets).toEqual([{ dataSetID: -1, dataSetName: "ex", chosen: false }])
});

test('multiimputation', () => {
    Enzyme.configure({ adapter: new Adapter() })
    let train = jest.fn()
    let dataSetMetas = [{ dataSetID: -1, dataSetName: 'ex' }]
    const wrapper = shallow<Train>(<Train dataSetMetas={dataSetMetas} train={train} />)

    const testNotificationManager = NotificationManager.info('test')
    const imputation: any = wrapper.find("input").at(1);
    imputation.simulate('change', { target: { value: 0 } })
    imputation.simulate('change', { target: { value: 1 } })
    expect(testNotificationManager).toBe(NotificationManager.error("Darf nicht mehrer Imputationen wählen!", "", 3000))
});

test('multiscaler', () => {
    Enzyme.configure({ adapter: new Adapter() })
    let train = jest.fn()
    let dataSetMetas = [{ dataSetID: -1, dataSetName: 'ex' }]
    const wrapper = shallow<Train>(<Train dataSetMetas={dataSetMetas} train={train} />)

    const testNotificationManager = NotificationManager.info('test')
    const scaler: any = wrapper.find("input").at(2);
    scaler.simulate('change', { target: { value: 0 } })
    scaler.simulate('change', { target: { value: 1 } })
    expect(testNotificationManager).toBe(NotificationManager.error("Darf nicht mehrer Scaler wählen!", "", 3000))
});

test('multiiclassifier', () => {
    Enzyme.configure({ adapter: new Adapter() })
    let train = jest.fn()
    let dataSetMetas = [{ dataSetID: -1, dataSetName: 'ex' }]
    const wrapper = shallow<Train>(<Train dataSetMetas={dataSetMetas} train={train} />)

    const testNotificationManager = NotificationManager.info('test')
    const classifier: any = wrapper.find("input").at(4);
    classifier.simulate('change', { target: { value: 0 } })
    classifier.simulate('change', { target: { value: 1 } })
    expect(testNotificationManager).toBe(NotificationManager.error("Darf nicht mehrer Classifier wählen!", "", 3000))
});

test('train', () => {
    Enzyme.configure({ adapter: new Adapter() })
    let train = jest.fn()
    let dataSetMetas = [{ dataSetID: -1, dataSetName: 'ex' }]
    const wrapper = shallow<Train>(<Train dataSetMetas={dataSetMetas} train={train} />)

    const testNotificationManager = NotificationManager.info('test')
    const trainbtn: any = wrapper.find({ className: "train-btn" })
    //no choice
    trainbtn.simulate('click')
    expect(testNotificationManager).toBe(NotificationManager.error("Keinen Datensatz wählen!", "", 3000))

    //choose dataset
    const create: any = wrapper.find({ className: "create-btn" })
    create.simulate("click");
    const change: any = wrapper.find('select')
    const choose: any = wrapper.find({ className: "choose-btn" })
    choose.simulate("click");
    const datasetcheck1: any = wrapper.find("input").at(0);
    datasetcheck1.simulate('change', { target: { checked: true } })

    trainbtn.simulate('click')
    expect(testNotificationManager).toBe(NotificationManager.error("Keine Imputation wählen!", "", 3000))
    //choose imputation
    const imputationcheck: any = wrapper.find("input").at(1)
    imputationcheck.simulate('change', { target: { value: 0 } })
    expect(wrapper.state().imputators).toEqual([
        { name: "Mittel", checked: true, tag: 'MEAN' },
        { name: "Letzer Wert fortgeführt", checked: false, tag: 'FORWARD' },
        { name: "Bewegter Durchschnitt", checked: false, tag: 'MOVING' },
        { name: "Lineare Interpolation", checked: false, tag: 'LINEAR' },
        { name: "Spline Interpolation", checked: false, tag: 'SPLINE' }
    ])
    trainbtn.simulate('click')

    expect(testNotificationManager).toBe(NotificationManager.error("Kein Classifier wählen!", "", 3000))

    //choose classifier
    const classifiercheck: any = wrapper.find({ className: 'classifiercheck' }).at(0)
    classifiercheck.simulate('change', { target: { value: 0 } })
    expect(wrapper.state().classifiers).toEqual([
        { name: "MLPClassifier", checked: true, tag: 'MLP' },
        { name: "RandomForestClassifier", checked: false, tag: 'RANDOM_FOREST' },
        { name: "KNeighborsClassifier", checked: false, tag: 'K_NEIGHOBORS' },
        { name: "Support Vector Machine", checked: false, tag: 'SVM' }
    ])
    trainbtn.simulate('click')
    expect(testNotificationManager).toBe(NotificationManager.error("Kein Scaler wählen!", "", 3000))

    //choose scaler
    const scalercheck: any = wrapper.find({ className: 'scalercheck' }).at(0)
    scalercheck.simulate('change', { target: { value: 0 } })
    expect(wrapper.state().scalers).toEqual([
        { name: "Standard Scaler", checked: true, tag: 'STANDARD' },
        { name: "Robust Scaler", checked: false, tag: 'ROBUST' },
        { name: "Min-Max Scaler", checked: false, tag: 'MIN_MAX' },
        { name: "Normalizer", checked: false, tag: 'NORMALIZER' },
        { name: "Anteilstrafo", checked: false, tag: 'SHARE' }
    ])
    trainbtn.simulate('click')
    expect(testNotificationManager).toBe(NotificationManager.error("Keine Merkmalextraktion wählen!", "", 3000))

    //choose feature
    const featurecheck: any = wrapper.find({ className: 'featurecheck' }).at(0)
    featurecheck.simulate('change', { target: { value: 0 } })
    expect(wrapper.state().myfeatures).toEqual([
        { name: "Minimum", checked: true, tag: 'MIN' },
        { name: "Maximum", checked: false, tag: 'MAX' },
        { name: "Varianz", checked: false, tag: 'VARIANCE' },
        { name: "Energie", checked: false, tag: 'ENERGY' },
        { name: "Fourier-T", checked: false, tag: 'FOURIER_TRANSFORM' },
        { name: "Mittelwert", checked: false, tag: 'MEAN' },
        { name: "Autoregressiv", checked: false, tag: 'AUTOREGRESSIVE' },
        { name: "Abweichung", checked: false, tag: 'SKEWNESS' },
        { name: "Wölbung", checked: false, tag: 'KURTOSIS' },
        { name: "IQR", checked: false, tag: 'IQR' }
    ])
    expect(train.mock.calls.length).toBe(0)
    trainbtn.simulate('click')
    expect(train.mock.calls.length).toBe(1)
});

