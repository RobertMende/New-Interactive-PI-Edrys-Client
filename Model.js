

class Model{

    constructor(topic, xQuantity, yQuantity, xUnit, yUnit, type){
        this.topic = topic;
        this.xQuantity = xQuantity;
        this.yQuantity = yQuantity;
        this.xUnit = xUnit;
        this.yUnit = yUnit;
        this.modelType = type;

        this.x = [];
        this.y = [];
    }

    addData(data){
        if(this.modelType == "SpectrumModel"){
            console.log("Updating ir spectrum with");
            console.log(data);
            this.x = data.timestamp.map(el => parseFloat(el.toFixed(0)));
            this.y = data.value.map(el => parseFloat(el.toFixed(1)));;
        }
        if(this.modelType == "IRTimeModel" || this.modelType == "TimeValueModel"){
            if(this.x.length >= 100) {
                const x = this.x.shift();
                const y = this.y.shift();
            }

            this.x.push(parseFloat(data.timestamp.toFixed(1)));
            this.y.push(parseFloat(data.value.toFixed(1)));
        }


    }

    setData(data){
        if(this.modelType == "SpectrumModel"){
            console.log("Updating ir spectrum with");
            console.log(data);
            this.x = data.x.map(el => parseFloat(el.toFixed(0)));
            this.y = data.y.map(el => parseFloat(el.toFixed(1)));;
            return;
        }

        if(this.modelType === "TimeValueModel" && this.x != []) {
            console.log("returning since model is not empty with topic", this.topic);
            return;
        }
        console.log("Going to set the model", this.topic, "with data", data)
        this.x = data["x"];
        this.y = data["y"];
    }
}

export default Model;
