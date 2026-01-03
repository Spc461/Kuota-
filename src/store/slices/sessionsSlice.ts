import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { SessionsState } from '../types';
import { Session } from '../../types/models';

const initialState: SessionsState = {
  currentSession: null,
  upcomingSessions: [],
  pastSessions: [],
  isLoading: false,
  error: null,
};

const sessionsSlice = createSlice({
  name: 'sessions',
  initialState,
  reducers: {
    fetchSessionsRequest: state => {
      state.isLoading = true;
      state.error = null;
    },
    fetchSessionsSuccess: (
      state,
      action: PayloadAction<{
        upcoming: Session[];
        past: Session[];
      }>
    ) => {
      state.isLoading = false;
      state.upcomingSessions = action.payload.upcoming;
      state.pastSessions = action.payload.past;
      state.error = null;
    },
    fetchSessionsFailure: (state, action: PayloadAction<string>) => {
      state.isLoading = false;
      state.error = action.payload;
    },
    setCurrentSession: (state, action: PayloadAction<Session | null>) => {
      state.currentSession = action.payload;
    },
    addSession: (state, action: PayloadAction<Session>) => {
      state.upcomingSessions.unshift(action.payload);
    },
    updateSession: (state, action: PayloadAction<Session>) => {
      const index = state.upcomingSessions.findIndex(
        s => s.id === action.payload.id
      );
      if (index !== -1) {
        state.upcomingSessions[index] = action.payload;
      }
    },
    removeSession: (state, action: PayloadAction<string>) => {
      state.upcomingSessions = state.upcomingSessions.filter(
        s => s.id !== action.payload
      );
    },
    clearSessions: state => {
      state.currentSession = null;
      state.upcomingSessions = [];
      state.pastSessions = [];
      state.error = null;
    },
  },
});

export const {
  fetchSessionsRequest,
  fetchSessionsSuccess,
  fetchSessionsFailure,
  setCurrentSession,
  addSession,
  updateSession,
  removeSession,
  clearSessions,
} = sessionsSlice.actions;

export default sessionsSlice.reducer;
