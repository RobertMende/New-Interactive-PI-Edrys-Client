

const linkConfigs = [
    {source: "MFC Air", sourcePort: "out", destination: "Three Way Valve", destinationPort: "in"},
    {source: "Three Way Valve", sourcePort: "out2", destination: "Saturator", destinationPort: "in"},
    {source: "Three Way Valve", sourcePort: "out1", destination: "Bp Valve Three Way Valve-Oven", destinationPort: "in"},
    {source: "Bp Valve Three Way Valve-Oven", sourcePort: "out", destination: "Oven", destinationPort: "in", vertices: [{x: 825, y: 82}]},
    {source: "Saturator", sourcePort: "out", destination: "Bp Valve Saturator-Oven", destinationPort: "in"},
    {source: "Bp Valve Saturator-Oven", sourcePort: "out", destination: "Oven", destinationPort: "in", vertices: [{x: 675, y: 400}, {x: 750, y: 100}]},
    {source: "Oven", sourcePort: "out", destination: "Stopcock Exhaust", destinationPort: "out", vertices:[{x: 860, y: 485}]},
    {source: "Oven", sourcePort: "out", destination: "Stopcock IR", destinationPort: "in", vertices: [{x: 840, y: 485}]},
    {source: "Stopcock IR", sourcePort: "out", destination: "Bp Valve Oven-IR", destinationPort: "in"},
    {source: "Bp Valve Oven-IR", sourcePort: "out", destination: "Needle Valve IR", destinationPort: "in"},
    {source: "Needle Valve IR", sourcePort: "out", destination: "IR", destinationPort: "in"},
    {source: "IR", sourcePort: "out", destination: "Bp Valve IR-Absorber 2", destinationPort: "in", vertices: [{x: 80, y: 430}, {x: 110, y: 430}]},
    {source: "Bp Valve IR-Absorber 2", sourcePort: "out", destination: "Absorber 2", destinationPort: "in", vertices: [{x: 200, y: 200}]},
    {source: "Bp Valve Oven-IR", sourcePort: "out", destination: "Absorber 1", destinationPort: "in", vertices: [{x: 450, y: 475}, {x:450, y: 160}]},
    {source: "Absorber 1", sourcePort: "out", destination: "Absorber 2", destinationPort: "in", vertices: [{x: 250, y: 150}]},
];


export default linkConfigs;

const instrumentConfigs = [
    {name: "MFC Air", type: "mfc", config: {
        width: 100, height: 40
    }, position: [500, 80]},
    {name: "Three Way Valve", type:"twValve", config:{
        bodyHeight: 40
    }, position: [636, 92]},
    {name: "Saturator", type: "saturator", config:{
        width: 100, height: 200
    }, position: [619, 250]},
    {name: "Bp Valve Saturator-Oven", type: "bpValve", config:{
        width: 60, rotationAngle: 90
    }, position: [648, 320]},
    {name: "Bp Valve Three Way Valve-Oven", type: "bpValve", config:{
        width: 60, rotationAngle: 0
    }, position: [700, 94]},
    {name: "Oven", type: "oven", config:{
        width: 100, height: 400
    }, position: [800, 400]},
    {name: "Stopcock Exhaust", type: "stopcock", config:{
        bodyHeight: 40
    }, position: [900, 501]},
    {name: "Stopcock IR", type: "stopcock", config:{
        bodyHeight: 40
    }, position: [700, 502]},
    {name: "Bp Valve Oven-IR", type: "bpValve", config:{
        width: 60, rotationAngle: 180
    }, position: [550, 473]},
    {name: "Needle Valve IR", type: "nValve", config:{
        bodyHeight: 40
    }, position: [350, 503]},
    {name: "IR", type: "IR", config:{
        height: 80, width: 200
    }, position: [200, 487.5]},
    {name: "Absorber 1", type: "absorber", config:{
        bodyHeight: 100
    }, position: [250, 350]},
    {name: "Bp Valve IR-Absorber 2", type: "bpValve", config:{
        width: 60, rotationAngle: 270
    }, position: [200, 400]},
    {name: "Absorber 2", type: "absorber", config:{
        bodyHeight: 100
    }, position: [100, 350]}
]