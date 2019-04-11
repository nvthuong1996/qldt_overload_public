if(typeof EduSoft == "undefined") EduSoft={};
if(typeof EduSoft.Web == "undefined") EduSoft.Web={};
if(typeof EduSoft.Web.UC == "undefined") EduSoft.Web.UC={};
EduSoft.Web.UC.Logout_class = function() {};
Object.extend(EduSoft.Web.UC.Logout_class.prototype, Object.extend(new AjaxPro.AjaxClass(), {
	ChangeLanguage: function(lan) {
		return this.invoke("ChangeLanguage", {"lan":lan}, this.ChangeLanguage.getArguments().slice(1));
	},
	ChangeFont: function(font) {
		return this.invoke("ChangeFont", {"font":font}, this.ChangeFont.getArguments().slice(1));
	},
	url: '/ajaxpro/EduSoft.Web.UC.Logout,EduSoft.Web.ashx'
}));
EduSoft.Web.UC.Logout = new EduSoft.Web.UC.Logout_class();

