import { DeliveryPage } from '../../DeliveryPage';
import { States } from '../../State';

test('delivery', () => {
    let page = new DeliveryPage()
    //@ts-ignore
    page.delivery(['testmail1', 'testemail2'])
    expect(page.getState().currentState).toEqual(States.DeliverWeb)
    expect(page.getState().chosenEmails).toEqual(['testmail1', 'testemail2'])
});

test('download', () => {
    let page = new DeliveryPage()
    //@ts-ignore
    page.download()
    expect(page.getState().currentState).toEqual(States.NeedDownload)
});
