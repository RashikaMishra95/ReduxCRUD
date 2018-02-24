import React,{Component} from 'react';
import {bindActionCreators} from 'redux';
import {connect} from 'react-redux';
import ProductForm from '../container/prodFrorm';
import { confirmAlert } from 'react-confirm-alert';
import '../../bootstrap/css/react-confirm-alert.css'
import '../../bootstrap/css/mycss.css';
import {isEditing,sortingAction} from '../Actions/index-action';

import {selectProduct,delProd,setFields,pagination} from '../Actions/index-action'
 class UserList extends Component{

     sortData=(e)=>{
         var col=e.target.id;
         var {products}=this.props;
         var arr=[...products];
         arr.sort((a,b)=>{
             if( a[col]===b[col]){
                 return 0;
             }
             else if( a[col] > b[col]){
                 return 1;
             }
             else{
                 return -1;
             }
         })
         //var myData = [].concat(arr).sort((a, b) => a[col] > b[col]);
         this.props.sortingAction(arr);
     }
     editData=(prod)=>{
         var obj={
             "id":prod._id,
             "pname":prod.pname,
             "price":prod.price,
             "cat":prod.cat,
             "subcat":prod.subcat,
             "qty":prod.qty
         }
         console.log("in Edit : ",obj.pname);
        this.props.isEditing(true);
         this.props.setFields(obj);
     };

     deleteDataAlert=(e)=>{
         //alert("in del alert");
         var id=e.target.id;
         confirmAlert({
             //  title: 'Delete Data',                        // Title dialog
             message: 'Are you sure to do Delete ?',               // Message dialog
             // childrenElement: () => <div>Confirm Box</div>,       // Custom UI or Component
             confirmLabel: 'Delete',                           // Text button confirm
             cancelLabel: 'Cancel',                             // Text button cancel
             onConfirm: () => {
                 this.props.delProd(id);
             },
             onCancel: () => {//alert('b')
             }
         })
     }

     createListItems(){

         let {pgno,limit}=this.props.page;
         let {products}=this.props;
         var end=pgno*limit;
         var start=end-limit;
         var currentpg=products.slice(start,end);
         var pages=[];
         for(var i=1;i<=Math.ceil(products.length/limit);i++){
             pages.push(i);
         }
         console.log(pages);
         //id={p+1}
         var pageNos=pages.map((p)=>{
             return(
                <button className="display" id={p} onClick={()=>{this.props.pagination(p,limit)}} >{p}</button>

             )
         });

         //console.log("Data :: ",this.props.products);
         return (
             <div>
                 <table className="table table-bordered  table-hover bg-title" width="600">

                     <tr>
                         <td > <button className='btn btn-primary' data-toggle="modal" data-target="#myModal" >Add Products</button><br/><br/>
                         </td>
                          <select className="form-control" onChange={(e)=>{this.props.pagination(1,e.target.selectedOptions[0].innerHTML)}}>
                                    <option>1</option>
                                    <option selected='selected'>2</option>
                                    <option>3</option>
                                    <option>4</option>
                                </select>
                         <div>{pageNos}</div>

                         <ProductForm/>
                     </tr>

                     <tr align="center" className='phead'>
                         <th onClick={this.sortData}  id="pname">Product</th>
                         <th onClick={this.sortData}  id="price">Price</th>
                         <th onClick={this.sortData}  id="cat">Category</th>
                         <th onClick={this.sortData}  id="subcat">Subcategory</th>
                         <th onClick={this.sortData}  id="qty">Qty</th>
                         <th onClick={this.sortData}  id="pname">Operations</th>
                         <th>Operations</th>
                     </tr>

                     <tbody>
                     {
                         currentpg.map((p)=>{
                             return(
                                 <tr>
                                     <td>{p.pname}</td>
                                     <td>{p.price}</td>
                                     <td>{p.cat}</td>
                                     <td>{p.subcat}</td>
                                     <td>{p.qty}</td>
                                     <td  align="center"><button data-toggle='modal' data-target='#myModal' id={p._id} className="btn btn-info" onClick={()=>{this.editData(p)}}>Edit</button>
                                         <button id={p._id}  className="btn btn-danger" onClick={this.deleteDataAlert} >Delete</button></td>

                                 </tr>
                             )
                         })
                     }
                     </tbody>
                 </table>

             </div>
         )
         }
     render(){
        return(

            <ul>
                {this.createListItems()}
            </ul>
        );
    }
}
function mapStateToProps(state){
    return{
        products:state.product,
        page:state.pages

    }
}
function matchDispatchToProps(dispatch){
    return bindActionCreators({selectProduct,delProd,setFields,pagination,isEditing,sortingAction},dispatch
    )
}
export default connect(mapStateToProps,matchDispatchToProps)(UserList);