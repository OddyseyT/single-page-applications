import React, {useState, useEffect} from 'react';
import { Card, CardImg, Button, Form, FormGroup, Label, Input, Dropdown, DropdownToggle, DropdownMenu } from 'reactstrap';
import axios from 'axios';
import * as yup from 'yup'

const OrderForm = props => {
const [dropdownOpen, setDropdownOpen] = useState(false);
const toggle = () => setDropdownOpen((prevState)=> !prevState)
const [buttonDisabled, setButtonDisabled] = useState(true);
const [formData, setFormData] = useState({
    name: "",
    number: 0,
    cheese: false,
    tomatoes: false,
    olives: false,
    lettuce: false,
    hotSauce: false,
    sourCream: false,
    special: ""
})

const [errors, setErrors] = useState({
  name:"",
  number: 0
});

const schema = yup.object().shape({
  name: yup.string().required("Name is required").min(2),
  number: yup.number().required("Must select one or more tacos to order").positive().integer().min(1)
})

useEffect(() => {
  schema.isValid(formData).then(valid => {
    setButtonDisabled(!valid);
  })
  
}, [formData]);

const submit = () => {
  schema.validate(formData).then( () => {
    axios.post("https://reqres.in/api/users", formData).then( (res) => {
    console.log(res.data)
   })
  })
}
const handleChanges = event => {
  event.persist();
    setFormData({ ...formData, [event.target.name]: event.target.value });
    console.log(event)
    validateChange(event);  
    
  };
const handleToppings = event => {
    setFormData({ ...formData, [event.target.name]: event.target.checked })
}
const validateChange = e => {
  console.log("validation ", e)
  // Reach will allow us to "reach" into the schema and test only one part.
  yup
    .reach(schema, e.target.name)
    .validate(e.target.value)
    .then(valid => {
      setErrors({
        ...errors,
        [e.target.name]: ""
      });
    })
    .catch(err => {
      setErrors({
        ...errors,
        [e.target.name]: err.errors[0]
      });
    });
};




    return (
        <>
        <Card color="info">
            <h2 style={{color: "white", margin: "0 auto"}}>Build Your Own Taco</h2>
         <CardImg style={{width: '80%', margin: "0 auto"}} src={require('../assets/taco-2.jpg')} />  
        </Card>
        <Form onSubmit={
            (event) => {
                event.preventDefault();
               submit();
                setFormData({name: "",
                number: 0,
                cheese: false,
                tomatoes: false,
                olives: false,
                lettuce: false,
                hotSauce: false,
                sourCream: false,
                special: ""})
              }} style={{margin: "5%"}}>
            <FormGroup>
                <Label for="name">Name</Label>
                <Input name="name" data-cy="name" id="name" placeholder="name" value={formData.name} onChange={handleChanges}/>
                {errors.name.length > 0 ? <p className='error'>{errors.name}</p> : null}
            </FormGroup>
            <FormGroup>
        <Dropdown isOpen={dropdownOpen} toggle={toggle}>
        <DropdownToggle caret >{formData.number === 0 ? "Quantity" : formData.number}
  </DropdownToggle>
  
  <DropdownMenu>
  <option value={0} onClick={() => {
            toggle();
            setFormData({...formData, number: 0})
        }}>0</option>
        <option value={1} onClick={() => {
            toggle();
            setFormData({...formData, number: 1})
        }}>1</option>
          <option onClick={() => {
            toggle();
            setFormData({...formData, number: 2})
        }}>2</option>
          <option onClick={() => {
            toggle();
            setFormData({...formData, number: 3})
        }}>3</option>
          <option onClick={() => {
            toggle();
            setFormData({...formData, number: 4})
        }}>4</option>
          <option onClick={() => {
            toggle();
            setFormData({...formData, number: 5})
        }}>5</option>
          <option onClick={() => {
            toggle();
            setFormData({...formData, number: 6})
        }}>6</option>
       {errors.number = 0 ? <p className="error">{errors.number}</p>: null}
          </DropdownMenu>
        </Dropdown>
          
      </FormGroup>
      <FormGroup check>
        <Label check>
          <Input type="checkbox" data-cy="cheese" id="cheese" name="cheese" checked={formData.cheese} onChange={handleToppings}/>{' '}
          Cheese
        </Label>
      </FormGroup> 
      <FormGroup check>
        <Label check>
          <Input type="checkbox" data-cy="tomatoes" id="tomatoes" name="tomatoes" checked={formData.tomatoes} onChange={handleToppings}/>{' '}
          Tomatoes
        </Label>
      </FormGroup> 
      <FormGroup check>
        <Label check>
          <Input type="checkbox" id="blackOlives" name="blackOlives" checked={formData.blackOlives} onChange={handleToppings}/>{' '}
          Black Olives
        </Label>
      </FormGroup> 
      <FormGroup check>
        <Label check>
          <Input type="checkbox" data-cy="lettuce" id="lettuce" name="lettuce" checked={formData.lettuce} onChange={handleToppings}/>{' '}
          Lettuce
        </Label>
      </FormGroup> 
      <FormGroup check>
        <Label check>
          <Input type="checkbox" data-cy="hotSauce" id="hotSauce" name="hotSauce" checked={formData.hotSauce} onChange={handleToppings}/>{' '}
          Hot sauce
        </Label>
      </FormGroup> 
      <FormGroup check>
        <Label check>
          <Input type="checkbox" data-cy="sourCream" id="sourCream" name="sourCream" checked={formData.sourCream} onChange={handleToppings}/>{' '}
           Sour cream
        </Label>
      </FormGroup>
      <FormGroup>
        <Label for="special">Special Instructions</Label>
        <Input type="textarea" data-cy="special" name="special" id="special" value={formData.special} onChange={handleChanges}/>
      </FormGroup>
      <Button data-cy="submit" disabled={buttonDisabled}>Submit</Button>
    </Form>
    </>
    )
}

export default OrderForm;