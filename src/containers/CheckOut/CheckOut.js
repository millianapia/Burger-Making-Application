import React, {Component} from "react"
import {Route} from "react-router-dom"

import ContactData from "./ContactData/ContactData"
import CheckoutSummary from "../../components/Order/CheckoutSummary/CheckoutSummary"
import {connect} from "react-redux"


class CheckOut extends Component {

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
                ingredients={this.props.ings} 
                onCheckoutCancelled={this.checkoutCancelledHandler} 
                onCheckoutContinued={this.checkoutContinuedHandler}/>
                <Route path={this.props.match.path + "/contact-data"} component={ContactData} />
            </div>
        );
    }
}

const mapStateToProps = state =>{
    return{
        ings: state.ingredients,
    }
}


export default connect(mapStateToProps)(CheckOut);