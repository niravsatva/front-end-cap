import { FC, useEffect } from 'react';
import { SettingsBodyProps } from './types';
import UsersTable from '../User';
import RoleTable from '../Role';
import { useDispatch } from 'react-redux';
import { clearRedux as clearReduxUser } from 'redux/slice/userSlice';
import { clearRedux as clearReduxRole } from 'redux/slice/roleTableSlice';
// Settings body
const SettingsBody: FC<SettingsBodyProps> = (props) => {
	// inits
	const dispatch = useDispatch();
	const { selectedSidebar } = props;

	useEffect(() => {
		if (selectedSidebar === 'roles') dispatch(clearReduxUser());
		if (selectedSidebar === 'users') dispatch(clearReduxRole());
	}, [selectedSidebar]);

	// JSX
	return (
		<div>
			{selectedSidebar === 'users' && <UsersTable />}
			{selectedSidebar === 'roles' && <RoleTable />}
		</div>
	);
};

export default SettingsBody;
