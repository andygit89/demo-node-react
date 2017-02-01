/**
 * Created by ashish on 31/10/16.
 */
import React, { PropTypes } from 'react';
import { connect } from 'react-redux';
import {bindActionCreators} from 'redux';
import * as loginActions from '../../actions/loginActions';
import LoginForm from './LoginForm';
import toastr from 'toastr';


class LoginPage extends React.Component {
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
    event.preventDefault();
    this.props.actions.createLogin(this.state.login)
      .then(() => this.redirect())
      .catch(error => {
        toastr.error(error);
      });
  }
  redirect() {
    this.context.router.push('/admin');
  }

  updateLoginState(event) {
    const field = event.target.name;
    const login = this.state.login;
    login[field] = event.target.value;
    return this.setState({ login: login });
  }

  render() {
    return (
      <LoginForm

        login={this.state.login}
        onSave={this.onClickSubmit}
        onChange={this.updateLoginState}
      />
    );
  }
}

LoginPage.contextTypes = {
  router: PropTypes.object
};

LoginPage.propTypes = {
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

export default connect(mapStateToProps, mapDispatchToProps)(LoginPage);
