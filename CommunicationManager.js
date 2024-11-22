import Publisher from "./PublishSubscribe/Publisher.js";

class CommunicationManager extends Publisher{
    constructor(eventNames, ws){
        super(eventNames);

        this.setupWs(ws);
        this.ws = ws;
    }

    setupWs(ws){
        ws.addEventListener("open", e=>{
            console.log("ws open");
            })

        ws.addEventListener("message", e=>{
            const msg=JSON.parse(e.data); 
            this.onMessageReceived(msg);
        })

        ws.addEventListener("close", e=>{
            console.log("ws connection closed", e);
            window.alert("The websocket connected has been closed");
        })


    }

    send(topic, subTopic, data){
        this.ws.send(JSON.stringify({topic: topic, subTopic: subTopic, data: data}));
    }

    onMessageReceived(msg){
        this.fireEvent("messageReceived", msg);

        this.fireEvent(msg.topic, msg);

    }
}


export default CommunicationManager;