import './style.scss';

const app = document.querySelector('#app') as HTMLDivElement;

const text = document.createElement('span');

text.innerText = 'Test';

app.append(text);
