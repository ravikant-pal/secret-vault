import  { axiosPrivate } from '../config/axios';
import useAuth from './useAuth';

const useRefreshToken = () => {
    const { setAuth } = useAuth();

    const refresh = async () => {
        const response = await axiosPrivate.get('/users/refresh');
        setAuth({ accessToken: response.data.accessToken });
        return response.data.accessToken;
    }
    return refresh;
};

export default useRefreshToken;
