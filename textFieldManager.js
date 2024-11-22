

class TextFieldManager{
    constructor(){
        this.textFields = [];
    }

    addTextField(textField){
        this.textFields.push(textField);
    }

    getAllTextFields(){
        return this.textFields;
    }

    findTextFieldBySvgElement(svgElement){
        for(const field in this.textFields){
            if(field.svgElement === svgElement){
                return field;
            }
        }

        throw new Error(`Unknown svgElement ${svgElement}`);
    }

    findTextFieldByInstrumentName(name){
        for(const field of this.textFields){
            if(field.instrumentName == name){
                return field;
            }
        }

        throw new Error("There is no known textField with the instrument name", name);
    }
}

export default TextFieldManager;