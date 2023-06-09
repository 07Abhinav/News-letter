const express = require("express");
const bodyParser = require("body-parser");
const request = require("request");
const https = require("https");

const app = express();

app.use(express.static("public"));
app.use(bodyParser.urlencoded({extended: true}));

app.get("/", function(req, res){
    res.sendFile(__dirname + "/signup.html");
});

app.post("/", function(req, res){
    const firstName = req.body.fname;
    const lastName = req.body.lname;
    const email = req.body.email;

    const data = {
        members: [
            {
                email_address: email,
                status: "subscribed",
                merge_fields: {
                    FNAME: firstName,
                    LNAME: lastName
                }
            }
        ]
    };
    const jsonData = JSON.stringify(data);
    const url = "https://us21.api.mailchimp.com/3.0/lists/50baef6186";
    const options = {
        method: "POST",
        auth: "abhi:8a726c1b7cd455c1c357493ad44229fc-us21"
    }

    const request = https.request(url, options, function(response){
        if(response.statusCode===200){
            res.sendFile(__dirname + "/success.html");
        }else{
            res.sendFile(__dirname + "/failure.html");
        }
        response.on("data", function(data){
            console.log(JSON.parse(data));
        })
    })

    request.write(jsonData);
    request.end();
});

app.post("/failure", function(req, res){
    res.redirect("/")
})

app.listen(3000, function(){
    console.log("Server is running on 3000");
});

// 8a726c1b7cd455c1c357493ad44229fc-us21
// 
// a423262876350e3c5b056c8ca5ba86c4-us21
//b365863df6e2a393230e2bddda7bbadb-us21

// 50baef6186

// 4608b199d26cba61be9338657f47124c-us21