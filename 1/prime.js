#!/usr/bin/env node

var isPrime = function(n, primes) {
  var result = true;
  var root = Math.sqrt(n);
  for(var i = 0; i < primes.length; i++) {
    var p = primes[i];
    if(n % p == 0) {
      //you only have to check for divisibility by primes, not by every number.
      result = false;
      break;
    }
    else if(p > root) {
      //every divisible number above the sqrt is matched by one
      //below, so no need to test above sqrt.
      break;
    }
  }
  return result;
};

var firstkprime = function(k) {
  var result = [2, 3];
  for(var i = 6; result.length < k; i += 6) {
    //after 2 and 3, only multiples of 6 (+/- 1) can be prime.
    var p1 = i-1;
    var p2 = i+1;
    if(isPrime(p1, result)) { result.push(p1); }
    if(isPrime(p2, result)) { result.push(p2); }
  }
  if(result.length > k) { result.length = k; }
  return result;
};

var fmt = function(arr) {
  return arr.join(",");
};

var writeFile = function(text, fname) {
  var fs = require('fs');
  fs.writeFileSync(fname, text);
  console.log("Script: " + __filename + " wrote to: " + fname);
};

writeFile(fmt(firstkprime(100)), "primes.txt");
