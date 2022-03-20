import { createContext, useState} from "react";

const CalculatorContext = createContext();

export const CalculatorProvider = ({ children }) => {
  
  const [display, setDispay] = useState("");
  
  
  const [result, setResult] = useState("");
  

  
const ops=['/','*','+','-','.','=']
  const handleDisplay = (value) => {
    if((ops.includes(value) && display==='' )||( ops.includes(value)&& ops.includes(display.slice(-1))) ){
      return ;
    }
    else if(display.slice(-1)==='='){
      setDispay(value)
      setResult(0)
    }
    else{
      setDispay((prev) => prev + value);
    }
    
    

  };
  const handleResult = () => {
   

    const answer= eval(display)
    if(!Number.isInteger(answer)){
       
       setResult(answer.toFixed(4));
    }
   
   else{
     setResult(answer);
   }
    
    setDispay(prev=>prev+'=')
  };
  const clear=()=>{
    setDispay('')
    setResult(0)
  }

  return (
    <CalculatorContext.Provider
      value={{
        
        display,
        
        result,
        
        clear,
        handleResult,

        handleDisplay,
      }}
    >
      {children}
    </CalculatorContext.Provider>
  );
};
export default CalculatorContext;
