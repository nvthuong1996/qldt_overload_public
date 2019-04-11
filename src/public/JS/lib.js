DEV_NMH = {};

tieuchuanRank().then((e)=>{
	veBieuDoLan4(e);
    /*var r=0,count=0;
    e.forEach((item)=>{

        var sang = item.sang/(item.sang+item.chieu+item.toi);
        var chieu = item.chieu/(item.sang+item.chieu+item.toi);
        var toi = item.toi/(item.sang+item.chieu+item.toi);
        var m =  Math.max(sang,chieu,toi);
        if(m==0) return;
        if(item.dentruong==0) return;
        r+=item.diHoc/item.dentruong;count++;
        console.log('Sáng: '+(item.sang/(item.sang+item.chieu+item.toi))+' Chiều: '+(item.chieu/(item.sang+item.chieu+item.toi))
        +' Tối: '+(item.toi/(item.sang+item.chieu+item.toi)));
    })
    console.log(r/count);*/
})




function tieuchuanRank(filter){
	return loadDSDKMH().then((e)=>{  
        return loadAllMh().then((f)=>{
            var result = [];
            for(var i in e){
                var mssv = i;
                if(filter&&mssv.indexOf(filter)<0){
                    continue;
                }

                if(Object.keys(e[mssv].tkb).length<6)
                    continue;

				
                
                var _t = convertObjToTkB2(e[mssv].tkb,f);
                var r = rankLv1(_t);
                if(r)
                    result.push(r);
			}
			_NMH = f;
			DEV_NMH = f;
            return Promise.resolve(result);
        })
	})
}

function renderLai(){
	SELECT = {};
	SELECT['thu'] = "HaiBaTưNămSáuBảyCN";
	SELECT['time'] = 0;
	SELECT['type'] = 0;
	SELECT['gv']={};
	TKBSELECT = [];
	NMH={};
	LOAD =false;
	var txt;
    var person = prompt("Nhập vào giá trị", "");
    if (person == null || person == "") {
        txt = null;
    } else {
        txt = JSON.parse(person);
    }

    if(txt){
		debugger;
		var e = [];
		for(let value of txt){
			if(DEV_NMH[value]){

				var obj ={};
				obj['msmh'] = value;
				obj['tenmh'] = DEV_NMH[value][0][2];
				obj['nmh'] = DEV_NMH[value];
				e.push(obj);
			}
		}
		e.forEach((item)=>{
			item.nmh.forEach((nmh)=>{
				nmh[18] = gvFromMH(nmh);
			})
		});
		NMH=e;

		_NMH = {};

		NMH.forEach((item)=>{
			_NMH[item.msmh] = item.nmh;
		});
		TKBSELECT = JSON.parse(JSON.stringify(e));
		//render
		var html =`<option selected disabled hidden>Chọn giảng viên</option>`;
		NMH.forEach((item,index)=>{
			SELECT['gv'][item.msmh] = [];
			html += `<option value="${item.msmh}">${item.tenmh}</option>`;
		});
		document.getElementById('ctl00_ContentPlaceHolder1_ctl00_ddlChonNHHK2').innerHTML = html;
		document.getElementById('loading').innerHTML = "";
		LOAD=true;
	}
	
}


function getDKMHSinhVien(mssv){
	mssv = mssv.toUpperCase();
	return loadDSDKMH().then((e)=>{  
        return loadAllMh().then((f)=>{
            if(e[mssv]){
                var _t = convertObjToTkB(e[mssv].tkb,f);
                return Promise.resolve(_t);
            }
        })
	})
}
function loadAllMh(){
	return getData("/dev/allmh.txt").then((e)=>{
		return Promise.resolve(e);
	})
}
function loadDSDKMH(){
	return getData("/dev/dkmh.txt").then((e)=>{
		return Promise.resolve(e);
	})
}
function getData(e){
	return new Promise((resolve,reject)=>{
		var xhttp = new XMLHttpRequest();
		xhttp.onreadystatechange = function() {
		  if (this.readyState == 4 && this.status == 200) {
		    return resolve(JSON.parse(this.responseText));
		  }
		};
		xhttp.open("GET", e, true);
		xhttp.send();
	})
}

function getDKMHSinhVien(mssv){
	mssv = mssv.toUpperCase();
	return loadDSDKMH().then((e)=>{
		if(e[mssv]){
            var _t = convertObjToTkB(e[mssv].tkb,NMH);
            return Promise.resolve(_t);
		}
	})
}
function loadDSDKMH(){
	return getData("/dev/dkmh.txt").then((e)=>{
		return Promise.resolve(e);
	})
}
function getData(e){
	return new Promise((resolve,reject)=>{
		var xhttp = new XMLHttpRequest();
		xhttp.onreadystatechange = function() {
		  if (this.readyState == 4 && this.status == 200) {
		    return resolve(JSON.parse(this.responseText));
		  }
		};
		xhttp.open("GET", e, true);
		xhttp.send();
	})
}