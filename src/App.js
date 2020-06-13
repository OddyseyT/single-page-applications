import React, { useState, useEffect } from 'react';
import { Route } from 'react-router-dom';
import {Button, Navbar, Card, CardImg} from 'reactstrap';
import {Link} from 'react-router-dom';
import OrderForm from './components/OrderForm';
import Order from './components/Order';

import './App.css';

const App = () => {
  return (
    <>
    <Navbar color="info">
      <h1 style={{color: "white"}}>WeEat</h1>
      <Link to={"/"}>
        <Button color="info">
          Home
        </Button>
      </Link>
      </Navbar>
      <Route exact path='/'>
      <Card>
        <CardImg src={require('./assets/taco.jpeg')}/>
        <Link to={'/taco'}>
        <Button data-cy="orderform" color="info" style={{position: 'absolute', left: '50%', top: '50%'}}>
          Tacos!
        </Button>
        </Link>
      </Card>
      </Route>
      <Route path="/taco">
        <OrderForm />

        </Route>
    </>
  );
};
export default App;
