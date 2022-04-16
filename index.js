//src="https://maps.google.com/maps?q=jhansi&t=&z=13&ie=UTF8&iwloc=&output=embed"

// code to show any location weather
function getData(){

    let city = document.getElementById("city").value

    const url = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=84bef13d9d448f588b137b74e241442e`
    fetch(url)
    .then(function (res){
        return res.json();
    }).then(function (res){
        append(res)
        console.log(res.coord.lat,res.coord.lon)
        dailyReport(res.coord.lat,res.coord.lon)
        console.log(res);
    }).catch(function (err){
        console.log(err)
    });
}

//code to show your location weather
function getYourLocation(lat,lon){
    //console.log("in")

    const url = `https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&appid=84bef13d9d448f588b137b74e241442e`
    fetch(url)
    .then(function (res){
        return res.json();
    }).then(function (res){
        append(res)
        console.log("uparwala" ,res);
        console.log(res.main.temp)
    }).catch(function (err){
        console.log(err)
    });
}

function dailyReport(lat,log){
   
  const url= `https://api.openweathermap.org/data/2.5/onecall?lat=${lat}&lon=${log}&exclude={part}&appid=84bef13d9d448f588b137b74e241442e`
   fetch(url)
   .then(function (res){
       return res.json();
   }).then(function(res){
       appendReport(res)
       console.log(res,"7days")
   })
   
}


function appendReport(data){
    
    let container = document.getElementById("dailyReport")
    document.querySelector("#dailyReport").innerHTML=null;

     let i=0 ;

     data.daily.map(function(elem){

        if(i==0){

        }else{
            let box = document.createElement("div")

            // let day = document.createElement("h3")
            let dateBox = document.createElement("h3");
            const unixTime = elem.dt;
            const date = new Date(unixTime * 1000);
            dateBox.innerText = `Date : ${date.toLocaleDateString("en-US")}`;

         
         
            let img = document.createElement("img")
            img.setAttribute("id","image")
            img.src =  `https://openweathermap.org/img/wn/${elem.weather[0].icon}@2x.png`                   
            //elem.weather[0].icon
            // https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcS3jE7sHfEis1wTIFOoWl1R5yN_2LR0-1HhnQ&usqp=CAU
            let max = document.createElement("h3")
            max.innerText = `Max: ${Math.round(elem.temp.max - 273)} °C`
         
            let min = document.createElement("h3")
            min.innerText = `Min: ${Math.round(elem.temp.min - 273)} °C`
         
            box.append(dateBox,img,max,min)

            container.append(box)
        
          
        }
        i++;
    })

}


//code  to show the data
function append(data){

    let container = document.getElementById("container")
    let map = document.getElementById("gmap_canvas")
    container.innerHTML=null
    
    let div1 = document.createElement("div")
    div1.setAttribute("id","div1")
    
    let city = document.createElement("h2")
    city.style.color="white"
    city.innerText = "City: " + data.name

    let min = document.createElement("h3")
    min.style.color="white"
    min.innerText = `Min: ${Math.round(data.main.temp_min - 273)} °C`;

    let max = document.createElement("h3")
    max.style.color="white" 
    max.innerText = `Max: ${Math.round(data.main.temp_min - 273)} °C`;

    let current = document.createElement("h3")
    current.style.color="white"
    current.innerText = `Temp: ${Math.round(data.main.temp_min - 273)} °C`;

    let wind = document.createElement("h3")
    wind.style.color="white"
    wind.innerText = "Wind: " + data.wind.speed;

    let humidity = document.createElement("h3")
    humidity.style.color="white"
    humidity.innerText = "Humidity: " + data.main.humidity;

    let pressure = document.createElement("h3")
    pressure.style.color="white"
    pressure.innerText = "Wind: " + data.main.pressure;

    div1.append(city,min,max,current,wind,humidity,pressure)
    container.append(div1,map);

    map.src = `https://maps.google.com/maps?q=${data.name}&t=&z=13&ie=UTF8&iwloc=&output=embed`
}


// code to get your location
function getWeather(){
    console.log("in")

    navigator.geolocation.getCurrentPosition(success)

    function success(pos){
   
    let crd = pos.coords;

  console.log('Your current position is:');
  console.log(`Latitude : ${crd.latitude}`);
  console.log(`Longitude: ${crd.longitude}`);
  console.log(`More or less ${crd.accuracy} meters.`);

  getYourLocation(crd.latitude,crd.longitude)
  dailyReport(crd.latitude,crd.longitude)

   }

}
   

