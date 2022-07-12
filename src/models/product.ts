export interface Product {
  id: string,
  category: string,
  brand: string,
  releaseDate: string,
  color: string,
  model: string,
  price: number,
  capacity: number,
  size?: string,
  img: string
  inStockCount: number,
}
