import Core from 'core';

const defaults = {
    apps: Core.empty
};

const setApps = (state, apps) => {
    return state.set('apps', apps);
};

export default {
    defaults,
    setApps
};