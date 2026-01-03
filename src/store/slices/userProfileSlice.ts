import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { UserProfileState } from '../types';
import { Student, Teacher } from '../../types/models';

const initialState: UserProfileState = {
  profile: null,
  isLoading: false,
  error: null,
};

const userProfileSlice = createSlice({
  name: 'userProfile',
  initialState,
  reducers: {
    fetchProfileRequest: state => {
      state.isLoading = true;
      state.error = null;
    },
    fetchProfileSuccess: (state, action: PayloadAction<Student | Teacher>) => {
      state.isLoading = false;
      state.profile = action.payload;
      state.error = null;
    },
    fetchProfileFailure: (state, action: PayloadAction<string>) => {
      state.isLoading = false;
      state.error = action.payload;
    },
    updateProfile: (state, action: PayloadAction<Student | Teacher>) => {
      state.profile = action.payload;
    },
    clearProfile: state => {
      state.profile = null;
      state.error = null;
    },
  },
});

export const {
  fetchProfileRequest,
  fetchProfileSuccess,
  fetchProfileFailure,
  updateProfile,
  clearProfile,
} = userProfileSlice.actions;

export default userProfileSlice.reducer;
