const AppData = require("../appdata");
const tool = require("../DKMH/tool");
const { forwardrequest } = require("../request");
const render = require("./render");
const { JSDOM } = require("jsdom");


module.exports = (req, res, next, tkb) => {
    const session = req.appData.session;
    AppData.SESSION[session].tkb = AppData.SESSION[session].viewoption || 0;
  
    const oldView = AppData.SESSION[session].TKB.view;
    const fields = req.appData.fields;
    if(fields.hasOwnProperty("ctl00$ContentPlaceHolder1$ctl00$ddlChonNHHK")){
        AppData.SESSION[session].TKB.view = fields["ctl00$ContentPlaceHolder1$ctl00$ddlChonNHHK"];
    }

    if(fields["ctl00$ContentPlaceHolder1$ctl00$btnTuanToi"]){
        AppData.SESSION[session].TKB.tuan = AppData.SESSION[session].TKB.tuan + 1;
    }else if(fields["ctl00_ContentPlaceHolder1_ctl00_btnTrangTruoc"]){
        if(AppData.SESSION[session].TKB.tuan>1){
            AppData.SESSION[session].TKB.tuan --;
        }
    }else if(fields["ctl00_ContentPlaceHolder1_ctl00_btnDt"]){
        AppData.SESSION[session].TKB.tuan = 0;
    }else if(fields["ctl00$ContentPlaceHolder1$ctl00$btnTuanCuoi"]){
        AppData.SESSION[session].TKB.tuan = "max";
    }else if(fields.hasOwnProperty("ctl00$ContentPlaceHolder1$ctl00$ddlTuan")){
        AppData.SESSION[session].TKB.tuan = fields["ctl00$ContentPlaceHolder1$ctl00$ddlTuan"];
    }

    if(AppData.SESSION[session].TKB.view === "option"){
        if(oldView!=="option"){
            AppData.SESSION[session].TKB.tuan = 0;
        }
        if(fields.hasOwnProperty("ctl00$ContentPlaceHolder1$ctl00$ddlLoai")){
            if(fields["ctl00$ContentPlaceHolder1$ctl00$ddlLoai"]==="1"){
                return res.redirect("/Default.aspx?page=thoikhoabieu&sta=1");
            }
        }
    }

    const viewOption = AppData.SESSION[session].TKB.view;
    if (viewOption === "option") {
      const tuan = AppData.SESSION[session].TKB.tuan;
      

      // check cac case


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