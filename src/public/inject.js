function ShowTatCaTDK_callback(doituongTDK) {
    if (doituongTDK == null)
        document.getElementById("divTDK").innerHTML = textKhongMoMH;
    else
        document.getElementById("divTDK").innerHTML = doituongTDK.value;
    var monHocLoc = document.getElementById("txtMaMH1");
    monHocLoc.value = "";
    var txtKhoa = document.getElementById("txtKhoa");
    if (txtKhoa != null)
        txtKhoa.value = "";
    var txtLop = document.getElementById("txtLop");
    if (txtLop != null)
        txtLop.value = "";
    document.body.style.cursor = 'default';
    setTimeout(()=>{
        $("#divTDK tr").hover(handleHoverMonHoc);
        checkingRequestAPI = {};
        handleHoverMonHoc();
    },500);
}

var checkingRequestAPI = {};
handleHoverMonHoc();
function handleHoverMonHoc(data){
    if(!data){
        $.ajax({
            type: "POST",
            url: "/api/checktrung",
            data: JSON.stringify({}),
            contentType:"text/html; charset=utf-8",
            dataType:"text",
            success: calback_api_checktrung()
        });
        return;
    }
    const value = data.currentTarget.cells[0].children[0].value
    const data2 = value.split("|");
    const maMH = data2[1];
    const maDK = data2[0];
    const curentElement = data.currentTarget;

    if(checkingRequestAPI[maDK]){
        const {result,resData} = checkingRequestAPI[maDK];
        if (result.state.error && curentElement) {
            document.getElementById("warningSelect").innerHTML = result.state.error;
            $(curentElement).addClass("trungtkbclass");
        }else if(curentElement){
            document.getElementById("warningSelect").innerHTML = "";
            $(curentElement).addClass("khongtrungtkbclass");
        }
        renderTKB(resData);
        return;
    }

    
    $.ajax({
        type: "POST",
        url: "/api/checktrung",
        data: JSON.stringify({maMH,maDK}),
        contentType:"text/html; charset=utf-8",
        dataType:"text",
        success: calback_api_checktrung(curentElement,maDK)
    });
}

function calback_api_checktrung (curentElement,maDK){
    const a = function(data,textStatus){
        const element = curentElement;
        if(textStatus!=="success"){
            return;
        }

        


        const {result,resData} = JSON.parse(data);
        if(maDK){
            checkingRequestAPI[maDK] = {result,resData};
        }
        if (result.state.error && curentElement) {
            document.getElementById("warningSelect").innerHTML = result.state.error;
            $(curentElement).addClass("trungtkbclass");
        }else if(curentElement){
            document.getElementById("warningSelect").innerHTML = "";
            $(curentElement).addClass("khongtrungtkbclass");
        }
        renderTKB(resData);
    }
    return a;
}

function renderTKB(resData){
    const {matrixRender} = SerializationTKBMatrixRender(resData);

    const sotiet = [];
    let tuan = -1;
    for(let i = 0;i<matrixRender.length;i++){
        if(i%7 === 0){
            tuan ++;
            sotiet[tuan] = 0;
            
        }
        for(let j=0;j<12;j++){
            if(matrixRender[i][j] && matrixRender[i][j] !== true){
                if(matrixRender[i][j].st === 2){
                    sotiet[tuan] ++ ;
                }
            }
        }
    }
    const arr1 = sotiet.slice(0,5);
    const arr2 = sotiet.slice(11,16);
    const max1 = Math.max(...arr1);
    const max2 = Math.max(...arr2);

    let index1,index2;
    for(let i=0;i<=5;i++){
        if(arr1[i] === max1){
            index1 = i;
            break;
        }
    }

    for(let i=0;i<=5;i++){
        if(arr2[i] === max2){
            index2 = i +11;
            break;
        }
    }

    getHTML(matrixRender,index1,"diemthi1");
    getHTML(matrixRender,index2,"diemthi2");

}

function getHTML(matrixRender,tuan,id){
    let code = `<caption>Tuần ${tuan + 1}</caption>`;
    for(let y =0;y<12;y++){
        let start ;
        if(y%2 === 0 ){
            start = `<tr><td rowspan="2">${y<4?y+7:y+8}h</td>`;
        }else{
            start = `<tr>`;
        }
        for(let x = tuan*7 ;x<tuan*7+7;x++){
            if(matrixRender[x][y]===true){
                continue;
            }
            const st = matrixRender[x][y].st;
            if(matrixRender[x][y]){
                
                start += `<td rowspan="${st}" style="background-color:rgb(40,167,69)"></td>`;
            }else{
                start += `<td></td>`;
            }
        }
        start += `</tr>`;
        code += start;
    }
    code  = `
    <tr>
    <th></th>
    <th>2</th>
    <th>3</th>
    <th>4</th>
    <th>5</th>
    <th>6</th>
    <th>7</th>
    <th>CN</th>
</tr>`+code;
    document.getElementById(id).innerHTML = code;
}

function SerializationTKB(tkb){
    // chuyen về dạng ma trận
  
    const result = [];
    const trungTKB = [];
    let isTrung = false;
  
    for (let i = 0; i < 25 * 7; i++) {
        result[i] = [false, false, false, false, false, false,false, false, false, false, false, false];
    }
    
    for (let maMH in tkb) {
        const monhoc = tkb[maMH]
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

  function SerializationTKBMatrixRender(tkb){
    // chuyen về dạng ma trận
  
    const result = [];
    const trungTKB = [];
    let isTrung = false;
    const matrixRender = [];
  
    for (let i = 0; i < 25 * 7; i++) {
        result[i] = [false, false, false, false, false, false,false, false, false, false, false, false];
    }

    for (let i = 0; i < 25 * 7; i++) {
        matrixRender[i] = [false, false, false, false, false, false,false, false, false, false, false, false];
    }
    
    for (let maMH in tkb) {
        const monhoc = tkb[maMH]
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

          matrixRender[x][y]= {
            st,
            x,
            y:y,
            ngay:days[i],
            tietbd:tietbatdaus[i],
            maMH: maMH,
            tuanthu:j,
          }

          for(let k = 1; k<st ;k++){
            matrixRender[x][y+k]= true;
          }
  
          for(let k = 0; k<st ;k++){
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
      trungTKB,
      matrixRender
    };
  
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
  function toDKSelectedChange(o) {
    document.body.disabled = "false";
    document.body.style.cursor = "wait";
    document.getElementById("IDchk_all").checked = false;
    var arr = o.value.split("|");
    
    var e1 = document.getElementById(arr[1]+"lefttool");
    var e2 = document.getElementById(arr[1]+"righttool");
    if(!e1){
      // bo xung them
      var _tmp = document.getElementById("selectMonHoc_").innerHTML;
      document.getElementById("selectMonHoc_").innerHTML = _tmp + '<option id="'+arr[1]+'lefttool" value="'+arr[1]+'">'+arr[1]+'</option>'
    }
    if(e2){
      // change value
      e2.children[0].value = o.value;
      e2.children[0].id = 'chk_'+arr[0];
    }else{
      //bo xung them
      var _tmp = document.querySelector(".right-tool").innerHTML;
      document.querySelector(".right-tool").innerHTML = _tmp + '<div id="'+arr[1]+'righttool"><input type="checkbox" id="chk_'+arr[0]+'" value="'+o.value+'" onclick="toDKSelectedChange(this)"><span>'+arr[1]+'</span></div>';
    }



    if (!isProcessing) {

        isProcessing = true;
        EduSoft.Web.UC.DangKyMonHoc.DangKySelectedChange(o.checked, arr[0], arr[1], arr[2], arr[3], arr[4], arr[5],
            arr[6], arr[7], arr[8], arr[9], arr[10], arr[11], arr[12],
            toDKSelectedChange_callback);
    }
    else {
        isProcessing = false;
        alert(waitingCheck);
        toggleSelectRow(arr[0], false);
    }
  }

  function selectMonHoc_changed_() {
    var selectmenu = document.getElementById("selectMonHoc_");
    var chosenOption = selectmenu.options[selectmenu.selectedIndex];
    if (chosenOption.value) {
        document.body.style.cursor = 'wait';
        EduSoft.Web.UC.DangKyMonHoc.LocTheoMonHoc(chosenOption.value, ShowTatCaTDK_callback);
    }
  }

  function genCodeInject(){
    var code = "";
    var codeHTML = document.getElementById("tool-support").innerHTML;
    
    code += `var node = document.createElement("div"); 
    node.innerHTML=\`${codeHTML}\`;
    document.getElementsByTagName("body")[0].appendChild(node);
    
    window.selectMonHoc_changed_ = function () {
        var selectmenu = document.getElementById("selectMonHoc_");
        var chosenOption = selectmenu.options[selectmenu.selectedIndex];
        if (chosenOption.value) {
            document.body.style.cursor = 'wait';
            EduSoft.Web.UC.DangKyMonHoc.LocTheoMonHoc(chosenOption.value, ShowTatCaTDK_callback);
        }
    }
    
window.toDKSelectedChange_callback = function (res){if(res.value==""){console.log("OKE");alert("Ngăn cản qldt chuyển hướng website về trang chủ. Chờ một chút là có thể đăng kí tiếp");var e=document.getElementById('divTDK');var f=e.getElementsByTagName('table');for(var i=0;i<f.length;i++){var g=f[i].getElementsByTagName('td')[0].lastChild;if(g.checked){if(g.parentNode.parentNode.style.backgroundColor==''||g.parentNode.parentNode.style.backgroundColor=='White'||g.parentNode.parentNode.style.backgroundColor=='white')
g.checked=!1}}
document.body.disabled="";document.body.style.cursor="default";isProcessing=!1;var input=[1,2,3,4,5];CCC=!1;input.reduce((e,f)=>{return e.then(()=>{return new Promise((resolve,reject)=>{setTimeout(_=>{if(CCC)return resolve();var xhttp=new XMLHttpRequest();xhttp.onreadystatechange=function(){if(this.readyState==4&&this.status==200){CCC=!0;alert("Có thể tiếp tục đăng kí")}};xhttp.open("GET","/Default.aspx?page=dkmonhoc",!0);xhttp.send();resolve()},1000)})})},Promise.resolve());return;self.location="Default.aspx?page=gioithieu"}
else{var isValidCoso=!1;var isValidTKB=!1;var resArr=res.value.split("|");var maDK=resArr[1];if(resArr.length==2){alert(resArr[0]);toggleSelectRow(maDK,!1);document.body.disabled="";document.body.style.cursor="default";isProcessing=!1}
else if(resArr[0]=="IsCheckDangKyTuDong"){alert(resArr[2]);toggleSelectRow(maDK,!1);document.body.disabled="";document.body.style.cursor="default";isProcessing=!1}
else{var isChecked=resArr[2]==1;var oldMaDK=resArr[4];var isVuotTC=resArr[5];var isVuotTCNganh2=resArr[34];var isMHDangKyCungKhoiSV=resArr[35];var MonTQ=resArr[6];var MonSH=resArr[7];var MonDPH=resArr[8];var isTGDK=resArr[28];var xetDienDK=resArr[29];var chuyenNganh1HopLe=resArr[30];var chuyenNganh2HopLe=resArr[31];var monHocRangBuocSTC=resArr[32];var HopLeSTCDuocPhepThayDoi=resArr[33];var hopLeNhomMHTuChon=resArr[36];if(resArr[0]=='dhmxhetx'){if(confirm('Môn học học trực tuyến, tiếp tục đăng ký?')){isValidTKB=!0;toggleSelectRow(maDK,isChecked);if(oldMaDK)
toggleSelectRow(oldMaDK,!1);EduSoft.Web.UC.DangKyMonHoc.LuuVaoKetQuaDangKy(isValidCoso,isValidTKB,resArr[1],resArr[12],resArr[13],resArr[14],resArr[15],resArr[16],isChecked.toString(),oldMaDK,resArr[25],resArr[26],resArr[27],isMHDangKyCungKhoiSV,toDKSelectedChange_callback2)}}
else if(!isChecked&&HopLeSTCDuocPhepThayDoi==0){alert(errorGioiHanSoTCThayDoi);toggleSelectRow(maDK,!0);document.body.disabled="";document.body.style.cursor="default";isProcessing=!1}
else if(isTGDK==0)
{alert(errorOutOffTime);toggleSelectRow(maDK,!1);document.body.disabled="";document.body.style.cursor="default";isProcessing=!1}
else if(isVuotTC==1)
{alert(vuotTC);toggleSelectRow(maDK,!1);document.body.disabled="";document.body.style.cursor="default";isProcessing=!1}
else if(isVuotTCNganh2==1)
{alert("Vượt số tín chỉ tối đa ngoài ngành cho phép!");toggleSelectRow(maDK,!1);document.body.disabled="";document.body.style.cursor="default";isProcessing=!1}
else if(chuyenNganh1HopLe==0){alert(errorChuyenNganhChinh);toggleSelectRow(maDK,!1);document.body.disabled="";document.body.style.cursor="default";isProcessing=!1}
else if(chuyenNganh2HopLe==0){alert(errorChuyenNganhChuyenSau);toggleSelectRow(maDK,!1);document.body.disabled="";document.body.style.cursor="default";isProcessing=!1}
else if(monHocRangBuocSTC==0){alert(errorGioiHanSTC+maDK);toggleSelectRow(maDK,!1);document.body.disabled="";document.body.style.cursor="default";isProcessing=!1}
else if(HopLeSTCDuocPhepThayDoi==0){alert(errorGioiHanSoTCThayDoi);toggleSelectRow(maDK,!1);document.body.disabled="";document.body.style.cursor="default";isProcessing=!1}
else if(hopLeNhomMHTuChon==0){alert("Không được đăng ký môn học thuộc nhóm tự chọn khác nhóm "+resArr[37].toString());toggleSelectRow(maDK,!1);document.body.disabled="";document.body.style.cursor="default";isProcessing=!1}
else if(resArr[21]==1&&resArr[22]==0)
{var mess=resArr[23]=="0"?errorCaiThienDiemD:errorCaiThienHocKy+resArr[23];alert(mess);toggleSelectRow(maDK,!1);document.body.disabled="";document.body.style.cursor="default";isProcessing=!1}
else if(xetDienDK){alert(xetDienDK);toggleSelectRow(maDK,!1);document.body.disabled="";document.body.style.cursor="default";isProcessing=!1}
else if(MonDPH)
{alert(MonDPH);toggleSelectRow(maDK,!1);document.body.disabled="";document.body.style.cursor="default";isProcessing=!1}
else if(MonTQ)
{alert(MonTQ);toggleSelectRow(maDK,!1);document.body.disabled="";document.body.style.cursor="default";isProcessing=!1}
else if(resArr[9]==1)
{if(resArr[17]==1||resArr[17]==3)
{var strAlert;if(resArr[17]==3)
{strAlert=errorMucDoTrungTKB0+resArr[19]+", "+resArr[20]+"% "+errorMucDoTrungTKB1}
else{strAlert=trungTKBChoPhep}
if(confirm(strAlert)){isValidTKB=!0;toggleSelectRow(maDK,!0);if(oldMaDK)
toggleSelectRow(oldMaDK,!1);EduSoft.Web.UC.DangKyMonHoc.LuuVaoKetQuaDangKy(isValidCoso,isValidTKB,resArr[1],resArr[12],resArr[13],resArr[14],resArr[15],resArr[16],isChecked.toString(),oldMaDK,resArr[25],resArr[26],resArr[27],isMHDangKyCungKhoiSV,toDKSelectedChange_callback2)}
else{toggleSelectRow(maDK,!1);document.body.disabled="";document.body.style.cursor="default";isProcessing=!1}}
else{alert(trungTKBKChoPhep);toggleSelectRow(maDK,!1);document.body.disabled="";document.body.style.cursor="default";isProcessing=!1}}
else if(resArr[10])
{if(resArr[11])
{if(confirm(resArr[10])){isValidCoso=!0;toggleSelectRow(maDK,!0);EduSoft.Web.UC.DangKyMonHoc.LuuVaoKetQuaDangKy(isValidCoso,isValidTKB,resArr[1],resArr[12],resArr[13],resArr[14],resArr[15],resArr[16],isChecked.toString(),oldMaDK,resArr[25],resArr[26],resArr[27],isMHDangKyCungKhoiSV,toDKSelectedChange_callback2)}
else{toggleSelectRow(maDK,!1);document.body.disabled="";document.body.style.cursor="default";isProcessing=!1}}
else if(resArr[11]=="1")
{toggleSelectRow(maDK,!1);alert(resArr[10]);document.body.disabled="";document.body.style.cursor="default";isProcessing=!1}}
else if(resArr[24]!="")
{if(resArr[24]=="khongchotrung"){alert(errorTrungLichThiCam);toggleSelectRow(maDK,!1);document.body.disabled="";document.body.style.cursor="default";isProcessing=!1}
else if(resArr[24]=="choluachon"){var strAlert=errorTrungLichThiLuaChon;if(confirm(strAlert)){toggleSelectRow(maDK,!0);if(oldMaDK)
toggleSelectRow(oldMaDK,!1);EduSoft.Web.UC.DangKyMonHoc.LuuVaoKetQuaDangKy(isValidCoso,isValidTKB,resArr[1],resArr[12],resArr[13],resArr[14],resArr[15],resArr[16],isChecked.toString(),oldMaDK,resArr[25],resArr[26],resArr[27],isMHDangKyCungKhoiSV,toDKSelectedChange_callback2)}
else{toggleSelectRow(maDK,!1);document.body.disabled="";document.body.style.cursor="default";isProcessing=!1}}
else{alert(errorTrungLichThiVuot+resArr[24]);toggleSelectRow(maDK,!1);document.body.disabled="";document.body.style.cursor="default";isProcessing=!1}}
else{if(resArr[0]==0){if(MonSH){alert(MonSH)}
toggleSelectRow(maDK,isChecked);EduSoft.Web.UC.DangKyMonHoc.LuuVaoKetQuaDangKy(isValidCoso,isValidTKB,resArr[1],resArr[12],resArr[13],resArr[14],resArr[15],resArr[16],isChecked.toString(),oldMaDK,resArr[25],resArr[26],resArr[27],isMHDangKyCungKhoiSV,toDKSelectedChange_callback2)}
else{toggleSelectRow(maDK,!0);toggleSelectRow(oldMaDK,!1);EduSoft.Web.UC.DangKyMonHoc.LuuVaoKetQuaDangKy(isValidCoso,isValidTKB,resArr[1],resArr[12],resArr[13],resArr[14],resArr[15],resArr[16],isChecked.toString(),oldMaDK,resArr[25],resArr[26],resArr[27],isMHDangKyCungKhoiSV,toDKSelectedChange_callback2)}}}}}
    
    `;

    return code;
  }