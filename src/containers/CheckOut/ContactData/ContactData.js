import React, { Component } from "react";
import Button from "../../../components/UI/Button/Button"
import axios from "../../../axios-orders"
import Spinner from "../../../components/UI/Spinner/Spinner"

import classes from "./ContactData.module.css"

class ContactData extends Component{
    state={
        name: "",
        email: "",
        address: {
            street: "",
            postalCode: "",
        },
        loading: false,
    }

    orderHandler = (event) => {
        event.preventDefault();
        this.setState({loading: true})
        const order = {
            ingredients: this.props.ingredients,
            price: this.props.totalprice,
            customer: {
                name: "Malin",
                address: {
                    street: "Minz gate 1",
                    zipCode: "5050",
                    country: "Norway",
                },
                email: "minz@minz.no",
            },
            deliveryMethod: "fast",
        }


        axios.post("/orders.json", order)
        .then(response =>{
            this.setState({loading: false})
            this.props.history.push("/");
        })
        .catch(error =>{
            this.setState({loading: false})
            
        });
        //alert('You continue!');
    }
    render(){
        let form = ( 
            <form>
            <input type = "text"name="name" placeholder="Your Name"></input>
            <input type = "email"name="email" placeholder="Your email"></input>
            <input type = "text"name="street" placeholder="Your street"></input>
            <input type = "text"name="postal" placeholder="Your postal code"></input>
|            <Button btnType="Success" clicked = {this.orderHandler}> ORDER NOW </Button>
            </form>       );
        if(this.state.loading) form = <Spinner/>


        return (
            <div className={classes.ContactData}>
                 <h4>Enter your contact data</h4>
                {form}
            </div>
        )
    }
}

export default ContactData