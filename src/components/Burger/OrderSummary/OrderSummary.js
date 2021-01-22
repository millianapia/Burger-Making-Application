import React, {Component} from "react";
import Auxiliary from "../../../hoc/Auxiliary";
import Button from "../../UI/Button/Button"

class OrderSummary extends Component{ 
    componentDidUpdate(){
        console.log("ordersummary - did update");
    }

    render(){
    const ingredientSummary = Object.keys(this.props.ingredients).map(igKey =>{
        return <li key={igKey}><span style={{textTransform: "capitalize"}}>{igKey}</span>: {this.props.ingredients[igKey]}</li>
    });

    return (
        <Auxiliary>
            <h3>Your Order</h3>
            <p>A delicous Burger with the following ingredients: </p>
            <ul>
                {ingredientSummary}
            </ul>
            <p><strong>Total Price: {this.props.price.toFixed(2)} $</strong></p>
            <p>Continue to check out</p>
            <Button clicked={this.props.purchaseCancel} btnType={"Danger"}>CANCEL</Button>
            <Button clicked={this.props.purchaseContinue} btnType={"Success"}>CONTINUE</Button>

        </Auxiliary>
    )
}}


export default OrderSummary