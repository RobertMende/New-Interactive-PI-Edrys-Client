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

const calculateCenter=elView=>{
    const {x, y, width, height}=elView.getBBox();
    return {x:x+width/2, y:y+height/2};
}

const centerView=elView=>{
    const {x, y}=calculateCenter(elView);
    elView.model.translate(-x, -y);
}

const centerModel=elModel=>{
    const elView=paper.findViewByModel(elModel);
    centerView(elView);
}

paper.on("element:pointerdblclick", elView=>{
    centerView(elView);
});

paper.on("element:mouseover", elView=>{
    let i=0;
    while(i<elView.model.collection.length){
        elView.model.attr(`${i}/strokeWidth`, 4);
        i++;
    }
})

paper.on("element:mouseout", elView=>{
    let i=0;
    while(i<elView.model.collection.length){
        elView.model.attr(`${i}/strokeWidth`, 2);
        i++;
    }
})


const resizePaper=()=>{
    const [w, h]= [window.innerWidth, window.innerHeight];
    paper.setDimensions(w, h);
}

resizePaper();

window.addEventListener("resize", resizePaper);

JointJsElementBuilder.setDefaultPathConfig({
    stroke: "#111111",
    strokeWidth: 2,
    fill: "#FFFFFF"
});

const elements=[
    {type: "bpValve", config: {width: 40}},
    {type: "absorber", config: {bodyHeight: 25}},
    {type: "IR", config: {height: 25, width: 50}},
    {type: "nValve", config: {bodyHeight: 25}},
    {type: "mPoint", config: {radius: 25, text: "T01", number: 10, holderAngle: 90}}
];

var port = {
    label: {
        position: {
            name: 'left'
        },
        markup: [{
            tagName: 'text',
            selector: 'label'
        }]
    },
    attrs: {
        portBody: {
            magnet: true,
            width: 16,
            height: 16,
            x: -8,
            y: -8,
            fill:  '#03071E'
        }
    },
    markup: [{
        tagName: 'rect',
        selector: 'portBody'
    }]
};

var port2 = {
    attrs: {
        portBody: {
            magnet: true,
            width: 16,
            height: 16,
            x: 20,
            y: -8,
            fill:  '#03071E'
        }
    },
    markup: [{
        tagName: 'rect',
        selector: 'portBody'
    }]
};

const i=5;
const element=JointJsElementBuilder.buildPath(elements[3].type, elements[3].config);
element.translate(i*50, i*50);
element.addTo(graph);

element.addPorts([port, port2]);


