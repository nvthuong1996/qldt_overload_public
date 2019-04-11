SELECT = {};
SELECT['thu'] = "HaiBaTưNămSáuBảyCN";
SELECT['time'] = 0;
SELECT['type'] = 0;
SELECT['gv']={};
TKBSELECT = [];
NMH={};
LOAD =false;

function timkiemtkb(){
	document.getElementById('ctl00_ContentPlaceHolder1_ctl00_pnlTKB2').innerHTML = "";
	document.getElementById('slTKBSELECT').innerHTML = "";
	loading(true);
}

function loading(e){
	if(e===true){
		document.getElementById('loading').innerHTML=`    <div> <img align="center" src="/App_Themes/loader.gif" alt="">   </div>
    <span>Loading</span>`;
	}else if(e){
		document.getElementById('loading').innerHTML=`    <div> <img align="center" src="/App_Themes/loader.gif" alt="">   </div>
    <span>Loading ${e}%</span>`;
	}else{
		document.getElementById('loading').innerHTML = "";
	}
}

function thuSelect(e){
	if(e=='allthu'&&document.getElementById(e).checked){
		for(let i=2;i<=8;i++){
			document.getElementById('t'+i).checked=false;
		}
		SELECT.thu = document.getElementById(e).value;
	}else if(e=='allthu'&&!document.getElementById(e).checked){
			document.getElementById(e).checked = true;
			SELECT.thu = document.getElementById(e).value;
	}else if(e!='allthu'&&document.getElementById(e).checked){
		if(document.getElementById('allthu').checked){
			document.getElementById('allthu').checked=false;
			SELECT.thu	= '';
		}
		SELECT.thu += document.getElementById(e).value;
	}else if(e!='allthu'&&!document.getElementById(e).checked){
		document.getElementById('allthu').checked=false;
		SELECT.thu = SELECT.thu.replace(document.getElementById(e).value,'');
		if(SELECT.thu==''){
			document.getElementById('allthu').checked=true;
			SELECT.thu = "HaiBaTưNămSáuBảyCN";
		}
	}
	console.log('SELECT THU: '+SELECT.thu);
	filterMonHoc();
	renderSLnhom();
}
function sangchieu(){
	var x= document.getElementById('ctl00_ContentPlaceHolder1_ctl00_ddlChonNHHK')
	SELECT['time'] = x.selectedIndex;
	console.log(SELECT['time']);
}
function loaitkb(){
	var x= document.getElementById('ctl00_ContentPlaceHolder1_ctl00_ddlTuan')
	SELECT['type'] = x.selectedIndex;
	console.log(SELECT['type']);
}
(function render(){
	LoadMonHocOnline().then((e)=>{
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
	}).catch(()=>{
		//alert('Không load được dữ liệu. Có thể do chưa login');
		//window.location='/';
		//LOAD = false;
	})
	setTimeout(()=>{
		if(LOAD)
			return;

		alert('Không load được dữ liệu. Có thể do chưa login');
		window.location='/';
	},15000);

})()
function gvFromMH(e,b){
	//return giảng viên từ nhóm môn học
	// Loại bỏ tiết số số kíp >=b
	if(!b) b=10;
	b=4;

	var r =[];

	for(let i=0;i<e[15].length;i++){
		if(r.indexOf(e[15][i])<0&&parseInt(e[13][i])<b){
			r.push(e[15][i]);
		}
	}
	return r.join(' - ');
}

function renderDsGv(){
	var t= document.getElementById('ctl00_ContentPlaceHolder1_ctl00_ddlChonNHHK2');
	var msmh = t[t.selectedIndex].value;
	var c='';
	var k=false;
	if(SELECT['gv'][msmh]) k=true;

	if(!k){
		var r=`<input type="checkbox" onchange="javascript:locgiangvien(this)" value="${msmh}|all"> Tất cả<br>`;
	}else if(SELECT['gv'][msmh].length==0){
		var r=`<input type="checkbox" checked onchange="javascript:locgiangvien(this)" value="${msmh}|all"> Tất cả<br>`;
	}else{
		var r=`<input type="checkbox" onchange="javascript:locgiangvien(this)" value="${msmh}|all"> Tất cả<br>`;
	}

	NMH.forEach((e)=>{
		if(e.msmh==msmh){
			e.nmh.forEach((item)=>{
				if(c.indexOf(item[18])<0){
					if(k&&exsitElement(SELECT['gv'][msmh],item[18]))
						r += `<input type="checkbox" checked onchange="javascript:locgiangvien(this)" value="${item[1]}|${item[18]}"> ${item[18]}<br>`;
					else
						r += `<input type="checkbox" onchange="javascript:locgiangvien(this)" value="${item[1]}|${item[18]}"> ${item[18]}<br>`;

					c += item[18];
				}
			})
		}
	})
	document.getElementById('ctl00_ContentPlaceHolder1_ctl00_pnlTKB2').innerHTML	= r;

	/*
	*	Phải khởi tạo dữ liệu
	*/
	filterMonHoc()
	renderSLnhom(msmh);

}

function locgiangvien(e){
	var value= e.defaultValue;
	value=value.split('|');
	if(e.checked&&value[1]=='all'){
			SELECT['gv'][value[0]]=[];

	}else if(!e.checked&&value[1]=='all'){
		delete	SELECT['gv'][value[0]];

	}else if(e.checked&&value[1]!='all'){
		if(!SELECT['gv'][value[0]])		SELECT['gv'][value[0]]=[];
		if(!exsitElement(SELECT['gv'][value[0]]))
			SELECT['gv'][value[0]].push(value[1]);

	}else if(!e.checked&&value[1]!='all'){
		SELECT['gv'][value[0]] = deleteElement(SELECT['gv'][value[0]],value[1]);
		if(SELECT['gv'][value[0]].length==0){
			delete	SELECT['gv'][value[0]];
		}

	}



	renderDsGv();
	filterMonHoc();
	renderSLnhom(value[0]);
	console.log(SELECT['gv'][value[0]]);
}

function renderSLnhom(msmh){
	if(!msmh)
		msmh=curentMSMH;
	else
		curentMSMH = msmh;

	let _tt='';
	TKBSELECT.forEach((item)=>{
		if(item.msmh==msmh){
			_tt = "Số lượng môn học là: "+item.nmh.length;
		}
	})
	if(_tt==''){
		_tt = "Không chọn môn học này";
	}


	document.getElementById('slTKBSELECT').innerHTML=_tt;
}

function exsitElement(arr,element){
	var c=false;
	arr.forEach((item)=>{
		if(item==element) {
			c=true;
			return;
		};
	})
	return c;
}
function deleteElement(arr,element){
	var r=[];
	for(let i=0;i<arr.length;i++){
		if(arr[i]==element) continue;
		r.push(arr[i]);
	}
	return r;
}

function filterMonHoc(){
	TKBSELECT =[];
	let _tmp = JSON.parse(JSON.stringify(NMH));
	for(let i in SELECT.gv){
		let c=false;
		_tmp.forEach((item,index)=>{
			if(item.msmh==i){
				c=true;
				var _t = filterNMHformGV(_tmp[index].nmh,SELECT.gv[i]);
				_t = filterThu(_t,SELECT.thu);
				_tmp[index].nmh=_t;
				TKBSELECT.push(_tmp[index]);
			}
		})
	}
}

function filterNMHformGV(nmh,gv){
	var r=[];
	if(gv.length==0) return nmh;
	nmh.forEach((item)=>{
		if(exsitElement(gv,item[18])){
			r.push(item);
		}
	})
	return r;
}

function filterThu(nmh,thu){
	var r=[];
	nmh.forEach((item)=>{
		let c=false;
		for(let i=0;i<item[11].length;i++){
			if(thu.indexOf(item[11][i])<0&&item[13][i]=='2'){
				c=true;
				break;
			}
		}
		if(!c) r.push(item);
	})
	return r;
}
function showTKBDeXuat(a){
	var codeHTML = "";
	a.forEach((item,index)=>{
		if(typeof item == 'string'){
			value=encodeURI(item);
		}else{
			var value = encodeURI(JSON.stringify(item.viewTkb));
		}
		
		codeHTML += `<a href="/default.aspx?page=thoikhoabieu&op=${value}" target="_blank">Thời khóa biểu đề xuất ${index+1}</a><br>`;
	});

	document.getElementById('ctl00_ContentPlaceHolder1_ctl00_pnlTKB2').innerHTML = codeHTML;

}
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