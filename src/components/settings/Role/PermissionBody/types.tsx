export type SideDrawerBodyProps = {
	closeDrawerByAnimation: () => void;
	permissions: PermissionProps[];
	selectedRole: any;
};

export type PermissionProps = {
	moduleName: string;
	isParentModule: boolean;
	all: boolean;
	view: boolean;
	edit: boolean;
	delete: boolean;
};
