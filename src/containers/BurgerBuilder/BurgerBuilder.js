import React, { Component } from 'react';
import {connect} from "react-redux"
import axios from "../../axios-orders"

import Auxiliary from '../../hoc/Auxiliary';
import Burger from '../../components/Burger/Burger';
import BuildControls from '../../components/Burger/BuildControls/BuildControls';
import Modal from '../../components/UI/Modal/Modal';
import OrderSummary from '../../components/Burger/OrderSummary/OrderSummary';
import Spinner from "../..//components/UI/Spinner/Spinner"
import withErrorHandler from "../../hoc/withErrorHandler/withErrorHandler"
import * as burgerBuilderActions from "../../store/actions/index"




class BurgerBuilder extends Component {

    state = {
        purchasing: false,
    }

    componentDidMount(){
        this.props.onInitIngredients()
    }

    updatePurchaseState (ingredients) {
        const sum = Object.keys( ingredients )
            .map( igKey => {
                return ingredients[igKey];
            } )
            .reduce( ( sum, el ) => {
                return sum + el;
            }, 0 );
        return sum > 0 ;
    }

    purchaseHandler = () => {
        this.setState({purchasing: true});
    }

    purchaseCancelHandler = () => {
        this.setState({purchasing: false});
    }

    purchaseContinueHandler = () => {
        this.props.history.push("/checkout")
    }

    render () {
        const disabledInfo = {
            ...this.props.ings
        };
        for ( let key in disabledInfo ) {
            disabledInfo[key] = disabledInfo[key] <= 0
        }

        // sets it null so it is empty as it uses ingredients that are null before it retrieves it from the firebase database 
        let orderSummary = null;

        // checks if it can download the ingredients before it starts the loader - as it should not load when it has an error
        let burger = this.props.error ? <p>Ingredients cant be loaded!</p> : <Spinner />

        // checks if ingredients are not null as it needs time to retrieve it from the firebase - or else an error occurs
        if(this.props.ings){ 
            burger = (
                 <Auxiliary>
                    <Burger ingredients={this.props.ings} />
                    <BuildControls
                        ingredientAdded={this.props.onIngredientAdded}
                        ingredientRemoved={this.props.onIngredientRemoved}
                        disabled={disabledInfo}
                        purchasable={this.updatePurchaseState(this.props.ings)}
                        ordered={this.purchaseHandler}
                        price={this.props.price} />
                </Auxiliary>
        )
        orderSummary= <OrderSummary 
        ingredients={this.props.ings}
        price={this.props.price}
        purchaseCancel={this.purchaseCancelHandler}
        purchaseContinue={this.purchaseContinueHandler} />
    }

        return (
            <Auxiliary>
                {burger}
                <Modal show={this.state.purchasing} modalClosed={this.purchaseCancelHandler}>
                    {orderSummary}
                </Modal>
              
            </Auxiliary>
        );
    }
}

const mapStateToProps = state => {
    return{
        ings: state.ingredients,
        price: state.totalPrice,
        error: state.error
    }
}

const mapDispatchedToProps = dispatch => {
    return{
        onIngredientAdded: (ingName) => dispatch(burgerBuilderActions.addIngredient(ingName)),
        onIngredientRemoved: (ingName) => dispatch(burgerBuilderActions.removeIngredient(ingName)),
        onInitIngredients: () => dispatch(burgerBuilderActions.initIngredients())

    }
}

export default connect(mapStateToProps, mapDispatchedToProps)(withErrorHandler(BurgerBuilder, axios));