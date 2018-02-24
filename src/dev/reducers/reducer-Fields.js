export default (state=[],action)=>{
    switch(action.type){
        case "SET_FIELDS":

            console.log("Payload Action : ",action.payload);

            return action.payload.obj;
            break;
        default:
            return state;

    }
    return state;
}