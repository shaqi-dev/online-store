import '@testing-library/jest-dom';
import userEvent from '@testing-library/user-event';
import { TextDecoder, TextEncoder } from 'util';
global.TextEncoder = TextEncoder as typeof globalThis.TextEncoder;
global.TextDecoder = TextDecoder as typeof globalThis.TextDecoder;
import { JSDOM } from 'jsdom';
import products from '../db/products';
import { categories } from '../db/productsService';
import App from '../components/App';

describe('App', () => {
  beforeEach(async () => {
    const dom = await JSDOM.fromFile('src/index.html', { runScripts: 'dangerously', resources: 'usable' });
    document.body.innerHTML = dom.window.document.body.innerHTML;
    const app = new App();
  });

  it('Renders all product cards from the database', () => {
    const cards = document.querySelectorAll('.product');
    expect(cards.length).toEqual(products.length);
  });

  it('Renders product cards correctly', () => {
    const card = document.querySelector('.product') as HTMLDivElement;
    const img = card.querySelector('img') as HTMLImageElement;
    const title = card.querySelector('.product__title') as HTMLHeadingElement;
    const release = card.querySelector('.product__release') as HTMLSpanElement;
    const inStock = card.querySelector('.product__in-stock') as HTMLSpanElement;
    const price = card.querySelector('.product__price') as HTMLSpanElement;
    const addToCartBtn = card.querySelector('.link-button') as HTMLSpanElement;
    expect(img.src).toBeTruthy();
    expect(title.innerText).toBeTruthy();
    expect(release.innerText).toBeTruthy();
    expect(inStock.innerText).toBeTruthy();
    expect(price.innerText).toBeTruthy();
    if (!card.classList.contains('product--not-in-stock')) {
      expect(addToCartBtn).toBeEnabled();
    } else {
      expect(addToCartBtn).toBeDisabled();
    }
  });

  it('Renders Product Cart', () => {
    const counter = document.querySelector('.cart-counter') as HTMLDivElement;
    expect(counter).toBeInTheDocument();
  });

  it('Adds items to Product Cart', async () => {
    const cards = document.querySelectorAll('.product');
    const counter = document.querySelector('.cart-counter') as HTMLDivElement;
    await userEvent.click(cards[0]);
    expect(counter.innerText).toEqual('1');
    await userEvent.click(cards[2]);
    await userEvent.click(cards[6]);
    expect(counter.innerText).toEqual('3');
  });

  it('Removes items from Product Cart', async () => {
    const cards = document.querySelectorAll('.product');
    const counter = document.querySelector('.cart-counter') as HTMLDivElement;
    await userEvent.click(cards[0]);
    expect(counter.innerText).toEqual('2');
    await userEvent.click(cards[2]);
    await userEvent.click(cards[6]);
    expect(counter.innerText).toEqual('');
  });

  it('Renders category filter', () => {
    const categoryList = Array.from(document.querySelectorAll('.categories__item')) as HTMLLIElement[];
    expect(categoryList.length).toEqual(categories.length + 1);
    expect(categoryList[0].innerText).toEqual('All');
  });

  it('Category filters works', async () => {
    const categoryList = document.querySelectorAll('.categories__item') as NodeListOf<HTMLLIElement>;
    await userEvent.click(categoryList[categoryList.length - 1]);
    expect(document.querySelectorAll('.product').length)
      .toEqual(products.filter((product) => product.category === categories[categories.length - 1]).length);
    await userEvent.click(categoryList[categoryList.length - 2]);
    expect(document.querySelectorAll('.product').length)
      .toEqual(products.filter((product) => product.category === categories[categories.length - 2]).length);
    await userEvent.click(categoryList[0]);
  });

  it('Renders checkbox filters', () => {
    const checkboxes = document.querySelectorAll('.filter-checkbox') as NodeListOf<HTMLLabelElement>;
    const popularTextField = checkboxes[checkboxes.length - 1].querySelector('.filter-checkbox__text-label') as HTMLSpanElement;
    expect(checkboxes.length).toEqual(20);
    expect(popularTextField.innerText).toEqual('Popular');
  });

  it('Checkbox filters works', async () => {
    const checkboxes = document.querySelectorAll('.filter-checkbox') as NodeListOf<HTMLLabelElement>;
    await userEvent.click(checkboxes[checkboxes.length - 1]);
    expect(document.querySelectorAll('.product').length)
      .toEqual(products.filter((product) => product.popular).length);
    expect(checkboxes[checkboxes.length - 1].querySelector('.filter-checkbox__input')).toBeChecked;
    await userEvent.click(checkboxes[checkboxes.length - 1]);
    expect(checkboxes[checkboxes.length - 1].querySelector('.filter-checkbox__input')).not.toBeChecked;
  });

  it('Search filter works', () => {
    const searchInput = document.querySelector('.search-filter') as HTMLInputElement;
    searchInput.value = 'Apple iPhone 13 128GB (Midnight)';
    setTimeout(() => { 
      expect(document.querySelectorAll('.product').length).toEqual(1);
      searchInput.value = '';
    }, 1000);
  });
})
