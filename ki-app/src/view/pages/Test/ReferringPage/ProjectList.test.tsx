import ProjectList from "../../../components/ReferringComponents/ProjectList/index"
import Enzyme, { shallow } from 'enzyme';
import Adapter from '@wojtekmaj/enzyme-adapter-react-17';

let wrapper: any
let projectData = [{ projectID: 1, projectName: "TEST", AIModelID: [1,2], }]
let qr: "TEST"
const pageSetCurrentprojekt = jest.fn()
const pageLoadModel = jest.fn()
const pageLoadProjekt = jest.fn()
const pageChangeToVisu = jest.fn()

beforeEach(() => {
  projectData = [{ projectID: 1, projectName: "TEST", AIModelID: [1,2], }]
  qr= "TEST"
  Enzyme.configure({ adapter: new Adapter() });
  wrapper = Enzyme.mount<ProjectList>(
  <ProjectList 
    projectData = {projectData}
    pageSetCurrentprojekt = {pageSetCurrentprojekt}
    pageLoadModel = {pageLoadModel}
    pageLoadProjekt = {pageLoadProjekt}
    pageChangeToVisu = {pageChangeToVisu}
    qr = {qr}
  />)
  });

test('Gültiges laden der Modelliste', () => {
  const selectProject: any =  wrapper.find("select").at(0);
  const loadModellist: any = wrapper.find("button").at(0);
  selectProject.simulate("change", {target: { value: 1 }});
  loadModellist.simulate("click");
  expect(wrapper.state().currentProject).toBe(projectData[0])
});

test('Keine Modelle für Modelliste', () => {
  projectData = [{ projectID: 1, projectName: "TEST", AIModelID: [], }]
  wrapper = Enzyme.mount<ProjectList>(
    <ProjectList 
      projectData = {projectData}
      pageSetCurrentprojekt = {pageSetCurrentprojekt}
      pageLoadModel = {pageLoadModel}
      pageLoadProjekt = {pageLoadProjekt}
      pageChangeToVisu = {pageChangeToVisu}
      qr = {qr}
    />)
  const selectProject: any =  wrapper.find("select").at(0);
  const loadModellist: any = wrapper.find("button").at(0);
  selectProject.simulate("change", {target: { value: 1 }});
  loadModellist.simulate("click");
  expect(wrapper.state().currentProject).toStrictEqual({ projectID: -1, projectName: "", AIModelID: [] })
});

test('Kein Project ausgewählt für Modelliste', () => {
  const loadModellist: any = wrapper.find("button").at(0);
  loadModellist.simulate("click");
  expect(wrapper.state().currentProject).toStrictEqual({ projectID: -1, projectName: "", AIModelID: [] })
});

