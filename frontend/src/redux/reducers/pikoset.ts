const states = {
    cdn: "",
    api: "http://localhost:3001"


}

export const pikoset = (state = states, action: { type: any; payload: any; }) =>{
    switch(action.type){
        case "PIKOSET":
        return {...state, cdn: action.payload.cdn }
        break;

        default:
            return state
            
    }

}