

class ControlFieldManager{
    constructor(){
        this.controlFields = [];
    }

    appendControlField(controlField){
        this.controlFields.push(controlField);
    }

    findControlFieldBySvgElement(svgElement){
        for(const field of this.controlFields){
            if(field.svgElement === svgElement){
                return field;
            }
        }

        throw new Error(`No known svgElement ${svgElement} known to the ControlFieldManager`);
    }
}

export default ControlFieldManager;