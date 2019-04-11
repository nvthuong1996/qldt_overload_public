const TKB = require("../TKB");
const AppData = require("../appdata");
const { forwardrequest } = require("../request");
const { JSDOM } = require("jsdom");
const tool = require("../DKMH/tool");
const connect = require("../mysql");
const createError = require("http-errors");

module.exports = async function(req, res, next) {
  if(req.appData.fields && req.appData.fields.__EVENTTARGET && req.appData.fields.__EVENTTARGET === "ctl00$Header1$ucLogout$lbtnLogOut"){
    return next();
  }
  try {
    if (req.query.page && req.query.page.toLowerCase() === "thoikhoabieu") {
      const session = req.appData.session;
      const mssv = AppData.SESSION[session].user
        ? AppData.SESSION[session].user.mssv
        : null;
      if (!mssv) {
        return res.redirect("/");
      }
      const tkb = await getTKB(mssv);
      AppData.SESSION[session].TKB = AppData.SESSION[session].TKB || {};
      AppData.SESSION[session].TKB.tuan =
        AppData.SESSION[session].TKB.tuan || 0;
      AppData.SESSION[session].TKB.view =
        AppData.SESSION[session].TKB.view || "option";

      if (req.method === "GET") {
        return TKB.get(req, res, next, tkb);
      } else if (req.method === "POST") {
        return TKB.post(req, res, next, tkb);
      } else {
        res.redirect("/");
      }
    } else {
      return next();
    }
  } catch (error) {
    return next(createError(500));
  }
};

function getTKB(mssv) {
  return new Promise((resolve, reject) => {
    connect.query(
      `SELECT * FROM \`dkmh\` WHERE mssv="${mssv}"`,
      (error, result) => {
        if (error) {
          return reject(error);
        }
        return resolve(result);
      }
    );
  });
}
