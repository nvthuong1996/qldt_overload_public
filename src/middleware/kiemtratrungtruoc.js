const AppData = require("../appdata");
const md5 = require("md5");
const tool = require("../DKMH/tool");

module.exports = async function(req, res, next) {
    if(req.url.toLowerCase() !== "/api/checktrung"){
        return next();
    }
    const session = req.appData.session;
    if(!AppData.SESSION[session].DKMH){
        return res.json({
            result:{
                state:{
                    error:"Có thể ad vừa update mã nguồn. Vui lòng reload lại trang"
                },
                resData:[]
            }
        });
    }
    const rawData = req.appData.rawBody;
    const dataRequest = JSON.parse(rawData);
  
    const maDK = dataRequest.maDK;
    if(!maDK){
        const resData = {};
        
        AppData.SESSION[session].DKMH.forEach((item)=>{
            const tmp = AppData.LICHDK[item.maMH].map((item)=>{
                return item.slice(0,17)
            })
            resData[item.maMH] = tmp.find((e)=>{
                return e[0] == item.maDK
            });
        })
        return res.json({result:{state:false},resData});
    }

    const maMH = dataRequest.maMH.trim();
    // khoi tao du lieu
  
    const { result, lichmoi } = tool.checkTKB(
      AppData.SESSION[session].DKMH,
      maMH,
      maDK
    );

    const resData = {};
    if(lichmoi){
        lichmoi.forEach((item)=>{
            const tmp = AppData.LICHDK[item.maMH].map((item)=>{
                return item.slice(0,17)
            })

            resData[item.maMH] = tmp.find((e)=>{
                return e[0] == item.maDK
            });
        })

    }

    const checkTKB = result;
    return res.json({result,resData});
}