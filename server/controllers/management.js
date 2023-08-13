import mongoose from "mongoose";
import User from "../models/UserSchema.js";
import Transaction from "../models/Transaction.js";

export const getAdmins = async (req, res) => {
  try {
    const admins = await User.find({ role: "admin" }).select("-password");
    res.status(200).json(admins);
  } catch (error) {
    res.status(404).json({ message: error.message });
  }
};

// Aggregate calls
export const getUserPerformance = async (req, res) => {
  try {
    const { id } = req.params;

    const userWithStats = await User.aggregate([
      // Lấy id từ params và convert lại về dạng đúng theo key là ObjectId của MongoDB, so sánh và tìm user với Id trùng khớp
      { $match: { _id: new mongoose.Types.ObjectId(id) } },
      {
        $lookup: {
          from: "affiliatestats", // lấy thông tin từ model của affiliatestats
          localField: "_id",
          foreignField: "userId",
          as: "affiliateStats",
        },
      },
      { $unwind: "$affiliateStats" }, // Flatten (làm phẳng) kết quả trả về, đã bao gồm thông tin người dùng + thông tin về AffiliateStat của người dùng đó
    ]);

    const saleTransactions = await Promise.all(
      userWithStats[0].affiliateStats.affiliateSales.map((id) => {
        return Transaction.findById(id);
      })
    );

    const filterSaleTransactions = saleTransactions.filter(
      (transaction) => transaction != null
    );

    res
      .status(200)
      .json({ user: userWithStats[0], sales: filterSaleTransactions });
  } catch (error) {
    res.status(404).json({ message: error.message });
  }
};
