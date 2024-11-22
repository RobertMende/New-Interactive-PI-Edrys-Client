import JointJsElementBuilder from "./pathBuilder.js";
import PlantElement from "./plantElement.js";
import JointJsPortFactory from "./portFactory.js";


class PlantElementBuilder{
    constructor(){}

    static buildElement(elementName, elementType, config, paper, graph){
        const allowedTypes=[
            "saturator",
            "oven",
            "mfc",
            "bpValve",
            "twValve",
            "stopcock",
            "nValve",
            "absorber",
            "mPoint",
            "IR"
        ];

        if(!allowedTypes.includes(elementType)) throw new Error(`There is no known plant type called ${type}`);

        const svgElement=this.buildSvgPath(elementType, config);
        svgElement.addTo(graph);
        const plantElement=new PlantElement(elementName, elementType, svgElement);
        plantElement.centerElement(paper);
        this.appendPorts(plantElement, config);

        return plantElement;
    }

    static buildSvgPath(elementType, config){
        return JointJsElementBuilder.buildPath(elementType, config);
    }

    static appendPorts(plantElement, config){
        JointJsPortFactory.appendPorts(plantElement, config);
    }
}


export default PlantElementBuilder;