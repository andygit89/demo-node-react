/**
 * Created by ashish on 1/11/16.
 */
/**
 * Created by ashish on 31/10/16.
 */
import React, { PropTypes } from 'react';
import { connect } from 'react-redux';
import {bindActionCreators} from 'redux';
import * as loginActions from '../../actions/loginActions';
import ProductForm from './ProductForm';

class ProductPage extends React.Component {
  constructor(props, context) {
    super(props , context);
    this.state = {
      login: Object.assign({}, props.login),
      errors: {}
    };
    this.onClickSubmit = this.onClickSubmit.bind(this);
    this.updateLoginState = this.updateLoginState.bind(this);

  }



  onClickSubmit(event){
    //event.preventDefault();
    //alert("Hello1"+JSON.stringify(this.state.login));
    event.preventDefault();
    this.props.actions.createLogin(this.state.login);
    //this.context.router.push('/courses');
    this.context.router.push('/');
  }

  updateLoginState(event) {
    const field = event.target.name;
    const login = this.state.login;
    login[field] = event.target.value;
    return this.setState({ login: login });
  }

  render() {
    return (
      <ProductForm

        login={this.state.login}
        onSave={this.onClickSubmit}
        onChange={this.updateLoginState}
      />
    );
  }
}

ProductPage.contextTypes = {
  router: PropTypes.object
};

ProductPage.propTypes = {
  login: PropTypes.object.isRequired,
  actions: PropTypes.object.isRequired
  // myProp: PropTypes.string.isRequired
};
//export default LoginPage;

function mapStateToProps (state, ownProps) {

  let login = {email: '', password: ''};


  return {
    login: login,
  };
}

function mapDispatchToProps (dispatch) {
  return {
    actions: bindActionCreators(loginActions, dispatch)
  };
}

export default connect(mapStateToProps, mapDispatchToProps)(ProductForm);
