const states = {
    flowURL: [],
    flowTitle: [],
    flowContent: [],
    activeTab: 0

}

export const flow = (state = states, action: { type: any; payload: any; }) =>{
    switch(action.type){
        case "CREATE_FLOW":
            return {
                ...state, 
                flowURL: [...state.flowURL, action.payload.flowURL],
                flowTitle: [...state.flowTitle, action.payload.flowTitle],
                flowContent: [...state.flowContent, action.payload.flowContent],
                activeTab: state.flowURL.length 
            };

        case "CLEAR_FLOW":
            return {
                ...state, 
                flowURL: [],
                flowTitle: [],
                flowContent: [],
                activeTab: 0
            };
        
         case "SET_FLOW_TAB":
            return {
                ...state, 
                activeTab: action.payload.activeTab
            };

        case "REMOVE_FLOW":
            const index = action.payload.index;
            
            return {
                ...state,
                flowURL: state.flowURL.filter((empty, i) => i !== index),
                flowTitle: state.flowTitle.filter((empty, i) => i !== index),
                flowContent: state.flowContent.filter((empty, i) => i !== index),
                activeTab: index === state.activeTab ? (state.activeTab - 1 < 0) ? 0 : state.activeTab - 1 : state.activeTab
            };
            

        default:
            return state;
    }
}