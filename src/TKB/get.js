const AppData = require("../appdata");
const tool = require("../DKMH/tool");
const { forwardrequest } = require("../request");
const render = require("./render");
const { JSDOM } = require("jsdom");

module.exports = (req, res, next, tkb) => {
  const session = req.appData.session;
  AppData.SESSION[session].tkb = AppData.SESSION[session].viewoption || 0;

  const viewOption = AppData.SESSION[session].TKB.view;

  if (viewOption === "option") {
    const tuan = AppData.SESSION[session].TKB.tuan;
    if (req.query && req.query.sta === "1") {
      render.renderTKB2(tkb, req, res);
      return true;
    } else {
      render.renderTKB(tkb, tuan, req, res);
      return true;
    }
  } else {
    return render.renderDefault(req,res,viewOption);
  }
};
