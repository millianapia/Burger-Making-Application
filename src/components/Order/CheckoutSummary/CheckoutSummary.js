import React from "react"

import Button from "../../UI/Button/Button"
import Burger from "../../Burger/Burger"
import classes from "./CheckoutSummary.module.css"

const checkoutSummary = (props) =>{
    return(
        <div className={classes.CheckoutSummary}>
            <h1>Enjoy your meal!</h1>
            <div style={{width: "100%", margin: "auto"}}>
                <Burger ingredients={props.ingredients}/>
            </div>
        <Button btnType="Danger" clicked={props.onCheckoutCancelled}>CANCEL</Button>
        <Button btnType="Success" clicked={props.onCheckoutContinued}>CONTINUE</Button>

        </div>
    )
}

export default checkoutSummary