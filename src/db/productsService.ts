import products from './products';

export const categories = products.reduce((a: string[], c) => {
  if (!a.includes(c.category)) a.push(c.category);
  return a;
}, []);

export const brands = products.reduce((a: string[], c) => {
  if (!a.includes(c.brand)) a.push(c.brand);
  return a;
}, []).sort((a, b) => a.localeCompare(b));

export const colors = products.reduce((a: string[], c) => {
  if (!a.includes(c.color)) a.push(c.color);
  return a;
}, []).sort((a, b) => a.localeCompare(b));

export const capacities = products.reduce((a: string[], c) => {
  if (!a.includes(c.capacity)) a.push(c.capacity);
  return a;
}, []).sort((a, b) => +b - +a);

export const releaseDates = products.reduce((a: string[], c) => {
  if (!a.includes(c.releaseDate)) a.push(c.releaseDate);
  return a;
}, []).sort((a, b) => Date.parse(a) - Date.parse(b));

export const quantities = products.reduce((a: number[], c) => {
  if (!a.includes(c.inStockCount)) a.push(c.inStockCount);
  return a;
}, []).sort((a, b) => +a - +b);
