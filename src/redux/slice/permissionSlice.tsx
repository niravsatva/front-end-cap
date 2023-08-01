import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import { getApi } from 'redux/apis';

const initialState: any = {
	isLoading: false,
	data: [],
	error: null,
};

export const permissionsAction = createAsyncThunk(
	'auth/permission',
	async (roleId: any, { rejectWithValue }) => {
		try {
			const response = await getApi(`/permission/${roleId}`);
			return response.data.data;
		} catch (error: any) {
			if (!error.response) {
				throw error;
			}
			return rejectWithValue(error?.response?.data);
		}
	}
);

const permissionsSlice = createSlice({
	initialState,
	name: 'Permission',
	reducers: {
		updatePermissionHandler: (state, action) => {
			state.data = action.payload;
		},
	},
	extraReducers: (builder) => {
		builder.addCase(permissionsAction.pending, (state) => {
			state.isLoading = true;
		});
		builder.addCase(permissionsAction.fulfilled, (state, action) => {
			state.data = action.payload;
			state.isLoading = false;
		});
		builder.addCase(permissionsAction.rejected, (state) => {
			state.isLoading = false;
		});
	},
});

export default permissionsSlice;

export const { updatePermissionHandler } = permissionsSlice.actions;
