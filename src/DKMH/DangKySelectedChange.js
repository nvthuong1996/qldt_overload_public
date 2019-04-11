const AppData = require("../appdata");
const tool = require("./tool");

module.exports = (req, res, next) => {
  const rawData = req.appData.rawBody;
  const session = req.appData.session;
  const dataRequest = JSON.parse(rawData);

  const maDK = dataRequest.maDK;
  const maMH = dataRequest.maMH.trim();

  // khoi tao du lieu

  AppData.SESSION[session] = AppData.SESSION[session] || {};

  AppData.SESSION[session].DKMH = AppData.SESSION[session].DKMH || [];

  const { result, lichmoi } = tool.checkTKB(
    AppData.SESSION[session].DKMH,
    maMH,
    maDK
  );
  const checkTKB = result;

  if (checkTKB.state.error) {
    res
      .status(200)
      .send(
        `{"value":"0|${maDK}|1|||0|${checkTKB.state.error}|||0||0|MSMH|3|Tên Môn Học|01|3.0|0|0|0|0|0|1|0||01/01/0001|0|0|1||1|1|1|1|0|0|1|"}`
      );
  } else {
    AppData.SESSION[session].DKMH = lichmoi;
    if (checkTKB.oldMDK) {
      return res
        .status(200)
        .send(
          `{"value":"1|${maDK}|1||${
            checkTKB.oldMDK
          }|0||||0||0|MSMH|3|Tên Môn Học|01|3.0|0|0|0|0|0|1|0||01/01/0001|0|0|1||1|1|1|1|0|0|1|"}`
        );
    } else {
      return res
        .status(200)
        .send(
          `{"value":"0|${maDK}|1|||0||||0||0|MSMH|3|Tên Môn Học|01|3.0|0|0|0|0|0|1|0||01/01/0001|0|0|1||1|1|1|1|0|0|1|"}`
        );
    }
  }
};
