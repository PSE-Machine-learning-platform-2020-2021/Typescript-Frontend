import { PageController } from "./PageController";
import { MainController } from "./MainController";
export class ModelCreationController implements PageController {

    private page = new view.ModelCreationController();

    update() {
        let state = this.page.getState();
        switch (state) {
            case "needAviableParamater":
                break;
            case "startTraining":
                break;
            case "needMessage":
                let ids = this.page.getIds();
                this.page.setMessages(MainController.getInstance().getMessage(ids));
                break;
            default:
                break;
        }
    }

    setAviableParameter() {
        //todo
    }

    startTraining() {
        //todo
    }
}