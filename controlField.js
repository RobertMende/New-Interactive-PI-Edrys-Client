

class ControlField{
    constructor(text, setPointModel, processValueModel, position, size){
        this.svgElement = new joint.shapes.standard.Rectangle();
        this.svgElement.position(position[0], position[1]);
        this.svgElement.resize(size[0], size[1]);

        this.text = text;
        this.setPointModel = setPointModel;
        this.processValueModel = processValueModel;

        this.setVisuals();
    }

    onDataUpdate(sender, msg){
        if(!(msg["subTopic"] === this.setPointModel.topic || msg["subTopic"] === this.processValueModel.topic)) return;

        console.log("Going to update the texts");
        const text = this.getDisplayPattern();
        this.setText(text);
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

    centerFont(){
        this.svgElement.attr('label/text-anchor', 'middle');  
    }

    setVisuals(){
        this.setTextColor("grey")
        this.setFill("#fad1c8");
        this.setFont("arial");
        this.setFontSize(20);
        this.centerFont();
    }


}

class MagneticValveControlField extends ControlField{
    constructor(text, processValueModel, position, size){
        super(text, undefined, processValueModel, position, size);
        this.onDataUpdate = this.onDataUpdate.bind(this);
    }

    onDataUpdate(sender, msg){
        if(!(msg["subTopic"] === this.processValueModel.topic)) return;
        
        const valvePattern = this.processValueModel.y[this.processValueModel.y.length-1];

        if(this.magneticValveIsOn(valvePattern)){
            this.setText("Turn Off");
        }
        else{
            this.setText("Turn On");
        }
    }

    magneticValveIsOn(valvePattern){
        return valvePattern % 2 === 1;
    }
}

export default ControlField;
export {MagneticValveControlField};