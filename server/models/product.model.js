/**
 * Created by ashish on 12/11/16.
 */

import mongoose from 'mongoose';

/**
 * Product Schema
 */
const productSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true
  },
  slug: {
    type: String,
    required: true
  },
  sku: {
    type: String,
    required: true
  },
  stock_status: {
    type: String,
    required: true
  },
  quantity: {
    type: String,
    required: true
  },
  variants:[{
    color: [{
      sku: {
        type: Number,
        required: true
      },
      quantity: {
        type: Number,
        required: true
      },
      availability: {
        type: Number,
        required: true
      },
      stock_status: {
        type: Number,
        required: true
      },
      image: {
        type: Number,
        required: true
      }
    }]
  }],
  desc : [
    {
      lang : {
        type: Number,
        required: true
      },
      val : {
        type: Number,
        required: true
      }
    }
  ],
  pricing : [
    {
      usd : {
        price : {
          type: Number,
          required: true
        }
      },
      euro : {
        price : {
          type: Number,
          required: true
        }
      },
      pound : {
        price : {
          type: Number,
          required: true
        }
      },
      cad : {
        price : {
          type: Number,
          required: true
        }
      }
    }
  ],
  category : {
    type: String,
    required: true
  },
  assets : {
    imgs : [
      {
        img : {
          src : {
            type: String,
            required: true
          }
        }
      }
    ]
  },
  shipping : {
    dimensions : {
      height :  {
        type: Number,
        required: true
      },
      length :  {
        type: Number,
        required: true
      },
      width :  {
        type: Number,
        required: true
      }
    },
    weight :  {
      type: Number,
      required: true
    }
  },
  ingredients : {
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
productSchema.method({
});

/**
 * Statics
 */
productSchema.statics = {

};

/**
 * @typedef Product
 */
export default mongoose.model('products', productSchema);
