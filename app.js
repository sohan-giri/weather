const express = require("express")
const app = express();
const bodyparser = require("body-parser")
app.use(bodyparser.urlencoded({
  extended: true
}))
const https = require("https")
app.get("/", function(req, res) {
  res.sendFile(__dirname + "/index.html")
});
app.post("/", function(req, res) {

  const query = req.body.cityname;
  const apikey = "a84e716da5ecbad7473f0c693351cf0f"
  const url = "https://api.openweathermap.org/data/2.5/weather?q=" + query + "&appid=" + apikey + "&units=metric#"
  https.get(url, function(response) {
    console.log(response.statusCode);
    response.on("data", function(data) {
      const wd = JSON.parse(data)
      const temp = wd.main.temp
      const wdd = wd.weather[0].description
      const icon  = wd.weather[0].icon
      const imageUrl = "https://openweathermap.org/img/wn/10d@2x.png"
      console.log(wd);
      res.write("<h1> " + query + " the temp is " + temp + " degree C </h1>")
      res.write("<h2> the weather is " + wdd + "  </h2>")
      res.write("<img src=" + imageUrl + ">")
      res.send()
    })

  })
})







app.listen( process.env.PORT || 3000, function() {
  console.log("server running on port 3000");
})
