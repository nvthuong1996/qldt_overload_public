const myrequest = require("../request");
const connect = require("../mysql");
const tool = require("./tool");
const AppData = require("../appdata");

module.exports = (req,res,next)=>{
    return myrequest.forwardrequest.post(req).then(data => {
        let {body,status} = data;
        body = body.replace(/disabled/g, "");
        const dk = JSON.parse(req.appData.rawBody);
        const dkLoc = dk.dkLoc.trim().toUpperCase();
        const session = req.appData.session;
        
        // kiem tra cache

        const now = new Date().getTime();
        if(AppData.METADATA.LICHDK[dkLoc]){
            const latestUpate = AppData.METADATA.LICHDK[dkLoc];
            if(now - latestUpate < 30000){
                console.log("load cache");
                const createRes = tool.createResFromNMH(dkLoc);
                const finalRes = tool.renderSelectMh(createRes,AppData.SESSION[session].DKMH,dkLoc);
                return res.status(status).send(finalRes);
            }
        }

        body = body.replace("style='background-color:#CCCCCC'", "style=''");
        body = body.replace("checked", "");

        tool.cacheLichDk(dkLoc,body);

        connect.query(`REPLACE  \`lichdk\` SET \`dkLoc\`=${connect.escape(dkLoc)},\`value\`=${connect.escape(body)}`,(error)=>{
          if(error){
              //throw new Error(dkLoc);
          }
        });
        
        const createRes = tool.createResFromNMH(dkLoc);

        

        const finalRes = tool.renderSelectMh(createRes,AppData.SESSION[session].DKMH,dkLoc);

        return res.status(status).send(finalRes);
      }).catch((error)=>{
        return res.status(200).send(JSON.stringify({
            value:"Có lỗi. Thử load lại"
        }));
      });
    
}
