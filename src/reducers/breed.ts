import Action from "./IAction";

export default function breedReducer (state = '', action: Action) {
    if(action.type === "SET_BREED") {
        return action.payload;
    } else if(action.type === "SET_ANIMAL") {
        return "";
    }
    else {
        return state;
    }
}