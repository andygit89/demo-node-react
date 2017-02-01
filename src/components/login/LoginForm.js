/**
 * Created by ashish on 31/10/16.
 */
import React from 'react';


const LoginForm = ({login,onSave, onChange}) => {
  return (
    <div className="container">
      <div className="row">
        <div className="col-md-4 col-md-offset-2">
          <div className="panel panel-default">
            <div className="panel-heading">
              <h3 className="panel-title">Please sign in</h3>
            </div>
            <div className="panel-body">
              <form accept-charset="UTF-8" role="form">
                <fieldset>
                  <div className="form-group">
                    <input className="form-control" placeholder="E-mail" name="email" type="text" value={login.email} onChange={onChange}/>
                  </div>
                  <div className="form-group">
                    <input className="form-control" placeholder="Password" name="password" type="password" value={login.password} onChange={onChange}/>
                  </div>
                  <div className="checkbox">
                    <label>
                      <input name="remember" type="checkbox" value="Remember Me"/> Remember Me
                    </label>
                  </div>
                  <input className="btn btn-lg btn-success btn-block" type="submit" value="Login" onClick={onSave}/>
                </fieldset>
              </form>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

LoginForm.propTypes = {
  login: React.PropTypes.object.isRequired,
  onSave: React.PropTypes.func.isRequired,
  onChange: React.PropTypes.func.isRequired

};

export default LoginForm;
