import React from 'react';
import {bindActionCreators} from 'redux';
import {connect} from 'react-redux';
import { Button, Form, FormGroup, Input } from 'reactstrap';
import {fetchCat,subcat,setFields,addProd,editProd,isEditing} from '../Actions/index-action';

 class ProductForm extends React.Component {

     clearFields=()=>{
         var data={
        "pname":"",
        "price":"",
        "cat":"",
        "subcat":"",
        "qty":""

    }
        this.props.setFields(data);
         this.props.isEditing(false);
    };

     handleSubmit=(e)=>{
         console.log("In Submit ");

         e.preventDefault();
            var obj={
                "pname":this.props.fields.pname,
                "price":this.props.fields.price,
                "cat":this.props.fields.cat,
                "subcat":this.props.fields.subcat,
                "qty":this.props.fields.qty
            }

            //console.log("Pname :: ",this.props.fields.pname);
            //console.log("val :: ",this.props.isEdit);
            if(this.props.isEdit){

                console.log("In Edit :: ",this.props.isEdit);
                this.props.editProd(this.props.fields.id,obj);
            }
            else{
                this.props.addProd(obj);

            }

            this.clearFields();

     };

     handlePname=(e)=>{
         var obj={
             "id":this.props.fields.id,
             "pname":e.target.value,
             "price":this.props.fields.price,
             "cat":this.props.fields.cat,
             "subcat":this.props.fields.subcate,
             "qty":this.props.fields.qty

         };
         this.props.setFields(obj);
     };

     handlePrice=(e)=>{
         var obj={
             "id":this.props.fields.id,
             "pname":this.props.fields.pname,
             "price":e.target.value,
             "cat":this.props.fields.cat,
             "subcat":this.props.fields.subcat,
             "qty":this.props.fields.qty

         };
         this.props.setFields(obj);
     };

     handleCat=(e)=>{
         this.props.subcat(e.target.selectedOptions[0].id);
         var obj={
             "id":this.props.fields.id,
             "pname":this.props.fields.pname,
             "price":this.props.fields.price,
             "cat":e.target.selectedOptions[0].innerHTML,
             "subcat":this.props.fields.subcat,
             "qty":this.props.fields.qty

         };
         this.props.setFields(obj);

     };

     handleSubcat=(e)=>{
         var obj={
             "id":this.props.fields.id,
             "pname":this.props.fields.pname,
             "price":this.props.fields.price,
             "cat":this.props.fields.cat,
             "subcat":e.target.selectedOptions[0].innerHTML,
             "qty":this.props.fields.qty

         };
         this.props.setFields(obj);
     };

     handleQty=(e)=>{

         var obj={
             "id":this.props.fields.id,
             "pname":this.props.fields.pname,
             "price":this.props.fields.price,
             "cat":this.props.fields.cat,
             "subcat":this.props.fields.subcat,
             "qty":e.target.value

         };
         this.props.setFields(obj);
     };

     render(){
        return(
            <div className="modal fade" id="myModal">
                <div className="modal-dialog">
                    <div className="modal-content">
                        <div className="modal-header">
                            <h4 className="modal-title">Products</h4>
                        </div>
                        {/* Rendering Form either for Adding or Editing Products into a Modal*/}
                        <div className="modal-body">

                            <Form  className={'jumbotron'}>
                                <img src={'http://kingshurstmultimedia.com/images/store_box_icon.png'} height="80px"
                                     width="80px" className="profile-img" alt="Not found"/>

                                <FormGroup>
                                    <Input type="text" name="pname" id="pnameid"  placeholder="Product Name" onChange={this.handlePname} value={this.props.fields.pname} autoFocus={true} />
                                </FormGroup>

                                <FormGroup>
                                    <Input type="text" name="price" id="priceid"  placeholder="Product Price" value={this.props.fields.price} onChange={this.handlePrice}/>
                                </FormGroup>

                                <FormGroup>

                                    <Input type="select" name="cat" id="cat"  value={this.props.fields.cat} onChange={this.handleCat} >
                                        <option >Select Category</option>
                                        {
                                            this.props.cats.map((cat)=>{
                                                return(
                                                    <option id={cat._id} key={cat._id} value={cat.name}>{cat.name}</option>
                                                )
                                            })
                                        }
                                       
                                    </Input>
                                </FormGroup>
                                <FormGroup>

                                    <Input type="select" name="subcat" id="subcat" value={this.props.fields.subcat}  onChange={this.handleSubcat}>
                                        <option id={0}>{(this.props.fields.subcat!=='') ? this.props.fields.subcat : 'Select Subcategory'}</option>

                                        {
                                            this.props.subcats.map((subcat)=>{

                                                    return(
                                                        <option id={subcat._id} key={subcat._id} value={subcat.name}>{subcat.name}</option>
                                                    )


                                            })
                                        }
                                    </Input>
                                </FormGroup>
                                <FormGroup>
                                    <Input type="text" name="qty" id="qtyid"  placeholder="Product Qty"  value={this.props.fields.qty} onChange={this.handleQty}/>
                                </FormGroup>
                                <FormGroup>
                                    <Input type="file" name="file"  />
                                </FormGroup>
                                <Button className='btn btn-primary'  data-toggle="modal" data-target="#myModal" onClick={this.handleSubmit}>Submit</Button>

                            </Form>
                            <div className="modal-footer">
                                <button type="button" className="btn btn-default" data-dismiss="modal"  onClick={this.clearFields}>Close</button>
                            </div>
                        </div>
                    </div>

                </div>

            </div>
        )
    }
}
function mapStateToProps(state){
    return{
        cats:state.category,
        subcats:state.subcat,
        fields:state.fields,
        isEdit:state.edit
    }
}
function matchDispatchToProps(dispatch){
    return bindActionCreators({fetchCat,subcat,setFields,addProd,editProd,isEditing},dispatch
    )
}
export default connect(mapStateToProps,matchDispatchToProps)(ProductForm);