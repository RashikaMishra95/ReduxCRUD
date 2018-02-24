export default (state=[],action)=>{
    switch(action.type){
        case "GET_SUBCAT":
            return action.subcategory;
            break;
    }
    return state;
}