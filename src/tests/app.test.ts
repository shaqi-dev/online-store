import '@testing-library/jest-dom';
import fs from 'fs'
import path from 'path'
import { TextDecoder, TextEncoder } from 'util';
global.TextEncoder = TextEncoder as typeof globalThis.TextEncoder;
global.TextDecoder = TextDecoder as typeof globalThis.TextDecoder;
import { JSDOM } from 'jsdom';
import products from '../db/products';

const html = fs.readFileSync(path.resolve(__dirname, '..', '..', 'dist', 'index.html'), 'utf8');

let dom: JSDOM;
let container: HTMLElement;

function waitForDom() {
  return new Promise<void>((resolve) => {
    dom = new JSDOM(html, {
      runScripts: "dangerously",
      resources: "usable",
    });
    dom.window.document.addEventListener("DOMContentLoaded", () => {
      resolve();
    });
  });
}

describe('HTML Rendering', () => {
  beforeAll(() => waitForDom());

  beforeEach(() => {
    container = dom.window.document.body
  })

  it('Should render index.html', () => {
    expect(container.querySelector('header')).toBeInTheDocument();
    expect(container.querySelector('main')).toBeInTheDocument();
    expect(container.querySelector('footer')).toBeInTheDocument();
    expect(container.querySelector('.product-filters')).toBeInTheDocument();
    expect(container.querySelector('.userboard')).toBeInTheDocument();
  });

  it('Should render all product cards from the database', () => {
    const cards = container.querySelectorAll('.product');
    expect(cards.length).toEqual(products.length);
  });
})
