import React, { Component } from 'react';
import {connect} from "react-redux"

import Auxiliary from '../../hoc/Auxiliary';
import classes from './Layout.module.css';
import Toolbar from "../Navigation/Toolbar/Toolbar";
import Sidedrawer from "../Navigation/SideDrawer/Sidedrawer";

class Layout extends Component {
    state = {
        showSideDrawer: false
    }

    sideDrawerClosedHandler = () => {
        this.setState( { showSideDrawer: false } );
    }

    sideDrawerToggleHandler = () => {
        this.setState( ( prevState ) => {
            return { showSideDrawer: !prevState.showSideDrawer };
        } );
    }

    render () {
        return (
            <Auxiliary>
                <Toolbar 
                isAuth-={this.props.isAuthenticated}
                drawerToggleClicked={this.sideDrawerToggleHandler} />
                <Sidedrawer
                    isAuth-={this.props.isAuthenticated}
                    open={this.state.showSideDrawer}
                    closed={this.sideDrawerClosedHandler} />
                <main className={classes.Content}>
                    {this.props.children}
                </main>
            </Auxiliary>
        )
    }
}

const mapStateToProps = state =>{
    return{
        isAuthenticated: state.auth.token !== null,

    }
}

export default connect(null, mapStateToProps)(Layout);