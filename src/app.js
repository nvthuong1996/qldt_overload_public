const createError = require('http-errors');
const express = require('express');
const path = require('path');
const cookieParser = require('cookie-parser');
const logger = require('morgan');

const middleware = require("./middleware");
const AppData = require("./appdata");
const forwardrequest = require("./request/forwardrequest");
const { JSDOM } = require("jsdom");

const app = express();

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');



app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));
app.use(logger('dev'));

app.use(middleware.parseRequest);
app.use(middleware.otherMiddle);

app.use(middleware.checktrungtruoc)
// handle monhoc o day 
app.use(middleware.RenderTKB)
app.use(middleware.handleDKMH)

app.use((req, res, next) => {
  if(req.query.page && req.query.page === "thaydoittcn"){
    return res.redirect("/");
  }
  return next();
})

app.use(async (req, res, next) => {
  if(req.query.page && req.query.page === "lienketmessenger"){
    const session = req.appData.session;
    const mssv = AppData.SESSION[session] && AppData.SESSION[session].user
      ? AppData.SESSION[session].user.mssv
      : null;

    if (!mssv) {
      return res.redirect("/");
    }

    req.url = "/Default.aspx?page=dkmonhoc";
    const result = await forwardrequest.get(req);

    body = result.body;
    const { document } = new JSDOM(body).window;
    const e = document.getElementById("ctl00_ContentPlaceHolder1_ctl00_UpdatePanel2");
    if(!e){
      return res.redirect("/");
    }
    e.innerHTML = `
    <div>
      <h3 style="text-align:center;margin-top:30px;">Đây là đoạn mã để liên kết với messenger. Nó có giá tri trong khoảng 10 phút. Hãy copy và dán nó vào chatbox Messenger.</h3>
      <h3 style="text-align:center;margin-top:20px;color:red">function::{"action":"login","value":"ASP.NET_SessionId=${session}"}</h3>
    <div>
    `;

    let bodyFinal = document.documentElement.outerHTML;
    return res.status(200).send(bodyFinal);
    
  }
  return next();
})

app.use(middleware.forwardRequest)
app.use(middleware.finalMiddleWare)

// catch 404 and forward to error handler
app.use((req, res, next) => {
  next(createError(404));
});

// error handler
app.use((err, req, res, next) => {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.render('error');
});

module.exports = app;
