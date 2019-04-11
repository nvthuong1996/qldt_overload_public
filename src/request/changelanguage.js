const request = require("request");
const CONFIG = require("./config.json");

module.exports = function changeLanguage(session) {
  if (!session) {
    console.log("error khi pass session vao changeLanguage");
    return Promise.resolve();
  }
  return new Promise((resolve, reject) => {
    const headers = Object.assign({},CONFIG.headers);
    headers["Content-Type"] = "text/plain; charset=UTF-8";
    headers["Content-Length"] = 13;
    headers["X-AjaxPro-Method"] = "ChangeLanguage";
    headers["Cookie"] = session;
    const uri = CONFIG.forward.url + CONFIG.forward.changelanguge;
    request(
      {
        timeout: CONFIG.timeout,
        uri,
        method: "POST",
        headers,
        body: `{"lan":"_vi"}`
      },
      (error, res, body) => {
        try {
          const _tmp = JSON.parse(body);
          if (_tmp.value === "") {
            return resolve();
          }
          return reject(new Error("change languge error. session: " + session));
        } catch (e) {
          return reject(new Error(e));
        }
      }
    );
  });
};
