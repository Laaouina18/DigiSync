// controllers/paymentController.js
import Payment from '../models/Payement.js';
import Appartement from '../models/Appartment.js';


  export const  createPayment=async(req, res) => {
    try {
      const payment = new Payment({
        ...req.body,
        datePayment: new Date()
      });
      await  payment.save();

       await Appartement.findByIdAndUpdate(
        req.body.appartement,
        { $push: { payments: payment._id } }
      );

      res.status(201).json(payment);
    } catch (error) {
      res.status(500).json({ message: error.message });
    }
  }

 export const   getPayments= async(req, res)  =>{
    try {
      const { appartementId, month, year } = req.query;
      let query = {};

      if (appartementId) query.appartement = appartementId;
      if (month) query.month = month;
      if (year) query.year = year;

      const payments = await Payment.find(query)
        .populate('appartement');
      
      res.status(200).json(payments);
    } catch (error) {
      res.status(500).json({ message: error.message });
    }
  }

  export const updatePayment=async(req, res) => {
    try {
      const { id } = req.params;
      const updatedPayment = await Payment.findByIdAndUpdate(
        id,
        req.body,
        { new: true }
      );
      res.status(200).json(updatedPayment);
    } catch (error) {
      res.status(500).json({ message: error.message });
    }
  }

