import {combineReducers} from 'redux';
import UserReducer from './reducers-users';
import ActiveUsers from './reducer-active-users';
import Category from './reducers-cat';
import Subategory from './reducer-subcat';
import Fields from './reducer-Fields';
import Pages from './reducer-page';
import Edit from './reducer-isEditing';


const allreducers=combineReducers({
    product:UserReducer,
    activeUser:ActiveUsers,
    category:Category,
    subcat:Subategory,
    fields:Fields,
    pages:Pages,
    edit:Edit

});
export default allreducers;