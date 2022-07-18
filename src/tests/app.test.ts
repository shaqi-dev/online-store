import '@testing-library/jest-dom';
import { TextDecoder, TextEncoder } from 'util';
global.TextEncoder = TextEncoder as typeof globalThis.TextEncoder;
global.TextDecoder = TextDecoder as typeof globalThis.TextDecoder;
import { JSDOM } from 'jsdom';
import products from '../db/products';
import App from '../components/App';

describe('App', () => {
  beforeEach(async () => {
    const dom = await JSDOM.fromFile('src/index.html', { runScripts: 'dangerously', resources: 'usable' });
    document.body.innerHTML = dom.window.document.body.innerHTML;
    const app = new App();
  })

  it('Renders all product cards from the database', async () => {
    const cards = document.querySelectorAll('.product');
    expect(cards.length).toEqual(products.length);
  });
})
