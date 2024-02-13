const states = {
    flowURL: "test",

}

export const flow = (state = states, action: { type: any; payload: any; }) =>{
    switch(action.type){
        case "CREATE_FLOW":
        return {...state, 
            flowURL: action.payload.flowURL,
        }

        case "CLEAR_FLOW":
            return {...state, 
                flowURL: "",
            }

        default:
            return state
            
    }

}