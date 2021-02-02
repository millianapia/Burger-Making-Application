import React, {Component} from "react"
import {Route} from "react-router-dom"

import ContactData from "./ContactData/ContactData"
import CheckoutSummary from "../../components/Order/CheckoutSummary/CheckoutSummary"

class CheckOut extends Component {
    state={
        ingredients: null,
        totalprice: 0
    }
    componentWillMount(){
        const query = new URLSearchParams(this.props.location.search);
        const ingredient = {};
        let price= 0;
        for (let param of query.entries()){
            if(param[0] === "price"){
                price = param[1]
            }
            else
            ingredient[param[0]] = +param[1]
        }
        this.setState({ingredients: ingredient, totalprice: price })
    }

    checkoutCancelledHandler = () => {
        this.props.history.goBack();
    }

    checkoutContinuedHandler = () => {
        this.props.history.replace("/checkout/contact-data");
    }

    render(){
        return(
            <div>
                <CheckoutSummary 
                ingredients={this.state.ingredients} 
                onCheckoutCancelled={this.checkoutCancelledHandler} 
                onCheckoutContinued={this.checkoutContinuedHandler}/>
                <Route path={this.props.match.path + "/contact-data"} render={(props) => (<ContactData {...props} ingredients={this.state.ingredients} price={this.state.totalprice}/>)}/>
            </div>
        );
    }
}

export default CheckOut;