import { configureStore } from '@reduxjs/toolkit';
import { TypedUseSelectorHook, useDispatch, useSelector } from 'react-redux';

// Import slices (to be created later)
// import authReducer from './slices/authSlice';
// import projectsReducer from './slices/projectsSlice';
// import visualizationReducer from './slices/visualizationSlice';

// Create the store
export const store = configureStore({
  reducer: {
    // Add reducers here as they are created
    // auth: authReducer,
    // projects: projectsReducer,
    // visualization: visualizationReducer,
    
    // For now, use an empty reducer to satisfy TypeScript
    _placeholder: (state = {}) => state,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: {
        // Ignore non-serializable values in specific action types
        ignoredActions: ['visualization/setGraphData'],
      },
    }),
  devTools: process.env.NODE_ENV !== 'production',
});

// Export types for TypeScript
export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;

// Create typed hooks for use throughout the app
export const useAppDispatch = () => useDispatch<AppDispatch>();
export const useAppSelector: TypedUseSelectorHook<RootState> = useSelector;

// Export reusable action creators and selectors
export const selectIsAuthenticated = (state: RootState) => 
  // Placeholder until auth slice is implemented
  Boolean(localStorage.getItem('authToken'));

export const selectCurrentUser = (state: RootState) => {
  // Placeholder until auth slice is implemented
  const userJson = localStorage.getItem('user');
  return userJson ? JSON.parse(userJson) : null;
};
