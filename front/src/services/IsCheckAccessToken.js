import {useQuery} from "react-query";
import {isCheckAccessToken} from "../containers/hooks/crud";

/**
 * @return {boolean}
 */
function IsCheckAccessToken() {
    const accessToken = localStorage.getItem('accessToken');
    const {data: response, isFetching, status} = useQuery(['accessToken'], () => isCheckAccessToken({accessToken}));
    const booleanReq = response?.data || [];

    if(accessToken === null || status === 'error') {
        return false;
    }

    if(booleanReq && !isFetching) {
        return true;
    }
}

export default IsCheckAccessToken;
