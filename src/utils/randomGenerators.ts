export const getRandomNumbers = (min: number, max: number, count: number): number[] => {
    const numbers = new Set<number>(); 
  
    while (numbers.size < count) {
      const randomNumber = Math.floor(Math.random() * (max - min + 1)) + min;
      numbers.add(randomNumber);
    }
  
    return Array.from(numbers); 
  };

  export const shuffleArray = ( array: any ) => {
    const shuffled = [...array]; 
    for (let i = shuffled.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1)); 
      [shuffled[i], shuffled[j]] = [shuffled[j], shuffled[i]]; 
    }
    return shuffled;
  };