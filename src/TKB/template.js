const tableHtml = `<table id="ctl00_ContentPlaceHolder1_ctl00_Table1" class="classTable" cellspacing="0" cellpadding="1" border="0" style="border-color:#999999;border-width:1px;border-style:Solid;height:100%;width:100%;border-collapse:collapse;">`;

const optionHtml = `<select name="ctl00$ContentPlaceHolder1$ctl00$ddlTuan" onchange="javascript:setTimeout('__doPostBack(\'ctl00$ContentPlaceHolder1$ctl00$ddlTuan\',\'\')', 0)" id="ctl00_ContentPlaceHolder1_ctl00_ddlTuan" class="DropDown" style="width:300px;">`;

const thead = `<thead>
        <tr id="ctl00_ContentPlaceHolder1_ctl00_TableRow7" style="height:18px;">
            <td id="ctl00_ContentPlaceHolder1_ctl00_TableCell123" align="center" style="height:18px;width:50px;"></td>
            <td id="ctl00_ContentPlaceHolder1_ctl00_TableCell124" align="center" style="color:White;background-color:#6699CC;border-width:1px;border-style:solid;font-size:11px;height:18px;width:100px;white-space:nowrap;"><span id="ctl00_ContentPlaceHolder1_ctl00_lblt2" class="Label">THỨ 2</span></td>
            <td id="ctl00_ContentPlaceHolder1_ctl00_TableCell125" align="center" style="color:White;background-color:#6699CC;border-width:1px;border-style:solid;font-size:11px;width:100px;"><span id="ctl00_ContentPlaceHolder1_ctl00_lblt3" class="Label">THỨ 3</span></td>
            <td id="ctl00_ContentPlaceHolder1_ctl00_TableCell126" align="center" style="color:White;background-color:#6699CC;border-width:1px;border-style:solid;font-size:11px;width:100px;"><span id="ctl00_ContentPlaceHolder1_ctl00_lblt4" class="Label">THỨ 4</span></td>
            <td id="ctl00_ContentPlaceHolder1_ctl00_TableCell127" align="center" style="color:White;background-color:#6699CC;border-width:1px;border-style:solid;font-size:11px;width:100px;"><span id="ctl00_ContentPlaceHolder1_ctl00_lblt5" class="Label">THỨ 5</span></td>
            <td id="ctl00_ContentPlaceHolder1_ctl00_TableCell128" align="center" style="color:White;background-color:#6699CC;border-width:1px;border-style:solid;font-size:11px;width:100px;"><span id="ctl00_ContentPlaceHolder1_ctl00_lblt6" class="Label">THỨ 6</span></td>
            <td id="ctl00_ContentPlaceHolder1_ctl00_TableCell129" align="center" style="color:White;background-color:#6699CC;border-width:1px;border-style:solid;font-size:11px;width:100px;"><span id="ctl00_ContentPlaceHolder1_ctl00_lblt7" class="Label">THỨ 7</span></td>
            <td id="ctl00_ContentPlaceHolder1_ctl00_TableCell130" align="center" style="color:White;background-color:#6699CC;border-width:1px;border-style:solid;font-size:11px;width:100px;"><span id="ctl00_ContentPlaceHolder1_ctl00_lbltcn" class="Label">CHỦ NHẬT</span></td>
            <td id="ctl00_ContentPlaceHolder1_ctl00_TableCell131" style="width:50px;"></td>
        </tr>
    </thead>`;

const endBody = `<tr>
        <td style="border-color:Gray;border-width:1px;border-style:solid;height:22px;"></td>
        <td align="center" style="color:White;background-color:#6699cc;border-color:Gray;border-width:1px;border-style:solid;height:22px;width:110px;">THỨ HAI</td>
        <td align="center" style="color:White;background-color:#6699cc;border-color:Gray;border-width:1px;border-style:solid;height:22px;width:110px;">THỨ BA</td>
        <td align="center" style="color:White;background-color:#6699cc;border-color:Gray;border-width:1px;border-style:solid;height:22px;width:110px;">THỨ TƯ</td>
        <td align="center" style="color:White;background-color:#6699cc;border-color:Gray;border-width:1px;border-style:solid;height:22px;width:110px;">THỨ NĂM</td>
        <td align="center" style="color:White;background-color:#6699cc;border-color:Gray;border-width:1px;border-style:solid;height:22px;width:110px;">THỨ SÁU</td>
        <td align="center" style="color:White;background-color:#6699cc;border-color:Gray;border-width:1px;border-style:solid;height:22px;width:110px;">THỨ BẢY</td>
        <td align="center" style="color:White;background-color:#6699cc;border-color:Gray;border-width:1px;border-style:solid;height:22px;width:110px;">CHỦ NHẬT</td>
    </tr>`;

const _tStartHTML = `
    <table><tbody><tr><td align="right">
    <input id="ctl00_ContentPlaceHolder1_ctl00_rad_ThuTiet" type="radio" name="ctl00$ContentPlaceHolder1$ctl00$rad_ThuTiet" value="rad_ThuTiet" onclick="javascript:setTimeout('__doPostBack(\'ctl00$ContentPlaceHolder1$ctl00$rad_ThuTiet\',\'\')', 0)"><label for="ctl00_ContentPlaceHolder1_ctl00_rad_ThuTiet">Sắp xếp theo thứ tiết</label>
                        &nbsp;
         <input id="ctl00_ContentPlaceHolder1_ctl00_rad_MonHoc" type="radio" name="ctl00$ContentPlaceHolder1$ctl00$rad_MonHoc" value="rad_MonHoc" checked="checked"><label for="ctl00_ContentPlaceHolder1_ctl00_rad_MonHoc">Sắp xếp môn học</label>
                        &nbsp;&nbsp;
                    </td>
                </tr>
                <tr>
                    <td align="center">
                        <div align="left">
                            <div id="ctl00_ContentPlaceHolder1_ctl00_pnlGiangVien">
            
                                        </div><div id="ctl00_ContentPlaceHolder1_ctl00_pnlDHMX">
            
                                        </div><table cellspacing="0" cellpadding="0" class="title-table">
                                <tbody><tr align="center">
                                    <td width="56px">
                                        <span id="ctl00_ContentPlaceHolder1_ctl00_lblMaMH" title="Mã Môn Học" class="Label">Mã MH</span></td>
                                    <td width="165px">
                                        <span id="ctl00_ContentPlaceHolder1_ctl00_lblTenMH" title="Tên Môn Học" class="Label">Tên MH</span>
                                    </td>
                                    <td width="35px">
                                        <span id="ctl00_ContentPlaceHolder1_ctl00_lblNhomMH" title="Nhóm Môn Học" class="Label">NMH</span></td>
                                    <td width="35px">
                                        <span id="ctl00_ContentPlaceHolder1_ctl00_lblSTC" title="Số Tín Chỉ" class="Label">STC</span></td>
                                    
                                    <td width="90px">
                                        <span id="ctl00_ContentPlaceHolder1_ctl00_lblMaLop" class="Label">Mã lớp</span></td>
                                    <td width="35px">
                                            <span id="ctl00_ContentPlaceHolder1_ctl00_lblSTCHP" title="Số Tín Chỉ Học Phí" class="Label">STCHP</span></td>
                                        <td width="35px">
                                            <span id="ctl00_ContentPlaceHolder1_ctl00_lblKCPDK" title="Không cho phép đăng ký" class="Label">KDK</span></td>
                                    
        
                                    <td width="35px">
                                            <span id="ctl00_ContentPlaceHolder1_ctl00_lblTTH" title="Thực Hành" class="Label">TH</span></td>
                                        <td width="40px">
                                            <span id="ctl00_ContentPlaceHolder1_ctl00_lblThu" title="Thứ" class="Label">Thứ</span></td>
                                        <td width="40px">
                                            <span id="ctl00_ContentPlaceHolder1_ctl00_lblTBD" title="Tiết Bắt Đầu" class="Label">Tiết BD</span></td>
                                        <td width="40px">
                                            <span id="ctl00_ContentPlaceHolder1_ctl00_lblST" title="Số Tiết" class="Label">ST </span></td>
                                    
        
                                    <td width="80px">
                                        <span id="ctl00_ContentPlaceHolder1_ctl00_lblPhong" title="Phòng Học" class="Label">Phòng</span>
                                    </td>
                                    <td width="56px">
                                        <span id="ctl00_ContentPlaceHolder1_ctl00_lblCBGD" class="Label">CBGD</span></td>
                                    <td>
                                        <span id="ctl00_ContentPlaceHolder1_ctl00_lblTuan" class="Label">Tuần </span></td>
                                    
                                    
                                    <td width="57px">
                                        <span id="ctl00_ContentPlaceHolder1_ctl00_lblDSSV" class="Label">DSSV</span></td>
                                </tr>
                            </tbody></table></div><div style="height: 700px; text-align: left" class="grid-roll2">`;

const _tStopHTML = `</div></td></tr><tr>
        <td align="left">
            Ghi chú: ĐK: đăng ký; Mã MH: mã môn học; NMH: Nhóm môn học; TTH: Tổ thực hành; STC: Số tín chỉ; STCHP: Số tín chỉ học phí; CL: Còn lại; TH: Thực hành, KDK: Không cho phép đăng ký;Tiết BD: Tiết bắt đầu; ST : Số Tiết; CBGD: Mã cán bộ giảng dạy; DSSV: Danh sách sinh viên; 
        </td>
    </tr></tbody></table>`;

module.exports = {
    tableHtml,
    optionHtml,
    endBody,
    _tStartHTML,
    _tStopHTML,
    thead
}