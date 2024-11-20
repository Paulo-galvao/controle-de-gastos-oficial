import conn from "../config/conn.js";
const Schema = conn.Schema;

const productSchema = new Schema({
    name: {
        type: String,
        required: true
    },
    price: {
        type: Number,
        required: true
    },
    category: {
        type: Schema.Types.ObjectId,
        ref: "Category"
    }
});

productSchema.pre('save', function() {
    this.price = this.price.toFixed(2);
});

const Product = conn.model("Product", productSchema);

export default Product;