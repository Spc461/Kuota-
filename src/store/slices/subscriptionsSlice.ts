import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { SubscriptionsState } from '../types';
import { Subscription } from '../../types/models';

const initialState: SubscriptionsState = {
  subscriptions: [],
  isLoading: false,
  error: null,
};

const subscriptionsSlice = createSlice({
  name: 'subscriptions',
  initialState,
  reducers: {
    fetchSubscriptionsRequest: state => {
      state.isLoading = true;
      state.error = null;
    },
    fetchSubscriptionsSuccess: (
      state,
      action: PayloadAction<Subscription[]>
    ) => {
      state.isLoading = false;
      state.subscriptions = action.payload;
      state.error = null;
    },
    fetchSubscriptionsFailure: (state, action: PayloadAction<string>) => {
      state.isLoading = false;
      state.error = action.payload;
    },
    addSubscription: (state, action: PayloadAction<Subscription>) => {
      state.subscriptions.unshift(action.payload);
    },
    updateSubscription: (state, action: PayloadAction<Subscription>) => {
      const index = state.subscriptions.findIndex(
        s => s.id === action.payload.id
      );
      if (index !== -1) {
        state.subscriptions[index] = action.payload;
      }
    },
    removeSubscription: (state, action: PayloadAction<string>) => {
      state.subscriptions = state.subscriptions.filter(
        s => s.id !== action.payload
      );
    },
    clearSubscriptions: state => {
      state.subscriptions = [];
      state.error = null;
    },
  },
});

export const {
  fetchSubscriptionsRequest,
  fetchSubscriptionsSuccess,
  fetchSubscriptionsFailure,
  addSubscription,
  updateSubscription,
  removeSubscription,
  clearSubscriptions,
} = subscriptionsSlice.actions;

export default subscriptionsSlice.reducer;
