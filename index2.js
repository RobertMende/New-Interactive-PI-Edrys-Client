import PlantElementBuilder from "./PlantElementBuilder.js";
import JointJsElementBuilder from "./pathBuilder.js";

var customNamespace = joint.shapes;

var graph = new joint.dia.Graph({}, { cellNamespace: customNamespace });

const paper = new joint.dia.Paper({
    el: document.getElementById('myholder'),
    model: graph,
    width: 600,
    height: 300,
    cellViewNamespace: customNamespace,
    background:{
        color: "#abf7b1"
    }
});
JointJsElementBuilder.setDefaultPathConfig({
    stroke: "#111111",
    strokeWidth: 2,
    fill: "#FFFFFF"
});
const element=PlantElementBuilder.buildElement("IR", "IR", {height: 40, width: 80}, paper, graph);
element.translate(100, 100);

const element2=PlantElementBuilder.buildElement("Saturator", "saturator", {width: 25, height: 100}, paper, graph);
element2.translate(200, 200);


const p1=element.svgElement.getPorts()[1].attrs.portBody;
const p2=element2.svgElement.getPorts()[0].attrs.portBody;

console.log(element.svgElement.getPorts()[1]);

var link = new joint.shapes.standard.Link(
    {
        source:{
            id: element.svgElement.id,
            port: "out"
    },
        target: {
            id: element2.svgElement.id,
            port: "in"
    }    
}
);

link.addTo(graph);

const linkView = paper.findViewByModel(link);
//linkView.highlight();
