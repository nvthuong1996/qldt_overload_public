const AppData = require("../appdata");

module.exports = {
  convertBasic,
  cacheLichDk,
  checkTKB,
  renderDSDK,
  createResFromNMH,
  renderSelectMh,
  findMonHoc
};

function renderSelectMh(body,dkmh, dkLoc) {
  // Kiểm tra môn học này được đăng kí chưa
  for (let mh of dkmh) {
    if (mh.maMH === dkLoc) {
      const match = new RegExp(`style=''.{0,200}chk_${mh.maDK}.`).exec(
        body
      );
      if (!match)
        console.log(
          "Render select môn học bị sai. DKMH.js function : renderSelectMh"
        );
      else {
        let _t = match[0];
        _t =
          _t.replace(`style=''`, `style='background-color:#CCCCCC'`) +
          " checked";
        body = body.replace(match[0], _t);
      }
    }
  }
  return body;
}

function createResFromNMH(nmh) {
  let result;
  if (AppData.LICHDK && AppData.LICHDK[nmh]) {
    const r = AppData.LICHDK[nmh].reduce((e, f) => {
      return e + f[17];
    }, "");
    result = { value: r };
  } else {
    result = { value: "Không thể tải dữ liệu" };
  }
  return JSON.stringify(result);
}

function checkTKB(lichHoc, maMH, maDK) {
  const result = {};
  lichHoc.forEach(element => {
    if (element.maMH === maMH) {
      result.oldMDK = element.maDK;
    }
  });

  let oldTKB = [];
  let monhocMoi = {};
  if (result.oldMDK) {
    oldTKB = lichHoc.filter((e)=>{
      return e.maMH !== maMH;
    })
    const obj = {};
    obj.maMH = maMH;
    obj.state = "vuachon";
    obj.maDK = maDK;
    monhocMoi = obj;
  } else {
    oldTKB = lichHoc;
    monhocMoi = {
      maMH,
      maDK,
      state: "vuachon"
    }
  }


  const dataOldTKB = findMonHoc(oldTKB, AppData.LICHDK).map(e => {
    return e.nmh;
  });

  const dataNewTKB = findMonHoc([monhocMoi], AppData.LICHDK).map(e => {
    return e.nmh;
  });

  const isTrungTKB = checkTrungTKBVer2(dataOldTKB,dataNewTKB);

  result.state = isTrungTKB;

  if(result.state.error){
    return { result, lichmoi:[... oldTKB] };
  }else{
    return { result, lichmoi:[... oldTKB,monhocMoi] };
  }
}

function renderDSDK(dkmh, allmh) {
  var tkb = findMonHoc(dkmh, allmh);
  var result = "";
  var sumSTC = 0,
    sumSTCHP = 0,
    sumHP = 0;

  tkb.forEach((item, index) => {
    sumSTC += parseInt(item.nmh[5]);
    sumSTCHP += parseInt(item.nmh[6]);
    sumHP += parseInt(item.nmh[5]) * 395000;
    var hp = parseInt(item.nmh[5]) * 395000;
    var _t = `<tr>
          <td style="width: 30px;" valign="middle" align="center">${index +
            1}</td>
          <td style="display:none" valign="middle" align="center">${
            item.nmh[0]
          }</td>
          <td style="width: 56px;" valign="middle" align="center">${
            item.nmh[1]
          }</td>
          <td style="width: 180px;" valign="middle" align="left">&nbsp;${
            item.nmh[2]
          }</td>
          <td style="width: 45px;" valign="middle" align="center">${
            item.nmh[3]
          }</td>
          <td style="width: 45px;" valign="middle" align="center">${
            item.nmh[4]
          }</td>
          <td style="width: 35px;" valign="middle" align="center">${
            item.nmh[5]
          }</td>
          <td style="width: 35px;" valign="middle" align="center">${
            item.nmh[6]
          }</td>
          <td style="width: 80px;" valign="middle" align="right">${hp}&nbsp;₫</td>
          <td style="width: 80px;" valign="middle" align="right">&nbsp;</td>
          <td style="width: 80px;" valign="middle" align="right">${hp}&nbsp;₫</td>
          <td valign="middle" align="left">&nbsp;${
            item.state === "daluu"
              ? "Đã lưu vào CSDL"
              : "Chưa lưu vào CSDL(vừa chọn)"
          }</td>
          <td valign="middle" align="left" style="width: 32px;">
          <input style="" type="checkbox" id="chk_${
            item.nmh[0]
          }" name="chk_xoa" value="${
      item.nmh[0]
    }" onclick="CheckToDelete_CheckedChanged(this)"></td></tr>`;
    result += _t;
  });
  if (tkb.length !== 0) {
    sumHP = format_curency(sumHP);

    result =
      `<table class='body-table' style='border-collapse: collapse; color:Navy;' rules='all' border='1' cellspacing='0' cellpadding='0'>` +
      result +
      `<tr style="font-weight: bold;" height="20px">
          <td valign="middle" align="center" colspan="5">Tổng cộng</td>
          <td valign="middle" align="center">${sumSTC}</td>
          <td valign="middle" align="center">${sumSTCHP}</td>
          <td valign="middle" align="right">${sumHP}&nbsp;₫</td>
          <td valign="middle" align="right">00&nbsp;</td>
          <td valign="middle" align="right">${sumHP}&nbsp;₫</td>
          <td valign="middle" align="left"></td>
          <td valign="middle" align="center"></td>
          <td valign="middle" align="center"></td>
          <td valign="middle" align="center"></td>   
          <td valign="middle" align="center"></td></tr>` +
      `</table>`;
  }
  return result;
}

function format_curency(a) {
  return a.toString().replace(/(\d)(?=(\d{3})+(?!\d))/g, "$1,");
}

function checkTrungTKBVer2(oldTKB,addMh){
  try{
    const {result,isTrung} = SerializationTKB(oldTKB);
    
    if(isTrung){
      return {error:"Có lỗi khi thực thi. Vui lòng báo cho admin. Error: Hàm kiểm tra trùng có lỗi"};
    }

    const checkTrung = SerializationTKB(addMh,result);
    if(checkTrung.error){
      return {
        error: checkTrung.error
      }
    }

    if(checkTrung.isTrung){
      // phai xu ly trung tkb o day
      const arrayTrung = checkTrung.trungTKB;

      const xulyTrung = [];
      const skTrung = arrayTrung.length/2;

      let check = 0;

      while(arrayTrung.length>0){
        check ++;
        if(check === 1000){
          return {error:"Có lỗi khi thực thi. Vui lòng báo cho admin. Error: Vòng lặp vượt qua giới hạn"};
        }

        let i;
        for(i=0;i<arrayTrung.length;i++){
          if(arrayTrung[i+1] && (arrayTrung[i].x === arrayTrung[0].x) && (arrayTrung[i+1].y - arrayTrung[i].y === 1)){
            continue;
          }else{
            break;
          }
        }
        const stTrung = i+1;
        const obj = {stTrung,data:arrayTrung[0]};
        xulyTrung.push(obj);

        let j = i + 1;
        while(j>0){
          arrayTrung.shift();
          j -- ;
        }
      }
      let error = `Môn học bạn vừa chọn bị trùng ${skTrung} kíp, ${xulyTrung.length} buổi học. Tiết trùng đầu tiền ở tuần thứ: ${xulyTrung[0].data.tuanthu + 1}. vào thứ: ${xulyTrung[0].data.ngay}. tiết bắt đầu: ${xulyTrung[0].data.tietbd}. với môn: ${xulyTrung[0].data.maMH}`;
      return {error}
    }

    return false;
  }catch(error){
    console.log(error);
    return {
      error:error.toString()
    }
  }
}

function SerializationTKB(tkb,arr){
  // chuyen về dạng ma trận

  const result = arr || [];
  const trungTKB = [];
  let isTrung = false;

  if(!arr){
    for (let i = 0; i < 25 * 7; i++) {
      result[i] = [false, false, false, false, false, false,false, false, false, false, false, false,false,false];
    }
  }



  for (let monhoc of tkb) {
    for (let i = 0; i < monhoc[16].length; i++) {
      if (!monhoc[16][i]) {
        return {isTrung:true,error:"Môn học này chưa cập nhập dữ liệu tuần"};
      }
      const days  = monhoc[11];
      const tietbatdaus = monhoc[12];
      const sotiets = monhoc[13];
      const kiphoc  = monhoc[16];

      for (let j = 0; j < kiphoc[i].length; j++) {
        if (kiphoc[i][j] === "-") continue;


        const thu = converWeekToNumber(days[i]) - 2;
        const x = thu + j * 7;
        const y = parseInt(tietbatdaus[i]) - 1;
        const st = parseInt(sotiets[i]);

        for(let k = 0; k<st ;k++){
          if(!result[x]){
            debugger
          }
          if(result[x][y+k] && result[x][y+k].maMH !== monhoc[1]){
            isTrung = true;
            trungTKB.push({
              x,
              y:y+k,
              ngay:days[i],
              tietbd:tietbatdaus[i],
              maMH: result[x][y+k].maMH,
              tuanthu:j
            })
          }else{
            result[x][y+k] = {
              maMH:monhoc[1]
            }
          }
        }
      }
    }
  }
  return {
    isTrung,
    result,
    trungTKB
  };

}

function getMaxLengthTKB(tkb){
  let _t = [];
  tkb.forEach(item => {
    _t = _t.concat(
      item[16].map(k => {
        return k.length;
      })
    );
  });
  return Math.max(..._t);
}

function convertTKBtoMatrixMark(tkb, dk) {
  // TKB là array các môn học.
  // Không push các môn học số lượng kíp >=dk vào đánh giá
  var result = [];
  /*
   *	Khởi tạo mảng
   */
  var _t = [];
  tkb.forEach(item => {
    _t = _t.concat(
      item[16].map(k => {
        return k.length;
      })
    );
  });
  var length = Math.max(..._t);
  for (var i = 0; i < length * 7; i++) {
    result[i] = [false, false, false, false, false, false];
  }

  // Đếm tổng số kíp học
  var total = 0;

  for (var i = 0; i < tkb.length; i++) {
    for (var j = 0; j < tkb[i][11].length; j++) {
      // Xét tuần nào
      if (!tkb[i][16][j]) {
        console.log(
          "Lưu ý: Phỉ xử lý các môn học thiếu tuần: core.js convertTKBtoMatrixMark"
        );
        return 1;
      }
      for (var f = 0; f < tkb[i][16][j].length; f++) {
        //Vị trí môn học đó.

        if (tkb[i][16][j][f] === "-") continue;

        if (dk && parseInt(tkb[i][13][j]) >= dk) continue;

        var thu = converWeekToNumber(tkb[i][11][j]) - 2;
        var x = thu + f * 7;
        var y = (parseInt(tkb[i][12][j]) - 1) / 2;

        var _c = parseInt(tkb[i][13][j]);

        if (_c % 2 === 1) {
          console.log("Không xử lý được môn học số kíp lẻ");
          return 2;
        }

        do {
          //console.log(`${i}  ${j}  ${f} `);
          // Nếu đã set có nghĩa là bị trùng thời khóa biểu
          if (result[x][y]) {
            return 3;
          }
          result[x][y] = true;
          total++;

          _c = _c / 2;
          y++;
        } while (_c !== 1);
      }
    }
  }
  return 0; // Không bị trùng
}

function converWeekToNumber(e) {
  if (e == "Hai" || e == "Mon") return 2;
  if (e == "Ba" || e == "Tue") return 3;
  if (e == "Tư" || e == "Wed") return 4;
  if (e == "Năm" || e == "Thu") return 5;
  if (e == "Sáu" || e == "Fri") return 6;
  if (e == "Bảy" || e == "Sat") return 7;
  if (e == "CN" || e == "Sun") return 8;
  return null;
}

function findMonHoc(tkb, allmh) {
  const result = [];
  for (let i in tkb) {
    const MH = allmh[tkb[i].maMH];
    if (MH) {
      for (let item of MH) {
        if (item[0] === tkb[i].maDK) {
          const _t = {};
          _t["msmh"] = item[1];
          _t["tenmh"] = item[2];
          _t["nmh"] = item;
          _t["state"] = tkb[i].state;
          result.push(_t);
        }
      }
    } else {
      // Xu ly thieu mon hoc
    }
  }
  return result;
}

function cacheLichDk(dkLoc, body) {
  try {
    const result = convertBasic(body);
    AppData.LICHDK[dkLoc] = result;
    const now = new Date().getTime();
    AppData.METADATA.LICHDK[dkLoc] = now;
    return result;
  } catch (ex) {
    throw new Error("Có lỗi khi convert môn học");
  }
}

function convertBasic(item) {
  item = JSON.parse(item).value;
  c = matchTagName(item.replace(/\r|\n/g, ""), "table").map(e => {
    var _t = matchTagName(e, "td", true);
    for (var i = 10; i < _t.length; i++) {
      _t[i] = matchTagName(_t[i], "div", true);
    }
    _t[_t.length - 1] = matchTagName(_t[_t.length - 1], "label", true);

    _t[0] = /chk_(.*?)'/.exec(_t[0])[1];
    _t[1] = _t[1].trim();
    _t[2] = _t[2].replace("&nbsp;", "");
    _t[_t.length] = e;
    _t[_t.length] = new Date().getTime();
    return _t;
  });

  return c;
}

function matchTagName(input, tag, c = false) {
  var result = [];
  var regex = new RegExp(`<${tag} [^>]+>(.*?)</${tag}>`, "g");
  let match = regex.exec(input);
  while (match) {
    if (c) {
      if (match[1] !== "&nbsp;") result[result.length] = match[1];
    } else {
      result[result.length] = match[0];
    }
    match = regex.exec(input);
  }
  return result;
}
