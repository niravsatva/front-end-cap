import { Checkbox, Table, Typography } from 'antd';
import { FC, useState } from 'react';
import { useDispatch } from 'react-redux';
import { updatePermissionHandler } from 'redux/slice/permissionSlice';
import styles from './index.module.scss';
import './index.scss';
import { PermissionProps, SideDrawerBodyProps } from './types';
import { postApi } from 'redux/apis';
import { toastText } from 'utils/utils';
const { Text } = Typography;

const PermissionBody: FC<SideDrawerBodyProps> = (props) => {
	// Inits
	const { Column } = Table;
	const { permissions, closeDrawerByAnimation, selectedRole } = props;
	const [permissionsCopy, setPermissionsCopy] = useState(permissions);
	const dispatch = useDispatch();
	const savePermissionHandler = async () => {
		try {
			const data = {
				orgId: localStorage.getItem('companyId'),
				roleId: selectedRole.id,
				permissions: permissionsCopy,
			};
			const response = await postApi('/permission/update-permission', data);
			if (response.status === 202) {
				dispatch(updatePermissionHandler(permissionsCopy));
				closeDrawerByAnimation();
				toastText(response.data.message, 'success');
			}
		} catch (error) {
			toastText('Something went wrong', 'error');
			console.log(error);
		}
	};

	const PermissionChangeHandler = (
		data: any,
		e: any,
		permissionName: string
	) => {
		const PermissionUpdate = permissionsCopy.map((item: any) => {
			let duplicateItem = { ...item };
			if (item.id === data.id) {
				if (e.target.checked) {
					if (permissionName === 'all') {
						duplicateItem = {
							...duplicateItem,
							all: true,
							view: true,
							edit: true,
							delete: true,
							add: true,
						};
					} else if (permissionName === 'add') {
						duplicateItem = {
							...duplicateItem,
							view: true,
							add: true,
						};
					} else if (permissionName === 'edit') {
						duplicateItem = {
							...duplicateItem,
							view: true,
							edit: true,
						};
					} else if (permissionName === 'delete') {
						duplicateItem = {
							...duplicateItem,
							view: true,
							delete: true,
						};
					} else {
						duplicateItem = {
							...duplicateItem,
							view: true,
						};
					}

					duplicateItem[permissionName] = true;
					const propertyNames = Object.keys(duplicateItem).filter(
						(key) => key !== 'moduleName' && key !== 'all'
					);

					const anyFalseValue = propertyNames.some(
						(key) => duplicateItem[key] === false
					);

					duplicateItem.all = !anyFalseValue;
					return duplicateItem;
				} else {
					if (permissionName === 'all' || permissionName === 'view') {
						return {
							...item,
							all: false,
							view: false,
							edit: false,
							delete: false,
							add: false,
						};
					} else {
						return { ...item, [permissionName]: false, all: false };
					}
				}
			}
			return item;
		});

		setPermissionsCopy(PermissionUpdate);
	};
	// JSX
	return (
		<div className={'permission-details-drawer'}>
			<Table
				// columns={permissionColumn}
				dataSource={permissionsCopy}
				pagination={false}
				className={`${styles['dynamic-permission-table']} table-global`}
			>
				<Column
					title="Module Name"
					dataIndex="permissionName"
					key="moduleName"
					width={'40%'}
					render={(value: string, rowData: PermissionProps) => {
						return (
							<Text
								className={
									rowData?.isParentModule == true
										? 'parent-module'
										: 'child-module'
								}
							>
								{value}
							</Text>
						);
					}}
				/>
				<Column
					title="All"
					dataIndex="all"
					key="all"
					width={'15%'}
					render={(value: boolean, rowData: PermissionProps) => {
						return (
							<>
								{rowData?.moduleName === 'Admin' ? (
									` `
								) : (
									<Checkbox
										checked={value}
										defaultChecked={value}
										onChange={(e) => PermissionChangeHandler(rowData, e, 'all')}
									></Checkbox>
								)}
							</>
						);
					}}
				/>
				<Column
					title="Add"
					dataIndex="add"
					key="add"
					width={'15%'}
					render={(value: boolean, rowData: PermissionProps) => {
						return (
							<>
								{rowData?.moduleName === 'Admin' ? (
									` `
								) : (
									<Checkbox
										checked={value}
										defaultChecked={value}
										onChange={(e) => PermissionChangeHandler(rowData, e, 'add')}
									></Checkbox>
								)}
							</>
						);
					}}
				/>
				<Column
					title="View"
					dataIndex="view"
					key="view"
					width={'15%'}
					render={(value: boolean, rowData: PermissionProps) => (
						<>
							{rowData?.moduleName === 'Admin' ? (
								` `
							) : (
								<Checkbox
									checked={value}
									defaultChecked={value}
									onChange={(e) => PermissionChangeHandler(rowData, e, 'view')}
								></Checkbox>
							)}
						</>
					)}
				/>
				<Column
					title="Edit"
					dataIndex="edit"
					key="edit"
					width={'15%'}
					render={(value: boolean, rowData: PermissionProps) => (
						<>
							{rowData?.moduleName === 'Admin' ? (
								` `
							) : (
								<Checkbox
									checked={value}
									defaultChecked={value}
									onChange={(e) => PermissionChangeHandler(rowData, e, 'edit')}
								></Checkbox>
							)}
						</>
					)}
				/>
				<Column
					title="Delete"
					dataIndex="delete"
					key="delete"
					width={'15%'}
					render={(value: boolean, rowData: PermissionProps) => (
						<>
							{rowData?.moduleName === 'Admin' ? (
								` `
							) : (
								<Checkbox
									checked={value}
									defaultChecked={value}
									onChange={(e) =>
										PermissionChangeHandler(rowData, e, 'delete')
									}
								></Checkbox>
							)}
						</>
					)}
				/>
			</Table>
			<div className={styles['side-drawer-form']}>
				<div className={styles['side-drawer-form__buttons']}>
					<button
						onClick={savePermissionHandler}
						className={`${styles['side-drawer-form__buttons--save']} ${styles['side-drawer-form__buttons--btn']}`}
					>
						Save
					</button>
					<button
						className={`${styles['side-drawer-form__buttons--cancel']} ${styles['side-drawer-form__buttons--btn']}`}
						onClick={closeDrawerByAnimation}
					>
						Cancel
					</button>
				</div>
			</div>
		</div>
	);
};

export default PermissionBody;
