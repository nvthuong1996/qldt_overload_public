/*
*   Bước 1: Khởi tạo ma trận thời khóa biểu đk
*   Bước 2: Chuyển đổi thời khóa biểu sang dạng index
*   Bước 3: Sinh hoán vị
*   Bước 4: Đánh giá và vẽ biểu đổ
*/

function sinhhoanvi(allNMH){
    
    var cMatrix = matrixCheckTKB(allNMH);
    var tkbIndex = convertTKBtoIndex(allNMH);
    return allPossibleCases(tkbIndex,cMatrix);
}


VIEWTKB = [];



/*
*   Bắt đầu đánh giá
*
*/


/*
loading(true);
setTimeout(() => {
    result = checkRankLv1(NMH);
    veBieuDoLan1((result));
    loading(false);
}, 50);
*/





function vetcanBeta(allNMH){



    if(SELECT.type==1){
        loading(true);
        document.getElementById('ctl00_ContentPlaceHolder1_ctl00_pnlTKB2').innerHTML = "";
        document.getElementById('slTKBSELECT').innerHTML = "";
        setTimeout(() => {
            result = checkRankLv1(allNMH);
            veBieuDoLan2((result));
            loading(false);
            
        }, 50);
    }else if(SELECT.type==0){
        loading(true);
        document.getElementById('ctl00_ContentPlaceHolder1_ctl00_pnlTKB2').innerHTML = "";
        document.getElementById('slTKBSELECT').innerHTML = "";
        setTimeout(() => {
            result = checkRankLv1(allNMH);
            veBieuDoLan4((result));
            loading(false);
            
        }, 50);
    }
}

function veBieuDoLan4(input){
    
    var chartdata  = [['','Số lần đi học','Số lần đến trường','Đi học/đến trường x100','Độ lệch chuẩn time gián đoạn x10','Trung bình max x10','Độ lệch chuẩn time bắt đầu x10','Số buổi đi học 1 kíp','Độ lệch chuẩn số kíp học một ngày']];
    input.sort((a,b)=>{
        return -a.diHoc/a.dentruong+b.diHoc/b.dentruong;
    })
    // Lấy 500 kết quả đẩu tiên
    /*
    *   Hiển thị đề xuất
    *   Show ra 3 kết quả đầu tiên theo chỉ số xanh
    *   Lấy tất cả các chỉ số đầu với độ lệch là 5
    *   sort theo độ lệch chuẩn. lấy 4 kết quả
    *   sort theo cam chọn ra độ lệch chuẩn <0.8 lấy 4 kết quả
    * 
    */
    /*var showResult = [];
    debugger;
    showResult.push(input[0],input[1],input[2]);
    var _tmp=[];
    for(var i=0;i<input.length;i++){
        if(i==0||i==1||i==2)
            continue;

        if(input[i].diHoc-input[0].diHoc<5){
            _tmp.push(input[i]);
        }else{
            break;
        }
    }
    _tmp.sort((a,b)=>{
        return a.dolenhchuan-b.dolenhchuan;
    });

    showResult.push(_tmp.shift(),_tmp.shift(),_tmp.shift());

    _tmp.sort((a,b)=>{
        return -a.diHoc/a.dentruong+b.diHoc/b.dentruong;
    });

    var cc=0;
    for(var i=0;i<_tmp.length;i++){
        if(_tmp[i].dolenhchuan<0.8){
            showResult.push(_tmp[i]);
            cc++;
        }
        if(cc==4) break;
    }

    showTKBDeXuat(showResult);*/




    var soluong =0;
    for(var i=0;i<input.length;i++){
        /*if(input[i].diHoc/input[i].dentruong<0.8)
            continue;*/
        /*var tile;
        if(input[i][0]==0)
            tile=0;
        else
            tile = Math.round(input[i][1]*100/input[i][0]);*/
        
        if(input[i].maxDihoclientucTrungBinh<2.5) continue;
        if(input[i].dolechchuanTimeBatDau>1) continue;


        soluong ++;
        if(soluong<500){

        }else if(input[0].diHoc/input[0].dentruong-input[i].diHoc/input[i].dentruong>0.2){
            break;
        }
        else if(soluong>2000){
            break;
        }
            

        var dolenhchuan = Math.round(input[i].dolenhchuan*100);

        var _sang = input[i].sang/(input[i].sang+input[i].chieu);
        var _chieu = input[i].chieu/(input[i].sang+input[i].chieu);
        var tilethoigian = _sang>_chieu?_sang:_chieu;
        tilethoigian = tilethoigian*100;

        chartdata.push(['',input[i].diHoc,
        input[i].dentruong,
        Math.round(input[i].diHoc*100/input[i].dentruong),
        input[i].dolenhchuanTimeGianDoan*100,
        input[i].maxDihoclientucTrungBinh*10,
        input[i].dolechchuanTimeBatDau*10,
        input[i].sobuoidihoc1kip,
        input[i].dolenhchuan*100,

        input[i].tieuchuanthoigian.value,
        JSON.stringify(input[i].viewTkb)]);
    }
    
    //debugger;

    chartdata.sort((a,b)=>{
        return a[a.length-3]-b[a.length-3];
    });

    chartdata=chartdata.slice(0,500);

    chartdata.sort((a,b)=>{
        return -a[a.length-2]+b[a.length-2];
    });

    chartdata=chartdata.slice(0,100);

    // Show result
    chartdata.sort((a,b)=>{
        return -a[3]+b[3];
    });

    var tmpp = JSON.parse(JSON.stringify(chartdata));
    var showResult = [tmpp[1][tmpp[1].length-1],tmpp[2][tmpp[2].length-1],tmpp[3][tmpp[3].length-1],tmpp[4][tmpp[4].length-1]];
    tmpp.sort((a,b)=>{
        return a[4]-b[4];
    });
    showResult = showResult.concat([tmpp[1][tmpp[1].length-1],tmpp[2][tmpp[2].length-1],tmpp[3][tmpp[3].length-1],tmpp[4][tmpp[4].length-1]]);




    showTKBDeXuat(showResult);
    


    chartdata.sort((a,b)=>{
        return -a[3]+b[3];
    });




    VIEWTKB = [];
    
    chartdata.forEach((item,index)=>{
        var _tkb = chartdata[index][chartdata[index].length-1];
        VIEWTKB[index]=_tkb;
        if(index!=0){
            chartdata[index].pop();
            chartdata[index].pop();
        }
    });

    drawChart(chartdata);
}
function veBieuDoLan2(input){
    
    var chartdata  = [['','Số lần đi học','Số lần đến trường','Đi học/đến trường x100','Độ lệch chuẩn x100','totalKip/diHoc','Max trung bình x10','Độ lệch chuẩn time gián đoạn']];
    input.sort((a,b)=>{
        return a.diHoc-b.diHoc;
    })
    // Lấy 500 kết quả đẩu tiên
    /*
    *   Hiển thị đề xuất
    *   Show ra 3 kết quả đầu tiên theo chỉ số xanh
    *   Lấy tất cả các chỉ số đầu với độ lệch là 5
    *   sort theo độ lệch chuẩn. lấy 4 kết quả
    *   sort theo cam chọn ra độ lệch chuẩn <0.8 lấy 4 kết quả
    * 
    */
    /*var showResult = [];
    debugger;
    showResult.push(input[0],input[1],input[2]);
    var _tmp=[];
    for(var i=0;i<input.length;i++){
        if(i==0||i==1||i==2)
            continue;

        if(input[i].diHoc-input[0].diHoc<5){
            _tmp.push(input[i]);
        }else{
            break;
        }
    }
    _tmp.sort((a,b)=>{
        return a.dolenhchuan-b.dolenhchuan;
    });

    showResult.push(_tmp.shift(),_tmp.shift(),_tmp.shift());

    _tmp.sort((a,b)=>{
        return -a.diHoc/a.dentruong+b.diHoc/b.dentruong;
    });

    var cc=0;
    for(var i=0;i<_tmp.length;i++){
        if(_tmp[i].dolenhchuan<0.8){
            showResult.push(_tmp[i]);
            cc++;
        }
        if(cc==4) break;
    }

    _tmp.sort((a,b)=>{

    });

    showTKBDeXuat(showResult);*/





    var soluong =0;
    for(var i=0;i<input.length;i++){
        /*if(input[i].diHoc/input[i].dentruong<0.8)
            continue;*/
        /*var tile;
        if(input[i][0]==0)
            tile=0;
        else
            tile = Math.round(input[i][1]*100/input[i][0]);*/
        
        //if(input[i].dolechchuanTimeBatDau>1) continue;

        soluong ++;
        if(soluong<500){

        }else if(input[0].diHoc-input[i].diHoc>5){
            break;
        }
        else if(soluong>2000){
            break;
        }

        var dolenhchuan = Math.round(input[i].dolenhchuan*100);

        var _sang = input[i].sang/(input[i].sang+input[i].chieu);
        var _chieu = input[i].chieu/(input[i].sang+input[i].chieu);
        var tilethoigian = _sang>_chieu?_sang:_chieu;
        tilethoigian = tilethoigian*100;

        chartdata.push(['',input[i].diHoc,
        input[i].dentruong,
        Math.round(input[i].diHoc*100/input[i].dentruong),
        input[i].dolenhchuan*100,
        input[i].totalKip/input[i].diHoc,
        input[i].maxDihoclientucTrungBinh,
        input[i].dolenhchuanTimeGianDoan*100,

        JSON.stringify(input[i].viewTkb)]);
    }
    
    //debugger;
    chartdata.sort((a,b)=>{
        return a[1]-b[1];
    });

    var showResult = [chartdata[1][chartdata[1].length-1],chartdata[2][chartdata[2].length-1],chartdata[3][chartdata[3].length-1]];
    chartdata = chartdata.slice(0,200);


    chartdata.sort((a,b)=>{
        return a[7]-b[7];
    });
    chartdata = chartdata.slice(0,100);


    

    var tmpp = JSON.parse(JSON.stringify(chartdata));
    showResult = showResult.concat([tmpp[1][tmpp[1].length-1],tmpp[2][tmpp[2].length-1],tmpp[3][tmpp[3].length-1]]);
    tmpp.shift();
    tmpp.shift();
    tmpp.shift();
    tmpp.sort((a,b)=>{
        return a[4]-b[4];
    });
    var showResult = showResult.concat([tmpp[1][tmpp[1].length-1],tmpp[2][tmpp[2].length-1],tmpp[3][tmpp[3].length-1]]);
    showTKBDeXuat(showResult);




    

    VIEWTKB = [];
    
    chartdata.forEach((item,index)=>{
        var _tkb = chartdata[index][chartdata[index].length-1];
        VIEWTKB[index]=_tkb;
        if(index!=0){
            chartdata[index].pop();
        }
    });

    drawChart(chartdata);
}

function veBieuDoLan1(input){

    // Thời khóa biểu tập trung
    
    var chartdata  = [['','Count gián đoạn','Time gián đoạn','Số lần đi học','Số kip học']];
    input.sort((a,b)=>{
        return a[2]-b[2];
    })
    // Lấy 500 kết quả đẩu tiên
    for(var i=0;i<200;i++){
        var tile;
        if(input[i][0]==0)
            tile=0;
        else
            tile = Math.round(input[i][1]*100/input[i][0]);

        chartdata.push(['',input[i][0],input[i][1],input[i][2],input[i][3],JSON.stringify(input[i][input[i].length-1]),JSON.stringify(input[i][input[i].length-2])]);
    }

    /*chartdata.sort((a,b)=>{
        return a[1]-b[1];
    });*/

    VIEWTKB = [];
    chartdata.forEach((item,index)=>{
        var _tkb = chartdata[index][chartdata[index].length-1];
        var _hv = chartdata[index][chartdata[index].length-2];
        VIEWTKB[index]=[_hv,_tkb];
        if(index!=0){
            chartdata[index].pop();
            chartdata[index].pop();
        }
    });

    drawChart(chartdata);
}


function checkRankLv1(allNMH){
    result =[];
    var allHv = sinhhoanvi(allNMH);

    var length = allHv.length;
    if(Math.round(length*30/425464)>10)
        alert("Ước tính time thực thi: "+Math.round(length*30/425464)+' giây. IF_DEV: Bật Console để theo dõi tiến trình.');

    var tientrinh = 0;
    for(var i=0;i<length;i++){
        if(i*100/length-tientrinh>5){
            tientrinh = Math.round(i*100/length);
            console.log("Đang thực thi: "+tientrinh+" %");
        }

        var tkbBasic = convertIndexToTKB(allHv[i],allNMH);
        var r = rankLv1(tkbBasic);
        if(r)
            result.push(r);
    }
    return result;

}


function rankLv1(tkbBasic){
    // Đầu vào là một hoán vị dạng index
    var _t ={}; // để xem tkb
    tkbBasic.forEach((item)=>{
        _t[item[1]] = item[0];
    })
    var viewTkb = {method:'addtkb',tkb:_t};

    

    // convert tkb sang dạng ma trận đánh dấu
    var _tmp = convertTKBtoMatrixMark(tkbBasic,4);
    if(!_tmp) return null;
    var tkbMatrix = _tmp[0];
    // Convert tkb sang dạng ma trận biểu diễn gián đoạn

    /*
    *   Tính số kip buổi sáng và buổi chiều
    */

    var sang =0,chieu=0,toi=0;
    tkbMatrix.forEach((item,index)=>{
        // true là để phân tách giữa kíp 2 và 3
        var _q = chuyendoitkbtrongngay(item,true);

        tkbMatrix[index] = _q.mt;
        sang += _q.sang;
        chieu += _q.chieu;
        toi += _q.toi;
    });

    
    /*
    *   Tính tổng số lần gián đoạn, tổng số thời gian gián đoạn
    *   Thời gian gián đoạn trung bình, số ngày đi học
    *   Tổng số kíp học, độ lệch chuẩn, trung bình kíp học/ngày
    *   Trung bình mỗi tuần đi học mấy buổi
    *   Sáng chiều, số ngày đi học liên tục
    *   Đi học liên tục. đây là tham số biều diễn số lần các ngày đi học liên tục
    *   Gồm 2 tham số
    *   Độ lệch chuẩn của sum time gián đoạn
    *   Độ lệch chuẩn thời gian bắt đầu
    *   Số buổi đi học 1 kíp
    * 
    */

    var d_timebatdau = [];
    var sobuoidihoc1kip =0;


    var sumGD = 0,sumTimeGD = 0,diHoc=0,totalKip = _tmp[1];
    var s_timegiandoan = [];

    var soluongkiptungngay =[];
    var dihoctren1tuan = [];
    var _c =0,moc = 6;
    var dentruong = 0; //time gián đoạn >3h thì tính thêm 1 lần tới trường
    var dihoclientuc = [];
    var c_dihoclientuc = 0;
    var index_Tuan = 0;
    var maxDihoclientucTrongTuan = [];

    for(var j=0;j<tkbMatrix.length;j++){
        if(j%7==0)
            index_Tuan ++;

        item = tkbMatrix[j];
        if(!item) {
            if(c_dihoclientuc!=0){
                dihoclientuc.push(c_dihoclientuc);
                maxDihoclientucTrongTuan=_pushTuan(index_Tuan,c_dihoclientuc,maxDihoclientucTrongTuan);
                c_dihoclientuc = 0;
            }
            continue;
        }
        c_dihoclientuc++;

        // Tính số buổi di học 1 kíp
        if(tkbMatrix[j].length==1&tkbMatrix[j][0].sokip==1)
            sobuoidihoc1kip++;

        d_timebatdau.push(tkbMatrix[j][0].kc*2);
        if(j>moc){
            dihoctren1tuan.push(_c);
            c=0;
            moc += 7;
        }
        _c++;

        soluongkiptungngay.push(item[0].sokip);

        diHoc++;

        // đến trường được ++
        dentruong++;

        var _ttt=0;

        for(var i=1;i<item.length;i++){
            sumTimeGD += item[i].kc;
            _ttt += item[i].kc;
            soluongkiptungngay[soluongkiptungngay.length-1] += item[i].sokip;


            // tính đến trường chèn vào đây. tính từ i =1 và nếu kc >= 1.5 thì phải đến trường lần nữa
            /*
            *   Phát triển thêm hàm tính đến trường ở đây
            *   
            */
            if(item[i].kc>=1){
                dentruong++;

                // Nếu kc = 1 mà lại học >2 kíp thì tính 1 lần đến trường
                if(item[i].kc==1&&item[i-1].sokip>1){
                    dentruong--;
                }
            }
                

        }
        s_timegiandoan.push(_ttt);
        sumGD += item.length-1;
    }

    // Tuần cuối cùng
    if(c_dihoclientuc!=0){
        dihoclientuc.push(c_dihoclientuc);
        maxDihoclientucTrongTuan=_pushTuan(index_Tuan,c_dihoclientuc,maxDihoclientucTrongTuan);
        c_dihoclientuc = 0;
    }

    dihoctren1tuan.push(_c);

    dihoctren1tuan = dihoctren1tuan.reduce((e,item)=>{
        return e+item;
    },0)/dihoctren1tuan.length;


    // Áp dụng công thức tính đọ lệch chuẩn

    var trungbinh = totalKip/diHoc;
    var _tt = soluongkiptungngay.map((e)=>{
        return (e-trungbinh)*(e-trungbinh);
    });

    var phuongsai = _tt.reduce((e,item)=>{
        return e+item;
    },0)/(_tt.length-1);

    var dolenhchuan = Math.sqrt(phuongsai);


    /*
    *   Tính độ lệch chuẩn của đi học liên tục
    *
    */
    var d_tb = dihoclientuc.reduce((e,f)=>{
        return f+e;
    },0)/dihoclientuc.length;

    var d_phuongsai = dihoclientuc.map((e)=>{
        return (e-d_tb)*(e-d_tb);
    }).reduce((g,f)=>{
        return g+f;
    },0)/(dihoclientuc.length-1);

    var d_lechchuan = Math.sqrt(d_phuongsai);

    var d_dihoclientuc = {
        tb:d_tb,
        phuongsai:d_phuongsai,
        dolenhchuan:d_lechchuan
    }

    /*
    *   Tính độ lệch chuẩn của time bắt đầu
    * 
    */

    var t_tb = d_timebatdau.reduce((e,f)=>{
        return f+e;
    },0)/d_timebatdau.length;

    var t_phuongsai = d_timebatdau.map((e)=>{
        return (e-t_tb)*(e-t_tb);
    }).reduce((g,f)=>{
        return g+f;
    },0)/(d_timebatdau.length-1);

    var t_lechchuan = Math.sqrt(t_phuongsai);




    /*
    *   Ta đã tính max liên tục từng tuần một bjo t sẽ return ra một giá trị trung bình
    * 
    */

    var m_tb = 0;
    maxDihoclientucTrongTuan.forEach((item)=>{
        m_tb += item.max;
    });

    m_tb=m_tb/maxDihoclientucTrongTuan.length;

    /*
    *   Tính độ lệch chuẩn của sum time gian đoạn
    * 
    */

    var s_tb = s_timegiandoan.reduce((e,f)=>{
        return e+f;
    },0)/s_timegiandoan.length;

    var phuongsaiTimeGianDoan = s_timegiandoan.map((e)=>{
        return (e-s_tb)*(e-s_tb);
    }).reduce((g,h)=>{
        return g+h;
    },0)/(s_timegiandoan.length-1);

    var dolenhchuanTimeGianDoan = Math.sqrt(phuongsaiTimeGianDoan);
    /*
    *   Loại bỏ các tkb cảm tưởng không khả thi
    *
    *
    */

    /*if(m_tb<3)
        return null;*/

    /*
    *   return ra cả tkb để xem. luôn return ở cuối
    *
    */
    var _sang = sang/(sang+chieu+toi);
    var _chieu = chieu/(sang+chieu+toi);
    var _toi = toi/(sang+chieu+toi);
    var tieuchuanthoigian =  {};
    if(_sang>_chieu&&_sang>_toi){
        tieuchuanthoigian = {value:_sang,type:'sang'};
    }else if(_chieu>_sang&&_chieu>_toi){
        tieuchuanthoigian={value:_chieu,type:'chieu'};
    }else if(_toi>_sang&&_toi>chieu){
        tieuchuanthoigian={value:_toi,type:'toi'};
    }

    return {
        sumGD:sumGD,
        sumTimeGD:sumTimeGD,
        diHoc:diHoc,
        totalKip:totalKip,
        phuongsai:phuongsai,
        dolenhchuan:dolenhchuan,
        viewTkb:viewTkb,
        sang:sang,
        chieu:chieu,
        toi:toi,
        dentruong:dentruong,
        tieuchuanthoigian:tieuchuanthoigian,
        dihoclientuc:d_dihoclientuc,
        maxDihoclientucTrungBinh:m_tb,
        dolenhchuanTimeGianDoan:dolenhchuanTimeGianDoan,
        dolechchuanTimeBatDau:t_lechchuan,
        sobuoidihoc1kip:sobuoidihoc1kip
    };

}

function _pushTuan(tuan,value,arr){
    /*
    *   Hàm này nhận vào tham số đó là tuần và value
    * 
    */
   var check =true;
   for(var i=0;i<arr.length;i++){
       if(arr[i].tuan==tuan){
           check =false;
            if(arr[i].max<value){
                arr[i].max=value;
            }
            break;
       }
   }
   if(check){
       arr.push({tuan:tuan,max:value});
   }
   return arr;
}





function allPossibleCases(arr,DK) {
    /*
    *   Đầu vào là tkb dạng index và điều kiện
    */

    if (arr.length === 0) {
        return [];
    } 
    else if (arr.length ===1){
        return arr[0];
    }
    else {
        var result = [];
        var allCasesOfRest = allPossibleCases(arr.slice(1),DK);
        for (var c=0;c<allCasesOfRest.length;c++) {
            for (var i = 0; i < arr[0].length; i++) {
                if(typeof allCasesOfRest[c]=='number'){
                    if(DK[arr[0][i]][allCasesOfRest[c]]) 
                        continue;

                    result.push([arr[0][i] , allCasesOfRest[c]]);
                }else{
                    var check =false;
                    for(var t=0;t<allCasesOfRest[c].length;t++){
                        if(DK[arr[0][i]][allCasesOfRest[c][t]]) {
                            check = true;
                            break;
                        }
                    }
                    if(check) continue;
                        result.push([arr[0][i] , ...allCasesOfRest[c]]);
                }
            }
        }
        return result;
    }
}



