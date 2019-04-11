
/*
*	Cấu trúc dữ liệu biểu diễn tkb
*	- Loại 1: Một array các nhóm môn học.
*	- Loại 2: Một object mỗi thuộc tính là msmh và giá trị là mđk
*	- Loại 3: Một array các index của nhóm môn học
*	Các hàm tính tkb yêu cầu chuyển đổi sang loại 1 
*/







function matrixCheckTKB(allNMH){
	/*
	*	Trả lại một ma trận kiểm tra trùng thởi khóa biểu
	*
	*/

	var length = allNMH.reduce((e,f)=>{
		return e+f.nmh.length;
	},0);

	var result =[];
	for(var i=0;i<length;i++){
		result[i]=[];
	}

	var mark =0;
	allNMH.forEach((item,index)=>{
		// các phần tử từ mark tới mark + item.nmh.length
		for(var i=mark;i<mark+item.nmh.length;i++){
			for(var j=mark;j<mark+item.nmh.length;j++){
				result[i][j]=true;
			}
		}
		mark += item.nmh.length;
	});

	for(var i=0;i<length;i++){
		for(var j=0;j<length;j++){
			if(result[i][j]) continue;
			// get môn học từ index
			var mh = convertIndexToTKB([i,j],allNMH);
			if(!convertTKBtoMatrixMark(mh)){
				result[i][j]=true;
			}else{
				result[i][j]=false;
			}

		}
	}

	return result;
}



function convertTKBtoIndex(allNMH){
	// Yêu cầu convert tất cả nhóm môn học sang dạng index để thực hiện đệ quy hoán vị
	var result =[];
	var mark = 0;
	for(var i=0;i<allNMH.length;i++){
		result[i]=[];
		for(var j=mark;j<allNMH[i].nmh.length+mark;j++){
			result[i].push(j);
		}
		mark = j;
	}
	return result;
}



function convertIndexToTKB(input,allNMH){
	//	input là array các index
	if(allNMH.length==1){
		//	Nếu chỉ có một môn học duy nhất
		return input.map((e)=>{
			return all[0].nmh[e];
		});
	}

	var result = [];
	var mark = 0;
	for(var i=0;i<allNMH.length;i++){
		var mark2 = mark + allNMH[i].nmh.length;
		// duyệt các index từ mark đến mark2-1
		for(var j=mark;j<mark2;j++){
			for(var k=0;k<input.length;k++){
				if(input[k]==j){
					result.push(allNMH[i].nmh[j-mark]);
				}
			}
		}
		mark = mark2;
	}
	return result;
}

function convertObjToTkB(input,allNMH){
	// convert từ loại biểu diễn 2 về loại biểu diễn 1
	var result =[];
	for(var i in input){
		for(var j in allNMH){
			if(i==allNMH[j].msmh){
				// Duyệt các nhóm môn học
				allNMH[j].nmh.forEach((item)=>{
					if(item[0]==input[i]){
						result.push(item);
					}
				});
			}
		}
	}
	return result;
}


function rankTKB(tkb){
	// tkb đầu vào là array các nhóm môn học










}
function solandihoc(tkb){
	// Tính số lần đi học với khoảng cách e
	//	e tính từ 0
	// Thời khóa biểu để ở dạng ma trận đánh dấu
	var total =0;
	for(var i=0;i<tkb.length;i++){
		var dihoc =0;kiplientuc=0;mark=0;
		for(var j=0;j<6;j++){
			if(tkb[i][j]&&dihoc==0){
				dihoc =1;
				mark=j;
				kiplientuc =1;
			}else if(tkb[i][j]&&tkb[i][j-1]){
				kiplientuc ++;
				// không thay đổi
			}else if(tkb[i][j]&&!tkb[i][j-1]){

			}
		}
	}
}


function chuyendoitkbtrongngay(input,e){
	/*
	*	Chuyển đổi từ dạng ma trận đánh dấu sang dạng mà:
	*	Kết quả lưu thành một mảng
	*	mỗi phần tử là 1 object biểu diễn số kíp khoảng cách
	*/
	var result =null;
	var mark = null;
	var sang =0,chieu=0,toi=0;
	for(var j=0;j<6;j++){
		if(j<2&&input[j])
			sang ++;
		else if(input[j]&&j<5)
			chieu++;
		else if(input[j])
			toi++;

		if(input[j]&&!result){
			mark =j;
			result=[];
			result.push({sokip:1,kc:j});
		}else if(input[j]&&(j-mark)==1){
			if(e&&mark<2&&j>=2){
				//Phan tach
				result.push({sokip:1,kc:0.5});
			}else{
				result[result.length-1].sokip++;
			}
			mark =j;
		}else if(input[j]&&(j-mark)!=1){
			if(e&&mark<2&&j>=2){
				result.push({sokip:1,kc:j-mark-1+0.5});
			}else{
				result.push({sokip:1,kc:j-mark-1});
			}
			mark =j;

		}
	}
	return {mt:result,sang:sang,chieu:chieu,toi:toi};

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



function convertTKBtoMatrixMark(tkb,dk){
	// TKB là array các môn học.
	// Không push các môn học số lượng kíp >=dk vào đánh giá
	var result=[];
	/*	
	*	Khởi tạo mảng
	*/
	var _t =[];
	tkb.forEach((item)=>{
		_t = _t.concat(item[16].map((k)=>{
			return k.length;
		}));
	})
	var length = Math.max(..._t);
	for(var i=0;i<length*7;i++){
		result[i]=[false,false,false,false,false,false];
	}

	// Đếm tổng số kíp học
	var total = 0;


	for(var i=0;i<tkb.length;i++){
		for(var j=0;j<tkb[i][11].length;j++){
			// Xét tuần nào
			if(!tkb[i][16][j]) {
				console.log("Lưu ý: Phỉ xử lý các môn học thiếu tuần: core.js convertTKBtoMatrixMark");
				return null;
			};
			for(var f=0;f<tkb[i][16][j].length;f++){
				//Vị trí môn học đó.

				if(tkb[i][16][j][f]=='-') continue;

				if(dk&&parseInt(tkb[i][13][j])>=dk)
					continue;

				var thu = converWeekToNumber(tkb[i][11][j])-2;
				var x = thu +f*7;
				var y = (parseInt(tkb[i][12][j])-1)/2;

				var _c = parseInt(tkb[i][13][j]);
				do{
					//console.log(`${i}  ${j}  ${f} `);
					// Nếu đã set có nghĩa là bị trùng thời khóa biểu
					if(result[x][y]) return null;

					result[x][y] = true;
					total++;

					_c = _c/2;
					y++;
				}while(_c!=1);


			}
		}
	}
	return [result,total];
}

/*function checkTrungLoai1(allNMH){
	debugger;
	var allNMH = JSON.parse(JSON.stringify(allNMH)).map((e)=>{
		e.nmh = e.nmh.map((f)=>{
			return serializeTKB(f);
		});
		return e;
	})
	return isTrungMatrix(allNMH);
}

function serializeTKB(a,check){
	// check la bo qua cac mon thuc hanh
	var tuan_a = a[16],thu_a = a[11].map((e)=>{return converWeekToNumber(e)}),kip_a=a[12].map((e)=>{return parseInt(e)}),st_a=a[13].map((e)=>{return parseInt(e)}),gv_a=a[15],phong_a=a[14];
	var result = [];
	for(var i=0;i<tuan_a.length;i++){
		if(check&&st_a[i]>2) continue;
		for(var j=0;j<tuan_a[i].length;j++){
			if(tuan_a[i][j]!='-'){	// Thỏa điều kiện
				var _t =st_a[i];
				var _tt = kip_a[i];
				do{
					var index = j*42+(thu_a[i]-2)*6+(_tt+1)/2;
					_tt += 2;
					var obj = {index:index,gv:gv_a[i],phong:phong_a[i],mdk:a[0]};
					result.push(obj);
					_t=_t/2;
				}while(_t!=1);
			}
		}
	}
	result.sort(function sort(a,b){
		return a.index-b.index;
	})
	return result;
}

function isTrungMatrix(allNMH){
	// input la tkb dạng serialize
	debugger;
	var length = allNMH.reduce((e,f)=>{
		return e+f.nmh.length;
	},0);

	var result =[];
	for(var i=0;i<length;i++){
		result[i]=[];
	}

	var mark =0;
	allNMH.forEach((item,index)=>{
		// các phần tử từ mark tới mark + item.nmh.length
		for(var i=mark;i<mark+item.nmh.length;i++){
			for(var j=mark;j<mark+item.nmh.length;j++){
				result[i][j]=true;
			}
		}
		mark += item.nmh.length;
	});

	for(var i=0;i<length;i++){
		for(var j=0;j<length;j++){
			if(result[i][j]) continue;

			result[i][j]=isTrungSerialize(convertIndexToTKB([i],allNMH)[0]
				,convertIndexToTKB([j],allNMH)[0]);
		}
	}
	return result;
}

function isTrungSerialize(a,b){
	for(var i=0;i<b.length;i++){
		for(var j=0;j<a.length;j++){
			// do mang da sort nen ta kiem tra chi vay thoi
			if(a[j].index>b[i].index) break;

			if(b[i].index==a[j].index){
				// Bi trùng tkb
				return true;
			}
		}
	}
	return false;
}*/