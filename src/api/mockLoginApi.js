/**
 * Created by ashish on 31/10/16.
 */
class LoginApi {




  static  login(login) {
    return new Promise((resolve, reject) => {
      login = Object.assign({}, login); // to avoid manipulating object passed in.
      fetch('/api/auth/authenticate', {
        method: 'post',
        headers: {
          'Accept': 'application/json',
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({
          email: login.email,
          password: login.password
        })
      })
        .then(function (response) {
          console.log('Status Code: ' + response.status);
          if (response.status == 200) {
            response.json().then(function (data) {
              console.log('Token is: ' + data.token);
              resolve(data)
            });
          } else {
            response.json().then(function (data) {
              reject(data.message)
            });

          }

        }).then(function (json) {
        console.log('parsed json', json);
      }).catch(function (ex) {
        console.log('parsing failed', ex);
      })
    });


  }

}

export default LoginApi
