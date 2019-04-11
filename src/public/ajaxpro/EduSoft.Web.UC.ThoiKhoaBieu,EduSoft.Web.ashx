if(typeof EduSoft == "undefined") EduSoft={};
if(typeof EduSoft.Web == "undefined") EduSoft.Web={};
if(typeof EduSoft.Web.UC == "undefined") EduSoft.Web.UC={};
EduSoft.Web.UC.ThoiKhoaBieu_class = function() {};
Object.extend(EduSoft.Web.UC.ThoiKhoaBieu_class.prototype, Object.extend(new AjaxPro.AjaxClass(), {
	LoadDatatablePrint: function() {
		return this.invoke("LoadDatatablePrint", {}, this.LoadDatatablePrint.getArguments().slice(0));
	},
	url: '/ajaxpro/EduSoft.Web.UC.ThoiKhoaBieu,EduSoft.Web.ashx'
}));
EduSoft.Web.UC.ThoiKhoaBieu = new EduSoft.Web.UC.ThoiKhoaBieu_class();

