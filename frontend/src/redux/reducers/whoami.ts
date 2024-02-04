const states = {
    username: "",
    nickname: "",
    email: "",
    avatar:""

}

export const whoami = (state = states, action: { type: any; payload: any; }) =>{
    switch(action.type){
        case "WHOAMI":
        return {...state, 
            username: action.payload.username,
            nickname: action.payload.nickname,
            email: action.payload.email,
            avatar: action.payload.avatar }
        break;

        default:
            return state
            
    }

}