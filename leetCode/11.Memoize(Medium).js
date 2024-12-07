/*
Given a function fn, return a memoized version of that function.

A memoized function is a function that will never be called twice with the same inputs. Instead it will return a cached value.

You can assume there are 3 possible input functions: sum, fib, and factorial.

sum accepts two integers a and b and returns a + b. Assume that if a value has already been cached for the arguments (b, a) where a != b, it cannot be used for the arguments (a, b). For example, if the arguments are (3, 2) and (2, 3), two separate calls should be made.
fib accepts a single integer n and returns 1 if n <= 1 or fib(n - 1) + fib(n - 2) otherwise.
factorial accepts a single integer n and returns 1 if n <= 1 or factorial(n - 1) * n otherwise.
 

Example 1:

Input:
fnName = "sum"
actions = ["call","call","getCallCount","call","getCallCount"]
values = [[2,2],[2,2],[],[1,2],[]]
Output: [4,4,1,3,2]
Explanation:
const sum = (a, b) => a + b;
const memoizedSum = memoize(sum);
memoizedSum(2, 2); // "call" - returns 4. sum() was called as (2, 2) was not seen before.
memoizedSum(2, 2); // "call" - returns 4. However sum() was not called because the same inputs were seen before.
// "getCallCount" - total call count: 1
memoizedSum(1, 2); // "call" - returns 3. sum() was called as (1, 2) was not seen before.
// "getCallCount" - total call count: 2
Example 2:

Input:
fnName = "factorial"
actions = ["call","call","call","getCallCount","call","getCallCount"]
values = [[2],[3],[2],[],[3],[]]
Output: [2,6,2,2,6,2]
Explanation:
const factorial = (n) => (n <= 1) ? 1 : (n * factorial(n - 1));
const memoFactorial = memoize(factorial);
memoFactorial(2); // "call" - returns 2.
memoFactorial(3); // "call" - returns 6.
memoFactorial(2); // "call" - returns 2. However factorial was not called because 2 was seen before.
// "getCallCount" - total call count: 2
memoFactorial(3); // "call" - returns 6. However factorial was not called because 3 was seen before.
// "getCallCount" - total call count: 2
Example 3:

Input:
fnName = "fib"
actions = ["call","getCallCount"]
values = [[5],[]]
Output: [8,1]
Explanation:
fib(5) = 8 // "call"
// "getCallCount" - total call count: 1
*/

/**
 * @param {Function} fn
 */
function memoize(fn) {
    const cache = new Map(); // Cache to store results
    let callCount = 0; // To track the number of times the function is actually called

    const getCacheKey = (args) => JSON.stringify(args); // Serialize arguments as a key for the cache

    function memoized(...args) {
        const key = getCacheKey(args);
        if (cache.has(key)) {
            return cache.get(key); // Return cached result
        }

        const result = fn(...args); // Call the original function
        cache.set(key, result); // Store the result in the cache
        callCount++;
        return result;
    }

    memoized.getCallCount = function () {
        return callCount; // Return the total number of calls made to the original function
    };

    return memoized;
}

// Example Usage:

// Example 1: sum
const sum = (a, b) => a + b;
const memoizedSum = memoize(sum);
console.log(memoizedSum(2, 2)); // Output: 4
console.log(memoizedSum(2, 2)); // Output: 4
console.log(memoizedSum.getCallCount()); // Output: 1
console.log(memoizedSum(1, 2)); // Output: 3
console.log(memoizedSum.getCallCount()); // Output: 2

// Example 2: factorial
const factorial = (n) => (n <= 1 ? 1 : n * factorial(n - 1));
const memoFactorial = memoize(factorial);
console.log(memoFactorial(2)); // Output: 2
console.log(memoFactorial(3)); // Output: 6
console.log(memoFactorial(2)); // Output: 2
console.log(memoFactorial.getCallCount()); // Output: 2
console.log(memoFactorial(3)); // Output: 6
console.log(memoFactorial.getCallCount()); // Output: 2

// Example 3: fib
const fib = (n) => (n <= 1 ? 1 : fib(n - 1) + fib(n - 2));
const memoFib = memoize(fib);
console.log(memoFib(5)); // Output: 8
console.log(memoFib.getCallCount()); // Output: 1