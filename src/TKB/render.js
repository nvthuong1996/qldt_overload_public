const {
  tableHtml,
  optionHtml,
  endBody,
  _tStartHTML,
  _tStopHTML,
  thead
} = require("./template");
const AppData = require("../appdata");
const tool = require("../DKMH/tool");
const { forwardrequest } = require("../request");
const render = require("./render");
const { JSDOM } = require("jsdom");

module.exports = {
  renderBody,
  renderTKB,
  renderTKB2,
  renderDefault
};

async function renderDefault(req, res , view) {
    // Bước 1: request để lấy code html
    // Bước 2: lấy thời khóa biểu
    let body, status;
    if(req.method === "GET"){
        const result = await forwardrequest.get(req);
        body = result.body;
        status = result.status;
    }else{
        const result = await forwardrequest.post(req);
        body = result.body;
        status = result.status;
    }

    const {document} = (new JSDOM(body)).window;

    let hocki = document.getElementById('ctl00_ContentPlaceHolder1_ctl00_ddlChonNHHK').innerHTML.trim();
    hocki = hocki.replace('selected="selected"','');
    hocki = '<option value="option">Chế độ xem thử TKB</option>' + hocki;
    hocki = hocki.replace(view+'"',view+'"'+" selected");

    document.getElementById('ctl00_ContentPlaceHolder1_ctl00_ddlChonNHHK').innerHTML = hocki;
  
    body = document.documentElement.outerHTML;
    return res.status(status).send(body);
  }

async function renderTKB(tkb, tuan, req, res) {
  // Bước 1: request để lấy code html

  // Bước 2: lấy thời khóa biểu
  const dataTKB = tool.findMonHoc(tkb, AppData.LICHDK);

  let _tmp = [];
  dataTKB.forEach(e => {
    _tmp = _tmp.concat(
      e.nmh[16].map(f => {
        return f.length;
      })
    );
  });
  tuan_max = Math.max(..._tmp) - 1;

  if (tuan === "max") {
    tuan = tuan_max;
  }else if(tuan>tuan_max){
      tuan = tuan_max;
  }


  let { body, status } = await forwardrequest.get(req);

  const bodyHTML = renderBody(dataTKB, tuan);

  const { document } = new JSDOM(body).window;

  if(!document.getElementById("ctl00_ContentPlaceHolder1_ctl00_ddlTuan")){
    return res.redirect("/Default.aspx?page=thoikhoabieu");
  }

  if(!document.getElementById("ctl00_ContentPlaceHolder1_ctl00_Table1")){
    return res.redirect("/Default.aspx?page=thoikhoabieu");
  }



  document.getElementById(
    "ctl00_ContentPlaceHolder1_ctl00_ddlTuan"
  ).innerHTML = createOptionHtml(tuan);
  document.getElementById(
    "ctl00_ContentPlaceHolder1_ctl00_Table1"
  ).innerHTML = bodyHTML;

  if(!document.getElementById("ctl00_ContentPlaceHolder1_ctl00_ddlChonNHHK")){
    return res.redirect("/Default.aspx?page=thoikhoabieu");
  }

  let hocki = document.getElementById(
    "ctl00_ContentPlaceHolder1_ctl00_ddlChonNHHK"
  ).innerHTML;

  hocki = hocki.replace('selected="selected"', "");
  hocki = '<option value="option" selected>Chế độ xem thử TKB</option>' + hocki;
  document.getElementById(
    "ctl00_ContentPlaceHolder1_ctl00_ddlChonNHHK"
  ).innerHTML = hocki;
  body = document.documentElement.outerHTML;
  body = body.replace('disabled="disabled"', "");

  return res.status(status).send(body);
}

async function renderTKB2(tkb, req, res) {
  // Bước 1: request để lấy code html
  // Bước 2: lấy thời khóa biểu
  let { body, status } = await forwardrequest.get(req);

  const dataTKB = tool.findMonHoc(tkb, AppData.LICHDK);

  let codeHTML = dataTKB.reduce((e, item) => {
    return e + nmhHTML(item.nmh);
  }, "");

  codeHTML = _tStartHTML + codeHTML + _tStopHTML;

  const {document} = (new JSDOM(body)).window;
  document.getElementById('ctl00_ContentPlaceHolder1_ctl00_pnlHeader').innerHTML = codeHTML;
  let hocki = document.getElementById('ctl00_ContentPlaceHolder1_ctl00_ddlChonNHHK').innerHTML.trim();
  hocki = hocki.replace('selected="selected"','');
  hocki = '<option value="option" selected>Chế độ xem thử TKB</option>' + hocki;
  document.getElementById('ctl00_ContentPlaceHolder1_ctl00_ddlChonNHHK').innerHTML = hocki;

  body = document.documentElement.outerHTML;
  return res.status(res.statusCode).send(body);
}

function nmhHTML(e){
    var first = `<td width="55px" align="center">${e[1]}</td>` +
    `<td width="160px" align="left" style="padding-left:5px">${e[2]}</td>`+
    `<td width="35px" align="center">${e[3]}</td>`+
    `<td width="35px" align="center">${e[5]}</td>`+
    `<td width="90px" align="center">${e[7]}</td>`+
    `<td width="36px" align="center">${e[6]}</td>`+
    `<td width="35px" align="center"> </td>`+
    `<td width="35px" align="center">
    <table class="body-table" style="border-collapse: collapse;border-right:0px; border-bottom:0px; border-left:0px;border-top:0px; padding-top:5px;" border="1">
    <tbody><tr height="22px"><td align="center" width="">${e[4]}</td></tr></tbody></table>
    <table class="body-table" style="border-collapse: collapse;border-right:0px; border-bottom:0px; border-left:0px;border-top:0px; padding-top:5px;" border="1">
    <tbody><tr height="22px"><td align="center" width=""></td></tr></tbody></table><div style="height:22px;vertical-align:middle;padding-top:5px;width:22px"></div></td>`;
    var p11 = '';
    e[11].forEach((f,index)=>{
        if(index==e[11].length-1){
            p11 += `<div style="height:22px;vertical-align:middle;padding-top:5px">${f}</div>`;
        }else{
            p11 += `<table class="body-table" style="border-collapse: collapse;border-right:0px; border-bottom:0px; padding-top:5px;" rules="all" cellspacing="0" cellpadding="0">
            <tbody><tr height="22px"><td align="center">${f}</td></tr></tbody></table>`;
        }
    })
    p11 = `<td width="40px" align="center">` + p11 + `</td>`;

    var p12 = '';
    e[12].forEach((f,index)=>{
        if(index==e[12].length-1){
            p12 += `<div style="height:22px;vertical-align:middle;padding-top:5px">${f}</div>`;
        }else{
            p12 += `<table class="body-table" style="border-collapse: collapse;border-right:0px; border-bottom:0px; padding-top:5px;" rules="all" cellspacing="0" cellpadding="0">
            <tbody><tr height="22px"><td align="center">${f}</td></tr></tbody></table>`;
        }
    })
    p12 = `<td width="40px" align="center">` + p12 + `</td>`;


    var p13 = '';
    e[13].forEach((f,index)=>{
        if(index==e[13].length-1){
            p13 += `<div style="height:22px;vertical-align:middle;padding-top:5px">${f}</div>`;
        }else{
            p13 += `<table class="body-table" style="border-collapse: collapse;border-right:0px; border-bottom:0px; padding-top:5px;" rules="all" cellspacing="0" cellpadding="0">
            <tbody><tr height="22px"><td align="center">${f}</td></tr></tbody></table>`;
        }
    })
    p13 = `<td width="40px" align="center">` + p13 + `</td>`;

    var p14 = '';
    e[14].forEach((f,index)=>{
        if(index==e[14].length-1){
            p14 += `<div style="height:22px;vertical-align:middle;padding-top:5px">${f}</div>`;
        }else{
            p14 += `<table class="body-table" style="border-collapse: collapse;border-right:0px; border-bottom:0px; padding-top:5px;" rules="all" cellspacing="0" cellpadding="0">
            <tbody><tr height="22px"><td align="center">${f}</td></tr></tbody></table>`;
        }
    })
    p14 = `<td width="56px" align="center">` + p14 + `</td>`;

    var p15 = '';
    e[15].forEach((f,index)=>{
        if(index==e[15].length-1){
            p15 += `<div style="height:22px;vertical-align:middle;padding-top:5px">${f}</div>`;
        }else{
            var q= f.split('.');
            p15 += `<table class="body-table" style="border-collapse: collapse;border-right:0px; border-bottom:0px; padding-top:5px;" rules="all" cellspacing="0" cellpadding="0">
            <tbody><tr height="22px"><td align="center">${f}</td></tr></tbody></table>`;
        }
    })

    p15 = `<td width="80px" align="center">` + p15 + `</td>`;

    var p16 = '';
    e[16].forEach((f,index)=>{
        if(index==e[16].length-1){
            p16 += `<div style="height:22px;vertical-align:middle;padding-top:5px" onmouseover="ddrivetiptuan('N/A--N/A')" onmouseout="hideddrivetip()">${f}</div>`;
        }else{
            p16 += `<table class="body-table" style="border-collapse: collapse;border-right:0px; border-bottom:0px; padding-top:5px;" rules="all" cellspacing="0" cellpadding="0">
                <tbody><tr height="22px"><td style="font-family:courier;font-size:8pt" onmouseover="ddrivetiptuan('N/A--N/A')" onmouseout="hideddrivetip()">${f}</td></tr></tbody></table>`;
        }
    })
    p16 = `<td align="left" style="font-family:courier;font-size:8pt">` + p16 + `</td>`;

    var p17 = `<td width="40px" align="center"><a href="Default.aspx?page=danhsachsvtheonhomhoc&amp;madk=${e[0]}">DSSV</a></td>`;

    var result = `<table width="100%" class="body-table" style="border-collapse:collapse; border-color:black;" rules="all" border="1" cellspacing="0" cellpadding="0">
        <tbody><tr height="22px">` + first + p11 + p12 + p13 + p14 + p15 + p16 + p17 +`</tr></tbody></table>`;
    return result;
}

function createOptionHtml(tuan) {
  var result = "";
  for (var i = 0; i < 26; i++) {
    if (i == tuan) {
      result += `<option selected="selected" value="${i}">Tuần ${
        i > 10 ? i + 1 : "0" + (i + 1)
      }</option>`;
    } else {
      result += `<option value="${i}">Tuần ${
        i >= 9 ? i + 1 : "0" + (i + 1)
      }</option>`;
    }
  }
  result = optionHtml + result + `</select>`;
  return result;
}

function renderBody(tkb, tuan) {
  var cMatrix = [];
  for (var i = 0; i < 12; i++) cMatrix[i] = [1, 1, 1, 1, 1, 1, 1];

  var listTkb = loctheotuan(tkb, tuan);
  listTkb.forEach((item, index) => {
    var x = item.TietBD;
    var y = item.Thu;
    if (cMatrix[x][y] == 1) {
      // Tạo code. Chuyển các row dưới xuống làm 2
      cMatrix[x][y] = rowHTML(item);
      for (var p = 1; p < item.ST; p++) {
        cMatrix[x + p][y] = 2;
      }
    } else {
      console.log("Trùng lịch tại tuần " + tuan);
    }
  });
  var result = "";
  cMatrix.forEach((itemX, indexX) => {
    var tmp = tietHTML(indexX + 1);
    itemX.forEach((itemY, indexY) => {
      if (itemY == 1) {
        //default
        tmp += `<td style="border-color:Gray;border-width:1px;border-style:solid;height:22px;width:110px;"></td>`;
      } else if (itemY == 2) {
        //Bỏ qua
      } else {
        tmp += cMatrix[indexX][indexY];
      }
    });
    tmp += tietHTML(indexX + 1);
    result += "<tr>" + tmp + "</tr>";
  });

  result += endBody;
  result = tableHtml + thead + "<tbody>" + result + "</tbody></table>";
  return result;
}

function loctheotuan(tkb, tuan) {
  var result = [];

  //Find tuần lớn nhất
  if (tuan == 100) {
    tuan = 0;
    tkb.forEach(item => {
      item[16].forEach((e, index) => {
        if (e.length > tuan) {
          tuan = e.length;
        }
      });
    });
  }

  tkb.forEach(item => {
    item = item.nmh;
    item[16].forEach((e, index) => {
      if (e[tuan] && e[tuan] != "-") {
        var obj = {
          MaMH: item[1],
          TenMH: item[2],
          NMH: item[3],
          TH: item[4],
          STC: item[5],
          STCHP: item[6],
          MaLop: item[7],
          Thu: item[11][index],
          TietBD: item[12][index],
          ST: item[13][index],
          Phong: item[14][index],
          CBGD: item[15][index]
        };
        obj._Thu = obj.Thu;
        obj.Thu = converWeekToNumber(obj.Thu) - 2; //Bắt đầu từ 0
        obj._TietBD = obj.TietBD;
        obj.TietBD = parseInt(obj.TietBD) - 1; // Bắt đầu từ 1
        obj.ST = parseInt(obj.ST);
        obj.STC = parseInt(obj.STC);
        result.push(obj);
      }
    });
  });
  return result;
}

function converWeekToNumber(e) {
  if (e === "Hai") return 2;
  if (e === "Ba") return 3;
  if (e === "Tư") return 4;
  if (e === "Năm") return 5;
  if (e === "Sáu") return 6;
  if (e === "Bảy") return 7;
  if (e === "CN") return 8;
  return null;
}

function ddrivetip(item) {
  var _t = item.MaMH + " nhóm " + item.NMH;
  if (item.TH !== "") {
    _t += " tổ thực hành " + item.TH;
  }
  return `ddrivetip('${item.MaLop}','${item.TenMH}','${_t}','${"Thứ " +
    item._Thu}','${item.STC}','${item.Phong}','${item._TietBD}','${item.ST}','${
    item.CBGD
  }','23/01/2018','23/05/2018','','420','Mã Môn Học-Tên Môn Học-Phòng Học-Thứ-Tiết Bắt Đầu-Số Tiết-Giảng Viên-Bắt Đầu Từ: - Đến -Lớp')`;
}

function tietHTML(tiet) {
  return `<td title="Tiết ${tiet}" align="center" style="color:White;background-color:#6699cc;border-color:Gray;border-width:1px;border-style:solid;height:22px;width:50px;">Tiết ${tiet}</td>`;
}

function rowHTML(item) {
  return `<td onmouseover="${ddrivetip(
    item
  )}" maph="304-A2,123--678901234-678,1,2" onmouseout="hideddrivetip()" rowspan="${
    item.ST
  }" style="background-color:Beige;border-color:Gray;border-width:1px;border-style:solid;height:22px;width:110px;">
        <table cellpadding="0" border="0" cellspacing="0" style="text-align:left;width:90px;cursor:pointer" class="textTable"><tbody><tr><td width="90px">
        <span style="font-style:italic; color:gray">MH :</span>
        <span style="color:Teal">${item.TenMH}..</span>
        </td></tr><tr><td width="90px">
        <span style="font-style:italic; color:gray">PH :</span>
        <span style="color:Teal">${item.Phong}</span>
    </td></tr></tbody></table>
    </td>`;
}
