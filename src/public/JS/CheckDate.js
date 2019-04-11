    //===============*********** Check valid date ************================//
    var dtCh= "/";
    var minYear=1900;
    var maxYear=2100;
    var erNotFormat, erDay, erMonth, erOutYear, ands, enterDate, Compare;
    function setValue(notformat, notday, notmonth, outyear, and, enterdate, compare )
    {
        erNotFormat=notformat;
        erDay=notday;
        erMonth=notmonth;
        erOutYear=outyear;
        ands=and;
        enterDate=enterdate;
        Compare=compare;
    }
    function isInteger(s)
    {
	    var i;
        for (i = 0; i < s.length; i++)
        {   
            var c = s.charAt(i);
            if (((c < "0") || (c > "9"))) return false;
        }
        return true;
    }
    function stripCharsInBag(s, bag)
    {
	    var i;
        var returnString = "";
        for (i = 0; i < s.length; i++){   
            var c = s.charAt(i);
            if (bag.indexOf(c) == -1) returnString += c;
        }
        return returnString;
    }
    function daysInFebruary (year)
    {
        return (((year % 4 == 0) && ( (!(year % 100 == 0)) || (year % 400 == 0))) ? 29 : 28 );
    }
    function DaysArray(n) 
    {
	    for (var i = 1; i <= n; i++) 
	    {
		    this[i] = 31
		    if (i==4 || i==6 || i==9 || i==11) {this[i] = 30}
		    if (i==2) {this[i] = 29}
       } 
       return this
    }
    function isDate(dtStr)
    {
	    var daysInMonth = DaysArray(12)
	    var pos1=dtStr.indexOf(dtCh)
	    var pos2=dtStr.indexOf(dtCh,pos1+1)
	    var strDay=dtStr.substring(0,pos1)
	    var strMonth=dtStr.substring(pos1+1,pos2)
	    var strYear=dtStr.substring(pos2+1)
	    strYr=strYear
	    if (strDay.charAt(0)=="0" && strDay.length>1) strDay=strDay.substring(1)
	    if (strMonth.charAt(0)=="0" && strMonth.length>1) strMonth=strMonth.substring(1)
	    for (var i = 1; i <= 3; i++) 
	    {
		    if (strYr.charAt(0)=="0" && strYr.length>1) strYr=strYr.substring(1)
	    }
	    month=parseInt(strMonth)
	    day=parseInt(strDay)
	    year=parseInt(strYr)
	    if (pos1==-1 || pos2==-1)
	    {
            alert(erNotFormat)
		    return false
	    }
	    if (strDay.length<1 || day<1 || day>31 || (month==2 && day>daysInFebruary(year)) || day > daysInMonth[month])
	    {
		    alert(erDay)
		    return false
	    }
	    if (strMonth.length<1 || month<1 || month>12)
	    {
		    alert(erMonth)
		    return false
	    }
	    if (strYear.length != 4 || year==0 || year<minYear || year>maxYear)
	    {
		    alert(erOutYear+ " "+minYear+ " "+ ands+" "+maxYear)
		    return false
	    }
	    if (dtStr.indexOf(dtCh,pos2+1)!=-1 || isInteger(stripCharsInBag(dtStr, dtCh))==false)
	    {
		    alert(enterDate)
		    return false
	    }
        return true
    }
    
    function CompareDate(d1, d2, active)
    {
        var acti = document.getElementById(active.valueOf());
        if(acti.value!='')
        {
            if(!checkDate(active))
                return false;
        }
        var date1 = document.getElementById(d1.valueOf());
        var date2 = document.getElementById(d2.valueOf());
        if(date1.value!='' && date2.value!='')
        {
            var list1=date1.value.split('/')
            var list2=date2.value.split('/')
            var d1= new Date(list1[2],list1[1],list1[0])
            var d2= new Date(list2[2],list2[1],list2[0])
            if(d1>d2)
            {
                alert(Compare);
                acti.value="";
	            acti.focus();
		        return false
            }
            return true
        }
        return true
    }
    function checkDate(text)
    {
        var date = document.getElementById(text.valueOf());
	    if (date.value!='' && (isDate(date.value)==false))
	    {
	        date.value="";
	        date.focus();
		    return false
	    }
        return true
    }
    function MessUpdate(mess)
    {
        var mes=mess
        alert(mes)
    }
    
    function CursorWait()
    {
        document.body.disabled="true";        
        document.body.style.cursor="wait";   
        alert("begin");        
    }
    function CursorDefault()
    {        
        alert("Đã upload thành công!");
        document.body.disabled=""; 
        document.body.style.cursor="default";
    }
    //===============******* Check valid date ************================//
    //============********* Change background row color ****************==================//
    var PreviousRow, bgColor;
    function rowCurrent( NowRow)
    {
            if (PreviousRow == NowRow)
                  return;
            if (PreviousRow != null && bgColor != null)
            {
                var _row=document.getElementById(PreviousRow);
                 _row.style.backgroundColor = bgColor;
                
            }
            var _NowRow = document.getElementById(NowRow);
            bgColor=_NowRow.style.backgroundColor;
            _NowRow.style.backgroundColor = "#DAE6F8";
             _NowRow.style.fontWeight = 'normal';
            PreviousRow=NowRow;
    }
   //============********* Change background color ****************==================//
   