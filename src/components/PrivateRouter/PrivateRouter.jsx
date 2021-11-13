import React from 'react';
import { selectUser } from '../../store/selectors';
import { useSelector } from 'react-redux';
import { Redirect } from 'react-router-dom';


function PrivateRouter(props) {
    let user = useSelector(selectUser);

    return ( <>
        {user.role === 'admin' ? props.children : <Redirect to=' /courses' /> }
    </> );
}

export default PrivateRouter;