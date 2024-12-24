import React from 'react';
import To_DoList from './To_DoList.jsx';

const Home = () => {
    return (
        <div className="Container mt-5">
            <h1 className="text-center">To Do List!</h1>
            <To_DoList />
        </div>
    );
};


export default Home;
