import React from 'react';
import UserList from '../container/user-list';
import UserDetail from '../container/user-details'
const App=()=>(
    <div>


        <UserList/>

        <hr/>

        {/*<h2>Stud Details</h2>*/}
        <UserDetail/>
    </div>
);

export default App;

