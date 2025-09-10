import { Title } from "./style"
import Button from "../../components/Button"
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import OtherButton from "../../components/OtherButton";

function Home (){
    return(
        <div>
            <Title>Home</Title>
             <ToastContainer />
                <Button />
                <OtherButton />
        </div>
    )
}

export default Home