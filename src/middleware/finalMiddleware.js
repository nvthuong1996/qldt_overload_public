const AppData = require("../appdata");

const messengerCode = 
  `<script>
  window.fbAsyncInit = function() {
    FB.init({
      appId            : '2229693873710059',
      autoLogAppEvents : true,
      xfbml            : true,
      version          : 'v2.12'
    });
  };
  (function(d, s, id){
     var js, fjs = d.getElementsByTagName(s)[0];
     if (d.getElementById(id)) {return;}
     js = d.createElement(s); js.id = id;
     js.src = "https://connect.facebook.net/vi_VN/sdk.js";
     fjs.parentNode.insertBefore(js, fjs);
   }(document, 'script', 'facebook-jssdk'));
</script>
<div class="fb-customerchat"
  page_id="786830551663133"
  theme_color="#0084ff"
>
</div>`;

module.exports = function(req, res, next) {
    if(req.result){
      // add messenger
      let body = req.result.body;

      const session = req.appData.session;
      const mssv = AppData.SESSION[session] && AppData.SESSION[session].user
      ? AppData.SESSION[session].user.mssv
      : null;

      const status = req.result.status;
      const cookie = req.result.cookie;
      if (cookie) {
        cookie.map(e => {
          res.set({ "set-cookie": e });
        });
      }
 
      // if(body.indexOf("</body>")>0){
      //   body = body.replace("</body>",messengerCode+"</body>");
      // }
      res.status(status).send(body);
    }
};



// add messenger