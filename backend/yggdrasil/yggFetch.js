module.exports = function yggFetch(){
let url = 'http://localhost:3002';
let token = 'yuijhtuyiohgftdy567y8u9ioivhcgtrsy45uiugohipou82yo7tiyfgjvhbjhip';

fetch(`${url}/yggdrasil/helloworld`, {
  method: 'GET',
  headers: {
    'Authorization': `${token}`
  }
})
.then(response => response.json())
.then(data => console.log(data))
.catch((error) => {
  console.error('Error:', error);
});
}