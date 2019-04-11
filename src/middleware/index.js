// import vào các middleware
const parseRequest = require("./paserequest");
const forwardRequest = require("./forwardrequest");
const finalMiddleWare = require("./finalMiddleware");
const handleDKMH = require("./handleDKMH");
const RenderTKB = require("./RenderTKB");
const checktrungtruoc = require("./kiemtratrungtruoc");
const otherMiddle = require("./ortherHandle")

module.exports = {
    parseRequest,
    forwardRequest,
    finalMiddleWare,
    handleDKMH,
    RenderTKB,
    checktrungtruoc,
    otherMiddle
}