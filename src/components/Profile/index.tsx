/ eslint-disable prefer-const /;
import { Button, Col, Form, Input, Modal, Row, Upload } from 'antd';
import { FC, useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { updateProfileAction } from 'redux/action/profileAction';
import { CloseSvg, DeleteActionSvg, ImageUploadSvg } from 'utils/svgs';
import { formatPhoneNumber } from 'utils/utils';
import { UserProfileData as UserProfileDataSrc } from '../../constants/Data';
import style from './index.module.scss';
import './index.scss';
import { UserProfileModalProps } from './types';

// import { formatPhoneNumber } from 'utils/utils';

const UserProfileModal: FC<UserProfileModalProps> = (props) => {
	const { handleCancel, isProfileModalOpen } = props;
	const dispatch = useDispatch();
	const profileData = useSelector((state: any) => state?.userProfile?.data);
	const { updateLoader } = useSelector((state: any) => state?.userProfile);
	const profileImage = profileData.profileImg
		? [`${process.env.REACT_APP_AWS_BASE_URL}${profileData.profileImg}`]
		: [];
	const company = profileData.companies.find(
		(singleCompany: any) =>
			singleCompany.companyId === localStorage.getItem('companyId')
	);

	const [blob, setBlob] = useState<any>(
		profileData.profileImg
			? `${process.env.REACT_APP_AWS_BASE_URL}${profileData.profileImg}`
			: null
	);

	const [userProfileData, setUserProfileData] = useState<any>({
		firstName: profileData?.firstName,
		lastName: profileData?.lastName,
		email: profileData?.email,
		phone: profileData?.phone,
		profileImg: profileImage,
		role:
			company?.role?.roleName ||
			(company?.role?.roleName == undefined &&
				profileData?.isFirstCompanyAdmin &&
				'Company Admin'),
	});

	useEffect(() => {
		setUserProfileData((prev: any) => {
			const phone = prev?.phone
				? formatPhoneNumber(prev?.phone?.toString())
				: '';
			return {
				...prev,
				phone: phone,
			};
		});
	}, [profileData]);

	// Handle Submit Profile
	const handleSubmit = (values: any): void => {
		const profileData = new FormData();
		profileData.append('firstName', values.firstName);
		profileData.append('lastName', values.lastName);
		profileData.append('phone', values.phone);
		values?.profileImg?.[0] &&
			blob !== profileImage[0] &&
			profileData.append(
				'profileImg',
				values.profileImg[0].originFileObj || null
			);
		// Update Profile Action Dispatched
		dispatch(updateProfileAction(profileData) as any)
			.unwrap()
			.then(() => {
				handleCancel();
			})
			.catch(() => {
				handleCancel();
			});
	};

	// Set Profile Avatar
	const normFile = (e: any) => {
		if (Array.isArray(e)) {
			return e;
		}
		setUserProfileData((prev: any) => {
			setBlob(URL.createObjectURL(e.file));
			return {
				...prev,
				profileImg: e.file,
			};
		});
		return e?.fileList;
	};

	// for delete the image
	const deleteImageHandler = () => {
		setBlob(null);
		setUserProfileData((prev: any) => {
			return {
				...prev,
				profileImg: null,
			};
		});
	};

	return (
		<Modal
			open={isProfileModalOpen}
			onOk={handleSubmit}
			onCancel={handleCancel}
			okText={'Save'}
			closable={false}
			footer={null}
			className="profile-modal profile__popup"
		>
			<Form
				name="basic"
				labelCol={{ span: 8 }}
				wrapperCol={{ span: 16 }}
				style={{ maxWidth: 600 }}
				initialValues={userProfileData}
				onFinish={handleSubmit}
				autoComplete="off"
			>
				<Row className={style['profile-modal__header']}>
					<div className={style['profile-modal__header--left']}>
						<div className={style['profile-modal__header--avatar']}>
							<img src={blob || '/assets/images/user-default.png'} alt="" />
						</div>
						<Form.Item
							name="profileImg"
							valuePropName="fileList"
							getValueFromEvent={normFile}
							className={style['profile-modal__header--upload']}
						>
							<Upload
								name="profileImg"
								multiple={false}
								accept="image/png, image/jpeg"
								maxCount={1}
								beforeUpload={() => false}
								// onRemove={removeProfileImage}
								showUploadList={false}
							>
								<Button
									icon={<ImageUploadSvg />}
									className={style['profile-modal__header--upload--text']}
								>
									Add/Update Image
								</Button>
							</Upload>
						</Form.Item>
						{blob && (
							<div
								className={style['profile-modal__header-delete']}
								onClick={deleteImageHandler}
							>
								<DeleteActionSvg />
							</div>
						)}
					</div>
					<div
						className={style['profile-modal__header-delete']}
						onClick={handleCancel}
					>
						<CloseSvg />
					</div>
				</Row>
				<hr />
				<div className="profile-modal__body">
					<div className="userDetailsTitle">
						<b>User Details</b>
					</div>
					<Row gutter={24}>
						{UserProfileDataSrc?.map((item: any, index: number) => (
							<Col
								className="gutter-row fields"
								xs={24}
								sm={item.name == 'email' ? 24 : 12}
								md={item.name == 'email' ? 24 : 12}
								key={index}
								lg={item.name == 'email' ? 24 : 12}
							>
								<label className="register-form-label">
									{item?.title}{' '}
									{item?.required && <span className="required-color">*</span>}
								</label>
								<Form.Item
									className="formItem"
									name={item?.name}
									rules={item?.rules as []}
									wrapperCol={{ span: 24 }}
								>
									<Input
										size="large"
										disabled={item?.disabled}
										type={item?.type}
										// defaultValue={userProfileData[item?.name]}
									/>
								</Form.Item>
							</Col>
						))}
						<Col className="gutter-row fields" xs={24} sm={12} md={12} lg={12}>
							<label className="register-form-label">{`Role`}</label>
							<Form.Item
								className="formItem"
								name={'role'}
								wrapperCol={{ span: 24 }}
							>
								<Input
									size="large"
									disabled
									defaultValue={userProfileData['role']}
								/>
							</Form.Item>
						</Col>
					</Row>
				</div>
				<hr />
				<div className="profile_modal_footer">
					<Row justify="start" className="footerbtns" gutter={16}>
						<Col xs={12} md={7} lg={7} sm={8}>
							{
								<Button
									className={`${updateLoader && 'pointer-event-none'} save`}
									block={true}
									htmlType="submit"
									// size='small'
								>
									{updateLoader ? (
										<img src="/assets/gifs/loading-black.gif" height={40} />
									) : (
										'Save'
									)}
								</Button>
							}
						</Col>
						<Col xs={12} md={7} lg={7} sm={8}>
							<Button className="cancel" block={true} onClick={handleCancel}>
								Cancel
							</Button>
						</Col>
					</Row>
				</div>
			</Form>
		</Modal>
	);
};

export default UserProfileModal;
