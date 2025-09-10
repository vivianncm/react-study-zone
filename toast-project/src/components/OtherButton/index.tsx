import { MyButton } from "./style"
import { toast } from "react-toastify";

function OtherButton(){
    const handleClick = () =>{
        toast.error("Falha ao realizar!", {
    style: {
      background: "#651314", 
      color: "#fff",         
    },
  });
};
    return(
        <div>
            <MyButton onClick={handleClick}>
                Agora aqui
            </MyButton>
        </div>
    );
}

export default OtherButton