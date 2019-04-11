// parse dữ liệu raw data từ request thành các tham số để xử lý về sau
const myrequest = require("../request");
const createError = require('http-errors');
const fs = require("fs");

module.exports = function(req, res, next) {
  // const data = fs.readFileSync("src/text.txt","utf8");
  // return res.status(200).send(data);
  if (req.method === "GET") {
    return myrequest.forwardrequest.get(req).then(data => {
      req.result = data;
      // fs.writeFileSync("get.text",JSON.stringify(data));
      return next();
    }).catch((error)=>{
        // const data = JSON.parse(fs.readFileSync("get.txt","utf8"));
        // req.result = data;
        // return next();

        //throw error;
        return next(createError(500));
    });
  } else if (req.method === "POST") {
    return myrequest.forwardrequest.post(req).then(data => {
      req.result = data;
      return next();
    }).catch((error)=>{
        console.log(error);
        return next(createError(500));
    });
  }
};
