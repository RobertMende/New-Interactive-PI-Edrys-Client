import TextField from "./textField.js";

class TextFieldFactory{
    constructor(modelManager){
        this.modelManager = modelManager;
    }

    createTextField(textFieldDescription){
        const desc = textFieldDescription;
        const setPointModel = desc.setPointModelTopic ? this.modelManager.findModel(desc["setPointModelTopic"]) : undefined;
        const processValueModel = desc.processValueModelTopic? this.modelManager.findModel(desc["processValueModelTopic"]): undefined;

        return new TextField(desc.instrumentName, setPointModel, processValueModel, desc.position, desc.size);
    }





}

export default TextFieldFactory;