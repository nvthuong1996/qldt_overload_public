if(typeof EduSoft == "undefined") EduSoft={};
if(typeof EduSoft.Web == "undefined") EduSoft.Web={};
if(typeof EduSoft.Web.UC == "undefined") EduSoft.Web.UC={};
EduSoft.Web.UC.Footer_class = function() {};
Object.extend(EduSoft.Web.UC.Footer_class.prototype, Object.extend(new AjaxPro.AjaxClass(), {
	url: '/ajaxpro/EduSoft.Web.UC.Footer,EduSoft.Web.ashx'
}));
EduSoft.Web.UC.Footer = new EduSoft.Web.UC.Footer_class();

