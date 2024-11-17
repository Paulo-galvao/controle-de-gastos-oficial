import conn from "../config/conn.js";


const Schema = conn.Schema;

const userSchema = new Schema({
    name: {
        type: String,
        required: true
    }
});

const User = conn.model("User", userSchema);
export default User;