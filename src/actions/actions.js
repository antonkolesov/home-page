import Core from 'core';

const readApps = async (dispatch) => {
    dispatch('setApps', Core.pending);

    let response = await fetch('apps.json');

    if (response.ok) {
        dispatch('setApps', await response.json());
    } else {
        dispatch('setApps', Core.error);
    }
};

export default {
    readApps
};