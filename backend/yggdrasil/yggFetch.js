module.exports = function yggFetch(sendObject){
let server = 'http://localhost:3002';
let token = 'yuijhtuyiohgftdy567y8u9ioivhcgtrsy45uiugohipou82yo7tiyfgjvhbjhip';
fetch(`${server}/yggdrasil/${sendObject.path}`, {
  method: sendObject.method,
  headers: {
    'Content-Type': 'application/json',
    'Authorization': token
  },
  body: JSON.stringify(sendObject.body)
})
.then(response => response.json())
.then(data => {

  return data})
.catch((error) => {
  console.error('Error:', error);
});
}