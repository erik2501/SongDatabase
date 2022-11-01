// Her har vi en debounce funksjon som gjør at rendering av den gjeldende kompnenten venter 500 millisekunder. 
// I hovedsak bruker vi dette til å vente med å hente sanger 500 ms etter bruker har begynt å skrive noe i søk. 

export function debounce<T extends (...argsx: any[]) => void>(callback: T, delay = 500) {
    let timeout: NodeJS.Timeout;
  
    return (...args: Parameters<T>) => {
      clearTimeout(timeout);
      timeout = setTimeout(() => {
        callback(...args);
      }, delay);
    };
  }