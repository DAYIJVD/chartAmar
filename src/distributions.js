const Distributions = {
    // توزیع برنولی
    bernoulli: (p, size) => {
      const data = Array.from({ length: size }, () => (Math.random() < p ? 1 : 0));
  
      // محاسبات
      const mean = p;
      const variance = p * (1 - p);
  
      return {
        data,
        mean,
        variance,
        pmf: (k) => (k === 1 ? p : 1 - p), // PMF برای برنولی
      };
    },
  
    // توزیع دوجمله‌ای
    binomial: (n, p, size) => {
      const data = Array.from({ length: size }, () => {
        let count = 0;
        for (let i = 0; i < n; i++) {
          if (Math.random() < p) count++;
        }
        return count;
      });
  
      // محاسبات
      const mean = n * p;
      const variance = n * p * (1 - p);
  
      return {
        data,
        mean,
        variance,
        pmf: (k) => {
          // محاسبه تابع احتمال برای دوجمله‌ای (استفاده از فرمول دوجمله‌ای)
          const factorial = (n) => (n === 0 ? 1 : n * factorial(n - 1));
          const combination = factorial(n) / (factorial(k) * factorial(n - k));
          return combination * Math.pow(p, k) * Math.pow(1 - p, n - k);
        },
      };
    },
  
    // توزیع منفی دوجمله‌ای
    negativeBinomial: (r, p, size) => {
      const data = Array.from({ length: size }, () => {
        let count = 0;
        let successes = 0;
        while (successes < r) {
          if (Math.random() < p) {
            successes++;
          }
          count++;
        }
        return count;
      });
  
      // محاسبات
      const mean = r / p;
      const variance = r * (1 - p) / (p * p);
  
      return {
        data,
        mean,
        variance,
        pmf: (k) => {
          const factorial = (n) => (n === 0 ? 1 : n * factorial(n - 1));
          const combination = factorial(k - 1) / (factorial(r - 1) * factorial(k - r));
          return combination * Math.pow(p, r) * Math.pow(1 - p, k - r);
        },
      };
    },
  
    // توزیع فوق هندسی
    hypergeometric: (N, K, n, size) => {
      const data = Array.from({ length: size }, () => {
        let successes = 0;
        for (let i = 0; i < n; i++) {
          if (Math.random() < K / N) {
            successes++;
          }
        }
        return successes;
      });
  
      // محاسبات
      const mean = (n * K) / N;
      const variance = (n * K * (N - K) * (N - n)) / (N * N * (N - 1));
  
      return {
        data,
        mean,
        variance,
        pmf: (k) => {
          const factorial = (n) => (n === 0 ? 1 : n * factorial(n - 1));
          const combination1 = factorial(K) / (factorial(k) * factorial(K - k));
          const combination2 = factorial(N - K) / (factorial(n - k) * factorial(N - K - n + k));
          const combination3 = factorial(N) / (factorial(n) * factorial(N - n));
          return (combination1 * combination2) / combination3;
        },
      };
    },
  
    // توزیع پواسون
    poisson: (lambda, size) => {
      const data = Array.from({ length: size }, () => {
        let count = 0;
        let limit = Math.exp(-lambda);
        let product = Math.random();
        while (product > limit) {
          count++;
          product *= Math.random();
        }
        return count;
      });
  
      // محاسبات
      const mean = lambda;
      const variance = lambda;
  
      return {
        data,
        mean,
        variance,
        pmf: (k) => (Math.pow(lambda, k) * Math.exp(-lambda)) / factorial(k),
      };
    },
  
    // توزیع هندسی
    geometric: (p, size) => {
      const data = Array.from({ length: size }, () => {
        let count = 0;
        while (Math.random() >= p) {
          count++;
        }
        return count;
      });
  
      // محاسبات
      const mean = (1 - p) / p;
      const variance = (1 - p) / (p * p);
  
      return {
        data,
        mean,
        variance,
        pmf: (k) => Math.pow(1 - p, k) * p,
      };
    },
  
    // توزیع نمایی
    exponential: (lambda, size) => {
      const data = Array.from({ length: size }, () => -Math.log(Math.random()) / lambda);
  
      // محاسبات
      const mean = 1 / lambda;
      const variance = 1 / (lambda * lambda);
  
      return {
        data,
        mean,
        variance,
        pdf: (x) => lambda * Math.exp(-lambda * x),
      };
    },
  
    // توزیع نرمال
    normal: (mean, stdDev, size) => {
      const data = Array.from({ length: size }, () => {
        let u1 = Math.random();
        let u2 = Math.random();
        let z0 = Math.sqrt(-2 * Math.log(u1)) * Math.cos(2 * Math.PI * u2);
        return mean + stdDev * z0;
      });
  
      // محاسبات
      const meanCalculated = mean;
      const varianceCalculated = stdDev * stdDev;
  
      return {
        data,
        mean: meanCalculated,
        variance: varianceCalculated,
        pdf: (x) => (1 / (stdDev * Math.sqrt(2 * Math.PI))) * Math.exp(-0.5 * Math.pow((x - mean) / stdDev, 2)),
      };
    },
  };
  
  // تابع کمکی برای محاسبه فاکتوریال
  const factorial = (n) => (n === 0 ? 1 : n * factorial(n - 1));
  
  export default Distributions;
  