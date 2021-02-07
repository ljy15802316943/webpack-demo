import '../css/index.less';

const promise = new Promise(function(resolve, reject) {
  // ... some code
  if (true) {
    resolve();
  } else {
    reject(error);
  }
});

function add(a,b) {
  return a + b;
}

console.log(add(1,2));