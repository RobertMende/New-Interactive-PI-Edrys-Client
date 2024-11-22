import { TextFieldDescription } from "../textField.js";

const SIZE_FOR_MODELS = [125, 75];
const SIZE_FOR_NAMES = [100, 33]

const textFieldConfigs = [
    {instrumentName: "MFC Air", setPointModelTopic: "MFC in Flow setpoint", processValueModelTopic: "MFC in Flow", position: [320, 40], size: SIZE_FOR_MODELS},
    {instrumentName: "Saturator", setPointModelTopic: "Temperature Thermostat setpoint", processValueModelTopic: "Temperature Thermostat", position: [485, 165], size: SIZE_FOR_MODELS},
    {instrumentName: "Oven", setPointModelTopic: "Temperature Oven setpoint", processValueModelTopic: "Temperature Oven", position: [900, 165], size: SIZE_FOR_MODELS},
    {instrumentName: "Spectrometer", position: [150, 540], size: SIZE_FOR_NAMES},
    {instrumentName: "BP Valve 1", position: [720, 25], size: SIZE_FOR_NAMES},
    {instrumentName: "BP Valve 2", position: [525, 325], size: SIZE_FOR_NAMES},
    {instrumentName: "BP Valve 3", position: [480, 520], size: SIZE_FOR_NAMES},
    {instrumentName: "BP Valve 4", position: [240, 410], size: SIZE_FOR_NAMES},
    {instrumentName: "Stopcock 1", position: [890, 520], size: SIZE_FOR_NAMES},
    {instrumentName: "Stopcock 2", position: [685, 520], size: SIZE_FOR_NAMES},
    {instrumentName: "Absorber 1", position: [245, 360], size: SIZE_FOR_NAMES},
    {instrumentName: "Absorber 2", position: [90, 385], size: SIZE_FOR_NAMES},
    {instrumentName: "Needle Valve", position: [335, 520], size: SIZE_FOR_NAMES}
];

export default textFieldConfigs; 