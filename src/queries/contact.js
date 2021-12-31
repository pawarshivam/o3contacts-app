import { useMutation, useQuery, useQueryClient } from 'react-query';
import request from '../utils/request';

const useSaveContact = () => {
    const queryClient = useQueryClient();

    return useMutation((contact) => request({
        method: 'put',
        url: '/contact',
        data: {
            contact,
        },
    }), {
        onSuccess: () => {
            queryClient.invalidateQueries('get:contacts');
        }
    });
};

const useDeleteContact = () => {
    const queryClient = useQueryClient();

    return useMutation((_id) => request({
        method: 'delete',
        url: `/contact/${_id}`,
        data: {
        },
    }), {
        onSuccess: () => {
            queryClient.invalidateQueries('get:contacts');
        }
    });
};

const useGetContact = () => useQuery('get:contacts', () => request({
    method: 'get',
    url: '/contact',
}), {
    initialData: {
        data: {
            contacts: []
        }
    }
});

export {
    useSaveContact,
    useDeleteContact,
    useGetContact,
};
