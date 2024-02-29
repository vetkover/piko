import {getCookie, setCookie} from '../stuff/cookieWork';

import * as en from './languages/en.json';
import * as ru from './languages/ru.json';

const languages = {en , ru} as any;

var userLanguage: string;
if(getCookie("ulang") != undefined){
userLanguage = String(getCookie("ulang"));
} else {
    userLanguage = "en";
    setCookie("ulang", "en");
}

function getText(jsonKey: string) {
    if (languages[userLanguage] && languages[userLanguage][jsonKey]) {
        return languages[userLanguage][jsonKey];
    } else {
        if (languages["en"] && languages["en"][jsonKey]) {
            return languages["en"][jsonKey];
        } else {
            return "You should not have seen this if you are see this text then this means that we fucked up our localization";
        }
    }
}



function updateUlang(cookieKey: string){
    setCookie("ulang",cookieKey)
    window.location.reload();
}

export{getText}