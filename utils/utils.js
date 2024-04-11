// Abbreviate large numbers into short forms like "2k" for 2000

function abbreviateNumber(number) {
    // Check if the number is greater than or equal to 1 million
    if (number >= 1e6) {
      return (number / 1e6).toFixed(1) + 'M'; // Convert to millions (1M, 2.5M, etc.)
    }
    // Check if the number is greater than or equal to 1 thousand
    else if (number >= 1e3) {
      return (number / 1e3).toFixed(1) + 'k'; // Convert to thousands (1k, 2.5k, etc.)
    }
    // If the number is less than 1 thousand, return as is
    else {
      return number.toString();
    }
  }
  
  export default abbreviateNumber;
  