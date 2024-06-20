//express setup
const http=require('http');
const express=require('express');
const app=express();
const {Server}=require('socket.io');
const  fs=require('fs');
const { Socket } = require('socket.io-client');
const server=http.createServer(app);

const io = new Server({
	cors: {
		origin: "*",
	},
});

io.attach(server);

// let prodStatus=false;
let status1={
  min:1000000,
  max:-1,
  curr:0,
  prev:0,
  flag:"w",
  time:0
}

let status2={
  min:1000000,
  max:-1,
  curr:0,
  prev:0,
  flag:"w",
  time:0
}


//kafka setup
const client=require("./client").kafka;
const consumer= client.consumer({groupId:'MYGROUP'});

init(io);

io.on("connection",(socket)=>{
  {
    console.log(`${socket.id} connected`)
    socket.emit("data",{price:status1.curr,time:status1.time,min:status1.min,max:status1.max,flag:status1.flag});
    socket.emit("data2",{price:status2.curr,time:status2.time,min:status2.min,max:status2.max,flag:status2.flag});
  }
})

async function init(io){
    await consumer.connect();
    console.log("consumer connected");
    await consumer.subscribe({ topics: ["Prices"], fromBeginning: true });
    await consumer.run({
        eachMessage: async ({ topic, partition, message, heartbeat, pause }) => {
          // console.log(
          //   `$INFOSYS: [${topic}]: PART:${partition}:`,
          //   message.value.toString()
          // );

          let company=message.value.toString().split('->')[0];
          let price=message.value.toString().split('->')[1];
          let time=message.value.toString().split('->')[2];

          price=price*1;
          
          
          
          if(company.startsWith("BTC")){     // BTC

            status1.curr=price;
            status1.time=time;

            if(status1.min>price){
              status1.min=price;
              
            }
            if(status1.max<price){
              status1.max=price;
              
            }

            if(status1.prev<price){
              status1.flag="g"
            }
            if(status1.prev>price){
              status1.flag="r"
            }
            status1.prev=price;

            console.log(`${company}->${price}->${time}`);
            io.emit("data",{price:price,time:time,min:status1.min,max:status1.max,flag:status1.flag});
          }
          if(company.startsWith("EUR")){     //   "BTC/USD,EUR/USD"       EUR           //BT.A

            status2.curr=price;
            status2.time=time;

            if(status2.min>price){
              status2.min=price;
            }
            if(status2.max<price){
              status2.max=price;
            }
            
            if(status2.prev<price){
              status2.flag="g"
            }
            if(status2.prev>price){
              status2.flag="r"
            }
            status2.prev=price;

            console.log(`${company}->${price}->${time}`);
            io.emit("data2",{price:price,time:time,min:status2.min,max:status2.max,flag:status2.flag});
          }
        },
      });
}

process.on("SIGINT",async()=>{
    console.log("consumer disconnecting...")
    io.emit("ServerErr",{data:"Error Occured"});
    await consumer.disconnect();
    process.exit(1);
})


//server setup

server.listen('8000',(err)=>{
    console.log("consumerServer is listning on port 8000");
})


