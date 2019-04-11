const AppData = require("../appdata");
const tool = require("./tool");
const connect = require("../mysql");

module.exports = async (req, res, next) => {
  const session = req.appData.session;
  const mssv = AppData.SESSION[session].user
  ? AppData.SESSION[session].user.mssv
  : null;

  AppData.SESSION[session] = AppData.SESSION[session] || {};

  AppData.SESSION[session].DKMH = AppData.SESSION[session].DKMH || [];

  const danhSachMaDangKy = JSON.parse(req.appData.rawBody).danhSachMaDangKy;
  const listDs =  danhSachMaDangKy.split(",").filter(item=>item);
  const dkmh = AppData.SESSION[session].DKMH;
  AppData.SESSION[session].DKMH = dkmh.filter((item)=>{
    return !listDs.find((e)=>e===item.maDK);
  })

  const createRes = tool.renderDSDK(AppData.SESSION[session].DKMH,AppData.LICHDK);

  const finalRes = { value: createRes + "|" };

  return res.status(200).send(finalRes);

};


