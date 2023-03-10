const express = require("express");
const PORT = process.env.PORT || 3000;
const app = express();
const bodyParser = require("body-parser");
const cors = require("cors");
const { spawn } = require("child_process");
const fs = require("fs");

app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());
app.use(cors());



app.post("/postUserInfo", (req, res) => {
  console.log(req.body);
  fs.readFile("userInfo.json", (err, data) => {
    if (err) throw err;
    else {
      var json = JSON.parse(data);
      var userID = json.users[json.users.length - 1].id + 1;
      var data2 = {
        id: userID,
        name: req.body.name,
        weight: req.body.weight,
        height: req.body.height,
        gender: req.body.gender,
        age: req.body.age,
        activity: req.body.activityLevel,
        diseases: req.body.diseases,
      };
      json.users.push(data2);
      fs.writeFile("userInfo.json", JSON.stringify(json, null, 2), (err) => {
        if (err) throw err;
        else {
          console.log("File saved");
          res.send({
            message: "File saved",
          });
        }
      });
    }
  });
});

app.get("/getUserInfo", (req, res) => {
  fs.readFile("userInfo.json", (err, data) => {
    if (err) throw err;
    else {
      res.send(JSON.parse(data));
      console.log(JSON.parse(data));

      let user = JSON.parse(data);
      console.log(user.name);
    }
  });
});

app.post("/alterUser", (req, res) => {
  fs.readFile("userInfo.json", (err, data) => {
    if (err) throw err;
    else {
      var json = JSON.parse(data);
      var data2 = {
        id: req.body.id,
        name: req.body.name,
        weight: req.body.weight,
        height: req.body.height,
        gender: req.body.gender,
        age: req.body.age,
        activity: req.body.activityLevel,
        diseases: req.body.diseases,
      };
      console.log(req.body);
      json.users[req.body.id] = data2;
      // console.log(json);
      fs.writeFile("userInfo.json", JSON.stringify(json, null, 2), (err) => {
        if (err) throw err;
        else {
          console.log("File saved");
          res.send(res.redirect('/expert')
          );
        }
      });
    }
  });
});

app.post("/deleteUser", (req, res) => {
  fs.readFile("userInfo.json", (err, data) => {
    if (err) throw err;
    else {
      var json = JSON.parse(data);
      json.users.splice(req.body.id - 1, 1);
      console.log(json);
      fs.writeFile("userInfo.json", JSON.stringify(json, null, 2), (err) => {
        if (err) throw err;
        else {
          console.log("File saved");
          res.send({
            message: "File saved",
          });
        }
      });
    }
  });
});

app.post("/expert", (req, res) => {
  console.log("this is my body", req.body);
  const python = spawn("python3", [
    "./ExpertSystem/Diet_ExpertSystem.py",
    req.body.height,
    req.body.weight,
    req.body.age,
    req.body.gender,
    req.body.activity,
    req.body.diseases,
  ]);

  python.stdout.on("data", function (data) {
    console.log("Pipe data from python script ...");
    console.log(data.toString());
    res.send(data);
  });

  python.stderr.on("data", (data) => {
    console.error(`stderr: ${data}`);
  });

  python.on("exit", (code) => {
    console.log(`child process close all stdio with code ${code}`);
  });
  res.send(req.body)
})
app.post("/getRec", (req, res) => {

  fs.readFile("userRecommendations.json", (err, data) => {
    if (err) throw err;
    else {
      res.status(202).send(JSON.parse(data));
    }
  });
});


app.post("/postBlogs", (req, res) => {
  fs.writeFile("blogs.json", JSON.stringify(req.body, null, 2), (err) => {
    if (err) throw err;
    else {
      res.send({
        message: "File saved",
      });
    }
  });
});


app.post("/blogs", (req, res) => {
  const urls = [
    "https://www.eatthismuch.com",
    "https://www.verywellfit.com/recipes-4157077",
    "https://blogs.webmd.com/diet-nutrition/default.htm",
    "https://www.onpoint-nutrition.com/blog",
    "https://diettogo.com/blog",
    "https://cleananddelicious.com/food-for-thought/weight-loss/",
  ];

  var blogs = [];
  fs.readFile("userInfo.json", (err, data) => {
    if (err) throw err;
    else {
      const diseases = JSON.parse(data);
      let arr = diseases.users[req.body.id - 1].diseases;
      fs.readFile("blogs.json", async (err, data) => {
        if (err) throw err;
        else {
          let json = JSON.parse(data);
          for (i = 0; i < 7; i++) {
            console.log(arr[i]);;
            if (arr[i] == true) {
              blogs.push(json.diseases[i]);
            }
          }
          blogs.map((item) => {
            urls.push(item);
          });
          console.log(blogs);

          res.send(blogs);
        }
      });
    }
  });
});


app.listen(PORT, () => {
  console.log(` Server running on port ${PORT}`);
});

