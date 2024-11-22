import PlantElement from "./plantElement.js";

class PlantElementManager{
    constructor(){
        this.plantElements=[];
    };

    addPlantElement(plantElement){
        if(!(plantElement instanceof PlantElement)) throw new Error(`The supplied argument ${plantElement} is not a PlantElement`);

        if(this.plantElementExists(plantElement.name)) throw new Error(`There already is a plant element by the name of ${plantElement.name}. Plant element names must be unique`);

        this.plantElements.push(plantElement);
    }

    getPlantElement(elementName){
        for(const pe of this.plantElements){
            if(pe.name === elementName) return pe;
        }

        throw new Error(`There is no known plant element by the name of ${elementName}`);
    }

    getPlantElementsByType(elementType){
        const elements = this.plantElements.filter(el => el.type === elementType);

        if(!elements) throw new Error(`No known elements of type ${elementType}`);

        return elements;
    }

    getPlantElementBySvgElement(svgElement){
        for(const pe of this.plantElements){
            if(pe.svgElement == svgElement)
                return pe;
        }

        throw new Error("There is no svgElement in the plantElementManager that matches", svgElement);
    }

    getAllPlantElements(){
        return this.plantElements;
    }

    plantElementExists(elementName){
        try{
            this.getPlantElement(elementName)

            return true;
        }
        catch{
            return false;
        }
    }
}

export default PlantElementManager;