import Action from "./IAction";

export default function locationReducer (state = 'Seattle, WA', action: Action) {
    if(action.type === "SET_LOCATION") {
        return action.payload;
    }
    else {
        return state;
    }
}