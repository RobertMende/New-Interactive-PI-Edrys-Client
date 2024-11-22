import instrumentConfigs from "./instruments/plantInstrumentConfig.js";
import PlantElement from "./plantElement.js";
import PlantElementBuilder from "./PlantElementBuilder.js";
import PlantElementManager from "./PlantElementManager.js";
import linkConfigs from "./instruments/linkConfig.js";
import ConnectionFactory from "./ConnectionFactory.js";
import ModelFactory from "./modelFactory.js";
import ModelManager from "./modelManager.js";
import CommunicationManager from "./CommunicationManager.js";
import TextFieldFactory from "./textFieldFactory.js";
import textFieldConfigs from "./textFields/textFieldConfig.js";
import TextFieldManager from "./textFieldManager.js";
import ChartJsChartFactory from "./chartFactory.js";
import ChartJsChartManager from "./chartManager.js";
import ControlFieldFactory from "./controlFieldFactory.js";
import ControlFieldManager from "./controlFieldManager.js";
import controlFieldConfigs from "./controlFields/controlFieldConfig.js";

const SCALE = 1.2;
let thisGraph = undefined;

const setup = (paper, graph) =>{


    const plantElementManager = new PlantElementManager();

    for(const instrumentConfig of instrumentConfigs){
        const {name, type, config, position} = instrumentConfig;

        const plantElement = PlantElementBuilder.buildElement(name, type, config, paper, graph);
        plantElement.position(SCALE*position[0], SCALE*position[1]);

        plantElementManager.addPlantElement(plantElement);
    }
    
    const connectionFactory = new ConnectionFactory(plantElementManager, SCALE, {});

    for(const linkConfig of linkConfigs){
        const {source, sourcePort, destination, destinationPort, vertices} = linkConfig;

        const link = connectionFactory.createConnection(source, sourcePort, destination, destinationPort, vertices);
        link.addTo(graph);
    }
    thisGraph = graph;


    return plantElementManager;
}


const modelManager = new ModelManager(["modelUpdate"]);

const getModelManager = () => modelManager;

const onModelUpdate = (sender, msg) => console.log("Model update:", msg.data);

const setupModels = (sender, data) => {
    const modelMap = data.data;
    const factory = new ModelFactory();

    for(const instrumentName in modelMap){
        for(const modelDescription of modelMap[instrumentName]){
            const model = factory.createModel(modelDescription);
            modelManager.appendModel(model);
        }
    }

    const chartFactory = new ChartJsChartFactory();
    const chartManager = new ChartJsChartManager();
    for(const chart of chartFactory.createCharts("chartContainer", modelManager)){
        chartManager.appendChart(chart);
    }


    Edrys.onMessage(({from, subject, body}) =>{
        if(subject === "dataUpdate") modelManager.onDataUpdate(undefined, JSON.parse(body));
        if(subject === "getWholeModelData") modelManager.onSetModelData(undefined, JSON.parse(body));
    } )
    console.log("model manager models:", modelManager.getAllModels());
    


    ["Temperature Thermostat setpoint", "MFC in Flow setpoint", "Temperature Oven setpoint", "Relay Pattern", "irSpectrum", "IR CO2", "IR Formaldehyde", "IR Methanol"].map(modelName => 
        Edrys.sendMessage("getWholeModelData", {topic: "getWholeModelData", subTopic: modelName, data:""}));
    console.log("Model setup complete");

    setupTextFields();
}

const setupCommunication = () => {
    Edrys.onMessage(({from, subject, body}) => {
        if(from === Edrys.username) return;

        if(subject === "getModelsInfoOfAllInstruments") setupModels(undefined, JSON.parse(body));
    })
    console.log("Communication setup complete");
}

const textFieldManager = new TextFieldManager();
const getTextFieldManager = () => textFieldManager;

const controlFieldManager = new ControlFieldManager();
const getControlFieldManager = () => controlFieldManager;

const setupTextFields = () =>{
    const textFieldFactory = new TextFieldFactory(modelManager);

    for(const textFieldConfig of textFieldConfigs){
        const scaledConfig = textFieldConfig;
        scaledConfig["position"] = [SCALE*textFieldConfig["position"][0], SCALE*textFieldConfig["position"][1]];
        scaledConfig["size"] = [SCALE*textFieldConfig["size"][0], SCALE*textFieldConfig["size"][1]];
        const textField = textFieldFactory.createTextField(scaledConfig);
        textFieldManager.addTextField(textField);
        modelManager.subscribeToEvent("modelUpdate", textField.onDataUpdate);
    }

    const textFields = textFieldManager.getAllTextFields();
    for(const field of textFields){
        setTimeout(()=>{
            if(field.processValueModel || field.setPointModel) return;

            field.setInvisible();
        }, 5000);
    }

    console.log("Text Fields created");

    setupControlFields();
}



const setupControlFields = () =>{
    const controlFieldFactory = new ControlFieldFactory(modelManager);

    for(const config of controlFieldConfigs){
        const scaledConfig = config;
        scaledConfig["position"] = [SCALE*config["position"][0], SCALE*config["position"][1]];
        scaledConfig["size"] = [SCALE*config["size"][0], SCALE*config["size"][1]];
        const controlField = controlFieldFactory.createControlField(scaledConfig);
        controlField.svgElement.addTo(thisGraph);
        modelManager.subscribeToEvent("modelUpdate", controlField.onDataUpdate);
        controlFieldManager.appendControlField(controlField);
    }

    console.log("Control Fields created");
    const el = document.getElementById("jointJsDiv");
    const body = document.getElementById("main");
    const container = document.getElementById("chartContainer");
    console.log("JointJsDiv:", [el.clientWidth, el.clientHeight]);
    console.log("body:", [body.clientWidth, body.clientHeight]);
    console.log("chart container:", [container.clientWidth, container.clientHeight]);

    setupResize();
}

const setupResize = () =>{


const chartContainer = document.getElementById('chartContainer');
const [chartWidth, chartHeight] = [chartContainer.children[0].clientWidth, chartContainer.children[0].clientHeight];
const aspectRatio = chartWidth/chartHeight;
const [initialWidth, initialHeight] = [chartContainer.clientWidth, chartContainer.clientHeight];


window.addEventListener('resize', () => {


const children = chartContainer.children;

const [widthRatio, heightRatio] = [initialWidth/chartContainer.clientWidth, initialHeight/chartContainer.clientHeight];
chartContainer.style.height = `${widthRatio*initialWidth/initialHeight*chartContainer.clientWidth}px`;
const [newWidth, newHeight] = [chartWidth/widthRatio, chartHeight/widthRatio];

for (let child of children) {
    child.style.width = `${newWidth}px`;
    child.style.height = `${newHeight}px`;
}

});
}




export default setup;

export {setupModels, setupCommunication, getModelManager, getTextFieldManager, getControlFieldManager};