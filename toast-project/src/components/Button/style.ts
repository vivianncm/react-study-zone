import { toast } from "react-toastify";
import styled from "styled-components";

export const MyButton = styled.button `
    color: black;
    font-family: 'Franklin Gothic Medium', 'Arial Narrow', Arial, sans-serif;
    background-color: #13653D;
    border: 0cap;
    border-radius: 50%;
    width: 130px;
    height: 60px; 
    cursor: pointer;
`

toast.success("Sucesso!", {
    position: "top-right",
    autoClose:3000,
    hideProgressBar: false,
    closeOnClick: true,
    pauseOnHover: true,
    draggable: true,
});