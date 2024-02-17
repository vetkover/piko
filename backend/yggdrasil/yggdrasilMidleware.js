const trustedDomain = ["::1"];

module.exports = function(req, res, next) {
    const istrustedServer = () => {
        const isTrustedToken = req.headers.authorization == "yuijhtuyiohgftdy567y8u9ioivhcgtrsy45uiugohipou82yo7tiyfgjvhbjhip"
        console.log(isTrustedToken)
        return req.ip.includes(trustedDomain) && isTrustedToken;
    }
    if(istrustedServer()){
        next()
    } else {
        res.json("ты не piko сервер")
    }
};
