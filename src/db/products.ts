import { Product } from '../models/product';

const products: Product[] = [
  {
    id: '1',
    category: 'smartphone',
    brand: 'Apple',
    releaseDate: 'September 24, 2021',
    color: 'Midnight',
    model: 'iPhone 13',
    price: 799,
    capacity: 128,
    img: './assets/images/products/apple-iphone-13-midnight.jpeg',
    inStockCount: 8,
  },
  {
    id: '2',
    category: 'smartphone',
    brand: 'Apple',
    releaseDate: 'September 24, 2021',
    color: 'Midnight',
    model: 'iPhone 13',
    price: 899,
    capacity: 256,
    img: './assets/images/products/apple-iphone-13-midnight.jpeg',
    inStockCount: 5,
  },
  {
    id: '3',
    category: 'smartphone',
    brand: 'Apple',
    releaseDate: 'September 24, 2021',
    color: 'Midnight',
    model: 'iPhone 13',
    price: 1099,
    capacity: 512,
    img: './assets/images/products/apple-iphone-13-midnight.jpeg',
    inStockCount: 23,
  },
  {
    id: '4',
    category: 'smartphone',
    brand: 'Apple',
    releaseDate: 'September 24, 2021',
    color: 'Green',
    model: 'iPhone 13',
    price: 799,
    capacity: 128,
    img: './assets/images/products/apple-iphone-13-green.jpeg',
    inStockCount: 17,
  },
  {
    id: '5',
    category: 'smartphone',
    brand: 'Apple',
    releaseDate: 'September 24, 2021',
    color: 'Green',
    model: 'iPhone 13',
    price: 899,
    capacity: 256,
    img: './assets/images/products/apple-iphone-13-green.jpeg',
    inStockCount: 12,
  },
  {
    id: '6',
    category: 'smartphone',
    brand: 'Apple',
    releaseDate: 'September 24, 2021',
    color: 'Green',
    model: 'iPhone 13',
    price: 1099,
    capacity: 512,
    img: './assets/images/products/apple-iphone-13-green.jpeg',
    inStockCount: 28,
  },
  {
    id: '7',
    category: 'smartphone',
    brand: 'Samsung',
    releaseDate: 'March 17, 2021',
    color: 'Black',
    model: 'Galaxy A52 SM-A525F/DS',
    price: 349,
    capacity: 128,
    img: './assets/images/products/samsung-galaxy-a52-black.jpeg',
    inStockCount: 42,
  },
  {
    id: '8',
    category: 'smartphone',
    brand: 'Samsung',
    releaseDate: 'March 17, 2021',
    color: 'White',
    model: 'Galaxy A52 SM-A525F/DS',
    price: 349,
    capacity: 128,
    img: './assets/images/products/samsung-galaxy-a52-white.jpeg',
    inStockCount: 37,
  },
  {
    id: '9',
    category: 'notebook',
    brand: 'Apple',
    releaseDate: 'October 11, 2020',
    color: 'Space Gray',
    model: 'Macbook Air 13" M1 2020',
    price: 999,
    capacity: 256,
    img: './assets/images/products/apple-macbook-air-13-m1-2020-space-gray.jpg',
    inStockCount: 18,
  },
  {
    id: '10',
    category: 'notebook',
    brand: 'Apple',
    releaseDate: 'October 26, 2021',
    color: 'Space Gray',
    model: 'Macbook Pro 14" M1 2021',
    price: 1199,
    capacity: 256,
    img: './assets/images/products/apple-macbook-pro-14-m1-2021-space-gray.jpg',
    inStockCount: 2,
  },
  {
    id: '11',
    category: 'notebook',
    brand: 'Apple',
    releaseDate: 'October 26, 2021',
    color: 'Midnight',
    model: 'Macbook Pro 14" M1 2021',
    price: 1499,
    capacity: 512,
    img: './assets/images/products/apple-macbook-pro-14-m1-2021-midnight.jpg',
    inStockCount: 8,
  },
  {
    id: '12',
    category: 'smartwatch',
    brand: 'Apple',
    releaseDate: 'September 14, 2021',
    color: 'Pride Edition',
    model: 'Watch Series 7',
    size: '45mm',
    price: 749,
    img: './assets/images/products/apple-watch-series-7-pride-edition.jpg',
    inStockCount: 74,
  },
  {
    id: '13',
    category: 'smartwatch',
    brand: 'Apple',
    releaseDate: 'September 14, 2021',
    color: 'Nectarine/Peony',
    model: 'Watch Series 7',
    size: '41mm',
    price: 699,
    img: './assets/images/products/apple-watch-series-7-nectarine-peony.jpg',
    inStockCount: 49,
  },
  {
    id: '14',
    category: 'smartwatch',
    brand: 'Samsung',
    releaseDate: 'August 27, 2021',
    color: 'Black',
    model: 'Galaxy Watch4 Classic',
    size: '46mm',
    price: 299,
    img: './assets/images/products/samsung-watch-4-classic-black.jpeg',
    inStockCount: 61,
  },
  {
    id: '15',
    category: 'smartwatch',
    brand: 'Samsung',
    releaseDate: 'August 27, 2021',
    color: 'Silver',
    model: 'Galaxy Watch4 Classic',
    size: '42mm',
    price: 249,
    img: './assets/images/products/samsung-watch-4-classic-silver.jpeg',
    inStockCount: 83,
  },
  {
    id: '16',
    category: 'smartwatch',
    brand: 'Samsung',
    releaseDate: 'August 5, 2020',
    color: 'Silver',
    model: 'Galaxy Watch3',
    size: '45mm',
    price: 299,
    img: './assets/images/products/samsung-watch-3-black.jpeg',
    inStockCount: 36,
  },
  {
    id: '17',
    category: 'tablet',
    brand: 'Apple',
    releaseDate: 'September 24, 2021',
    color: 'Space Gray',
    model: 'iPad mini 2021',
    capacity: 64,
    price: 499,
    img: './assets/images/products/ipad-mini-2021-space-gray.png',
    inStockCount: 11,
  },
  {
    id: '18',
    category: 'tablet',
    brand: 'Apple',
    releaseDate: 'September 24, 2021',
    color: 'Purple',
    model: 'iPad mini 2021',
    capacity: 64,
    price: 499,
    img: './assets/images/products/ipad-mini-2021-purple.png',
    inStockCount: 0,
  },
  {
    id: '19',
    category: 'tablet',
    brand: 'Apple',
    releaseDate: 'September 24, 2021',
    color: 'Purple',
    model: 'iPad mini 2021',
    capacity: 256,
    price: 649,
    img: './assets/images/products/ipad-mini-2021-purple.png',
    inStockCount: 5,
  },
  {
    id: '20',
    category: 'tablet',
    brand: 'Apple',
    releaseDate: 'September 24, 2021',
    color: 'Blue',
    model: 'iPad Air 2022',
    capacity: 64,
    price: 599,
    img: './assets/images/products/ipad-air-2022-blue.png',
    inStockCount: 24,
  },
];

export default products;