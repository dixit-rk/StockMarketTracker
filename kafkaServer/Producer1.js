
//Kafka setup
const client=require("./client").kafka;
const producer= client.producer({
  allowAutoTopicCreation: false
});

async function init(){
  console.log("Connecting Producer");
  await producer.connect();
  console.log("Producer Connected Successfully");

}
init();

//twelve-data websocket setup
const {WebSocket} = require('ws');
const websocket=new WebSocket("wss://ws.twelvedata.com/v1/quotes/price?apikey=f327c072a7c540079abba7f360a6ba15",{binary:true});
let subscribe={
     "action": "subscribe", 
     "params": {
     // "symbols": "INFY:NSE,BT.A:LSE"
      "symbols":  "BTC/USD,EUR/USD"
    }
  }

websocket.on('open',async()=> {
 // console.log(subscribe)
//  console.log(JSON.stringify(subscribe));
   websocket.send(JSON.stringify(subscribe));
});

websocket.on("message",async(data)=>{
  let dataObj=JSON.parse(data);
  let dateString=new Date().toTimeString().split(" ")[0];
  let msg=`${dataObj.symbol} ->${dataObj.price}->${dateString}->${dataObj.timestamp}`;
  
  if(dataObj.event=="price"){
    await producer.send({
      topic: 'Prices',
      messages: [
          {key:"PRICE",value:msg}
      ],
  })

  console.log(`${dataObj.symbol}->${dataObj.price}->${dateString}->${dataObj.timestamp}`);
  }
})

process.on("SIGINT",async()=>{
  console.log("disconnecting producer..")
  let msg=`ERR->ERR`
  await producer.send({
    topic:'Prices',
    messages:[
      {key:"ERR",value:msg}
    ],
  })
  console.log("err msg sent due to producer error");
  await producer.disconnect();
  process.exit(1);
})



