import mongoose from 'mongoose';

const orderSchema = new mongoose.Schema({
    user: {
        type: mongoose.Types.ObjectId,
        ref: 'users' 
    },
    //what user ordered
    book: {
        type: mongoose.Types.ObjectId,
        ref: 'books' 
    },
    //status of order
    status: {
        type: String,
        default: 'Order Placed',
        enum: [
            'Order Placed',
            'Out for Delivery',
            'Order Delivered',
            'Order Cancelled',
            'Order Returned'
        ]
    }
}, {timestamps: true});

const Order = mongoose.model('orders', orderSchema);

export default Order;