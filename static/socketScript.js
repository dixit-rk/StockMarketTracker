

   let curr1=document.getElementById("curr1");
   let min1=document.getElementById("min1");
   let max1=document.getElementById("max1");

   let curr2=document.getElementById("curr2");
   let min2=document.getElementById("min2");
   let max2=document.getElementById("max2");
   let btn1=document.getElementById('btn1');
   let btn2=document.getElementById('btn2');

    const socket = io('http://localhost:8000');      
    socket.on("connect", () => {
      console.log(`${socket.id} connected`);
    })
  
    socket.on("data", (data) => {
      console.log(data.price, data.time);
      myChart.data.datasets.forEach(dataset => {
        dataset.data.push({
          x: data.time,
          y: data.price
        })
      });

      curr1.textContent=data.price;
      if(data.flag=="r"){
        curr1.style.color="red";
      }
      if(data.flag=="g"){
        curr1.style.color="green";
      }
      if(data.flag=="w"){
        curr1.style.color="black";
      }
      
      
        min1.textContent=data.min;
      
        max1.textContent=data.max;
     
    })
  
    socket.on("data2", (data) => {
      console.log(data.price, data.time);
      myChart2.data.datasets.forEach(dataset => {
        dataset.data.push({
          x: data.time,
          y: data.price
        })
      });

      curr2.textContent=data.price;
      if(data.flag=="r"){
        curr2.style.color="red";
      }
      if(data.flag=="g"){
        curr2.style.color="green";
      }
      if(data.flag=="w"){
        curr2.style.color="black";
      }

      
        min2.textContent=data.min;
      
      
        max2.textContent=data.max;
      
    })

    btn1.addEventListener("click",()=>{
        let mapStatus1=myChart.options.plugins.streaming.pause;
        console.log(mapStatus1);
        if(mapStatus1==true){
            myChart.options.plugins.streaming.pause=false;
            myChart.update();
        }else{
            myChart.options.plugins.streaming.pause=true;
        }
    })

    btn2.addEventListener("click",()=>{
        let mapStatus2=myChart2.options.plugins.streaming.pause;
        console.log(mapStatus2);
        if(mapStatus2==true){
            myChart2.options.plugins.streaming.pause=false;
            myChart2.update();
        }else{
            myChart2.options.plugins.streaming.pause=true;
        }
    })
    // socket.on("ServerErr", (data) => {
    //   myChart.options.plugins.streaming.pause = true;
    //   myChart2.options.plugins.streaming.pause = true;
    // })
  
    // socket.on("restart", (data) => {
    //   myChart.options.plugins.streaming.pause = false;
    //   myChart2.options.plugins.streaming.pause = false;
  
    // })
  
  
  