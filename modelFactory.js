import Model from "./Model.js";

class ModelFactory{
    constructor(){

    }

    createModel(modelDescription){
        const d = modelDescription;

        return new Model(d.topic, d.xQuantity, d.yQuantity, d.xUnit, d.yUnit, d.type);
    }
}

export default ModelFactory;