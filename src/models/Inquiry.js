import mongoose from 'mongoose';

const InquirySchema = new mongoose.Schema({
  name: String,
  email: String,
  phone: String,
  productId: { type: mongoose.Schema.Types.ObjectId, ref: 'Product' },
  productSnapshot: Object,
  message: String,
  status: { type: String, default: 'new' },
  createdAt: { type: Date, default: Date.now },
});

export default mongoose.models.Inquiry ||
  mongoose.model('Inquiry', InquirySchema);
