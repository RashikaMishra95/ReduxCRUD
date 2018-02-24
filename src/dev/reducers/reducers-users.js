export default (state=[],action)=>{
    switch(action.type){

        case "GET_PROD":
            return action.product;
            break;

        case "ADD_PROD":
            return [...state,action.payload];
            break;

        case "DEL_PROD":
            return [...state].filter((dt)=>dt._id!==action.payload._id);
            break;
            
        case "EDIT_PROD":

            var myarr= [...state]
            var index=myarr.findIndex((dt)=>dt._id===action.payload._id);
            myarr.splice(index,1,action.payload);
            console.log("Array in reducer : ",myarr);
            return myarr;
            break;

        case "SORTING":
            return action.payload;
            break;

        default:
            return state;

    }
    return state;
}