/**
 * prettier 代码格式配置
 */
module.exports = {
  printWidth: 100, // 超过最大值换行
  tabWidth: 2, // 缩进字节数
  useTabs: false, // 缩进不使用tab，使用空格
  semi: false, // 句尾不添加分号
  singleQuote: true, // 使用单引号代替双引号
  arrowParens: 'avoid', //  (x) => {} 箭头函数参数只有一个时是否要有小括号。avoid：省略括号
  bracketSpacing: true, // 在对象，数组括号与文字之间加空格 "{ foo: bar }"
  trailingComma: 'es5', // 在对象或数组最后一个元素后面是否加逗号(在ES5中加尾逗号)
}
