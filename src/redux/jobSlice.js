import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";
import { JOB_API_END_POINT } from '../components/utils/constant';

export const fetchAllJobs = createAsyncThunk(
  'job/fetchAllJobs',
  async (keyword = "", thunkAPI) => {
    try {
      const response = await axios.get(`${JOB_API_END_POINT}/get?keyword=${keyword}`, {
        withCredentials: true
      });
      console.log('API Response:', response.data);

      if (response.data.success) {
        return response.data.jobs || [];
      } else {
        return thunkAPI.rejectWithValue('Failed to fetch jobs');
      }
    } catch (error) {
      console.error('API Error:', error.response?.data || error.message);
      return thunkAPI.rejectWithValue(error.response?.data?.message || error.message);
    }
  }
);

const jobSlice = createSlice({
  name: "job",
  initialState: {
    allJobs: [],
    allAdminJobs: [],
    singleJob: null,
    searchJobByText: "",
    allAppliedJobs: [],
    searchedQuery: "",
    loading: false,
    error: null
  },
  reducers: {
    setAllJobs: (state, action) => {
      state.allJobs = action.payload;
    },
    setAllAdminJobs: (state, action) => {
      state.allAdminJobs = action.payload;
    },
    setSingleJob: (state, action) => {
      state.singleJob = action.payload;
    },
    setSearchJobByText: (state, action) => {
      state.searchJobByText = action.payload;
    },
    setAllAppliedJobs: (state, action) => {
      state.allAppliedJobs = action.payload;
    },

    setSearchedQuery: (state, action) => {
      state.searchedQuery = action.payload;
    }
    ,
    clearError: (state) => {
      state.error = null;
    }
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchAllJobs.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchAllJobs.fulfilled, (state, action) => {
        state.loading = false;
        state.allJobs = action.payload;
        state.error = null;
      })
      .addCase(fetchAllJobs.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
        state.allJobs = [];
      });
  }
});

export const {
  setAllJobs,
  setAllAdminJobs,
  setSingleJob,
  setSearchJobByText,
  setAllAppliedJobs,
  setSearchedQuery,
  clearError
} = jobSlice.actions;

export default jobSlice.reducer;