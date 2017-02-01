/**
 * Created by admin1 on 2/11/16.
 */
/**
 * Created by ashish on 31/10/16.
 */
class CategoryApi {

  static requestHeaders() {
    return {'AUTHORIZATION': `Bearer ${sessionStorage.jwt}`}
  }

  static  saveCategory(category) {

    return new Promise((resolve, reject) => {
      category = Object.assign({}, category); // to avoid manipulating object passed in.
      fetch('/api/category', {
        method: 'post',
        headers: {
          'Accept': 'application/json',
          'Content-Type': 'application/json',
          'AUTHORIZATION': `Bearer ${sessionStorage.jwt}`
        },
        body: JSON.stringify(category)
      })
        .then(function (response) {
          console.log('Status Code: ' + response.status);
          if (response.status == 200) {
            response.json().then(function (data) {
              resolve(data)
            });
          } else {
            reject("Error")
          }

        }).then(function (json) {
          console.log('parsed json', json);
        }).catch(function (ex) {
          console.log('parsing failed', ex);
        })
    });


  }

  static getAllCategory(){
    const headers = this.requestHeaders();

    return new Promise((resolve, reject) => {

      fetch('/api/category', {
        method: 'get',
        headers: headers
      })
        .then(function (response) {
          console.log('Status Code: ' + response.status);
          if (response.status == 200) {
            response.json().then(function (data) {
              resolve(data)
            });
          } else {
            reject("Error")
          }

        }).then(function (json) {
        console.log('parsed json', json);
      }).catch(function (ex) {
        console.log('parsing failed', ex);
      })
    });

  }

  static deleteCategory(categoryId){

    return new Promise((resolve, reject) => {

      fetch('/api/category/'+categoryId, {
        method: 'delete',
        headers: {
          'Accept': 'application/json',
          'Content-Type': 'application/json',
          'AUTHORIZATION': `Bearer ${sessionStorage.jwt}`
        },
      })
        .then(function (response) {
          console.log('Status Code: ' + response.status);
          if (response.status == 200) {
            response.json().then(function (data) {
              resolve(data)
            });
          } else {
            reject("Error")
          }

        }).then(function (json) {
          console.log('parsed json', json);
        }).catch(function (ex) {
          console.log('parsing failed', ex);
        })
    });

  }

  static hideCategory(json){

    return new Promise((resolve, reject) => {

      fetch('/api/category', {
        method: 'put',
        headers: {
          'Accept': 'application/json',
          'Content-Type': 'application/json',
          'AUTHORIZATION': `Bearer ${sessionStorage.jwt}`
        },
        body: JSON.stringify(json)
      })
        .then(function (response) {
          console.log('Status Code: ' + response.status);
          if (response.status == 200) {
            response.json().then(function (data) {
              resolve(data)
            });
          } else {
            reject("Error")
          }

        }).then(function (json) {
          console.log('parsed json', json);
        }).catch(function (ex) {
          console.log('parsing failed', ex);
        })
    });

  }
}





export default CategoryApi
