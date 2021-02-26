import React, { Component } from 'react';
import {Route, Switch, withRouter, Redirect} from "react-router-dom"
import {connect} from "react-redux"

import Layout from './components/Layout/Layout';
import BurgerBuilder from './containers/BurgerBuilder/BurgerBuilder';
import CheckOut from "./containers/CheckOut/CheckOut"
import Orders from "./containers/Orders/Orders"
import Auth from "./containers/Auth/Auth"
import Logout from "./containers/Auth/Logout/Logout"
import * as actions from "./store/actions/index"

class App extends Component {
  componentDidMount(){
    this.props.onTryAutoSignup()
  }


  render () {

    let routes = (
      <Switch>
      <Route path="/auth"  component={Auth} />
      <Route path="/" exact component={BurgerBuilder} />
      <Redirect to="/"/>
      </Switch>
    )

    if(this.props.isAuthenticated){
      routes= (
        <Switch>
          <Route path="/checkout"  component={CheckOut} />
          <Route path="/orders"  component={Orders} />
          <Route path="/logout"  component={Logout} />
          <Route path="/" exact component={BurgerBuilder} />
          <Redirect to="/"/>
        </Switch>


      )
    }
    return (
      <div>
        <Layout>
          {routes}
        </Layout>
      </div>
    );
  }
}

const mapStateToProps = state => {
  return{
    isAuthenticated: state.auth.token !== null,
  }
}

const mapDispatchedToProps = dispatch =>{
  return{
    onTryAutoSignup: () => dispatch(actions.authCheckState())
  }
}

export default withRouter(connect(mapStateToProps, mapDispatchedToProps)(App));
