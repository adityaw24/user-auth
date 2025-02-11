import { create } from "zustand";
import { createJSONStorage, persist } from "zustand/middleware";
import axiosInstance from "~/services/axios";
import { storageName } from "~/utils/const";

interface InitialStateProps {
  user: any;
  token: string;
}

const initialState: InitialStateProps = {
  user: {},
  token: "",
};

function getInitialState() {
  const savedUser = localStorage.getItem(storageName.user) || "";
  const savedToken = localStorage.getItem(storageName.token);

  const initialStateCopy = { ...initialState };

  if (savedToken) {
    initialStateCopy.user = savedUser !== "" ? JSON.parse(savedUser) : {};
    initialStateCopy.token = savedToken;

    axiosInstance.defaults.headers.common["Authorization"] =
      "Bearer " + savedToken;

    return initialStateCopy;
  } else {
    return initialStateCopy;
  }
}

function createAuthStore(set, get) {
  const setUser = (newUser: any) => {
    localStorage.setItem(storageName.user, JSON.stringify(newUser));

    set(() => ({
      user: newUser,
    }));
  };

  const setToken = (newToken: string) => {
    // axiosInstance.defaults.headers.common["Authorization"] =
    //     "Bearer " + newToken;

    localStorage.setItem(storageName.token, newToken);
    set(() => ({ token: newToken }));
  };

  const resetState = () => {
    delete axiosInstance.defaults.headers.common["Authorization"];
    localStorage.clear();
    set({ ...initialState });
  };

  return {
    ...getInitialState(),
    setUser,
    setToken,
    resetState,
  };
}

const partializeAuthStore = (state: InitialStateProps) => {
  return {
    token: state.token,
    user: state.user,
  };
};

const useAuthStore = create(
  persist(createAuthStore, {
    name: storageName.userData,
    storage: createJSONStorage(() => localStorage),
    partialize: (state) => partializeAuthStore(state),
  })
);

export default useAuthStore;
