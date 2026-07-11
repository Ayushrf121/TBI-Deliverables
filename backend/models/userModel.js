import mongoose from "mongoose";

const schema = mongoose.Schema({
    name: {
        type: String,
        required: true,
        minlength: [3, "Name must be at least 3 characters long"],
        maxlength: [30, "Name must be at most 30 characters long"]
    },
    email: {
        type: String,
        required: true,
        unique: true,
        match: [/\S+@\S+\.\S+/, 'Please use a valid email address.']
    },
    password: {
        type: String,
        default: null
    },
    provider: {
        type: String,
        default: "local"
    },
    email_verified: {
        type: Boolean,
        default: false // Optional for local, can be updated later
    },
    // Sub: An identifier for the user, unique among all Google accounts and never reused. A Google account can have multiple emails at different points in time, but the sub value is never changed. Use sub within your application as the unique-identifier key for the user.
    sub: {
        type: String,
        required: function () { return this.provider === 'google'; } 
    }
});

export default mongoose.model('sip_user_db', schema);
