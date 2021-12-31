import { useMutation } from 'react-query';
import request from '../utils/request';

const useRegisterUser = () => useMutation((user) => request({
    method: 'post',
    url: '/user/register',
    data: {
        user,
    },
}));

const useLoginUser = () => useMutation((user) => request({
    method: 'post',
    url: '/user/login',
    data: {
        user,
    },
}));

export {
    useRegisterUser,
    useLoginUser,
};
