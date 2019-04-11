const AppData = require("../appdata");
const tool = require("./tool");
const connect = require("../mysql");

module.exports = async (req, res, next) => {
  const session = req.appData.session;
  AppData.SESSION[session] = AppData.SESSION[session] || {};

  AppData.SESSION[session].DKMH = AppData.SESSION[session].DKMH || [];

  const result = tool.renderDSDK(AppData.SESSION[session].DKMH, AppData.LICHDK);

  return res.status(200).send(JSON.stringify({ value: result + "|" }));
};


