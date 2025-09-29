import { observer } from "mobx-react-lite";
import LoginForm from "../components/LoginForm/LoginForm";

export const Login = observer(() => {

    return (
        <div>
            <LoginForm/>
        </div>
    );
})