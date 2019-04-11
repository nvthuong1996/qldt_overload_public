const AppData = require("../appdata");
const connect = require("../mysql");

module.exports = async (req, res, next) => {
  const session = req.appData.session;
   
  const mssv = AppData.SESSION[session].user.mssv;

  AppData.SESSION[session] = AppData.SESSION[session] || {};
  AppData.SESSION[session].DKMH = AppData.SESSION[session].DKMH || [];
  
  // delete tat ca du lieu mh hien tai
  await new Promise((resolve)=>{
    connect.query(`DELETE FROM \`qldtoverload\`.\`dkmh\` WHERE mssv='${mssv}'`,(error,result)=>{
       
      resolve()});
  })

  const dkmh = AppData.SESSION[session].DKMH;
  const task = [];
  dkmh.forEach(element => {
    task.push(saveDKMHtoDatabase(element, mssv));
  });

  AppData.SESSION[session].DKMH = AppData.SESSION[session].DKMH.map(e => {
    e.state = "daluu";
    return e;
  });


  await Promise.all(task);

  return res.status(200).send('{"value":"||/Default.aspx?page=dkmonhoc||"}');
};

async function saveDKMHtoDatabase(mh, mssv) {
  return new Promise((resolve, reject) => {
    connect.query(
      `INSERT INTO  \`dkmh\` SET \`maDK\`="${
        mh.maDK
      }",\`maMH\`="${mh.maMH}",\`mssv\`="${mssv}"`,
      (error, result) => {
        if (error) {
          return reject(error);
        }
        return resolve();
      }
    );
  });
}
