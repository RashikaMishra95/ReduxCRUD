import React,{Component} from 'react';
import {connect} from 'react-redux';

class UserDetail extends Component{
    render(){
        return(
            <div>
                <h2>{this.props.user.rno}</h2>
                <h2>{this.props.user.name}</h2>
                <h2>{this.props.user.age}</h2>
                <h2>{this.props.user.per}</h2>

            </div>
        )
    }
}
function mapStateToProps(state){
    return{
        user:state.activeUser
    };
}
// const mapDispatchToProps = (dispatch) => {
//     return {
//         // You can now say this.props.createBook
//         createBook: book => dispatch(bookActions.createBook(book))
//     }
// };
export default connect(mapStateToProps)(UserDetail);