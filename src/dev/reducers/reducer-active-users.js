export default (state=[],action)=>{
    switch(action.type){
        case "SELECT_PROD":
            return action.product;
            break;
    }
    return state;
}