const express=require("express");
const app=express();


const client=require("./client").kafka;
const admin = client.admin();

async function init(){
  
  console.log("Admin connecting...");
  await admin.connect();
  console.log("Adming Connection Success...");
 
  console.log("Creating Topic [Prices]");
  await admin.createTopics({
    topics: [
      {
        topic: "Prices",
        numPartitions: 2,
      },
    ],
  });
  console.log("Topic Created Success [Prices]");
}

init();
process.on("SIGINT",async()=>{
    currTopics=await admin.listTopics();
    console.log(currTopics);
    await admin.deleteTopics({
        topics: ["Prices"],
        timeout: 1000, // default: 5000
    })
    console.log("topics deleted");
    delTopics=await admin.listTopics();
    await admin.disconnect();
    console.log(delTopics);
    process.exit(1);
})

app.listen('3002',()=>{
    console.log("admin is running on port 3002")
})

