export default (state=[],action)=>{
    switch(action.type){
        case "GET_CAT":
            return action.category;
            break;
    }
    return state;
}