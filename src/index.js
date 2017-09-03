import 'SCSS/test.scss';
import './fonts';

import printMe from './print';
import { square } from './math';

function component() {
  let elem = document.createElement('div');
  let btn = document.createElement('button');

  elem.innerHTML = 'Hello webpack';
  elem.classList.add('hello');

  btn.innerHTML = 'Click me and check the console!';
  btn.onclick = printMe;
  elem.appendChild(btn);

  console.log('69 squared: ' + square(69));

  return elem;
}

document.body.appendChild(component());
