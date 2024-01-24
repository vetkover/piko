function getCookie(key: string){
    try{
    const cookieArr = (document.cookie).split('; ');
    for(let i = 0; i <= cookieArr.length; i++){
        if((cookieArr[i].split('='))[0] == key){
            return cookieArr[i].split('=')[1];
        }
    }  
    return undefined;
} catch(e){console.log(e)}
}

function setCookie(key: string, value: any){
    document.cookie = `${key}=${value};`;
}

function deleteCookie(key: string){
    document.cookie = `${key}=clear; expires=Thu, 01 Jan 1970 00:00:01 GMT;`;
}

export {getCookie, setCookie, deleteCookie}