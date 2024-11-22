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
    }, position: [750, 94]},
    {name: "Oven", type: "oven", config:{
        width: 100, height: 400, plateHeight: 50
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
    }, position: [235, 375]},
    {name: "Absorber 2", type: "absorber", config:{
        bodyHeight: 100
    }, position: [100, 375]}
]

export default instrumentConfigs;