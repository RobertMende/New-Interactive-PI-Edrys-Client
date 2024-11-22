

class ConnectionManager{
    constructor(){
        this.links = [];
        this.linkGroups = {};
    }

    addLink(link, linkGroups){
        if(!(link instanceof joint.shapes.standard.Link)) throw new Error("Tried to add an object to ConnectionManager that is not a Link");

        this.links.push(link);

        for(const linkGroup of linkGroups){
            if(!(linkGroup in this.linkGroups)) this.linkGroups[linkGroup] = [];

            this.linkGroups.push(link);
        }
    }

    getLinkGroupLinks(linkGroup){
        if(!(linkGroup in this.linkGroups)) throw new Error(`No known link group by the name of ${linkGroup}`);

        return this.linkGroups[linkGroup];
    }

    getAllLinks(){
        return this.links;
    }
}