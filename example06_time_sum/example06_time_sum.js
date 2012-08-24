// time for sum loop

var max = 100000000;

console.time(max + '要素');

var sum = 0;

for (var i = 0; i < max; i++) {
  sum += i;
}
console.log('sum=' + sum);

console.timeEnd(max + '要素');
