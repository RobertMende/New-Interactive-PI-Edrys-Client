

class Publisher{
    constructor(eventNames){
        this.eventCallbacks = {};
        for(const eventName of eventNames){
            this.eventCallbacks[eventName] = [];
        }
    }

    fireEvent(eventName, data){
        for(const callback of this.eventCallbacks[eventName]){
            callback(this, data);
        }
    }

    subscribeToEvent(eventName, callback){
        if(!(eventName in this.eventCallbacks)) throw new Error(`There is no event called ${eventName}`);

        this.eventCallbacks[eventName].push(callback);
    }

    getSubscriptionMap(){
        return this.eventCallbacks;
    }
}

export default Publisher;