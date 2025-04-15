function convertToWords() {
    const num = parseInt(document.getElementById('numInput').value);
    const format = document.getElementById('format').value;
    let words = '';
  
    if (isNaN(num)) {
      document.getElementById('output').textContent = 'Please enter a valid number.';
      return;
    }
  
    if (format === 'indian') {
      words = convertIndian(num);
    } else {
      words = convertInternational(num);
    }
  
    document.getElementById('output').textContent = words;
  }
  
  function convertIndian(num) {
    return `₹${num.toLocaleString('en-IN')} → "${numberToWordsIndian(num)}"`;
  }
  
  function convertInternational(num) {
    return `$${num.toLocaleString('en-US')} → "${numberToWordsInternational(num)}"`;
  }
  
  function numberToWordsIndian(num) {
    const a = ["", "one", "two", "three", "four", "five", "six", "seven", "eight", "nine", "ten", "eleven", "twelve", "thirteen", "fourteen", "fifteen", "sixteen", "seventeen", "eighteen", "nineteen"];
    const b = ["", "", "twenty", "thirty", "forty", "fifty", "sixty", "seventy", "eighty", "ninety"];
  
    if ((num = num.toString()).length > 9) return "overflow";
    const paddedNum = ("000000000" + num).substr(-9);
    const crore = parseInt(paddedNum.substr(0, 2));
    const lakh = parseInt(paddedNum.substr(2, 2));
    const thousand = parseInt(paddedNum.substr(4, 2));
    const hundred = parseInt(paddedNum.substr(6, 1));
    const tens = parseInt(paddedNum.substr(7, 2));
  
    let str = '';
    if (crore) str += (a[crore] || b[Math.floor(crore / 10)] + " " + a[crore % 10]) + " crore ";
    if (lakh) str += (a[lakh] || b[Math.floor(lakh / 10)] + " " + a[lakh % 10]) + " lakh ";
    if (thousand) str += (a[thousand] || b[Math.floor(thousand / 10)] + " " + a[thousand % 10]) + " thousand ";
    if (hundred) str += a[hundred] + " hundred ";
    if (tens) str += (str !== "" ? "and " : "") + (a[tens] || b[Math.floor(tens / 10)] + " " + a[tens % 10]) + " ";
  
    return str.trim();
  }
  
  function numberToWordsInternational(num) {
    if (num === 0) return "zero";
  
    const a = ["", "one", "two", "three", "four", "five", "six", "seven", "eight", "nine", "ten", "eleven", "twelve", "thirteen", "fourteen", "fifteen", "sixteen", "seventeen", "eighteen", "nineteen"];
    const b = ["", "", "twenty", "thirty", "forty", "fifty", "sixty", "seventy", "eighty", "ninety"];
  
    const thousandGroups = ["", " thousand", " million", " billion"];
  
    function helper(n) {
      let str = '';
      if (n < 20) str = a[n];
      else if (n < 100) str = b[Math.floor(n / 10)] + (n % 10 ? " " + a[n % 10] : "");
      else str = a[Math.floor(n / 100)] + " hundred" + (n % 100 ? " and " + helper(n % 100) : "");
      return str;
    }
  
    let word = '';
    let i = 0;
    while (num > 0) {
      if (num % 1000 !== 0) {
        word = helper(num % 1000) + thousandGroups[i] + (word ? ", " + word : '');
      }
      num = Math.floor(num / 1000);
      i++;
    }
  
    return word;
  }
  