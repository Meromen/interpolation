const fact = (n, f = 1, i = 2) => {
  return i <= n ? fact(n, f * i, ++i) : f
}

const forwardInterpolation = {
  uCal: (u, n) => {
    let temp = u
    for (let i = 1; i < n; i++) 
      temp = temp * (u - i)
    return temp;
  },
  interpolation: (x, y, target) => {
    for (let i = 1; i < x.length; i++) 
      for (let j = 0; j < x.length - i; j++) {
        y[j][i] = y[j + 1][i - 1] - y[j][i - 1]
      }   
    console.table(y)

    let sum = y[0][0]
    let u = (target - x[0]) / (x[1] - x[0])
    for (let i = 1; i < x.length; i++)
      sum = sum + (forwardInterpolation.uCal(u, i) * y[0][i]) / fact(i);
    
    console.log(`Result at ${target}: ${sum}`)
  }
};

const backwardInterpolation = {
  uCal: (u, n) => {
    let temp = u
    for (let i = 1; i < n; i++) 
      temp = temp * (u + i)
    return temp;
  },
  interpolation: (x, y, target) => {
    for (let i = 1; i < x.length; i++)
      for (let j = x.length - 1; j >= i; j--) {
        y[j][i] = y[j][i - 1] - y[j - 1][i - 1]
      }
    console.table(y)
    
    let sum = y[x.length - 1][0]; 
    let u = (target - x[x.length - 1]) / (x[1] - x[0])
    for (let i = 1; i < x.length; i++) { 
        sum = sum + (backwardInterpolation.uCal(u, i) * y[x.length - 1][i]) / fact(i)
    } 

    console.log(`Result at ${target}: ${sum}`)
  }
}

window.onload = () => {
  backwardInterpolation.interpolation([45, 50, 55, 60], [[0.7071],[0.7660],[0.8192],[0.8660]], 52)
  backwardInterpolation.interpolation([1891, 1901, 1911, 1921, 1931], [[46], [66], [81], [93], [101]], 1925)
  forwardInterpolation.interpolation([45, 50, 55, 60], [[0.7071],[0.7660],[0.8192],[0.8660]], 52)
  forwardInterpolation.interpolation([1891, 1901, 1911, 1921, 1931], [[46], [66], [81], [93], [101]], 1925)
}