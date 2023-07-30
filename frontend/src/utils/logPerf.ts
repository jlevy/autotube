/**
 * Convenience for timing specific function calls and logging to console.
 * Works with both synchronous and asynchronous functions and also logs
 * if the function exited or had an exception. minMs is the minimum number
 * of milliseconds that the function must take to be logged.
 *
 * Usage example: To log when an expression like
 *
 * const result = someFunction(arg1, arg2);
 *
 * takes more than 50ms to execute, replace it with
 *
 * const result = logPerf('someFunction', someFunction, 50)(arg1, arg2);
 */
export default function logPerf<F extends (...args: any) => any>(
  label: string,
  fn: F,
  minMs: number = 20,
): F {
  const logLabel = label || fn.name || 'anonymous';
  // Define a wrapper function with the same argument and return types as the original function.
  const wrappedFn = (...args: Parameters<F>) => {
    const startTime = performance.now();

    const logTime = (message: string) => {
      const endTime = performance.now();
      const duration = endTime - startTime;

      if (duration > minMs) {
        console.log(`Perf: ${duration.toFixed(2)}ms for ${logLabel} (${message})`);
      }
    };

    // Execute the original function.
    let result;
    try {
      result = fn(...args);
    } catch (error) {
      logTime('exception');
      throw error;
    }

    // If result is a Promise then wait for it to resolve.
    if (result instanceof Promise) {
      return result
        .then((value) => {
          logTime('async success');
          return value;
        })
        .catch((error) => {
          logTime('async exception');
          throw error;
        });
    } else {
      logTime('success');
      return result;
    }
  };

  // Cast the wrapped function to the original function type.
  return wrappedFn as F;
}
