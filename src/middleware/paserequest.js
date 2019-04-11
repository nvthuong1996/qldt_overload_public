// parse dữ liệu raw data từ request thành các tham số để xử lý về sau
const AppData = require("../appdata");
const myrequest = require("../request");

module.exports = function(req, res, next) {
  res.header('Access-Control-Allow-Origin', 'https://chatbox.ptit.info');
  res.header('Access-Control-Allow-Methods', '*');
  res.header('Access-Control-Allow-Headers', '*');
  res.header("Access-Control-Allow-Credentials", true);


  let data = "";
  req.appData = {};
  req.setEncoding("utf8");
  req.on("data", chunk => {
    if (chunk) data += chunk;
  });
  req.on("end", () => {
    req.appData.rawBody = data;
    const regex = new RegExp(
      `Content-Disposition: form-data; name="(.*?)"(.*?)-`,
      "g"
    );
    const input = data.replace(/\n|\r/g, "");
    const fields = {};
    let c = false;
    while ((match = regex.exec(input))) {
      fields[match[1]] = match[2];
      c = true;
    }
    if (c) {
      req.appData.fields = fields;
    }

    next();
  });
};
