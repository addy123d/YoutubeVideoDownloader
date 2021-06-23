const express = require("express");
const yt = require("ytdl-core");
const port = process.env.PORT || 5500;
const host = "0.0.0.0";

const app = express();

app.set("view engine", "ejs");

app.use(express.static(__dirname + "/public"));

app.get("/", (req, res) => {
  res.render("main");
})

app.get("/getInfo", async (req, res) => {
  const {
    url
  } = req.query;

  console.log(`URL : ${url}`);

  const info = await yt.getInfo(url);

  console.log(info);

  res.json(info);


});


app.get("/download", async (req, res) => {

  console.log(req.query);
  const {
    url,
    title,
    resolution
  } = req.query;


  res.attachment(`${title}.mp4`);

  yt(url, {
    filter: format => format.qualityLabel == resolution,
    filter: format => format.itag == 18
  }).pipe(res);


});



app.listen(port, host, () => console.log("Server is running !"))