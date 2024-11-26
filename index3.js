import PlantElementBuilder from "./PlantElementBuilder.js";
import JointJsElementBuilder from "./pathBuilder.js";
import ConnectionFactory from "./ConnectionFactory.js";
import PlantElementManager from "./PlantElementManager.js";
import setup, { getControlFieldManager } from "./setup.js";
import { setupCommunication, setupModels, getModelManager, getTextFieldManager} from "./setup.js";


const runApplication = () =>{
    if (Edrys.role === "station") return;

console.log("Hello from index3.js");

var customNamespace = joint.shapes;

var graph = new joint.dia.Graph({}, { cellNamespace: customNamespace });

const jointJsDiv = document.getElementById('jointJsDiv')
const paper = new joint.dia.Paper({
    el: jointJsDiv,
    model: graph,
    width: jointJsDiv.clientWidth,
    height: jointJsDiv.clientHeight,
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

const plantElementManager = setup(paper, graph);
plantElementManager.getAllPlantElements().forEach(el => console.log(el.name));

const jointJsDivParent = jointJsDiv.parentElement;
const [jointJsDivParentWidth, jointJsDivParentHeight] = [jointJsDivParent.clientWidth, jointJsDivParent.clientHeight];

const resizePaper = () =>{
    const [originalWidth, originalHeight] = [1584, 735];

    const targetWidth = jointJsDivParentWidth;
    const targetHeight = jointJsDivParentWidth*originalHeight/originalWidth;
    const ratio = jointJsDivParentWidth/originalWidth;
    paper.scale(ratio, ratio);
    paper.setDimensions(targetWidth, targetHeight);
}


window.addEventListener("resize", ()=>{
    resizePaper();
});

resizePaper();




const highlightTimeoutMap = {};

const highlightTextField = elView =>{
    const textFieldMap = {
        "Bp Valve Three Way Valve-Oven": "BP Valve 1",
        "Bp Valve Saturator-Oven": "BP Valve 2",
        "Stopcock Exhaust": "Stopcock 1",
        "Stopcock IR": "Stopcock 2",
        "Bp Valve Oven-IR": "BP Valve 3",
        "Needle Valve IR": "Needle Valve",
        "IR": "Spectrometer",
        "Absorber 1": "Absorber 1",
        "Bp Valve IR-Absorber 2": "BP Valve 4",
        "Absorber 2": "Absorber 2"
    };

    

    const svgElement = elView.model;
    const plantElementName = plantElementManager.getPlantElementBySvgElement(svgElement).name;

    if(!(textFieldMap.hasOwnProperty(plantElementName))){
        console.log("No textField mapping for", plantElementName);
        return;
    }


    const textFieldManager = getTextFieldManager();
    const textField = textFieldManager.findTextFieldByInstrumentName(textFieldMap[plantElementName]);

    if(highlightTimeoutMap[textField.instrumentName] !== undefined) clearTimeout(highlightTimeoutMap[textField.instrumentName]);

    textField.setVisible();
    const timeout = setTimeout(()=>{
        textField.setInvisible();
    }, 5000);

    highlightTimeoutMap[textField.instrumentName] = timeout;
}

paper.on("element:mouseover", elView=>{
    if(elView.model.attr("body/fill") ==  "#b1e9fe") return;

    let i=0;
    while(i<elView.model.collection.length){
        elView.model.attr(`${i}/strokeWidth`, 4);
        i++;
    }

    highlightTextField(elView);
})

paper.on("element:mouseout", elView=>{
    if(elView.model.attr("body/fill") ==  "#b1e9fe") return;

    let i=0;
    while(i<elView.model.collection.length){
        elView.model.attr(`${i}/strokeWidth`, 2);
        i++;
    }
})



const createSetpointField = (elementView, evt) => {
        evt.preventDefault();
    const element = elementView.model;
    const labelText = element.attr('label/text');

    const currentVal = labelText.match(/SP: (\d+)/)[1]; 

    const [originalWidth, originalHeight] = [1536, 736];
    const jointJsDiv = document.getElementById("jointJsDiv");
    const [currentWidth, currentHeight] = [jointJsDiv.clientWidth, jointJsDiv.clientHeight];
    
    const [widthRatio, heightRatio] = [currentWidth/originalWidth, currentHeight/originalHeight];

    const input = document.createElement('input');
    input.type = 'text';
    input.value = currentVal;
    input.style.position = 'absolute';

    input.style.left = (element.position().x + heightRatio*72) + 'px';  
    input.style.top = (element.position().y + widthRatio*40) + 'px';   

    input.style.backgroundColor = 'white';  
    input.style.color = 'grey';  
    input.style.fontSize = '20px';  
    input.style.fontFamily = 'Arial';  

    input.style.width = `${currentVal.length + 1}ch`; 

    document.body.appendChild(input);
    input.focus();




    function updateSetpoint() {
        const newVal = parseFloat(input.value); 

        if (isNaN(newVal)) return;
        setNewValue(newVal, labelText);
        try {
            document.body.removeChild(input); // Remove the input field
        } catch (e) {
            console.error(e);
        }
    }

    input.addEventListener('keydown', function (e) {
        if (e.key === 'Enter') {
            updateSetpoint();
        }
    });

    input.addEventListener('input', function () {
        input.style.width = `${input.value.length + 1}ch`; 
    });
};


const moveToPlot = (elementView, evt) => {
    const plantElementName = plantElementManager.getPlantElementBySvgElement(elementView.model).name;

    const moveMap = {
        "Saturator": "chartDiv Temperature Thermostat",
        "MFC Air": "chartDiv MFC in Flow",
        "Oven": "chartDiv Temperature Oven",
        "IR": "chartDiv irSpectrum"
    };

    if(!(plantElementName in moveMap)) return;

    const targetElementId = moveMap[plantElementName];
    const element = document.getElementById(targetElementId);  
    element.scrollIntoView({
        behavior: 'smooth',  
        block: 'start'       
    });
}

const isMagneticValveController = (elementView, evt) =>{
    evt.stopPropagation();
    const controlFieldManager = getControlFieldManager();

    try{
        controlFieldManager.findControlFieldBySvgElement(elementView.model);
        return true;
    }
    catch{
        return false;
    }
}

const toggleMagneticValve = () =>{
    console.log("Toggling magnetic valve");
    const modelManager = getModelManager();

    const mvStateModel = modelManager.findModel("Relay Pattern");
    const valveState = mvStateModel.y[mvStateModel.y.length-1]%2;
    console.log("Valve state:", valveState);

    Edrys.sendMessage("setValue", {topic: "setValue", subTopic: "Relay switch", data: {func: valveState? "turnOff":"turnOn", args: [1]}});
}

paper.on('element:pointerdblclick', function(elementView, evt) {
    if (isMagneticValveController(elementView, evt)) toggleMagneticValve(); //switch magnetic valve state
    else if(elementView.model.attr("body/fill") ==  "#b1e9fe") createSetpointField(elementView, evt); //setpoint squares
    else if(elementView.model.attr("body/fill") == undefined) moveToPlot(elementView, evt); //plant elements
});

const setNewValue = (newVal, labelText) =>{


    let subTopic;
    let data;
    if(labelText.startsWith("MFC Air")){
        subTopic="MFC in";
        data = {func: "SetFlowRate", args: [newVal, 1]}
    }
    else if(labelText.startsWith("Saturator")){
        subTopic="Thermostat";
        data = {func: "SetTemperature", args: [newVal]}
    }
    else if(labelText.startsWith("Oven")){
        subTopic="Temperature Controller Oven";
        data = {func: "SetTemperature", args: [newVal]}
    }
    else{
        console.error("No valid setValue model available for", labelText);
    }

    Edrys.sendMessage("setValue", {topic: "setValue", subTopic: subTopic, data: data});
}


setupCommunication();

const textFieldInterval = setInterval(()=>{
    const textFields = getTextFieldManager().getAllTextFields();
    if(!textFields) return;

    for(const textField of textFields){
        textField.svgElement.addTo(graph);
    }

    clearInterval(textFieldInterval);
    console.log("Added Text Fields");
}, 1000)


}

window.runApplication = runApplication;

export default runApplication;
