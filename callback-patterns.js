var param = null;
var results = [];
var totalFuncs = 4;

//Asychronous control flow patterns patterns

//Serial -- This means one -> two -> three -> four

//Waterfall means the execution of functions is serial but non-dependant
console.time('serial processing');
one(param, function(err, result) {
  results.push(result);
  two(param, function(err, result) {
    results.push(result);
    three(param, function(err, result) {
      results.push(result);
      four(param, function(err, result) {
        console.timeEnd('serial processing');
        results.push(result);
        console.log(results);
        handleresult(results)
      });
    });
  });
});




//Parallel -- one | two | three | four -> [one, two, three, four]
function parallelCallback(err, result) {
  console.log('received result for function', result);
  results.push(result);

  if (results.length === totalFuncs) {
    console.timeEnd('Parallel processing')
    console.log('Finished processing', results);    
  }
}

console.time('Parallel processing')
one(param, parallelCallback)
two(param, parallelCallback)
three(param, parallelCallback)
four(param, parallelCallback)

//this function takes 4 seconds to respond
function one(param, callback) {
  setTimeout(function() {
    callback(null, 1);
  }, 4000)
}

//this function takes 3 seconds to respond
function two(param, callback) {
  setTimeout(function() {
    callback(null, 2);
  }, 3000)
}

//this function takes 2 seconds to respond
function three(param, callback) {
  setTimeout(function() {
    callback(null, 3);
  }, 2000)
}

//this function takes 1 second to respond
function four(param, callback) {
  setTimeout(function() {
    callback(null, 4);
  }, 1000)
}