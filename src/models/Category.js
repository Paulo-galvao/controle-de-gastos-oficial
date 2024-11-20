import conn from "../config/conn.js";
const Schema = conn.Schema;

const categorySchema = new Schema({
    name: {
        type: String,
        required: true
    },
    total_price: {
        type: Number,
        default: 0
    },
    user: {
        type: Schema.Types.ObjectId,
        ref: "User"
    }
});

categorySchema.pre('save', function() {
    this.total_price = this.total_price.toFixed(2);
})

const Category = conn.model("Category", categorySchema);

export default Category;