import { createSlice } from '@reduxjs/toolkit';

// import { toastText } from 'utils/utils';

const initialState: any = {
	data: null,
	isLoading: false,
	error: null,
};

const CompanySlice = createSlice({
	name: 'company',
	initialState,
	reducers: {
		getCompanies: (state, data) => {
			const companies = data?.payload?.data?.companies;
			if (companies?.length > 0) {
				localStorage.setItem('companyId', companies[0]?.company?.id);
				localStorage.setItem('companyName', companies[0]?.company?.tenantName);
			}
			state.data = companies;
		},
	},
});

export const { getCompanies } = CompanySlice.actions;
export default CompanySlice;
