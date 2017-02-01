/**
 * Created by admin1 on 2/11/16.
 */
import mongoose from 'mongoose';

/**
 * Category Schema
 */
const categorySchema = new mongoose.Schema({
  name: {
    type: String,
    required: true
  },
  slug: {
    type: String,
    required: true
  },
  description: {
    type: String,
    required: true
  },
  status: {
    type: String,
    required: true
  },
  cat_img: {
    type: String,
    required: true
  }
},{timestamps: true});

/**
 * Add your
 * - pre-save hooks
 * - validations
 * - virtuals
 */

/**
 * Methods
 */
categorySchema.method({
});

/**
 * Statics
 */
categorySchema.statics = {

};

/**
 * @typedef Category
 */
export default mongoose.model('categories', categorySchema);
