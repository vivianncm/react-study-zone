import { MyButton } from "./style"
import { toast } from "react-toastify";

function Button (){
    const handleClick = () =>{
        toast.success("Realizado com sucesso!", {
    style: {
      background: "#13653D", 
      color: "#fff",         
    },
  });
};
    return(
        <div>
            <MyButton onClick={handleClick}>
                Clique aqui
            </MyButton>
        </div>
    );
}

export default Button