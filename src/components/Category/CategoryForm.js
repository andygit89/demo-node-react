/**
 * Created by admin1 on 2/11/16.
 */



import React from 'react';
import {FormGroup , Radio, ControlLabel} from 'react-bootstrap';

const CategoryForm = ({category,onSave, onChange}) => {
  return (
    <form>
      
      <div className="form-group">
        <label for="name"> Category Name :</label>
        <input type="text" className="form-control" name="name"  placeholder="Category Name:" value={category.name} onChange={onChange}/>
      </div>

      <FormGroup>
        <ControlLabel>Status : </ControlLabel>
        <FormGroup>
          <Radio inline name="status" checked={category.status == "1"} value="1" onChange={onChange}>
            Active
          </Radio>
          {' '}
          <Radio inline name="status" value="0" checked={category.status == "0"} onChange={onChange}>
            Inactive
          </Radio>
        </FormGroup>
      </FormGroup>

      <div className="form-group">
        <label for="name"> Category Image URL :</label>
        <input type="text" className="form-control" name="cat_img"  placeholder="Image URL:" value={category.cat_img} onChange={onChange}/>
      </div>

      <div className="form-group">
        <label for="description">Description : </label>
        <textarea className="form-control" name="description" rows="3" value={category.description} onChange={onChange}></textarea>
      </div>
      <button type="submit" className="btn btn-primary" onClick={onSave}><i class="fa fa-floppy-o" aria-hidden="true"></i>Save</button>
    </form>
  );
};

CategoryForm.propTypes = {
  category: React.PropTypes.object.isRequired,
  onSave: React.PropTypes.func.isRequired,
  onChange: React.PropTypes.func.isRequired

};

export default CategoryForm;

