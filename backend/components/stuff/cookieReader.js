function parseCookies(cookieString) {
  try{
    let cookieArray = cookieString.split('; ');
    let cookieObject = {};
  
    cookieArray.forEach(cookie => {
      let [key, value] = cookie.split('=');
      cookieObject[key] = value;
    });
  
    return cookieObject;
  }catch (e){return false}
} 
module.exports = parseCookies;