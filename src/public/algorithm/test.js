allPossibleCases([[1,2,3,4,5],[6,7,8,9,10],[11,12,13]]);
for(var i=0;i<a.length;i++){
    //debugger;
    for(var j=0;j<a.length;j++){
        if(i!=j&&JSON.stringify(a[i].sort())==JSON.stringify(a[j].sort())){
            console.log(`Trung tai vi tri ${i} với ${j}`);
        }
    }
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
                    result.push([arr[0][i] , allCasesOfRest[c]]);
                }else{
                    result.push([arr[0][i] , ...allCasesOfRest[c]]);
                }
            }
        }
        return result;
    }
}

function sinhhoanviquaylui(_n,_k,DK){
    n=_n,k=_k, sum = 0; // sum de danh so thu tu cua to hop
    a=[], c=[];
    
    result = [];
    
    
    for( var  i = n-1;i>=0;--i)
        c[i] = true;

    Attempt(0);

    function Attempt(i)
    {
         for( var j =0;j<n;++j)
         {
              if(c[j])
              {
                    // Yêu cầu kiểm tra DK giữ j và a[0] đến a[i-1]


                    a[i] = j;
                    if( i == k){
                    }
                    else
                    {
                        c[j] = false;
                        Attempt(i+1);
                        c[j] =  true;
                    }
              }
         }
    }
}
