import ControlField from "./controlField.js";
import { MagneticValveControlField } from "./controlField.js";

class ControlFieldFactory{
    constructor(modelManager){
        this.modelManager = modelManager;
    }

    createControlField(config){
        const {type, text, setPointModelTopic, processValueModelTopic, position, size} = config;

        const processValueModel = this.modelManager.findModel(processValueModelTopic);
        if(type === "MagneticValveControlField"){
            return this.createMagneticValveControlField(text, processValueModel, position, size);
        }
        else{
            throw new Error(`Unknown ControlField type ${type}`);
        }
    }

    createMagneticValveControlField(text, processValueModel, position, size){
        return new MagneticValveControlField(text, processValueModel, position, size);
    }
}

export default ControlFieldFactory;