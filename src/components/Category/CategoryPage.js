/**
 * Created by admin1 on 2/11/16.
 */

import React, { PropTypes } from 'react';
import { connect } from 'react-redux';
import {bindActionCreators} from 'redux';
import * as categoryActions from '../../actions/categoryActions';
import CategoryForm from './CategoryForm';
import CategoryList from './CategoryList';
import { browserHistory } from 'react-router';
import toastr from 'toastr';
//import {loadCategory} from '.././actions/categoryActions';
import {Modal,Button} from 'react-bootstrap';



class CategoryPage extends React.Component {
  constructor(props, context) {
    super(props , context);
    this.redirectToAddCoursePage = this.redirectToAddCoursePage.bind(this);
    this.onClick = this.onClick.bind(this);
    this.onCategoryHide = this.onCategoryHide.bind(this);
    this.state={showModal:false};


  }
  componentDidMount(){
    this.props.actions.loadCategory()
  }
  redirectToAddCoursePage() {
    browserHistory.push('/admin/manageCategory');
  }
  onCategoryHide(event){
    event.preventDefault();
    var json = {};
    var flag = true;
    var categoryId = event.target.getAttribute("data-id");
    if(event.target.value === 'Displayed'){
      event.target.value = 'Hidden'
      flag = false;
    }else{
      flag = true;
      event.target.value = 'Displayed'

    }
    json['displayed'] = flag;
    json['categoryId'] = categoryId;
    this.props.actions.hideCategory(json)
    .then(() => toastr.success('Category Hided'))
      .catch(error => {
        toastr.error(error);
      });
  }


  onClick(event){
    event.preventDefault();
    var categoryId = event.target.getAttribute("data-id");
    // console.log(categoryId,"state")
    this.setState({ showModal: true, tempcat: categoryId});
    // this.props.actions.deleteCategory(categoryId)
    //   .then(() => toastr.success('Category Deleted'))
    //   .catch(error => {
    //     toastr.error(error);
    //   });
  }
 close() {
    this.setState({ showModal: false });
  }

  // open() {
  //   this.setState({ showModal: true });
  // }
  delCat(){
    console.log(this.state,"state1");
    var categoryId = this.state.tempcat;
    this.setState({ showModal: false });
    this.props.actions.deleteCategory(categoryId)
      .then(() => toastr.success('Category Deleted'))
      .catch(error => {
        toastr.error(error);
      });
  }
  render() {
    const { categories } = this.props
    return (
    <div>
      <input type="submit" value="Add Category" className="btn btn-primary" onClick={this.redirectToAddCoursePage}/>
      <CategoryList categories = {categories} onDelete={this.onClick} onHide = {this.onCategoryHide}
      />
      <Modal show={this.state.showModal} onHide={this.close.bind(this)}>
          <Modal.Header closeButton>
            <Modal.Title>Delete Category</Modal.Title>
          </Modal.Header>
          <Modal.Body>
            <h4>Are you sure you want to delete this category?</h4>
          </Modal.Body>
          <Modal.Footer>
            <Button onClick={this.close.bind(this)}>Cancel</Button>
            <Button bsStyle="danger" onClick={this.delCat.bind(this)}>Delete</Button>
          </Modal.Footer>
        </Modal>
    </div>

  );
  }
}

CategoryPage.contextTypes = {
  router: PropTypes.object
};

CategoryPage.propTypes = {

  categories:PropTypes.array.isRequired
};
//export default LoginPage;

function mapStateToProps (state, ownProps) {
  return {
    categories:state.categories
  };
}

function mapDispatchToProps (dispatch) {
  return {
    actions: bindActionCreators(categoryActions, dispatch)
  };
}

export default connect(mapStateToProps, mapDispatchToProps)(CategoryPage);
