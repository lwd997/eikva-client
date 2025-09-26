import $api from "../http";

export const getGroupsTC = async () => $api.get('/groups/get');

export const createGroupTC = async (name: string) => {
    return $api.post('/groups/add', {name});
}

export const createTC = async (user_input: string, test_case_group: string) => {
    return $api.post('/test-cases/add', {user_input, test_case_group});
}

export const createStepTC = async (test_case: string) => {
    return $api.post('/steps/add', {test_case});
}