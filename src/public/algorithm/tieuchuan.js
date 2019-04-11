tieuchuanRank().then((e)=>{
    //veBieuDoLan2(e);
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


function convertObjToTkB2(input,allNMH){
	// convert từ loại biểu diễn 2 về loại biểu diễn 1. Convert kiểu dữ lieu all
	var result =[];
	for(var i in input){
		for(var j in allNMH){
			if(i==allNMH[j][0][1]){
				// Duyệt các nhóm môn học
				allNMH[j].forEach((item)=>{
					if(item[0]==input[i]){
						result.push(item);
					}
				});
			}
		}
	}
	return result;
}

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

                _NMH = f;
                var _t = convertObjToTkB2(e[mssv].tkb,f);
                var r = rankLv1(_t);
                if(r)
                    result.push(r);
            }

            return Promise.resolve(result);
        })
	})
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