import React from 'react';
import Button from '../Button/Button';
import Input from '../Input/Input';
import './Search.css';
import PropTypes from 'prop-types';


function Search(props) {

    let searchCourse = (event) => {
        event.preventDefault();
        props.setSearchKey(event.target.value);        
    };

    let handleSearchInput = (event) => {
        props.setSearchKey(event.target.value);
    };

    return ( 
        <form className="Search" onSubmit={searchCourse}>
            <Input value={props.searchKey} handleChange={handleSearchInput} placeholder="Enter course name or id..."/>
            <Button text="Search" />
        </form>
     );
}

Search.propTypes = {
    setSearchKey: PropTypes.func,
    searchKey: PropTypes.node
}

export default Search;