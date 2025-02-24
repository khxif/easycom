import { Request, Response } from 'express';
import { Cart } from '../models/Cart';

export const addToCart = async (req: Request, res: Response): Promise<void> => {
  try {
    const { userId, productId, quantity } = req.body;
    if (!productId || !userId || !quantity) {
      res.status(422).json({ message: 'Product ID, User ID and quantity are required' });
      return;
    }

    let cart = await Cart.findOne({ user: userId });
    if (!cart)
      cart = await new Cart({ user: userId, products: [{ product: productId, quantity }] }).save();
    else {
      cart.products.push({ product: productId, quantity });
      await cart.save();
    }

    res.status(200).json({ message: 'Product added to cart' });
  } catch (error) {
    console.log('Add to cart error:', (error as Error).message);
    res.status(402).json({ message: (error as Error).message });
  }
};

export const getCart = async (req: Request, res: Response): Promise<void> => {
  try {
    const { id } = req.params;
    if (!id) {
      res.status(422).json({ message: 'User ID is required' });
      return;
    }

    const cart = await Cart.findOne({ user: id }).populate('products.product');
    if (!cart) {
      res.status(200).json({ cart: [] });
      return;
    }

    const formattedCart = cart.products.map((product: any) => ({
      ...product.product._doc,
      quantity: product.quantity,
    }));

    res.status(200).json({ cart: formattedCart });
  } catch (error) {
    console.log('Get cart error:', (error as Error).message);
    res.status(402).json({ message: (error as Error).message });
  }
};

export const removeFromCart = async (req: Request, res: Response): Promise<void> => {
  try {
    const { userId, productId } = req.body;
    if (!productId || !userId) {
      res.status(422).json({ message: 'Product ID, User ID are required' });
      return;
    }

    const cart = await Cart.findOne({ user: userId });
    if (!cart) {
      res.status(404).json({ message: 'Cart not found' });
      return;
    }

    cart.products = cart.products.filter((product: any) => product?.product?.toString() !== productId);
    await cart.save();

    res.status(200).json({ message: 'Product removed from cart' });
  } catch (error) {
    console.log('Remove from cart error:', (error as Error).message);
    res.status(402).json({ message: (error as Error).message });
  }
};
