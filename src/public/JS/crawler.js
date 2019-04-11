/*
*  Các hàm crawler    
*/

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