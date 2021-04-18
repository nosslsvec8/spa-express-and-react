import {useJwt} from "react-jwt";

/**
 * @return {boolean}
 */
function IsCheckAccessToken() {
    const accessToken = localStorage.getItem('accessToken');
    const {isExpired} = useJwt(accessToken);

    if(accessToken === null || isExpired) {
        return false;
    }

    if(!isExpired) {
        return true;
    }
}

export default IsCheckAccessToken;
