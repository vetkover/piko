const states = {
    flowURL: "",
    flowTitle: "",

}

export const flow = (state = states, action: { type: any; payload: any; }) =>{
    switch(action.type){
        case "CREATE_FLOW":
        return {...state, 
            flowURL: action.payload.flowURL,
            flowTitle: action.payload.flowTitle
        }

        case "CLEAR_FLOW":
            return {...state, 
                flowURL: "",
            }

        default:
            return state
            
    }

}