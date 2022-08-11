export default (name, defaultValue = null) => {
    if (!window._env_ || !window._env_[name]) {
        return defaultValue;
    }

    return window._env_[name];
};
