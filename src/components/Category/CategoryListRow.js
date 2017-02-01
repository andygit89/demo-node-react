/**
 * Created by ashish on 2/11/16.
 */
import React, { PropTypes } from 'react';
import { Link } from 'react-router';

const CategoryListRow = ({category}) => {
  return (
    <tr>
      <td><Link to={'/adimin/manageCategory/' + category._id}>{category.categoryName}</Link></td>
      <td>"Button"</td>
    </tr>
  );
};

CategoryListRow.propTypes = {
  category: PropTypes.object.isRequired
}

export default CategoryListRow;
