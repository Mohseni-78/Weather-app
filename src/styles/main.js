// https://api.openweathermap.org/data/2.5/weather?q=London&appid=dfe8646e1a72d6b181f39c6d3fbe3c3f&units=metric
const ApiKey = "dfe8646e1a72d6b181f39c6d3fbe3c3f";

// key
let form = document.querySelector(".form");
let inputKey = document.querySelector("input");
let container = document.querySelector(".container");
let dataContainer = document.querySelector(".dataContainer");

//EventListener
form.addEventListener("submit", (e) => {
  e.preventDefault();
  let inputVal = inputKey.value;
  let Url = `https://api.openweathermap.org/data/2.5/weather?q=${inputVal}&appid=${ApiKey}&units=metric`;
  fetch(Url)
    .then((response) => response.json())
    .then((data) => {
      const { weather, main, wind, clouds, sys, name } = data;
      let icon = `https://s3-us-west-2.amazonaws.com/s.cdpn.io/162656/${weather[0]["icon"]}.svg`;
      // const div = document.createElement("div");
      dataContainer.innerHTML = `
      <div class="headerDisplay">
             <h4 class="header">${name.toUpperCase()} ${sys.country}</h4>
         </div>

         <div class="mainDisplay">
             <p class="main">${weather[0].main}</p>
             <p class="mainDetails">${weather[0].description}</p>
         </div>

         <figure class="temp-img">
             <img src="${icon}" alt="photo" class="img">
         </figure>

         <div class="tempDisplay">
             <h1 class="temp">${main.temp}°</h1>
         </div>

         <div class="flex">
             <div class="min">
                 <span>min</span>
                 <span class="minTemp">${Math.floor(main.temp_min)}°</span>
             </div>
             <hr>
             <div class="max">
                 <span>max</span>
                 <span class="maxTemp">${Math.ceil(main.temp_max)}°</span>
             </div>
         </div>`;
      // const doc = `
      // <div class="headerDisplay">
      //       <h4 class="header">${name.toUpperCase()} ${sys.country}</h4>
      //   </div>

      //   <div class="mainDisplay">
      //       <p class="main">${weather[0].main}</p>
      //       <p class="mainDetails">${weather[0].description}</p>
      //   </div>

      //   <figure class="temp-img">
      //       <img src="${icon}" alt="photo" class="img">
      //   </figure>

      //   <div class="tempDisplay">
      //       <h1 class="temp">${main.temp}</h1>
      //   </div>

      //   <div class="flex">
      //       <div class="min">
      //           <span>min</span>
      //           <span class="minTemp">${main.temp_min}</span>
      //       </div>
      //       <hr>
      //       <div class="max">
      //           <span>max</span>
      //           <span class="maxTemp">${main.temp_max}</span>
      //       </div>
      //   </div>
      // `;

      // div.innerHTML = doc;
      // container.appendChild(div);
    })
    .catch(() => {
      if (inputVal === "") {
        Toastify({
          text: "لطفا یک شهر انتخاب کنید",
          className: "error",
          close: true,
          style: {
            background: "#0c202d",
            fontSize: "1.5rem",
            borderRadius: "10px",
            padding: "1rem",
          },
          position: "center",
          gravity: "top",
        }).showToast();
      } else {
        Toastify({
          text: "شهر وارد شده پیدا نشد",
          close: true,
          style: {
            background: "#0c202d",
            fontSize: "1.5rem",
            borderRadius: "10px",
            padding: "1rem",
          },
          position: "center",
          gravity: "top",
        }).showToast();
      }
    });
  inputKey.value = "";
});
