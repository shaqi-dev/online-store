import products from './products';
import { Product } from '../models/product';

export const categories: string[] = products.reduce((a: string[], c: Product): string[] => {
  if (!a.includes(c.category)) a.push(c.category);
  return a;
}, []);

export const brands: string[] = products.reduce((a: string[], c: Product): string[] => {
  if (!a.includes(c.brand)) a.push(c.brand);
  return a;
}, []).sort((a, b) => a.localeCompare(b));

export const colors: string[] = products.reduce((a: string[], c: Product): string[] => {
  if (!a.includes(c.color)) a.push(c.color);
  return a;
}, []).sort((a, b) => a.localeCompare(b));

export const capacities: string[] = products.reduce((a: string[], c: Product): string[] => {
  if (!a.includes(c.capacity)) a.push(c.capacity);
  return a;
}, []).sort((a, b) => +b - +a);

export const releaseDates: string[] = products.reduce((a: string[], c: Product): string[] => {
  if (!a.includes(c.releaseDate)) a.push(c.releaseDate);
  return a;
}, []).sort((a, b) => Date.parse(a) - Date.parse(b));

export const quantities: number[] = products.reduce((a: number[], c: Product): number[] => {
  if (!a.includes(c.inStockCount)) a.push(c.inStockCount);
  return a;
}, []).sort((a, b) => +a - +b);
