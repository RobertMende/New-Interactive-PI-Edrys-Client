import PlantElementBuilder from "./PlantElementBuilder.js";
import JointJsElementBuilder from "./pathBuilder.js";
import ConnectionFactory from "./ConnectionFactory.js";
import PlantElementManager from "./PlantElementManager.js";
import setup, { getControlFieldManager } from "./setup.js";
import { setupCommunication, setupModels, getModelManager, getTextFieldManager, getCommunicationManager} from "./setup.js";

const runApplication = () =>{
console.log("Hello from index3.js");

var customNamespace = joint.shapes;

var graph = new joint.dia.Graph({}, { cellNamespace: customNamespace });

const paper = new joint.dia.Paper({
    el: document.getElementById('jointJsDiv'),
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

const plantElementManager = setup(paper, graph);
plantElementManager.getAllPlantElements().forEach(el => console.log(el.name));

const [initialWidth, initialHeight] = [window.innerWidth, window.innerHeight];

const resizePaper = () =>{
    const [width, height] = [window.innerWidth, window.innerHeight];
    paper.scale(width/initialWidth, height/initialHeight);
    paper.setDimensions(width, height);
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

    // Extract the current setpoint value
    const currentVal = labelText.match(/SP: (\d+)/)[1]; // Assuming the value is a number

    // Create an input element positioned over the current setpoint value
    const input = document.createElement('input');
    input.type = 'text';
    input.value = currentVal;
    input.style.position = 'absolute';
    input.style.left = ((element.position().x + 72)-(input.value.length-2)*10) + 'px';  // Adjust x-offset for input position
    input.style.top = (element.position().y + 40) + 'px';   // Adjust y-offset for input position

    // Set custom styles
    input.style.backgroundColor = 'white';  // Background color
    input.style.color = 'grey';  // Font color
    input.style.fontSize = '20px';  // Font size
    input.style.fontFamily = 'Arial';  // Font family

    // Set the width dynamically based on the current value
    input.style.width = `${currentVal.length + 1}ch`; // Add 1ch for some padding

    document.body.appendChild(input);
    input.focus();

    // Function to handle updating the setpoint value
    function updateSetpoint() {
        const newVal = parseFloat(input.value); // Get the user input

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

    // Adjust width dynamically on input
    input.addEventListener('input', function () {
        input.style.width = `${input.value.length + 1}ch`; // Adjust width based on content length
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
    const communicationManager = getCommunicationManager();

    const mvStateModel = modelManager.findModel("Relay Pattern");
    const valveState = mvStateModel.y[mvStateModel.y.length-1]%2;
    console.log("Valve state:", valveState);

    communicationManager.send("setValue", "Relay switch", {func: valveState? "turnOff":"turnOn", args: [1]});
}

paper.on('element:pointerdblclick', function(elementView, evt) {
    if (isMagneticValveController(elementView, evt)) toggleMagneticValve(); //switch magnetic valve state
    else if(elementView.model.attr("body/fill") ==  "#b1e9fe") createSetpointField(elementView, evt); //setpoint squares
    else if(elementView.model.attr("body/fill") == undefined) moveToPlot(elementView, evt); //plant elements
});

const setNewValue = (newVal, labelText) =>{
    const communicationManager = getCommunicationManager();
    console.log("Value:", newVal);
    console.log("label text:");
    console.log(labelText);

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

    communicationManager.send("setValue", subTopic, data);
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

