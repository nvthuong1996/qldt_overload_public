if(typeof EduSoft == "undefined") EduSoft={};
if(typeof EduSoft.Web == "undefined") EduSoft.Web={};
if(typeof EduSoft.Web.Admin == "undefined") EduSoft.Web.Admin={};
EduSoft.Web.Admin.Download_class = function() {};
Object.extend(EduSoft.Web.Admin.Download_class.prototype, Object.extend(new AjaxPro.AjaxClass(), {
	CheckPassWord: function(password) {
		return this.invoke("CheckPassWord", {"password":password}, this.CheckPassWord.getArguments().slice(1));
	},
	DoDownload: function(ee) {
		return this.invoke("DoDownload", {"ee":ee}, this.DoDownload.getArguments().slice(1));
	},
	url: '/ajaxpro/EduSoft.Web.Admin.Download,EduSoft.Web.ashx'
}));
EduSoft.Web.Admin.Download = new EduSoft.Web.Admin.Download_class();

