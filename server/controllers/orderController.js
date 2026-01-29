import Course from '../models/courseModel.js';
import razorpay from 'razorpay';
import User from '../models/userModel.js';
import dotenv from 'dotenv';
dotenv.config();
const razorpayInstance = new razorpay({
  key_id: process.env.RAZORPAY_KEY_ID,
  key_secret: process.env.RAZORPAY_SECRET,
});

export const createOrder = async (req, res) => {
  try {
    const { courseId } = req.body;

    const course = await Course.findById(courseId);
    if (!course) return res.status(404).json({ message: 'Course not found' });

    const options = {
      amount: course.price * 100, // in paisa
      currency: 'INR',
      receipt: `${courseId}.toString()`,
    };

    const order = await razorpayInstance.orders.create(options);
    return res.status(200).json(order);
  } catch (err) {
    console.log(err);
    return res.status(500).json({ message: `Order creation failed ${err}` });
  }
};

import crypto from 'crypto';

export const verifyPayment = async (req, res) => {
  try {
    const { razorpay_order_id, razorpay_payment_id, razorpay_signature, courseId, userId } = req.body;

    const body = razorpay_order_id + "|" + razorpay_payment_id;

    const expectedSignature = crypto
      .createHmac('sha256', process.env.RAZORPAY_SECRET)
      .update(body.toString())
      .digest('hex');

    const isAuthentic = expectedSignature === razorpay_signature;

    if (isAuthentic) {
      // Payment is legit. Proceed with database updates.

      // 1. Update User Enrollment
      const user = await User.findById(userId);
      if (!user.enrolledCourses.includes(courseId)) {
        user.enrolledCourses.push(courseId);
        await user.save();
      }

      // 2. Update Course Student List
      const course = await Course.findById(courseId).populate('lectures'); // populate needed? maybe not for pushing ID but keeping logic
      if (!course.enrolledStudents.includes(userId)) {
        course.enrolledStudents.push(userId);
        await course.save();
      }

      return res.status(200).json({ message: 'Payment verified and enrollment successful' });
    } else {
      return res.status(400).json({ message: 'Payment verification failed (Invalid Signature)' });
    }
  } catch (error) {
    console.log(error);
    return res.status(500).json({ message: 'Internal server error during payment verification' });
  }
};
