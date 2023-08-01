export type ConfirmDeleteProps = {
	isModalOpen: boolean;
	handleOk: () => void;
	handleCancel: () => void;
	deleteHandler?: () => void;
	isLoading?: boolean;
};
