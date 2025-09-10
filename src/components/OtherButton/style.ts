import { toast } from "react-toastify";
import styled from "styled-components";

export const MyButton = styled.button `
    color: black;
    font-family: 'Franklin Gothic Medium', 'Arial Narrow', Arial, sans-serif;
    background-color: #651314;
    border: 0cap;
    border-radius: 50%;
    width: 130px;
    height: 60px; 
    cursor: pointer;
`

toast.error("Falha ao realizar ação!", {
  position: "top-right",
  autoClose: 5000, 
  hideProgressBar: false,
  closeOnClick: true,
  pauseOnHover: true,
  draggable: true,
});