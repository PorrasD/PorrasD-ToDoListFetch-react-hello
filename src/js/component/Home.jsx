import React from 'react';
import ToDoList from './components/ToDoList.jsx';
import { Container } from 'react-bootstrap';

const Home = () => {
    return (
        <Container className="mt-5">
            <h1 className="text-center">Lista de Tareas</h1>
            <ToDoList />
        </Container>
    );
};


export default Home;
