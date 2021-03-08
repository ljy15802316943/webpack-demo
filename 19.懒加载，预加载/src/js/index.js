function sum(...args) {
  return args.reduce((a,b) => a + b, 0)
}

document.getElementById('btn').onclick = function() {
  // 懒加载 import('./text'), 当文件需要使用时才加载，如触发事件。
  // 预加载 prefetch：会在使用之前，提前加载js文件。等其他资源加载完毕，浏览器空闲了，才加载webpackPrefetch为true的js资源。
  // webpackChunkName打包资源的文件名。
  // webpackPrefetch开启预加载。
  import(/* webpackChunkName: 'text', webpackPrefetch: true */'./text').then(({mul}) => {
    console.log(mul(1, 3));
  })
}

console.log('index.js文件加载了。')
