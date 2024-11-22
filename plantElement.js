class PlantElement{
    constructor(name, type, svgElement){
        this.name=name;
        this.type=type;
        this.svgElement=svgElement;
    }

    centerElement=(paper)=>{
        centerModel(paper, this.svgElement);
    }

    setStrokeColor=color=>{

    }

    setFillColor=color=>{

    }

    translate=(x, y)=>{
        this.svgElement.translate(x, y);
    }

    position=(x, y)=>{
        this.svgElement.position(x, y);
    }

    rotate = angle =>{
        this.svgElement.attr({"transform": `rotate(${angle})`});
    }


    setStrokeWidth=width=>{
        let i=0;
        while(i<this.svgElement.collection.length){
            this.svgElement.attr(`${i}/strokeWidth`, width);
            i++;
        }
    }
}



const calculateCenter=elView=>{
    const {x, y, width, height}=elView.getBBox();
    return {x:x+width/2, y:y+height/2};
}

const centerView=elView=>{
    const {x, y}=calculateCenter(elView);
    elView.model.translate(-x, -y);
}

const centerModel=(paper, elModel)=>{
    const elView=paper.findViewByModel(elModel);
    centerView(elView);
}


export default PlantElement;