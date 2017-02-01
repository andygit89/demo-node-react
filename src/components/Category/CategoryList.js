import React, { PropTypes } from 'react';
import CategoryListRow from './CategoryListRow';
import { Link } from 'react-router';
import { Table } from 'react-bootstrap';



const CategoryList = ({categories, onDelete, onHide}) => {
  return (

    <Table responsive>
      <thead>
        <tr>
          <th>Name</th>
          <th>Slug</th>
          <th>Description</th>
          <th>CreatedAt</th>
          <th>Action</th>
        </tr>
      </thead>
      <tbody>
      {categories.map(category =>
        <tr>
          <td><Link to={'/admin/manageCategory/' + category._id}>{category.name}</Link></td>
          <td>{category.slug}</td>
          <td>{category.description}</td>
          <td>{category.createdAt}</td>
          <td>
            <Link  to={'/admin/manageCategory/' + category._id} className="btn btn-success"><i className="fa fa-edit"></i></Link>
            <input className="btn btn-danger leftMargin" type="button" value="Delete" data-id={category._id} onClick={onDelete}/>

          </td>
        </tr>
      )}


      </tbody>
  </Table>

  );
};

CategoryList.propTypes = {
  categories: PropTypes.array.isRequired
}

export default CategoryList;
