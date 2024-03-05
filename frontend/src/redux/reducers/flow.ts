const states = {
    flowURL: "",
    flowTitle: "",
    flowContent: {}

}

export const flow = (state = states, action: { type: any; payload: any; }) =>{
    switch(action.type){
        case "CREATE_FLOW":
        return {...state, 
            flowURL: action.payload.flowURL,
            flowTitle: action.payload.flowTitle,
            flowContent: action.payload.flowContent
        }

        case "CLEAR_FLOW":
            return {...state, 
                flowURL: "",
                flowTitle: "",
                flowContent: {}
            }

        default:
            return state
            
    }

}