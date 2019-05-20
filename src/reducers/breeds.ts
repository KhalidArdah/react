import Action from "./IAction";

export default function breedsReducer (state = [], action: Action) {
    if(action.type === "SET_BREEDS") {
        return action.payload;
    } else {
        return state;
    }
}