import { Request, Response } from 'express';
import mongoose from 'mongoose';
import { Favorite } from '../models/Favorite';

export const addFavorites = async (req: Request, res: Response): Promise<void> => {
  try {
    const { userId, productId } = req.body;
    if (!productId || !userId) {
      res.status(422).json({ message: 'Product ID and User ID are required' });
      return;
    }

    let favorite = await Favorite.findOne({ user: userId });
    if (!favorite) favorite = await new Favorite({ user: userId, products: [productId] }).save();
    else {
      favorite.products.push(productId);
      await favorite.save();
    }

    res.status(200).json({ message: 'Product added to favorites' });
  } catch (error) {
    console.log('Add Favorites error:', (error as Error).message);
    res.status(402).json({ message: (error as Error).message });
  }
};

export const getFavorites = async (req: Request, res: Response): Promise<void> => {
  try {
    const { id } = req.params;
    if (!id) {
      res.status(422).json({ message: 'User ID is required' });
      return;
    }

    const favorite = await Favorite.findOne({ user: id }).populate('products');
    if (!favorite) {
      res.status(404).json({ message: 'No favorites found' });
      return;
    }

    res.status(200).json({ favorites: favorite.products });
  } catch (error) {
    console.log('Get Favorites error:', (error as Error).message);
    res.status(402).json({ message: (error as Error).message });
  }
};

export const removeFavorites = async (req: Request, res: Response): Promise<void> => {
  try {
    const { userId, productId } = req.body;
    if (!productId || !userId) {
      res.status(422).json({ message: 'Product ID and User ID are required' });
      return;
    }

    let favorite = await Favorite.findOne({ user: userId });
    if (!favorite) {
      res.status(404).json({ message: 'No favorites found' });
      return;
    }

    favorite.products = favorite.products.filter(
      (id: mongoose.Types.ObjectId) => id.toString() !== productId,
    );
    await favorite.save();

    res.status(200).json({ message: 'Product removed from favorites' });
  } catch (error) {
    console.log('Remove Favorites error:', (error as Error).message);
    res.status(402).json({ message: (error as Error).message });
  }
};
