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
        if(msg.data == "") return;
        console.log("message in OnSetModelData: ", msg);

        const modelTopic = msg["subTopic"];
        const model = this.findModel(modelTopic);
        console.log("Going to set data for model", model.topic);
        
        if(model.x == []) {console.log("going to set the data"); model.setData(msg.data);}
        else{console.log("Model already has data, not going to set it, model data:", model.x, model.y)}
        msg.data.model= model;
        this.fireEvent("modelUpdate", msg);
    }

    onDataUpdate(sender, msg){
        const modelTopic = msg["subTopic"];
        const model = this.findModel(modelTopic);
        model.addData(msg.data);
        msg.data.model = model;

        this.fireEvent("modelUpdate", msg);
    }

    
}

export default ModelManager;
