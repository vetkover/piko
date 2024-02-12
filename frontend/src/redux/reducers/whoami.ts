const states = {

    stateWasUpdated: false

}

export const whoami = (state = states, action: { type: any; payload: any; }) =>{
    switch(action.type){
        case "WHOAMI":
        return {...state, 
            username: action.payload.username,
            nickname: action.payload.nickname,
            email: action.payload.email,
            avatar: action.payload.avatar,
            stateWasUpdated:true 
        }
        break;

        default:
            return state
            
    }

}