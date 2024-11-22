import { mergeDeep } from "./util.js";

class JointJsPortFactory{
    constructor(){}

    static appendPorts(plantElement, config){
        const portFunctions={
            "saturator": this.appendSaturatorPorts,
            "oven": this.appendOvenPorts,
            "mfc": this.appendMfcPorts,
            "bpValve": this.appendBpValvePorts,
            "twValve": this.appendTwValvePorts,
            "stopcock": this.appendStopcockPorts,
            "absorber": this.appendAbsorberPorts,
            "nValve": this.appendNValvePorts,
            "IR": this.appendIrPorts,
            "mPoint": this.appendMPointPorts
        };

        if(!plantElement.type in portFunctions) throw new Error(`There is no function to append ports to svg elements of type ${svgElement.type}`);

        portFunctions[plantElement.type](plantElement, config);
    }

    static setDefaultPortDefinition(port){
        this.port=port;
    }

    static appendSaturatorPorts(plantElement, config){
        const {width, height}=config;
        //for whatever reason, merging the x and y coordinates with this classes default port does not work
        const portIn={
            attrs: {
                portBody: {
                    magnet: true,
                    r: 0,
                    fill:  '#03071E',
                    cx: width/2,
                    cy: -(height-width/2),
                },
            },
            markup: [{
                tagName: 'circle',
                selector: 'portBody'
            }]
        }
        const portOut={
            attrs: {
                portBody: {
                    magnet: true,
                    r: 0,
                    fill:  '#03071E',
                    cx: width/2,
                    cy: width/2,
                },
            },
            markup: [{
                tagName: 'circle',
                selector: 'portBody'
            }]
            
        }


        plantElement.svgElement.addPorts([{id: "in"}, {id: "out"}]);
        plantElement.svgElement.portProp("in", portIn);
        plantElement.svgElement.portProp("out", portOut);

    }

    static appendOvenPorts(plantElement, config){
        const {width, height}=config;
        //for whatever reason, merging the x and y coordinates with this classes default port does not work
        const portIn={
            attrs: {
                portBody: {
                    magnet: true,
                    r: 0,
                    fill:  '#03071E',
                    cx: width/2,
                    cy: -(height-width/2)
                },
            },
            markup: [{
                tagName: 'circle',
                selector: 'portBody'
            }]
        }
        const portOut={
            attrs: {
                portBody: {
                    magnet: true,
                    r: 0,
                    fill:  '#03071E',
                    cx: width/2,
                    cy: width/2
                },
            },
            markup: [{
                tagName: 'circle',
                selector: 'portBody'
            }]
        }
        
        plantElement.svgElement.addPorts([{id: "in"}, {id: "out"}]);
        plantElement.svgElement.portProp("in", portIn);
        plantElement.svgElement.portProp("out", portOut);
    }

    static appendMfcPorts(plantElement, config){
        const {width, height}=config;

        const portIn={
            attrs: {
                portBody: {
                    magnet: true,
                    r: 0,
                    fill:  '#03071E',
                    cx: -width/2,
                    cy: 0
                },
            },
            markup: [{
                tagName: 'circle',
                selector: 'portBody'
            }]
        };
        
        const portOut={
            attrs: {
                portBody: {
                    magnet: true,
                    r: 0,
                    fill:  '#03071E',
                    cx: width/2,
                    cy: 0
                },
            },
            markup: [{
                tagName: 'circle',
                selector: 'portBody'
            }]
        };

        plantElement.svgElement.addPorts([{id: "in"}, {id: "out"}]);
        plantElement.svgElement.portProp("in", portIn);
        plantElement.svgElement.portProp("out", portOut);
    }

    static appendBpValvePorts(plantElement, config){
        const {width, rotationAngle}=config;

        const portIn={
            attrs: {
                portBody: {
                    magnet: true,
                    r: 0,
                    fill:  '#03071E',
                    cx: 0,
                    cy: -width/4,
                    transform: `rotate(${rotationAngle})`
                },
            },
            markup: [{
                tagName: 'circle',
                selector: 'portBody'
            }]
        };
        
        const portOut={
            attrs: {
                portBody: {
                    magnet: true,
                    r: 0,
                    fill:  '#03071E',
                    cx: width,
                    cy: -width/4,
                    transform: `rotate(${rotationAngle})`
                },
            },
            markup: [{
                tagName: 'circle',
                selector: 'portBody'
            }]
        };

        plantElement.svgElement.addPorts([{id: "in"}, {id: "out"}]);
        plantElement.svgElement.portProp("in", portIn);
        plantElement.svgElement.portProp("out", portOut);
    }

    static appendTwValvePorts(plantElement, config){
        const {bodyHeight}=config;

        const portIn={
            attrs: {
                portBody: {
                    magnet: true,
                    r: 0,
                    fill:  '#03071E',
                    cx: 0,
                    cy: -bodyHeight/3
                },
            },
            markup: [{
                tagName: 'circle',
                selector: 'portBody'
            }]
        };
        
        const portOut1={
            attrs: {
                portBody: {
                    magnet: true,
                    r: 0,
                    fill:  '#03071E',
                    cx: bodyHeight*1.5,
                    cy: -bodyHeight/3
                },
            },
            markup: [{
                tagName: 'circle',
                selector: 'portBody'
            }]
        };

        const portOut2={
            attrs: {
                portBody: {
                    magnet: true,
                    r: 0,
                    fill:  '#03071E',
                    cx: bodyHeight*1.5/2,
                    cy: bodyHeight/2.5
                },
            },
            markup: [{
                tagName: 'circle',
                selector: 'portBody'
            }]
        };

        plantElement.svgElement.addPorts([{id: "in"}, {id: "out1"}, {"id": "out2"}]);
        plantElement.svgElement.portProp("in", portIn);
        plantElement.svgElement.portProp("out1", portOut1);
        plantElement.svgElement.portProp("out2", portOut2);
    }

    

    static appendStopcockPorts(plantElement, config){
        const {bodyHeight}=config;

        const portOut={
            attrs: {
                portBody: {
                    magnet: true,
                    r: 0,
                    fill:  '#03071E',
                    cx: 0,
                    cy: -bodyHeight/2
                },
            },
            markup: [{
                tagName: 'circle',
                selector: 'portBody'
            }]
        };
        
        const portIn={
            attrs: {
                portBody: {
                    magnet: true,
                    r: 0,
                    fill:  '#03071E',
                    cx: bodyHeight*2,
                    cy: -bodyHeight/2
                },
            },
            markup: [{
                tagName: 'circle',
                selector: 'portBody'
            }]
        };

        plantElement.svgElement.addPorts([{id: "in"}, {id: "out"}]);
        plantElement.svgElement.portProp("in", portIn);
        plantElement.svgElement.portProp("out", portOut);
    }

    static appendAbsorberPorts(plantElement, config){
        const {bodyHeight}=config;

        const portIn={
            attrs: {
                portBody: {
                    magnet: true,
                    r: 0,
                    fill:  '#03071E',
                    cx: bodyHeight*2/3,
                    cy: -bodyHeight*5/3
                },
            },
            markup: [{
                tagName: 'circle',
                selector: 'portBody'
            }]
        };
        
        const portOut={
            attrs: {
                portBody: {
                    magnet: true,
                    r: 0,
                    fill:  '#03071E',
                    cx: bodyHeight*1/3,
                    cy: -bodyHeight*5/3
                },
            },
            markup: [{
                tagName: 'circle',
                selector: 'portBody'
            }]
        };

        plantElement.svgElement.addPorts([{id: "in"}, {id: "out"}]);
        plantElement.svgElement.portProp("in", portIn);
        plantElement.svgElement.portProp("out", portOut);
    }

    static appendNValvePorts(plantElement, config){
        const {bodyHeight}=config;
        const bodyWidth = 2*bodyHeight;

        const portOut={
            attrs: {
                portBody: {
                    magnet: true,
                    r: 0,
                    fill:  '#03071E',
                    cx: 0,
                    cy: -bodyHeight/2
                },
            },
            markup: [{
                tagName: 'circle',
                selector: 'portBody'
            }]
        };
        
        const portIn={
            attrs: {
                portBody: {
                    magnet: true,
                    r: 0,
                    fill:  '#03071E',
                    cx: bodyWidth,
                    cy: -bodyHeight/2
                },
            },
            markup: [{
                tagName: 'circle',
                selector: 'portBody'
            }]
        };

        plantElement.svgElement.addPorts([{id: "in"}, {id: "out"}]);
        plantElement.svgElement.portProp("in", portIn);
        plantElement.svgElement.portProp("out", portOut);
    }

    static appendIrPorts(plantElement, config){
        const {width, height}=config;

        const portOut={
            attrs: {
                portBody: {
                    magnet: true,
                    r: 0,
                    fill:  '#03071E',
                    cx: -width/2,
                    cy: 0
                },
            },
            markup: [{
                tagName: 'circle',
                selector: 'portBody'
            }]
        };
        
        const portIn={
            attrs: {
                portBody: {
                    magnet: true,
                    r: 0,
                    fill:  '#03071E',
                    cx: width/2,
                    cy: 0
                },
            },
            markup: [{
                tagName: 'circle',
                selector: 'portBody'
            }]
        };

        plantElement.svgElement.addPorts([{id: "in"}, {id: "out"}]);
        plantElement.svgElement.portProp("in", portIn);
        plantElement.svgElement.portProp("out", portOut);
    }

    static appendMPointPorts(plantElement, config){

    }

    static port={
        attrs: {
            portBody: {
                magnet: true,
                r: 0,
                fill:  '#03071E'
            },
        },
        markup: [{
            tagName: 'circle',
            selector: 'portBody'
        }]
    }
}

export default JointJsPortFactory;