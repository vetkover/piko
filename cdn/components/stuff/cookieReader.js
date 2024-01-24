function parseCookies(cookieString) {
    let cookieArray = cookieString.split('; ');
    let cookieObject = {};
  
    cookieArray.forEach(cookie => {
      let [key, value] = cookie.split('=');
      cookieObject[key] = value;
    });
  
    return cookieObject;
  }

module.exports = parseCookies;