import 'dotenv/config'
import orderModel from "../models/orderModel.js";
import userModel from "../models/userModel.js";
import Stripe from "stripe";

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY);

// placing user order for frontend
const placeOrder = async (req, res) => {

    const frontend_url = "http://localhost:5173";

    try {

        if (!req.body.items || req.body.items.length === 0) {
            return res.json({ success:false, message:"Cart is empty" })
        }

        const newOrder = new orderModel({
            userId: req.body.userId || req.userId,
            items: req.body.items,
            amount: req.body.amount,
            address: req.body.address
        });

        await newOrder.save();

        await userModel.findByIdAndUpdate(newOrder.userId,{cartData:{}});

        const line_items = req.body.items.map((item) => ({
            price_data: {
                currency: "inr",
                product_data: {
                    name: item.name
                },
                unit_amount: item.price * 100
            },
            quantity: item.quantity
        }));

        // delivery charges
        line_items.push({
            price_data:{
                currency:"inr",
                product_data:{
                    name:"Delivery Charges"
                },
                unit_amount: 2 * 100
            },
            quantity:1
        });

        const session = await stripe.checkout.sessions.create({
            line_items,
            mode:"payment",
            success_url:`${frontend_url}/verify?success=true&orderId=${newOrder._id}`,
            cancel_url:`${frontend_url}/verify?success=false&orderId=${newOrder._id}`
        });

        res.json({
            success:true,
            session_url:session.url
        });

    } catch (error) {

        console.log("ORDER ERROR:", error);

        res.json({
            success:false,
            message:error.message
        });
    }
};

export { placeOrder };