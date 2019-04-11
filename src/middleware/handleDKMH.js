const DKMH = require("../DKMH");
const AppData = require("../appdata");
const { forwardrequest } = require("../request");
const { JSDOM } = require("jsdom");
const tool = require("../DKMH/tool");
const createError = require("http-errors");
const mysql = require("../mysql");

module.exports = async function (req, res, next) {
  if (req.appData.fields && req.appData.fields.__EVENTTARGET && req.appData.fields.__EVENTTARGET === "ctl00$Header1$ucLogout$lbtnLogOut") {
    return next();
  }
  try {
    if (
      (req.url.toLowerCase() ===
        "/ajaxpro/edusoft.web.uc.dangkymonhoc,edusoft.web.ashx" ||
        req.url.toLowerCase().indexOf("ajaxpro/edusoft") > 0) &&
      req.method === "POST"
    ) {
      try {
        const method = req.headers["x-ajaxpro-method"];

        const session = req.appData.session;
        const mssv = AppData.SESSION[session].user
          ? AppData.SESSION[session].user.mssv
          : null;

        if (!mssv) {
          throw new Error("Invalid Method: User not exist");
        }

        switch (method) {
          case "LoadDanhSachKhoaLop":
            return next();
          case "LocTheoMonHoc":
            return DKMH.LocTHeoMonHoc(req, res, next);
          case "DangKySelectedChange":
            return DKMH.DangKySelectedChange(req, res, next);
          case "LuuVaoKetQuaDangKy":
            return DKMH.LuuVaoKetQuaDangKy(req, res, next);
          case "KiemTraTrungNhom":
            return res.status(200).send('{"value":""}');
          case "LuuDanhSachDangKy":
            return res.status(200).send('{"value":""}');
          case "LuuDanhSachDangKy_HopLe":
            return DKMH.LuuDanhSachDangKy_HopLe(req, res, next);
          case "XoaKQDKTheoMaDK":
            return DKMH.XoaKQDKTheoMaDK(req, res, next);
        }
      } catch (error) {
        return res.send(JSON.stringify({ value: "Vui lòng reload lại trang" }));
      }
    } else if (
      req.query &&
      req.query.page &&
      req.query.page.toLowerCase() === "dkmonhoc"
    ) {
      const session = req.appData.session;
      const mssv = AppData.SESSION[session].user
        ? AppData.SESSION[session].user.mssv
        : null;

      if (!mssv) {
        return res.redirect("/");
      }

      AppData.SESSION[session] = AppData.SESSION[session] || {};

      AppData.SESSION[session].DKMH = AppData.SESSION[session].DKMH || [];

      const tkb = AppData.SESSION[session].DKMH;

      const t = tool.renderDSDK(tkb, AppData.LICHDK);

      const result = await forwardrequest.get(req);
      body = result.body;
      body = body.replace(
        "doituong.value = dsDaChon.substring(19, x.length - 6);",
        "//doituong.value = dsDaChon.substring(19, x.length - 6);"
      );
      body = body.replace(
        `<a href='HDDKMH.htm'>`,
        `<a href="https://www.facebook.com/ptitchatbot" target="_blank">`
      );
      const { document } = new JSDOM(body).window;




      const e = document.getElementById("ctl00_ContentPlaceHolder1_ctl00_UpdatePanel2");
      if (!e) {
        return res.redirect("/");
      }
      e.innerHTML = `<div id="ctl00_ContentPlaceHolder1_ctl00_UpdatePanel2">
        <div id="divfilters" class="filters" visible="false">
            <table>
                <tbody><tr>
                    <td>
                        <div id="ctl00_ContentPlaceHolder1_ctl00_pnlLocMonHoc">
        
                            <span id="ctl00_ContentPlaceHolder1_ctl00_lblLocMH" style="display:inline-block;width:110px;">Nhập môn học</span>
                            <input type="text" id="txtMaMH1" onkeypress="txtMaMH1_keypress(event)">
                            <input type="button" value="Tìm kiếm" id="btnLocTheoMaMH1" onclick="btnLocTheoMaMH1_click()">
                            
    </div>
    
                    </td>
                </tr>
                <tr>
                    <td valign="top">
                        <div id="ctl00_ContentPlaceHolder1_ctl00_pnlLocDK" style="display:flex;">
        
                            <table cellpadding="0" cellspacing="0" >
                                <tbody><tr>
                                    <td style="width: 130px">
                                        <span id="ctl00_ContentPlaceHolder1_ctl00_lblLocDK">Môn học theo CTĐT kế hoạch</span>
                                    </td>
                                    <td align="left" valign="top">
                                        <div id="divMonHoc"></div>
                                        <div id="divDanhSachDieuKienLoc"></div>
    
                                    </td>
                                    <td width="790px" align="left">
    
                                        <div id="divKhoa"></div>
                                        <div id="divLop"></div>
                                        <div id="divNganh"></div>
                                    </td>
                                </tr>
                                <tr><td colspan="2" style="
                                /* margin-top: 10px; */
                                padding: 10px;
                                color: #ffc107;
                                font-size: 15px;" id="warningSelect"></td></tr>
                            </tbody></table>
                            <div style="display:flex;">
                            <table id="diemthi1" class="previewTKBtable" >
                            </table>
                            <table id="diemthi2" class="previewTKBtable" >
                            </table>
                        
                    </div>
                                            
                        
    </div>
    
                        
    
    
                        
                    </td>
                </tr>
    
            </tbody></table>
        </div>
        <table id="pnlDSMonhocDK">
            <tbody><tr>
                <td align="center">
                    <div align="left">
                        <table cellspacing="0" cellpadding="0" class="title-table">
                                                    <tbody><tr align="center" height="30px">
                                                    <td width="25px"><asp:label id="lblG1DK" runat="server">  </asp:label>  </td><td width="56px"><asp:label id="lblG1MMH" runat="server">Mã MH</asp:label></td>
                                                    <td width="170px"><asp:label id="lblG1TMH" runat="server">Tên môn học </asp:label></td><td width="30px"><asp:label id="lblG1NMM" runat="server">NMH</asp:label></td><td width="35px"><asp:label id="lblG1TTH" runat="server">TTH</asp:label></td>
                                                    <td width="25px"><asp:label id="lblG1STC" runat="server">STC</asp:label></td>
                                                    <td width="35px"><asp:label id="lblG1STCHP" runat="server">STCHP</asp:label></td><td width="90px"><asp:label id="lblG1MaLop" runat="server">Mã lớp</asp:label></td><td width="28px"><asp:label id="lblG1SCP" runat="server">Sĩ số</asp:label></td>
                                                        <td width="28px"><asp:label id="lblG1CL" runat="server">CL</asp:label></td><td width="20px"><asp:label id="lblG1TH" runat="server">TH</asp:label></td>
                                                                 <td width="35px"><asp:label id="lblG1Thu" runat="server">Thứ </asp:label></td>
                                                                 <td width="40px"><asp:label id="lblG1TBD" runat="server">Tiết BD</asp:label></td>
                                                                 <td width="30px"><asp:label id="lblG1ST" runat="server">ST</asp:label></td>
                                                                 <td width="60px"><asp:label id="lblG1Phong" runat="server">Phòng</asp:label> </td><td width="100px"><asp:label id="lblG1TenGV" runat="server">Giảng viên</asp:label> </td> <td><asp:label id="lblG1Tuan" runat="server">Tuần</asp:label></td></tr></tbody></table>
                    </div>
                    <div style="height: 320px" class="grid-roll">
                          <div id="divTDK"></div>
                        
                    </div>
                </td>
            </tr>
        </tbody></table>
        <div id="ctl00_ContentPlaceHolder1_ctl00_pnlDaChon">
        
            
            <div style="margin-top: 5px;" id="titleDSDK">
                <span id="ctl00_ContentPlaceHolder1_ctl00_lblDaChon" class="Label" style="font-size:14px;font-weight:bold;">DANH SÁCH MÔN HỌC ĐÃ CHỌN</span><span style="float:right;color:red">Đây là chế độ đăng kí thử môn học</span>
                <table cellspacing="0" cellpadding="0" class="title-table"><tbody><tr><td colspan="11" align="right" style="background-color:#6699FF;height:5px;"><input type="button" id="btnLuu" value="Lưu Đăng Ký" onclick="LuuDanhSachDangKy()">
                                                                                    </td>
                                                                                    <td align="center" style="background-color:#6699FF;height:5px;">
                                                                                    <input type="button" id="bntXoaChon" value="Xóa" onclick="xoaTuDanhSach(this.form.chk_xoa, false)">
                                                                                    </td>
                                                                                </tr>
                                                                                <tr align="center">
                                                                                <td style="width: 30px;"><asp:label id="lblG2STT" runat="server">STT</asp:label></td>
                                                                                <td style="display:none"><asp:label id="lblG2MaDK" runat="server">Regis ID </asp:label></td>
                                                                                <td style="width: 56px;"><asp:label id="lblG2MMH" runat="server">Mã MH </asp:label></td>
                                                                                <td style="width: 180px;"><asp:label id="lblG2TMH" runat="server">Tên môn học </asp:label></td>
                                                                                <td style="width: 45px;"><asp:label id="lblG2NMH" runat="server">NMH </asp:label></td>
                                                                                <td style="width: 45px;"><asp:label id="lblG2TTH" runat="server">TTH </asp:label></td>
                                                                                <td style="width: 35px;"><asp:label id="lblG2STC" runat="server">STC </asp:label></td>
                                                                                <td style="width: 35px;"><asp:label id="lblG2STCHP" runat="server">STCHP </asp:label></td> <td style="width: 80px;"><asp:label id="lblG2HP" runat="server">Học Phí</asp:label></td>
                                                         <td style="width: 80px;"><asp:label id="lblG2MG" runat="server">Miễn Giảm</asp:label></td>
                                                         <td style="width: 80px;"><asp:label id="lblG2PD" runat="server">Phải Đóng</asp:label></td><td><asp:label id="lblG2TrangThai" runat="server">Trạng Thái môn học </asp:label></td><td align="left" style="width:50px;"><input type="checkbox" id="IDchk_all" name="chk_all" onclick="check(this.form.chk_xoa);"></td></tr></tbody></table>
    
            </div>
            <div id="divTemp" class="grid-roll" style="height: 240px">
                
    <div id="divKQ">${t}</div>
            </div>
            <br>
            <strong>
            <span id="ctl00_ContentPlaceHolder1_ctl00_lblNote" class="Label">Ghi chú: ĐK: đăng ký; Mã MH: mã môn học; NMH: Nhóm môn học; TTH: Tổ thực hành; STC: Số tín chỉ; STCHP: Số tín chỉ học phí; CL: Còn lại; TH: Thực hành</span>
            </strong>
            
            <br>
    
            
    
    
        
    </div>
    
    </div>`;



      const optionCode = `
        <div id = "tool-support" style="display:none;">
          <div class="left-tool">
            <select onchange="selectMonHoc_changed_()" multiple="multiple" style="height:140px" id="selectMonHoc_">
            </select>
          </div>
          <div class="right-tool">
          </div>
          <style>
            .left-tool{
              position: fixed;
              left: 5px;
              top: 20px;
            }
            .right-tool{
              position: fixed;
              right: 20px;
              display: flex;
              top: 20px;
              flex-direction: column;
            }
          </style>
        </div>
      `;


      let bodyFinal = document.documentElement.outerHTML;

      bodyFinal = bodyFinal.replace("</body>", optionCode + "</body>");
      //bodyFinal = bodyFinal.replace(`action="Default.aspx?page=dkmonhoc"`,`action="Default.aspx?page=gioithieu"`);

      return res.status(200).send(bodyFinal);
    } else {
      return next();
    }
  } catch (error) {
    return res.redirect("/");
  }
};