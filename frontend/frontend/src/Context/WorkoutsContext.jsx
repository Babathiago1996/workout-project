import { Children, createContext, useReducer } from "react";
export const WorkoutsContext = createContext();

const workoutsReducer = (state, action) => {
  switch (action.type) {
    case "SET_WORKOUTS":
      return { workouts: action.payload };
    case "CREATE_WORKOUT":
      return { workouts: [action.payload, ...state.workouts] }
      default:
        return state
        
  }
};
export const WorkoutsProvider = ({ children }) => {
  const [state, dispatch ] = useReducer(workoutsReducer, {
    workouts: null,
  });

  return(
  <WorkoutsContext.Provider value={{...state, dispatch }}>
    {children}
  </WorkoutsContext.Provider>);
};
