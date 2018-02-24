const axios=require('axios');

export const fetchProduct=(product)=>{
    //action creator
    return {
        type: "GET_PROD",
        product
    };
};

export const selectProduct=(product)=>{
    console.log("Product clicked :",product);
    return {
        type: "SELECT_PROD",
        product
    };
}

export const fetchCategory=(category)=>{
    return {
        type:"GET_CAT",
        category
    }
}

export const fetchCat=()=>{
    return(
        dispatch=>{
            return  axios.get('http://localhost:2222/catlist').then((cat)=>{
                dispatch(fetchCategory(cat.data));
            }).catch();
        }
    )
}

export const fetchSubCat=(subcategory)=>{
    return{
        type:"GET_SUBCAT",
        subcategory
    }
}

export const subcat=(catid)=>{
    return(
        dispatch=>{
            return  axios.get(`http://localhost:2222/getsubcat/${catid}`).then((catnm)=>{
                console.log("Catname : ",catnm);
                dispatch(fetchSubCat(catnm.data))
            }).catch();

        }
    )
}

export const fetchProd=()=>{
    console.log("In fetch");
    return(
        dispatch=>{
           return axios.get('http://localhost:2222/list').then((success)=>{
               console.log('call here',success.data);
               dispatch(fetchProduct(success.data));

            }).catch((e)=>{
                console.log(`Error : ${e.message}`);
            });
        }
    )
}

export const addProd=(obj)=>{
    return (
        dispatch=>{
            axios.post(
                'http://localhost:2222/add',obj
            ).then((res)=>{
                console.log(`Response ${res.data}`);
                if(!res)
                { console.log("No Record Added");
                }
                else{
                    dispatch({
                        type: "ADD_PROD",
                        payload:res.data
                    })

                }
            }).catch((e)=>{
                console.log(`Error : ${e.message}`);
            });
        })

}

export const editProd=(eid,obj)=>{
    console.log("edit API id ",eid);
    return(
        dispatch=>{
            axios.post(`http://localhost:2222/edit/${eid}`,obj)
                .then((res)=>{
                    if(!res)
                    { console.log("No Record Edited");
                    }
                    else{
                        console.log(" Edit API :: ",res.data);
                        dispatch({
                            type: "EDIT_PROD",
                            payload:res.data
                        })

                    }
                })
                .catch((err)=>{
                    console.log("Error in Update "+err);
                });
        }
    )
}

export const delProd=(did)=>{
    return(
        dispatch=>{
            axios.post(
                `http://localhost:2222/del/${did}`)

                .then((res)=>{
                    if(!res)
                    { console.log("No Record Deleted");
                    }
                    else{
                        dispatch({
                            type: "DEL_PROD",
                            payload:res.data
                        })

                    }

                }).catch((e)=>{
                console.log(`Error : ${e.message}`);
            });
        }
    )

}

export const pagination=(p=1,limit=4)=>{
    return((dispatch)=>{
        dispatch({
            type:'PAGING',
            payload:{"pgno":p,"limit":limit}
        })
    })
}

export const isEditing=(flag=false)=>{
    return ((dispatch) =>{
        dispatch({type:'IS_EDITING',payload:flag});
    })
}

export const sortingAction=(prods)=>{
    return((dispatch)=>{
        dispatch({
            type:'SORTING',
            payload:prods
        })
    })
}

export const setFields=(obj)=>{
    return((dispatch,getState)=>{
        let prod=getState().fields;

        dispatch({
            type:'SET_FIELDS',
            payload:{...prod,obj}
        });

    })
}

