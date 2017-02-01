// This component handles the App template used on every page

import React, { PropTypes } from 'react';
//import Header from './common/header';

class LoginLayout extends React.Component {
  render() {
    return (
      <div className="container-fluid">
        {this.props.children}
      </div>
    );
  }
}

LoginLayout.propTypes = {
  children: PropTypes.object.isRequired
};

export default LoginLayout;
