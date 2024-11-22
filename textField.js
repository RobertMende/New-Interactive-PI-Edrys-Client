

class TextField{
    constructor(instrumentName, setPointModel, processValueModel, position, size){
        this.svgElement = new joint.shapes.standard.Rectangle();
        this.svgElement.position(position[0], position[1]);
        this.svgElement.resize(size[0], size[1]);
        
        this.instrumentName = instrumentName;
        this.setPointModel = setPointModel;
        this.processValueModel = processValueModel;

        this.onDataUpdate = this.onDataUpdate.bind(this);

        console.log("Created Text field with SP model", this.setPointModel, " and PV model", this.processValueModel+" for instrument", instrumentName);

        this.setVisuals();
        this.setText(this.getDisplayPattern());
    }

    onDataUpdate(sender, msg){
        if(!(msg["subTopic"] == this.setPointModel.topic || msg["subTopic"] == this.processValueModel.topic)) return;

        console.log("Going to update the texts");
        const text = this.getDisplayPattern();
        this.setText(text);
    }

    getDisplayPattern(){
        const sp = this.setPointModel;
        const pv = this.processValueModel;

        const setPointString = this.setPointModel? `\nSP: ${sp.y[sp.y.length-1]} ${sp.yUnit}` : "";
        const processValueString = this.processValueModel? pv.y.length&&`\nPV: ${pv.y[pv.y.length-1]} ${pv.yUnit}` || "-": "";

        return `${this.instrumentName}${setPointString}${processValueString}`;
    }

    getSvgElement(){
        return this.svgElement;
    }

    setText(text){
        this.svgElement.attr("label/text", text);
    }

    setTextColor(color){
        this.svgElement.attr("label/fill", color);
    }

    setFill(color){
        this.svgElement.attr("body/fill", color);
    }

    setFont(font){
        this.svgElement.attr("label/font-family", font);
    }

    setFontSize(size){
        this.svgElement.attr("label/font-size", size);
    }

    setVisuals(){
        this.setTextColor("grey")
        this.setFill("#b1e9fe");
        this.setFont("arial");
        this.setFontSize(20);
    }

    setVisible(){
        this.svgElement.attr("body/visibility", "visible");
        this.svgElement.attr("label/visibility", "visible");
    }

    setInvisible(){
        this.svgElement.attr("body/visibility", "hidden");
        this.svgElement.attr("label/visibility", "hidden");
    }


    onDataUpdate(){
        this.setText(this.getDisplayPattern());
    }


}

class TextFieldDescription{
    constructor(instrumentName, setPointModelTopic, processValueModelTopic, position, size){
        this.instrumentName = instrumentName;
        this.setPointModelTopic = setPointModelTopic;
        this.processValueModelTopic = processValueModelTopic;
        this.position = position;
        this.size = size;
    }
}

export default TextField;

export {TextFieldDescription};