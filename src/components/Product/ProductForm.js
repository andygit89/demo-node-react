/**
 * Created by ashish on 1/11/16.
 */



import React from 'react';


const ProductForm = ({login,onSave, onChange}) => {
  return (
    <form>
      <div className="form-group">
        <label for="exampleSelect1">Category:</label>
        <select className="form-control" id="exampleSelect1">
          <option>1</option>
          <option>2</option>
          <option>3</option>
          <option>4</option>
          <option>5</option>
        </select>
      </div>
      <div className="form-group">
        <label for="exampleSelect1">Sub Category: </label>
        <select className="form-control" id="exampleSelect1">
          <option>1</option>
          <option>2</option>
          <option>3</option>
          <option>4</option>
          <option>5</option>
        </select>
      </div>
      <div className="form-group">
        <label for="exampleInputEmail1"> Product Name:</label>
        <input type="text" className="form-control" id="exampleInputEmail1" aria-describedby="emailHelp" placeholder="Product Name:"/>
      </div>
      <div className="form-group">
        <label for="exampleInputPassword1">Product Alias: </label>
        <input type="password" className="form-control" id="exampleInputPassword1" placeholder="Product Alias:"/>
      </div>
      <div className="form-group">
        <label for="exampleTextarea">Short Description: (for google no page breaks) </label>
        <textarea className="form-control" id="exampleTextarea" rows="3"></textarea>
      </div>
      <div className="form-group">
        <label for="exampleTextarea">Short Description:</label>
        <textarea className="form-control" id="exampleTextarea" rows="3"></textarea>
      </div>
      <div className="form-group">
        <label for="exampleTextarea">Description</label>
        <textarea className="form-control" id="exampleTextarea" rows="3"></textarea>
      </div>
      <div className="form-group">
        <label for="exampleInputEmail1">Sales Tag Reference:</label>
        <input type="text" className="form-control" id="exampleInputEmail1" aria-describedby="emailHelp" placeholder="Sales Tag 	Reference:"/>
      </div>
      <div className="form-group">
        <label for="exampleInputEmail1">RRP (£)</label>
        <input type="text" className="form-control" id="exampleInputEmail1" aria-describedby="emailHelp" placeholder="RRP (£)"/>
      </div>
      <div className="form-group">
        <label for="exampleInputEmail1">Price (£)</label>
        <input type="text" className="form-control" id="exampleInputEmail1" aria-describedby="emailHelp" placeholder="Price (£)"/>
      </div>

      <div className="form-group">
        <label for="exampleSelect1">Including Vat</label>
        <select className="form-control" id="exampleSelect1">
          <option>1</option>
          <option>2</option>
          <option>3</option>
          <option>4</option>
          <option>5</option>
        </select>
      </div>
      <div className="form-group">
        <label for="exampleInputEmail1"> Weight (in kg, with 2 decimal places) eg: 2.20 </label>
        <input type="text" className="form-control" id="exampleInputEmail1" aria-describedby="emailHelp" placeholder=" Weight (in kg, with 2 decimal places) eg: 2.20 "/>
      </div>
      <div className="form-group">
        <label for="exampleInputEmail1">Delivery Cost (£)</label>
        <input type="text" className="form-control" id="exampleInputEmail1" aria-describedby="emailHelp" placeholder="Delivery Cost (£)"/>
      </div>
      <div className="form-group">
        <label for="exampleInputEmail1">Colour Trays:</label>
        <input type="text" className="form-control" id="exampleInputEmail1" aria-describedby="emailHelp" placeholder="Colour Trays:"/>
      </div>
      <div className="form-group">
        <label for="exampleInputEmail1">No Tray:</label>
        <input type="text" className="form-control" id="exampleInputEmail1" aria-describedby="emailHelp" placeholder="No Tray:"/>
      </div>
      <div className="form-group">
        <label for="exampleTextarea">Notes:</label>
        <textarea className="form-control" id="exampleTextarea" rows="3"></textarea>
      </div>
      <button type="submit" className="btn btn-primary">Submit</button>
    </form>
  );
};

ProductForm.propTypes = {
  login: React.PropTypes.object.isRequired,
  onSave: React.PropTypes.func.isRequired,
  onChange: React.PropTypes.func.isRequired

};

export default ProductForm;

