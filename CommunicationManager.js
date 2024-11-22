import Publisher from "./PublishSubscribe/Publisher.js";

class CommunicationManager extends Publisher{
    constructor(eventNames, ws){
        super(eventNames);

        this.setupWs(ws);
        this.ws = ws;

        this.setupEdrysListener();
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

    setupEdrysListener(){
        Edrys.onMessage(({from, subject, body}) => this.onMessageReceivedFromEdrys(from ,subject, body));
    }

    send(topic, subTopic, data){
        this.ws.send(JSON.stringify({topic: topic, subTopic: subTopic, data: data}));
    }

    onMessageReceived(msg){
        console.log("Received message from ws:", msg);
        Edrys.sendMessage(msg.topic, msg);
    }

    onMessageReceivedFromEdrys(from, subject, body){
        if(from === Edrys.username) return;
        if(subject === "setValue"){
            const {topic, subTopic, data} = JSON.parse(body);
            this.send(topic, subTopic, data);
        }
    }
}


export default CommunicationManager;