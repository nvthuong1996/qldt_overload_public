if(typeof EduSoft == "undefined") EduSoft={};
if(typeof EduSoft.Web == "undefined") EduSoft.Web={};
if(typeof EduSoft.Web.UC == "undefined") EduSoft.Web.UC={};
EduSoft.Web.UC.GioiThieu_class = function() {};
Object.extend(EduSoft.Web.UC.GioiThieu_class.prototype, Object.extend(new AjaxPro.AjaxClass(), {
	GetHitCounter: function() {
		return this.invoke("GetHitCounter", {}, this.GetHitCounter.getArguments().slice(0));
	},
	url: '/ajaxpro/EduSoft.Web.UC.GioiThieu,EduSoft.Web.ashx'
}));
EduSoft.Web.UC.GioiThieu = new EduSoft.Web.UC.GioiThieu_class();

