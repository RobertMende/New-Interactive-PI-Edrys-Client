class JointJsElementBuilder{
    constructor(){

    }


    static buildPath(elementType, config){
        const builderFunctions={
            "saturator": this.buildSaturator,
            "oven": this.buildOven,
            "mfc": this.buildMFC,
            "bpValve": this.buildBpValve,
            "twValve": this.buildTwValve,
            "stopcock": this.buildStopcock,
            "nValve": this.buildNeedleValve,
            "absorber": this.buildAbsorber,
            "mPoint": this.buildMeasuringPoint,
            "IR": this.buildIR
        }

        if(!elementType in builderFunctions) throw new Error(`No known builder function for elementType ${elementType}`);

        const elements = builderFunctions[elementType](config);
        return this.createCustomElement(elements);
    }

    static createCustomElement(configs){
        const attrs={};
        const markup=[];
        let i=0;

        for(const config of configs){
            attrs[i.toString()]={...config.attributes, ...this.pathConfig};
            markup.push({
                tagName: config.type,
                selector: i.toString()
            })
            i++;
        } 

        const CustomElement = joint.dia.Element.define('examples.CustomElement', 
        {attrs: attrs},
        {markup: markup});

        return new CustomElement();
    }



    static setDefaultPathConfig(config){
        this.pathConfig=config;
    }

    static buildSaturator(config){
        const [width, height]=[config.width, config.height];

        const r=width/2;
        const bodyLength=height-2*r;
        if(bodyLength<=0) throw new Error("Body length of "+config.type+" is lower or equal to 0");

        const path=`M 0 0
        a ${r} ${-r} 0 0 0 ${2*r} 0
        l 0 ${0-bodyLength}
        a ${r} ${r} 0 0 0 ${0-2*r} 0
        z`;

        const elements=[
            {type: "path", attributes: {"d": path}}
        ];

        return elements;
    }

    static buildOven(config){
        const plateHeight=config.plateHeight;
        const [width, height]=[config.width, config.height];
        const r=width/2;
        const bodyLength=height-2*r;

        const outerPath=`M 0 0 
        a ${r} ${-r} 0 0 0 ${2*r} 0
        l 0 ${0-bodyLength}
        a ${r} ${r} 0 0 0 ${0-2*r} 0
        z`;

        const platePath=`M 0 0 
        l ${width} 0
        l 0 ${-plateHeight}
        l ${0-width} 0 
        z`;

        const elements=[
            {type: "path", attributes: {"d":outerPath}},
            {type: "path", attributes: {"d": platePath}} 
        ];

        return elements;
    }

    static buildMFC(config){
        const [rectWidth, rectHeight]=[config.width, config.height];

        if((rectWidth<2*rectHeight)) throw new Error("Width of the mfc must be at least 2 times its width");

        const elements=[
        {type: "rect", attributes: {"width": rectWidth, "height": rectHeight, "x": (0-rectWidth/2), "y": (0-rectHeight/2)}},
        {type: "circle", attributes: {"cx": rectWidth/4-rectWidth/2, "cy": 0, "r": rectHeight/2}},
        {type: "circle", attributes: {"cx": rectWidth/4*3-rectWidth/2, "cy": 0, "r": rectHeight/2}}
        ];

        return elements;
    }

    static buildBpValve(config){
        const [width, rotationAngle]=[config.width, config.rotationAngle];
        const height=0.5*width;

        const path=`M 0 0  
        l 0 ${-height} 
        l ${width} ${height}
        l 0 ${-height}
        l 0 ${height} 
        l ${-width} ${-height}
        l 0 ${height}`; //need to trail back to origin in order for the path to not automatically close and thereby create an infill
        
        const elements=[
            {type: "path", attributes: {"d": path, "transform": `rotate(${rotationAngle})`}},
            {type: "circle", attributes: {"cx": 0, "cy": -height, "r": width/10, transform: `rotate(${rotationAngle})`}}
        ];

        return elements;
    }

    static buildTwValve(config){
        //three way valve
        const bodyHeight=config.bodyHeight;
        const bodyWidth=3/2*bodyHeight;
        const side=2/3*bodyHeight;

        const path=`M 0 0 
        l ${bodyWidth} ${-side} 
        l 0 ${side} 
        l ${-bodyWidth/2} ${-side/2} 
        l ${-side/2} ${bodyWidth/2} 
        l ${side} 0 
        l ${-side/2} ${-bodyWidth/2} 
        l ${-bodyWidth/2} ${-side/2} 
        z`;

        const elements=[
            {type: "path", attributes: {"d": path}}
        ];

        return elements;
    }

    static buildStopcock(config){
        const bodyHeight=config.bodyHeight;
        const bodyWidth=bodyHeight*2;

        const path=`M 0 0
        l ${bodyWidth} ${-bodyHeight}
        l 0 ${bodyHeight}
        l ${-bodyWidth} ${-bodyHeight}
        z`;


        const elements=[
            {type: "path", attributes: {"d": path}},
            {type: "circle", attributes: {"cx": bodyWidth/2, "cy": -bodyHeight/2, "r": bodyHeight/5}}
        ];

        return elements;
    }


    static buildAbsorber(config){
        const bodyHeight=config.bodyHeight;
        const bodyWidth=bodyHeight;

        const path=`M 0 0
        l ${bodyWidth} 0 
        l 0 ${-bodyHeight} 
        l ${-bodyWidth/3} ${-bodyHeight/3} 
        l 0 ${-bodyHeight/3} 
        l ${-bodyWidth/3} 0 
        l 0 ${bodyHeight/3}
        l ${-bodyWidth/3} ${bodyHeight/3}
        z`;

        const elements= [
            {type: "path", attributes: {"d": path}}
        ];

        return elements;
    }

    static buildNeedleValve(config){
        const bodyHeight=config.bodyHeight;
        const bodyWidth=bodyHeight*2;

        const path=`M 0 0
        l ${bodyWidth} ${-bodyHeight} 
        l 0 ${bodyHeight} 
        l ${-bodyWidth} ${-bodyHeight} 
        z`;

        const smallScaleTriangleScle=10;
        const scale=smallScaleTriangleScle;

        const pathSmallTriangle=`M ${bodyWidth/2} ${-bodyHeight/2}  
        l ${bodyWidth/scale} ${-bodyHeight/2} 
        l ${-2*bodyWidth/scale} 0 
        z`;

        const elements=[
            {type: "path", attributes: {"d": path}},
            {type: "path", attributes: {"d": pathSmallTriangle}},
        ];

        return elements;
    }

    static buildIR(config){
        const [height, width]=[config.height, config.width];

        const elements=[
            {type: "rect", attributes: {"x": -width/2, "y": -height/2, "width": width, "height": height}},
            {type: "text", text: "IR", attributes: {"text-anchor": "middle", "transform": "translate(0, 5)"}}
        ]

        return elements;
    }

    static buildMeasuringPoint(config){
        const radius=config.radius;
        const text=config.text;
        const number=config.number;
        const angle=config.holderAngle

        const elements=[
            {type: "path", attributes: {"d": "M 0 0 l "+2*radius*Math.cos(angle)+" "+2*radius*Math.sin(angle)}},
            {type: "circle", attributes: {"cx": 0, "cy": 0, "r": radius}},
            {type: "path", attributes: {"d": "M -"+radius+" 0 l "+2*radius+" 0"}},
            {type: "text", text: text, attributes: {"text-anchor": "middle"}},
            {type: "text", text: number, attributes: {"text-anchor": "middle", "transform": "translate(0,"+0.9*radius+")"}}
        ];

        return elements;
    }

    pathConfig={};



}

export default JointJsElementBuilder; 