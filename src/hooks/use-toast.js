import React, { useReducer, useEffect, useRef } from "react";

const TOAST_LIMIT = 1;
const TOAST_REMOVE_DELAY = 5000; // Shorten to allow new toasts to appear

const actionTypes = {
  ADD_TOAST: "ADD_TOAST",
  UPDATE_TOAST: "UPDATE_TOAST",
  DISMISS_TOAST: "DISMISS_TOAST",
  REMOVE_TOAST: "REMOVE_TOAST",
};

const initialState = { toasts: [] };

const toastReducer = (state, action) => {
  switch (action.type) {
    case actionTypes.ADD_TOAST:
      return {
        ...state,
        toasts: [action.toast, ...state.toasts].slice(0, TOAST_LIMIT),
      };
    case actionTypes.UPDATE_TOAST:
      return {
        ...state,
        toasts: state.toasts.map((t) =>
          t.id === action.toast.id ? { ...t, ...action.toast } : t
        ),
      };
    case actionTypes.DISMISS_TOAST:
      return {
        ...state,
        toasts: state.toasts.map((t) =>
          t.id === action.toastId ? { ...t, open: false } : t
        ),
      };
    case actionTypes.REMOVE_TOAST:
      return {
        ...state,
        toasts: state.toasts.filter((t) => t.id !== action.toastId),
      };
    default:
      return state;
  }
};

export const useToast = () => {
  const [state, dispatch] = useReducer(toastReducer, initialState);
  const toastTimeouts = useRef(new Map());

  const addToRemoveQueue = (toastId) => {
    if (!toastTimeouts.current.has(toastId)) {
      const timeout = setTimeout(() => {
        toastTimeouts.current.delete(toastId);
        dispatch({ type: actionTypes.REMOVE_TOAST, toastId });
      }, TOAST_REMOVE_DELAY);
      toastTimeouts.current.set(toastId, timeout);
    }
  };

  const toast = (props) => {
    const id = Date.now().toString();
    dispatch({
      type: actionTypes.ADD_TOAST,
      toast: { ...props, id, open: true },
    });
    return {
      id,
      dismiss: () => dispatch({ type: actionTypes.DISMISS_TOAST, toastId: id }),
    };
  };

  useEffect(() => {
    return () => {
      toastTimeouts.current.forEach((timeout) => clearTimeout(timeout));
      toastTimeouts.current.clear();
    };
  }, []);

  return { toasts: state.toasts, toast };
};
