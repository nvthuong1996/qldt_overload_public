function LoadDanhSachMonHoc(){
	return new Promise((resolve,reject)=>{
		EduSoft.Web.UC.DangKyMonHoc.LoadDanhSachKhoaLop((doituong)=>{
			if (doituong.value && doituong.value.length > 8 && doituong.value.substring(0, 8) == "BCVTVTHN") {
                doituong = doituong.value.replace("BCVTVTHN", "");
                var maMh = [];
                doituong.match(/Value=\'(.*?)\'/g).map((e)=>{
                	maMh[maMh.length] = /Value=\'(.*?)\'/g.exec(e)[1];
                });
                resolve(maMh);
                
            }else{
            	reject('Khong Load duong danh sach khoa lop');
            }
		})
	})
}

function converWeekToNumber(e){
	if(e=='Hai') return 2;
	if(e=='Ba') return 3;
	if(e=='Tư') return 4;
	if(e=='Năm') return 5;
	if(e=='Sáu') return 6;
	if(e=='Bảy') return 7;
	if(e=='CN') return 8;
	return null;
}

function LoadDangKyMonHoc(){

	return LoadDanhSachMonHoc().then((e)=>{
		let i=0;result=[];
		return new Promise((resolve,reject)=>{
			e.map((item)=>{
				EduSoft.Web.UC.DangKyMonHoc.LocTheoMonHoc(item, (doituongTDK)=>{
					i++;
					result[result.length] = doituongTDK.value;
					if(i==e.length){
						resolve(result);
					}
				});
			})
		})
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



function syncData(){
	LoadMonHocOnline().then((e)=>{
		var xhttp = new XMLHttpRequest();
		xhttp.open("POST", "http://www.vnpost.ga/upload/index.php", true);
		xhttp.send(JSON.stringify(e));
		alert('Dùng idm tải xuống file: http://www.vnpost.ga/upload/bot.txt');
	})
}

function pushData(e){
	var xhttp = new XMLHttpRequest();
	xhttp.open("POST", "/upload", true);
	xhttp.send(JSON.stringify(e));
}



function LoadMonHocOffline(){
	//Che do dev
	return getData("/dev/d.txt").then((e)=>{
		return Promise.resolve(e);
	});
}

function LoadMonHocOnline(){
	return LoadDangKyMonHoc().then((e)=>{
		return convertBasic(e);
	}).then((e)=>{
		return Promise.resolve(e);
	});
}





function convertBasic(e){
	var index =0;
	var c = e.map((item)=>{
		c = matchTagName(item.replace(/\r|\n/g,''),'table').map((e)=>{
			var _t = matchTagName(e,'td',true);
			for(var i=10;i<_t.length;i++){
				_t[i] = matchTagName(_t[i],'div',true);
			}
			_t[_t.length-1] = matchTagName(_t[_t.length-1],'label',true);

			_t[0] = /chk_(.*?)\'/.exec(_t[0])[1];
			_t[2] = _t[2].replace('&nbsp;','');
			_t[_t.length] = e;
			return _t;
		});
		var t = {};
		t['msmh'] = c[0][1];
		t['tenmh'] = c[0][2];
		t['nmh'] = c;
		t['index']= index;
		index += c.length;
		return t;
	})
	return Promise.resolve(c);	
}


function matchTagName(input,tag,c=false){
	var result=[];
	var regex = new RegExp(`<${tag} [^>]+>(.*?)<\/${tag}>`,'g');
	while (match = regex.exec(input)) {
	    if(c){
	    	if(match[1]!='&nbsp;')
	    		result[result.length] = match[1];
	    }else{
	    	result[result.length] = match[0];
	    }
	}
	return result;
}

function matchKhoiLop(input){
	var check=true;
	var result=[];
	var regex = new RegExp(`>(.*?)<\/option>`,'g');
	while (match = regex.exec(input)) {
		if(check) {
			check=false;
			continue;
		}
		result.push(match[1]);
	}
	return result;
}

tttt=[];

function loadAllMhOnline(){
	let result =[];
	let i=0;
	return new Promise((resolve,reject)=>{
		EduSoft.Web.UC.DangKyMonHoc.LoadChuongTrinhDaoTaoKhoiLop((e)=>{
			var r = matchKhoiLop(e.value);
			console.log(r.length);
			r.forEach((item)=>{
				EduSoft.Web.UC.DangKyMonHoc.LocTheoCTDTKhoiLop(item,(doituongTDK)=>{
					i++;
					if(doituongTDK.value.length<100){
						return;
					}
					result[result.length] = doituongTDK.value;
					tttt = result;
					console.log("Checking: "+i+' - '+r.length);
					if(i==r.length){
						resolve(convertBasicAllMh(result));
					}
				})
			})
		})
	})
}



function convertBasicAllMh(e){

	var result ={};
	var c = e.map((item)=>{
		c = matchTagName(item.replace(/\r|\n/g,''),'table').map((e)=>{
			var _t = matchTagName(e,'td',true);
			for(var i=10;i<_t.length;i++){
				_t[i] = matchTagName(_t[i],'div',true);
			}
			_t[_t.length-1] = matchTagName(_t[_t.length-1],'label',true);
			_t[0] = /chk_(.*?)\'/.exec(_t[0])[1];
			_t[2] = _t[2].replace('&nbsp;','');
			_t[_t.length] = e;
			return _t;
		});
		for(var item of c){
			var cc=false;
			for(i in result){
				if(i==item[1]){
					cc=true;
					// Mon hoc nay da co
					var c=false;
					result[i].forEach((j)=>{
						if(j[0]==item[0]){
							//Da push roi
							c=true;
						}
					})
					if(!c){
						result[i].push(item);
						continue;
					}
				}
			}
			if(!cc){
				result[item[1]]=[];
				result[item[1]].push(item);
			}
		}
	})
	return Promise.resolve(result);	
}


function uploadAllMonHoc(){
	loadAllMhOnline().then((e)=>{
		pushData(e);
		return Promise.resolve(e);
	})
}

function loadDSDKMH(){
	return getData("/dev/dkmh.txt").then((e)=>{
		return Promise.resolve(e);
	})
}

function loadAllMh(){
	return getData("/dev/allmh.txt").then((e)=>{
		return Promise.resolve(e);
	})
}


function getDKMHSinhVien(mssv,type){
	mssv = mssv.toUpperCase();
	return loadDSDKMH().then((e)=>{
		if(e[mssv]){
			return loadAllMh().then((f)=>{
				var _t = e[mssv];
				_t.tkb = findMonHoc(_t.tkb,f);
				if(type==1)
					return Promise.resolve(_t);
				else if(type==2){
					_t.tkb= _t.tkb.map((e)=>{
						e.nmh = serializeTKB(e.nmh);
						return e;
					});
					return Promise.resolve(_t);
				}else if(type==3){
					_t.tkb= _t.tkb.reduce((f,e)=>{
						e.nmh = serializeTKB(e.nmh);
						return f.concat(e.nmh);
					},[]);
					_t.tkb.sort((a,b)=>{
						return a.index-b.index;
					})
					return Promise.resolve(_t);
				}
			})
		}
	})
}


function countSLDTSerialize(tkb){
	var count = 1;
	var count2 = 1;
	var count3 = 0;
	var count4 = 0;
	var count5 = 0; //So ngay di hoc lien tuc

	var check =tkb[0].index+(6 - tkb[0].index % 6);
	if((tkb[0].index-1)%6<2){
		count3++;
	}else{
		count4++;
	}
	var isSat =false;

	for(var i =0; i<tkb.length-1;i++){

		// Test result
		/*if(tkb[i+1].index>84) {
			if(isSat){
				count5++;
			}
			break;
		};*/

		if(tkb[i+1].index>check){

			count2++;
			check = tkb[i+1].index+(6 - tkb[i+1].index % 6);
		}

		if((tkb[i+1].index-1)%6<2){
			count3++;
		}else{
			count4++;
		}

		if((tkb[i+1].index-1)%6==0){
			count++;
			continue;
		}

		if(tkb[i+1].index-tkb[i].index==1){
			continue ;
		}
		count ++;

	}

	var sotiethoc = []; //mang so tiet hoc/ ngay
	for(var i=0;i<tkb.length;i++){
		var check =tkb[i].index+(6 - tkb[0].index % 6);
		var lientuc =0;
		var tiet =0;
		while(i<tkb.length){
			if(tkb[i].index<=check){
				i++;
				tiet++;
				continue;
				
			}
			
			sotiethoc.push(tiet);
			tiet=0;

			if(tkb[i].index-check<7){
				lientuc++;
				var check =tkb[i].index+(6 - tkb[i].index % 6);
			}else{
				i--;
				break;
			}
		}
		if(lientuc==1){
			count5+=1;
		}else{
			count5 = count5+lientuc+1;
		}
		lientuc=0;
	}

	var s=0;
	var p =tkb.length/count2;
	for(var k=0;k<sotiethoc.length;k++){
		s += sotiethoc[k]-p>0?sotiethoc[k]-p:p-sotiethoc[k]
	}

	s=s/sotiethoc.length;

	return [count,count2,count3,count4,tkb.length/count2,count5,s];
}

function TESTBIEUDO(arr){
	data_chart=[];
	var _t={};
	for(var q=0;q<arr.length;q++){

		var mdk=[];
		_t['tkb'] = arr[q].map((a)=>{
			return getMHformIndex(TKB['serialize'],a);
		})
		_t.tkb= _t.tkb.reduce((f,e)=>{
			mdk.push(e[0].mdk);
			return f.concat(e);

		},[]);
		_t.tkb.sort((a,b)=>{
			return a.index-b.index;
		})
		var check_count =countSLDTSerialize(_t.tkb);
		t=check_count[0];
		if(check_count[5]>check_count[1]) debugger;
		var preSang = Math.round(check_count[2]*100/(check_count[2]+check_count[3]))/100;
		var preChieu = Math.round(check_count[3]*100/(check_count[2]+check_count[3]))/100;
		//if(preSang<0.8&&preChieu<0.8) continue;
		//if(Math.round(check_count[1]*100/t)<90) continue;
		if(check_count[4]<1.5)	continue;
		data_chart.push([JSON.stringify(mdk),t,check_count[1],preSang,preChieu,check_count[4],check_count[5],check_count[6]]);
	}
	data_chart.sort((a,b)=>a[1]-b[1]);
	data_chart=data_chart.slice(0,100);
	data_chart.sort((a,b)=>a[2]-b[2]);
	data_chart.unshift(['mssv','Số lần đến trường','%dentruong/dihoc','Kíp học/ngày','đihoclientuc/dihoc','Sô ngày đi học','d7'])
	for(var i=1;i<data_chart.length;i++){
		DSSV[i-1]=data_chart[i][0];
		var _tmp =data_chart[i][2];
		data_chart[i][0]=''+data_chart[i][2]+'/'+data_chart[i][1]+'/'+i+'/'+Math.round(data_chart[i][2]*100/data_chart[i][1])/100+'-'+ data_chart[i][3]+'/'+data_chart[i][4];
		data_chart[i][2]=Math.round(data_chart[i][2]*100/data_chart[i][1]);
		data_chart[i][3] = data_chart[i][5]*10;
		data_chart[i][4] = Math.round(data_chart[i][6]*100/data_chart[i][2]);
		data_chart[i][5] = _tmp;
		data_chart[i][6] = Math.round(data_chart[i][7]*100);
		data_chart[i][1] += 100;
		data_chart[i].pop();
		
	}
	drawChart(data_chart);

}


function testTrungTKBAllSv(){
 	data_chart=[];
 	//data_chart.push(['mssv','Char1'])
 	DSSV =[];
	loadDSDKMH().then((e)=>{
		return loadAllMh().then((f)=>{
			for(mssv in e){
				var _t = e[mssv];
				var mdk=[];
				_t.tkb = findMonHoc(_t.tkb,f);
				if(_t.tkb.length<5) continue;
				_t.tkb= _t.tkb.reduce((f,e)=>{
					e.nmh = serializeTKB(e.nmh);
					if(e.nmh[0])
						mdk.push(e.nmh[0].mdk);
					return f.concat(e.nmh);
				},[]);
				_t.tkb.sort((a,b)=>{
					return a.index-b.index;
				})
				if(mssv=='B14DCCN083') debugger;
				var check_count =countSLDTSerialize(_t.tkb);
				//if(check_count[5]>check_count[1]) debugger;
				t=check_count[0];

				if(t==0) continue;
				if(t==118)
					console.log(mssv);
				//console.log(mssv+": "+ t);
				var preSang = Math.round(check_count[2]*100/(check_count[2]+check_count[3]))/100;
				var preChieu = Math.round(check_count[3]*100/(check_count[2]+check_count[3]))/100;
				if(preSang<0.8&&preChieu<0.8) continue;
				if(Math.round(check_count[1]*100/t)<90) continue;
				if(check_count[4]<1.5)	continue;
				data_chart.push([JSON.stringify(mdk),t,check_count[1],preSang,preChieu,check_count[4],check_count[5],check_count[6]]);

			}
			data_chart.sort((a,b)=>a[1]-b[1]);
			data_chart.unshift(['mssv','Char1','Char2','Char3','Char4','Chart5'])
			for(var i=1;i<data_chart.length;i++){
				DSSV[i-1]=data_chart[i][0];
				data_chart[i][0]=''+data_chart[i][2]+'/'+data_chart[i][1]+'/'+i+'/'+Math.round(data_chart[i][2]*100/data_chart[i][1])/100+'-'+ data_chart[i][3]+'/'+data_chart[i][4];
				data_chart[i][2]=Math.round(data_chart[i][2]*100/data_chart[i][1]);
				data_chart[i][3] = data_chart[i][5]*10;
				data_chart[i][4] = Math.round(data_chart[i][6]*100/data_chart[i][2]);
				data_chart[i][5] = Math.round(data_chart[i][7]*100);
				data_chart[i].pop();
				data_chart[i].pop();
			}

			drawChart(data_chart);

		})

	})
}


function isTrungTKBAllSv(){
	var count =0;
	loadDSDKMH().then((e)=>{
		return loadAllMh().then((f)=>{
			for(mssv in e){
				var _t = e[mssv];
				_t.tkb = findMonHoc(_t.tkb,f);
				if(isTrungTKBSV(_t)){
					console.log('Trung: '+mssv);
					count ++;
				}
			}
			console.log('Số lượng trùng: '+count);
		})

	})
}

function isTrungTKBSV(e){
	e.tkb= e.tkb.map((e)=>{
		e.nmh = serializeTKB(e.nmh);
		return e;
	});
	for(var i=0;i<e.tkb.length;i++){
		for(var j=0;j<e.tkb.length;j++){
			if(i==j) continue;
			if(isTrungSerialize(e.tkb[i].nmh,e.tkb[j].nmh)){
				return true;
			}
		}
	}
	return false;
}

function findMonHoc(tkb,allmh){
	var result = [];
	for(var i in tkb){
		if(allmh[i]){
			allmh[i].forEach((item)=>{
				if(item[0]==tkb[i]){
					var _t ={};
					_t['msmh'] = item[1];
					_t['tenmh'] = item[2];
					_t['nmh'] = item;
					result.push(_t);
				}
			})
		}else{
			console.log('Thieu mon mon hoc');
		}
	}
	return result;
}

function loadDKMHSaveOffline(){
	var result={};
	var count =0;
	getData("/dev/allmh.txt").then((e)=>{
		for(var i in e){
			e[i].forEach((item)=>{
				count++;
				console.log(count);
				var msmh = item[0];
				var xhttp = new XMLHttpRequest();
				xhttp.open("GET", '/Default.aspx?page=danhsachsvtheonhomhoc&madk='+msmh, false);
				xhttp.send();
				result = DSSV(xhttp.responseText,result,msmh,i);

			});
		}
		pushData(result);
		console.log('Xong');
	});
}

function DSSV(input,data,msmh,nmh){

	input = input.replace(/\n|\r/,'');
	var check=true;
	var result=[];
	result[0] = [];
	result[1] = [];
	result[2] = [];
	result[3] = [];

	// Khớp mã sinh viên
	var regex = new RegExp(`<span id="ctl00_ContentPlaceHolder1_ctl00_gvDSSinhVien_ctl.._lblGridMaSV" class="Label">(.*?)<`,'g');
	while (match = regex.exec(input)) {
		result[0].push(match[1]);
	}

	// Khớp Họ Lót
	var regex = new RegExp(`<span id="ctl00_ContentPlaceHolder1_ctl00_gvDSSinhVien_ctl.._lblGridHoLotSV" class="Label">(.*?)<`,'g');
	while (match = regex.exec(input)) {
		result[1].push(match[1]);
	}

	// Khớp Tên
	var regex = new RegExp(`<span id="ctl00_ContentPlaceHolder1_ctl00_gvDSSinhVien_ctl.._lblGridTenSV" class="Label">(.*?)<`,'g');
	while (match = regex.exec(input)) {
		result[2].push(match[1]);
	}

	// Khớp Tên Lớp
	var regex = new RegExp(`<span id="ctl00_ContentPlaceHolder1_ctl00_gvDSSinhVien_ctl.._lblGridMaLop" class="Label">(.*?)<`,'g');
	while (match = regex.exec(input)) {
		result[3].push(match[1]);
	}
	result[0].forEach((item,index)=>{
		var c= true;
		if(data[item]){
			data[item].tkb[nmh]=msmh;
		}else{
			data[item]={holot:result[1][index],ten:result[2][index],tenlop:result[3][index],tkb:{}};
			data[item].tkb[nmh]=msmh;
		}
	})
	return data;
}

function allPossibleCases(arr) {
	if (arr.length === 0) {
		return [];
	} 
	else if (arr.length ===1){
		return arr[0];
	}
	else {
		var result = [];
		var allCasesOfRest = allPossibleCases(arr.slice(1));
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