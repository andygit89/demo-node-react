import mongoose from 'mongoose';

/**
 * User Schema
 */
const UserSchema = new mongoose.Schema({
  username: {
    type: String,
    required: true
  },
  email: {
    type: String,
    required: true
  },
  password: {
    type: String,
    required: true
  },
  firstname: {
    type: String,
    required: true
  },
  lastname: {
    type: String,
    required: true
  },
  address_1: {
    type: String,
    required: true
  },
  address_2: {
    type: String,
    required: false
  },
  city: {
    type: String,
    required: false
  },
  postcode: {
    type: String,
    required: false
  },
  country: {
    type: String,
    required: false
  },
  mobileNumber: {
    type: String,
    required: true,
    match: [/^[1-9][0-9]{9}$/, 'The value of path {PATH} ({VALUE}) is not a valid mobile number.']
  },
  verify_code: {
    type: String,
    required: false
  },

  forgot_password_code: {
    type: String,
    required: false
  },
  auth_token: {
    type: String,
    required: false
  },
  platform: {
    type: String,
    required: false
  },
  ambassador_parent_id: {
    type: String,
    required: false
  },
  status: {
    type: String,
    required: false
  },
  role: {
    type: String,
    required: false
  },
  isActive: {
    type: Boolean,
    required: false
  }


}, {timestamps: true});

/**
 * Add your
 * - pre-save hooks
 * - validations
 * - virtuals
 */

/**
 * Methods
 */
UserSchema.method({
});

/**
 * Statics
 */
UserSchema.statics = {

};

/**
 * @typedef User
 */
export default mongoose.model('users', UserSchema);
