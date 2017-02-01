/**
 * Created by admin1 on 3/11/16.
 */


import React, { PropTypes } from 'react';
import { connect } from 'react-redux';
import {bindActionCreators} from 'redux';
import * as categoryActions from '../../actions/categoryActions';
import CategoryForm from './CategoryForm';
import CategoryList from './CategoryList';
import { browserHistory } from 'react-router';
import slug from 'slug'
import toastr from 'toastr';
import randomstring from 'randomstring';


class ManageCategoryPage extends React.Component {
  constructor(props, context) {
    super(props , context);
    this.state = {
      category: Object.assign({}, props.category),
      errors: {},
    };
    this.onClickSubmit = this.onClickSubmit.bind(this);
    this.updateCategoryState = this.updateCategoryState.bind(this);
  }

  componentWillReceiveProps(nextProps) {
    if (this.props.category._id != nextProps.category._id) {
      // Necessary to populate form when existing course is loaded directly.
      this.setState({ category: Object.assign({}, nextProps.category) });
    }
  }

  onClickSubmit(event){
    event.preventDefault();
    // this.state.category.cat_img = 'https://acti-labs.com/me/buy-start-kit/col1x.jpg';

    if(!this.props.category._id){
      this.state.category.slug = slug(this.state.category.name)+'-'+randomstring.generate(6);
    }
    this.props.actions.saveCategory(this.state.category)
    .then(() => this.redirect())
      .catch(error => {
        toastr.error(error);
      });
  }

  redirect() {
    toastr.success('Category saved');
    this.context.router.push('/admin/category');
  }
  updateCategoryState(event) {
    const field = event.target.name;
    const category = this.state.category;
    category[field] = event.target.value;
    return this.setState({ category: category });
  }


  render() {
    return (
      <CategoryForm
        category={this.state.category}
        onSave={this.onClickSubmit}
        onChange={this.updateCategoryState}
        />
    );
  }
}

ManageCategoryPage.contextTypes = {
  router: PropTypes.object
};

ManageCategoryPage.propTypes = {
  category: PropTypes.object.isRequired,
  actions: PropTypes.object.isRequired
};
//export default LoginPage;

function getCategoryById(categories, id) {
  const category = categories.filter((category) => category._id === id);
  if (category.length) return category[0];
  return null;
}

function mapStateToProps (state, ownProps) {
  const categoryId = ownProps.params.id;
  let category = {name: '', slug: '',description: '',cat_img:''};
  if (categoryId && state.categories.length) {
    category = getCategoryById(state.categories, categoryId);
  }

  return {
    category: category
  };
}

function mapDispatchToProps (dispatch) {
  return {
    actions: bindActionCreators(categoryActions, dispatch)
  };
}

export default connect(mapStateToProps, mapDispatchToProps)(ManageCategoryPage);
