import { configureStore } from '@reduxjs/toolkit';
import loginSlice from './slice/loginSlice';
import profileSlice from './slice/profileSlice';
import companySlice from './slice/companySlice';
import userSlice from './slice/userSlice';
import roleSlice from './slice/roleSlice';
import permissionsSlice from './slice/permissionSlice';
import RoleTableSlice from './slice/roleTableSlice';
const store = configureStore({
	reducer: {
		auth: loginSlice.reducer,
		userProfile: profileSlice.reducer,
		companies: companySlice.reducer,
		users: userSlice.reducer,
		roles: roleSlice.reducer,
		permissions: permissionsSlice.reducer,
		roleTable: RoleTableSlice.reducer,
	},
});

export default store;
export type AppDispatch = typeof store.dispatch;
