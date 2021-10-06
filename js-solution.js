// code goes here  
  const arr = [];
  let result = '';
  for(let i=0; i<strArr.length; i++){
    let exist =false;
    const elements = strArr[i].split(':');
    
    for(let a=0; a<arr.length ;a++) {
      
      if(arr[a].startsWith(elements[0]) ) {
        
         const arrayElements = arr[a].split(':');
         const newValue = +elements[1] + +arrayElements[1];

         arr[a] = arrayElements[0] + ":" + newValue; 
         exist=true;
      } 
    }
    if(!exist) {
      arr.push(strArr[i]);
    }
    
  } 
  console.log(arr);
  for(a of arr ) {
    if(!a.includes(':0')) {
      result += a + " , "  ;
    }

  }
  return result.substring(0, result.length - 2); 

}
   
// keep this function call here 
console.log(GroupTotals(readline()));