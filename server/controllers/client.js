import Product from "../models/Product.js";
import ProductStat from "../models/ProductStat.js";
import Transaction from "../models/Transaction.js";
import User from "../models/user.js";
import getCountryIso3 from "country-iso-2-to-3";

export const getProducts = async (req, res) => {
  try {
    const products = await Product.find();

    const productsWithStats = await Promise.all(
      products.map(async (product) => {
        const stat = await ProductStat.find({
          productId: products._id,
        });
        return {
          ...product._doc,
          stat,
        };
      })
    );

    res.status(200).json(productsWithStats);
  } catch (error) {
    res.status(404).json({ message: error.message });
  }
};

export const getCustomers = async (req, res) => {
  try {
    const customers = await User.find({ role: "user" }).select("-password");
    res.status(200).json(customers);
  } catch (error) {
    res.status(404).json({ message: error.message });
  }
};

export const getTransactions = async (req, res) => {
  try {
    // Thông tin lấy từ query mà frontend gửi về.
    // Ví dụ khi user sử dụng sort, data trả về sẽ có dạng {"field": "userId", "sort": "desc"} cho MongoDB
    const { page = 1, pageSize = 20, sort = null, search = "" } = req.query;

    // Dạng dữ liệu sau khi format để Mongo có thể đọc: { userId: -1 }
    const generateSort = () => {
      const sortParsed = JSON.parse(sort);
      const sortFormatted = {
        [sortParsed.field]: sortParsed.sort == "asc" ? 1 : -1,
      };

      return sortFormatted;
    };
    const sortFormatted = Boolean(sort) ? generateSort() : {};

    const transactions = await Transaction.find({
      $or: [
        { cost: { $regex: new RegExp(search, "i") } },
        { userId: { $regex: new RegExp(search, "i") } },
      ],
    })
      .sort(sortFormatted)
      .skip(page * pageSize)
      .limit(pageSize);

    const total = await Transaction.estimatedDocumentCount({
      name: { $regex: search, $options: "i" },
    });
    console.log(total);

    res.status(200).json({
      transactions,
      total,
    });
  } catch (error) {
    res.status(404).json({ message: error.message });
  }
};

export const getGeography = async (req, res) => {
  try {
    const users = await User.find();

    const mapLocations = users.reduce((accumulator, { country }) => {
      const countryISO3 = getCountryIso3(country);
      if (!accumulator[countryISO3]) {
        accumulator[countryISO3] = 0;
      }
      accumulator[countryISO3]++;
      return accumulator;
    }, {});

    const formattedLocation = Object.entries(mapLocations).map(
      ([country, count]) => {
        return { id: country, value: count };
      }
    );

    res.status(200).json(formattedLocation);
  } catch (error) {
    res.status(404).json({ message: error.message });
  }
};
