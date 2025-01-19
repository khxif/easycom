import { Request, Response } from "express";
import { Product } from "../models/Product";

export const getAllProducts = async (
  req: Request,
  res: Response
): Promise<void> => {
  try {
    const products = await Product.find();
    res.json(products);
  } catch (error) {
    console.log("Get all products error:", (error as Error).message);
    res.status(402).json({ message: (error as Error).message });
  }
};

export const createProduct = async (
  req: Request,
  res: Response
): Promise<void> => {
  try {
    const { name, description, price, image_url, category } = req.body;
    if (!name || !description || !price || !image_url || !category) {
      res.status(422).json({ message: "Missing Fields" });
      return;
    }

    const product = new Product({
      name,
      description,
      price,
      image_url,
      category,
    });

    await product.save();

    res.json({ message: "Product created successfully" });
  } catch (error) {
    console.log("Create Product error:", (error as Error).message);
    res.status(402).json({ message: (error as Error).message });
  }
};
