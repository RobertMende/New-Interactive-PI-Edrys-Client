

class ConnectionFactory{
    constructor(plantElementManager, scale, connectionConfig){
        this.plantElementManager=plantElementManager;
        this.scale = scale;
        this.connectionConfig=connectionConfig;
    }

    createConnection(sourcePlantElementName, sourcePortId, destinationPlantElementName, destinationPortId, vertices){
        const sourcePlantElement=this.plantElementManager.getPlantElement(sourcePlantElementName);
        const destinationPlantElement=this.plantElementManager.getPlantElement(destinationPlantElementName);

        const link = new joint.shapes.standard.Link({
            source: {
                id: sourcePlantElement.svgElement.id,
                port: sourcePortId
            },
            target: {
                id: destinationPlantElement.svgElement.id,
                port: destinationPortId
            },
            router: {
                name: 'manhattan', 
                args: {
                    padding: 1
                }
            },
            connector: {
                name: 'rounded'
            },
            vertices: vertices? this.calculateVertices(vertices) : [],
            attrs: {
                line: {
                    stroke: 'black',
                    strokeWidth: 2,
                },
            }
        })

        return link;
    }

    calculateVertices(vertices){
    const newVertices = [];
    
    for(const vertex of vertices){
        const kvPairs = Object.entries(vertex);

        for(const kvPair of kvPairs){
            const key = kvPair[0];
            const value = kvPair[1];

            vertex[key] = this.scale*value;
        }

        newVertices.push(vertex);
    }
    return newVertices;
    }
}

export default ConnectionFactory;
