const AppData = require("../appdata");
const myrequest = require("../request");

module.exports = async function(req, res, next) {

    
    const cookie = req.headers["cookie"];
    const regexSession = new RegExp(`ASP.NET_SessionId=(.*?);`);
    const matchSession = regexSession.exec(cookie + ";");
    if (matchSession) {
      const session = matchSession[1];
      req.appData.session = session;
      AppData.SESSION[session] = AppData.SESSION[session] || {};
      AppData.METADATA.SESSION[session] = AppData.METADATA.SESSION[session] || {};

      AppData.METADATA.SESSION[session].timestamp = new Date().getTime();
      if(!AppData.METADATA.SESSION[session].changeLanguge){
        myrequest.chanelanguge(cookie).catch((error)=>{
          console.log(error);
        });
        AppData.METADATA.SESSION[session].changeLanguge = true;
      }
      if(AppData.SESSION[session] && AppData.SESSION[session].user){
        //console.log(AppData.SESSION[session].user.mssv);
      }
    }


    return next();
}

setInterval(()=>{
    cleanSession();
},10000)

function cleanSession(){
    let count = 0;
    for(let session in AppData.METADATA.SESSION){
        if(AppData.METADATA.SESSION[session].timestamp + 900000 > new Date().getTime()){
            count ++;
        }else{
            delete AppData.METADATA.SESSION[session];
            delete AppData.SESSION[session];
        }
    }
    console.log("Số người truy cập trong 15 phút gần đây: "+count);
}