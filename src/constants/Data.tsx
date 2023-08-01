import {
	EmailSvg,
	PasswordSvg,
	ConfigurationsSvg,
	CustomRulesSvg,
	IntegrationsSvg,
	SubscriptionSvg,
	RoleSvg,
	UsersSvg,
} from 'utils/svgs';

const phoneNumberValidator = (_: any, value: any) => {
	// Modify this regex pattern to match the format of phone numbers you want to validate
	const phoneRegex = /^[0-9]{10}$/;

	if (!value || value.match(phoneRegex)) {
		return Promise.resolve();
	}

	return Promise.reject(new Error('Please enter a valid phone number'));
};

export const FORMDATA = {
	loginFields: [
		{
			title: 'Email Address',
			id: 'email',
			type: 'text',
			name: 'email',
			svg: <EmailSvg />,
			placeHolder: '',
			required: true,
			rules: [
				{
					required: true,
					message: 'Please enter your email address',
					validateTrigger: 'onChange',
				},
				{
					type: 'email',
					message: 'Please enter valid e-mail',
					validateTrigger: 'onChange',
				},
			],
		},
		{
			title: 'Password',
			id: 'password',
			type: 'password',
			name: 'password',
			svg: <PasswordSvg />,
			placeHolder: '',
			required: true,
			rules: [
				{
					required: true,
					message: 'Please enter your password',
					validateTrigger: 'onChange',
				},
				// {
				// 	pattern:
				// 		/^(?=.*[A-Z])(?=.*[a-z])(?=.*\d)(?=.*[@#$%^&+=!])(?!.*\s).{8,16}$/,
				// 	message:
				// 		'Password should have minimum 8 characters at least 1 uppercase, 1 lowercase, 1 number and 1 special character',
				// 	validateTrigger: 'onChange',
				// },
			],
		},
	],
	resetPassword: [
		{
			title: 'New Password',
			id: 'password',
			type: 'password',
			name: 'password',
			svg: <PasswordSvg />,
			placeHolder: '',
			required: true,
			rules: [
				{
					required: true,
					message: 'Please enter your password',
					validateTrigger: 'onChange',
				},
				{
					pattern:
						/^(?=.*[A-Z])(?=.*[a-z])(?=.*\d)(?=.*[@#$%^&+=!])(?!.*\s).{8,16}$/,
					message:
						'Password should have minimum 8 characters at least 1 uppercase, 1 lowercase, 1 number and 1 special character',
					validateTrigger: 'onChange',
				},
			],
		},
		{
			title: 'Confirm Password',
			id: 'confirmPassword',
			type: 'password',
			name: 'confirmPassword',
			svg: <PasswordSvg />,
			placeHolder: '',
			required: true,
			rules: [
				{
					required: true,
					message: 'Please enter your password again',
					validationTrigger: 'onChange',
				},
				({ getFieldValue }: any) => ({
					validator(_: any, value: any) {
						if (!value || getFieldValue('password') === value) {
							return Promise.resolve();
						}
						return Promise.reject(new Error('Passwords do not match'));
					},
					validateTrigger: 'onChange',
				}),
			],
		},
	],
	forgotPassword: [
		{
			title: 'Email Address',
			id: 'email',
			type: 'text',
			name: 'email',
			svg: <EmailSvg />,
			placeHolder: '',
			required: true,
			rules: [
				{
					required: true,
					message: 'Please enter your email address',
					validateTrigger: 'onChange',
				},
				{
					type: 'email',
					message: 'Please enter valid e-mail',
					validateTrigger: 'onChange',
				},
			],
		},
	],
	settingsMenuItems: [
		{
			key: 'users',
			icon: <UsersSvg />,
			label: 'Users',
		},
		{
			key: 'roles',
			icon: <RoleSvg />,
			label: 'Roles',
		},
		{
			key: 'integrations',
			icon: <IntegrationsSvg />,
			label: 'Integrations',
		},
		{
			key: 'subscription',
			icon: <SubscriptionSvg />,
			label: 'Subscription',
		},
		{
			key: 'configurations',
			icon: <ConfigurationsSvg />,
			label: 'Configurations',
		},
		{
			key: 'customRules',
			icon: <CustomRulesSvg />,
			label: 'Custom Rules',
		},
	],
	pageMenuItems: [
		{
			key: 'dashboard',
			label: 'Dashboard',
		},
		{
			key: 'roles',
			label: 'Employee Costs',
		},
		{
			key: 'timeActivity',
			label: 'Time Activity',
		},
		{
			key: 'journalEntries',
			label: 'Journal Entries',
		},
		{
			key: 'reports',
			label: 'Reports',
		},
	],
	addUserFields: [
		{
			title: 'Full Name',
			id: 'fullName',
			type: 'text',
			name: 'fullName',
			placeHolder: '',
			required: false,
			rules: [
				{
					max: 30,
					message: 'Full name length must be less than 30 characters',
					validateTrigger: 'onChange',
				},
			],
		},
		{
			title: 'Select Role',
			id: 'roleName',
			type: 'text',
			name: 'roleName',
			defaultValue: '',
			placeholder: 'Enter role name',
			placeHolder: '',
			required: true,
			rules: [
				{
					required: true,
					message: 'Please select role',
					validateTrigger: 'onChange',
				},
			],
		},
		{
			title: 'Email Address',
			id: 'email',
			type: 'text',
			name: 'email',
			placeHolder: '',
			required: true,
			rules: [
				{
					required: true,
					message: 'Please enter email address',
					validateTrigger: 'onChange',
				},
				{
					type: 'email',
					message: 'Please enter valid email address',
					validateTrigger: 'onChange',
				},
			],
		},
		{
			title: 'Phone Number',
			id: 'phone',
			type: 'number',
			name: 'phone',
			placeHolder: '',
			required: false,
			rules: [{ validator: phoneNumberValidator, validateTrigger: 'onChange' }],
		},
	],
	addRoleFields: [
		{
			title: 'Role Name',
			id: 'roleName',
			type: 'text',
			name: 'roleName',
			defaultValue: '',
			placeholder: 'Enter role name',
			placeHolder: '',
			required: true,
			rules: [
				{
					required: true,
					message: 'Please enter role name',
					validateTrigger: 'onChange',
				},
				{
					max: 50,
					message: 'Role name length must be less than 50 characters',
					validateTrigger: 'onChange',
				},
			],
		},
		{
			title: 'Description',
			id: 'roleDescription',
			type: 'textArea',
			name: 'roleDescription',
			defaultValue: '',
			placeholder: 'Enter role description',
			placeHolder: '',
			required: true,
			rules: [
				{
					required: true,
					message: 'Please enter role description',
					validateTrigger: 'onSubmit',
				},
				{
					max: 200,
					message: 'Role description length must be less than 200 characters',
					validateTrigger: 'onChange',
				},
			],
		},
	],
};

export const userColumns = [
	{
		title: 'Organization Name',
		dataIndex: 'name',
		key: 'name',
		sorter: (a: any, b: any) => {
			return a.name.length - b.name.length;
		},
		sortDirections: ['descend'],
	},
	{
		title: 'Email Address',
		dataIndex: 'email',
		key: 'email',
	},
	{
		title: 'Phone number',
		dataIndex: 'phone',
		key: 'phone',
	},
	{
		title: 'Role',
		dataIndex: 'role',
		key: 'role',
	},
	{
		title: 'Action',
		dataIndex: 'action',
		key: 'action',
	},
];

export const roleDataSource: any = [];
roleDataSource.push({
	name: `Admin`,
	description: `Description for role`,
	permissions: `Permission Details`,
	status: true,
	action: `some action`,
});

for (let index = 0; index < 15; index++) {
	roleDataSource.push({
		name: `Role ${index}`,
		description: `Description for role ${index}`,
		permissions: `Permission Details`,
		status: index % 2 == 0 ? true : false,
		action: `some action`,
	});
}

export const roleColumns = [
	{
		title: 'Role Name',
		dataIndex: 'name',
		key: 'name',
		sorter: (a: any, b: any) => {
			return a.name.length - b.name.length;
		},
		sortDirections: ['descend'],
	},
	{
		title: 'Description',
		dataIndex: 'description',
		key: 'description',
	},
	{
		title: 'Status',
		dataIndex: 'status',
		key: 'status',
	},
	{
		title: 'Permissions',
		dataIndex: 'permissions',
		key: 'permissions',
	},
	{
		title: 'Action',
		dataIndex: 'action',
		key: 'action',
	},
];

export const PermissionDataSource: any = [
	{
		moduleName: 'Admin',
		isParentModule: true,
		all: false,
		view: false,
		edit: false,
		delete: false,
	},
	{
		moduleName: 'Dashboard',
		isParentModule: false,
		all: true,
		view: false,
		edit: false,
		delete: false,
	},
	{
		moduleName: 'Employee Cost',
		isParentModule: false,
		all: false,
		view: true,
		edit: true,
		delete: false,
	},
	{
		moduleName: 'Cost Allocation',
		isParentModule: false,
		all: false,
		view: false,
		edit: false,
		delete: false,
	},
	{
		moduleName: 'Journal Entries',
		isParentModule: false,
		all: false,
		view: true,
		edit: true,
		delete: false,
	},
	{
		moduleName: 'Time Activities',
		isParentModule: true,
		all: true,
		view: false,
		edit: false,
		delete: true,
	},
	{
		moduleName: 'TimeLogs',
		isParentModule: false,
		all: false,
		view: false,
		edit: false,
		delete: false,
	},
	{
		moduleName: 'TimeSheets',
		isParentModule: false,
		all: false,
		view: true,
		edit: true,
		delete: true,
	},
	{
		moduleName: 'Settings',
		isParentModule: true,
		all: false,
		view: false,
		edit: false,
		delete: false,
	},
	{
		moduleName: 'Roles',
		isParentModule: false,
		all: false,
		view: false,
		edit: false,
		delete: false,
	},
	{
		moduleName: 'Users',
		isParentModule: false,
		all: false,
		view: false,
		edit: false,
		delete: false,
	},
	{
		moduleName: 'Integrations',
		isParentModule: false,
		all: false,
		view: false,
		edit: false,
		delete: false,
	},
	{
		moduleName: 'Configurations',
		isParentModule: false,
		all: false,
		view: false,
		edit: false,
		delete: false,
	},
	{
		moduleName: 'Subscriptions',
		isParentModule: false,
		all: false,
		view: false,
		edit: false,
		delete: false,
	},
	{
		moduleName: 'Custom Rules',
		isParentModule: false,
		all: false,
		view: false,
		edit: false,
		delete: false,
	},
	{
		moduleName: 'Reports',
		isParentModule: true,
		all: false,
		view: false,
		edit: false,
		delete: false,
	},
	{
		moduleName: 'Time Summary',
		isParentModule: false,
		all: false,
		view: false,
		edit: false,
		delete: false,
	},
	{
		moduleName: 'Payroll Summary',
		isParentModule: false,
		all: false,
		view: false,
		edit: false,
		delete: false,
	},
	{
		moduleName: 'Customer Overview',
		isParentModule: false,
		all: false,
		view: false,
		edit: false,
		delete: false,
	},
];

export const UserProfileData = [
	{
		title: 'First Name',
		id: 'firstName',
		type: 'text',
		name: 'firstName',
		defaultValue: '',
		disabled: false,
		errorMessage: 'Please enter your first name',
		required: true,
		rules: [
			{
				required: true,
				message: 'Please enter your first name',
				validateTrigger: 'onChange',
			},
			{
				max: 30,
				message: 'First name length must be less than 30 characters',
				validateTrigger: 'onChange',
			},
		],
	},
	{
		title: 'Last Name',
		id: 'lastName',
		type: 'text',
		name: 'lastName',
		defaultValue: '',
		disabled: false,
		errorMessage: 'Please enter your last name',
		required: true,
		rules: [
			{
				required: true,
				message: 'Please enter your last name',
				validateTrigger: 'onChange',
			},
			{
				max: 30,
				message: 'First name length must be less than 30 characters',
				validateTrigger: 'onChange',
			},
		],
	},
	{
		title: 'Email Address',
		id: 'email',
		type: 'text',
		name: 'email',
		defaultValue: '',
		disabled: true,
		errorMessage: 'Please enter your email',
		required: false,
		rules: [],
	},
	{
		title: 'Phone Number',
		id: 'phone',
		type: 'number',
		name: 'phone',
		defaultValue: '',
		disabled: false,
		errorMessage: 'Please enter your number',
		required: true,
		rules: [
			{
				required: true,
				message: 'Please enter your number',
				validateTrigger: 'onChange',
			},
			{ validator: phoneNumberValidator, validateTrigger: 'onChange' },
		],
	},
];
