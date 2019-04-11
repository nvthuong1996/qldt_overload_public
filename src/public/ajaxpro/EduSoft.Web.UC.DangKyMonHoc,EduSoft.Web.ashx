if(typeof EduSoft == "undefined") EduSoft={};
if(typeof EduSoft.Web == "undefined") EduSoft.Web={};
if(typeof EduSoft.Web.UC == "undefined") EduSoft.Web.UC={};
EduSoft.Web.UC.DangKyMonHoc_class = function() {};
Object.extend(EduSoft.Web.UC.DangKyMonHoc_class.prototype, Object.extend(new AjaxPro.AjaxClass(), {
	ThayDoiLoaiDK: function(madk, state) {
		return this.invoke("ThayDoiLoaiDK", {"madk":madk, "state":state}, this.ThayDoiLoaiDK.getArguments().slice(2));
	},
	DangKySelectedChange: function(check, maDK, maMH, tenMH, maNh, sotc, strSoTCHP, ngaythistr, tietbd, sotiet, soTCTichLuyToiThieuMonYeuCau, choTrung, soTCMinMonYeuCau, maKhoiSinhVien) {
		return this.invoke("DangKySelectedChange", {"check":check, "maDK":maDK, "maMH":maMH, "tenMH":tenMH, "maNh":maNh, "sotc":sotc, "strSoTCHP":strSoTCHP, "ngaythistr":ngaythistr, "tietbd":tietbd, "sotiet":sotiet, "soTCTichLuyToiThieuMonYeuCau":soTCTichLuyToiThieuMonYeuCau, "choTrung":choTrung, "soTCMinMonYeuCau":soTCMinMonYeuCau, "maKhoiSinhVien":maKhoiSinhVien}, this.DangKySelectedChange.getArguments().slice(14));
	},
	LuuVaoKetQuaDangKy: function(isValidCoso, isValidTKB, maDK, maMH, sotc, tenMH, maNh, strsoTCHP, isCheck, oldMaDK, strngayThi, tietBD, soTiet, isMHDangKyCungKhoiSV) {
		return this.invoke("LuuVaoKetQuaDangKy", {"isValidCoso":isValidCoso, "isValidTKB":isValidTKB, "maDK":maDK, "maMH":maMH, "sotc":sotc, "tenMH":tenMH, "maNh":maNh, "strsoTCHP":strsoTCHP, "isCheck":isCheck, "oldMaDK":oldMaDK, "strngayThi":strngayThi, "tietBD":tietBD, "soTiet":soTiet, "isMHDangKyCungKhoiSV":isMHDangKyCungKhoiSV}, this.LuuVaoKetQuaDangKy.getArguments().slice(14));
	},
	XoaKQDKTheoMaDK: function(danhSachMaDangKy) {
		return this.invoke("XoaKQDKTheoMaDK", {"danhSachMaDangKy":danhSachMaDangKy}, this.XoaKQDKTheoMaDK.getArguments().slice(1));
	},
	KiemTraTrungNhom: function() {
		return this.invoke("KiemTraTrungNhom", {}, this.KiemTraTrungNhom.getArguments().slice(0));
	},
	LuuDanhSachDangKy: function() {
		return this.invoke("LuuDanhSachDangKy", {}, this.LuuDanhSachDangKy.getArguments().slice(0));
	},
	LuuDanhSachDangKy_HopLe: function(isCheckSongHanh, ChiaHP) {
		return this.invoke("LuuDanhSachDangKy_HopLe", {"isCheckSongHanh":isCheckSongHanh, "ChiaHP":ChiaHP}, this.LuuDanhSachDangKy_HopLe.getArguments().slice(2));
	},
	LuuNguyenVong: function(maMonHoc, maNhom, maTo, buoi) {
		return this.invoke("LuuNguyenVong", {"maMonHoc":maMonHoc, "maNhom":maNhom, "maTo":maTo, "buoi":buoi}, this.LuuNguyenVong.getArguments().slice(4));
	},
	ShowTatCaTDK: function() {
		return this.invoke("ShowTatCaTDK", {}, this.ShowTatCaTDK.getArguments().slice(0));
	},
	LocTheoMonHoc: function(dkLoc) {
		return this.invoke("LocTheoMonHoc", {"dkLoc":dkLoc}, this.LocTheoMonHoc.getArguments().slice(1));
	},
	LoadChuongTrinhDaoTaoHeNganh: function() {
		return this.invoke("LoadChuongTrinhDaoTaoHeNganh", {}, this.LoadChuongTrinhDaoTaoHeNganh.getArguments().slice(0));
	},
	LoadChuongTrinhDaoTaoKhoiLop: function() {
		return this.invoke("LoadChuongTrinhDaoTaoKhoiLop", {}, this.LoadChuongTrinhDaoTaoKhoiLop.getArguments().slice(0));
	},
	LoadDanhSachKhoaLop: function() {
		return this.invoke("LoadDanhSachKhoaLop", {}, this.LoadDanhSachKhoaLop.getArguments().slice(0));
	},
	LocTheoMaKhoa: function(isKhoa, maKhoaLop, dk) {
		return this.invoke("LocTheoMaKhoa", {"isKhoa":isKhoa, "maKhoaLop":maKhoaLop, "dk":dk}, this.LocTheoMaKhoa.getArguments().slice(3));
	},
	LocTheoCTDTHeNganh: function(maHDT, MaNganh) {
		return this.invoke("LocTheoCTDTHeNganh", {"maHDT":maHDT, "MaNganh":MaNganh}, this.LocTheoCTDTHeNganh.getArguments().slice(2));
	},
	LocTheoCTDTKhoiLop: function(maKhoi) {
		return this.invoke("LocTheoCTDTKhoiLop", {"maKhoi":maKhoi}, this.LocTheoCTDTKhoiLop.getArguments().slice(1));
	},
	LocTheoMHTuChon: function() {
		return this.invoke("LocTheoMHTuChon", {}, this.LocTheoMHTuChon.getArguments().slice(0));
	},
	ShowDSDaDangKy: function() {
		return this.invoke("ShowDSDaDangKy", {}, this.ShowDSDaDangKy.getArguments().slice(0));
	},
	LoadNhomTo: function(maMH) {
		return this.invoke("LoadNhomTo", {"maMH":maMH}, this.LoadNhomTo.getArguments().slice(1));
	},
	url: '/ajaxpro/EduSoft.Web.UC.DangKyMonHoc,EduSoft.Web.ashx'
}));
EduSoft.Web.UC.DangKyMonHoc = new EduSoft.Web.UC.DangKyMonHoc_class();

