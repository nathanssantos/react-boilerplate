const useLocalStorage = (key = '') => {
  const state = JSON.parse(localStorage.getItem(`clockify-teams@${key}`)) || {};

  const setState = (newState) => {
    localStorage.setItem(`clockify-teams@${key}`, JSON.stringify(newState));
  };

  return [state, setState];
};

export default useLocalStorage;
