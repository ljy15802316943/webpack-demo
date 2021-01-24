import '@babel/polyfill'

const add = (a, b) => {
  return a + b;
}
const promise = new Promise(resolve => {
  setTimeout(() => {
    console.log('执行！');
    resolve();
  }, 1000);
})

console.log(add(1, 2));
