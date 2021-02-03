import { useLocation } from 'react-router';
import {Redirect} from "react-router-dom";
import IsUrlDateNotLaterCurrent from "./IsUrlDateNotLaterCurrent";

function User() {
    const location = useLocation();
    const expressionWhereCheckDateStr = new RegExp("/users/(\\d+)/file/(\\d+)-(\\w{1,10})-(\\d{4})-(0[0-9]|[1][0-2])-([0-2][0-9]|3[0-1]).(docx|jpeg|pdf|txt)/v.(\\d{1}).(\\d{1}).(\\d{1})");

    if(expressionWhereCheckDateStr.exec(location.pathname)) {
        if(!IsUrlDateNotLaterCurrent(location.pathname)) {
            return <Redirect to="/articles"/>
        }
    }

    return (
        <main>
            <h2>Users</h2>
            <h3>path: {location.pathname}</h3>
        </main>
    )
}

export default User;
