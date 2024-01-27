const express = require("express");

const app = express();

const urlencodedParser = express.urlencoded({extended: false});

app.get("/", function(_, response){
    response.sendFile(__dirname + "/index.html");
});
app.post("/", urlendodedParser, function (request, response) {
    if(!request.body) return response.sendStatus(400);
    console.log(request.body);
    response.send(`${request.body.userName} - ${request.body.userAge}`);
});

app.listen(3000, ()=>console.log("Сервер запущен..."));