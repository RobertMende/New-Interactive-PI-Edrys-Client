import Model from "./Model.js";
import Publisher from "./PublishSubscribe/Publisher.js";

class ModelManager extends Publisher{
    constructor(eventNames){
        super(eventNames);
        this.models = [];

        this.onDataUpdate = this.onDataUpdate.bind(this);
        this.onSetModelData = this.onSetModelData.bind(this);
    }

    appendModel(model){
        this.models.push(model);
    }

    getAllModels(){
        return this.models;
    }

    findModel(modelTopic){
        for(const model of this.models){
            if(model.topic == modelTopic) return model;
        }

        throw new Error(`Could not find model with the topic ${modelTopic}`);
    }

    onSetModelData(sender, msg){
        const modelTopic = msg["subTopic"];
        const model = this.findModel(modelTopic);
        model.setData(msg.data);
        msg.data.model = model;

        console.log("Setting Data for model", modelTopic);
        console.log(msg);

        this.fireEvent("modelUpdate", msg);
    }

    onDataUpdate(sender, msg){
        const modelTopic = msg["subTopic"];
        const model = this.findModel(modelTopic);
        model.addData(msg.data);
        msg.data.model = model;

        if(modelTopic === "Relay Pattern"){
            console.log("Update for relay patter");
            console.log(msg);
        }

        this.fireEvent("modelUpdate", msg);
    }

    
}

export default ModelManager;