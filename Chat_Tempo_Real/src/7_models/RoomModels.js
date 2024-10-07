const mongoose = require('mongoose');
const { v4: uuidv4 } = require('uuid')

const roomSchema = new mongoose.Schema({
    _id :{
        type: String,
        default: uuidv4,
    },
    name: { 
        type: String, 
        required: true 
    },

    description: String,
    
    capacity: { 
        type: Number, 
        required: true 
    },
    
    participants: [{ type: String }],

    isActive: { 
        type: Boolean, 
        default: true 
    },
    createdAt: { 
        type: Date, 
        default: Date.now 
    },

});

module.exports = mongoose.model('room', roomSchema);