import React, {useState} from 'react';
import Button from '../Button/Button';
import Input from '../Input/Input';
import './Search.css';

function Search(props) {
    const [searchKey, setSearchKey] = useState('');

    let searchCourse = (event) => {
        event.preventDefault();
        const dataList = props.dataList;
        let resultList = [];
        for (let i = 0; i < dataList.length; i++) {
            if (dataList[i].title.toLowerCase().includes(searchKey.toLowerCase()) || dataList[i].id === searchKey) {
                resultList.push(dataList[i]);
            }
        }
        props.setSearchResult(resultList);
        
    };

    let handleSearchInput = (event) => {
        setSearchKey(event.target.value);
        if (!event.target.value) {
            props.setSearchResult(props.dataList);
        }
    };

    return ( 
        <form className="Search" onSubmit={searchCourse}>
            <Input value={searchKey} handleChange={handleSearchInput} placeholder="Enter course name or id..."/>
            <Button text="Search" />
        </form>
     );
}

export default Search;