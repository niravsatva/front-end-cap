import { Header, Sidebar } from 'components/Global';
import { Outlet } from 'react-router-dom';
import { FORMDATA } from 'constants/Data';
import styles from './index.module.scss';
import { useSelector } from 'react-redux';
// Creating the global layout for along all the pages
const GlobalLayout = () => {
	// inits
	const { pageMenuItems } = FORMDATA;
	const { isLoading } = useSelector((state: any) => state.userProfile);

	// JSX
	return !isLoading ? (
		<div className={styles['global-layout']}>
			<div className={styles['global-layout__wrapper']}>
				<div className={styles['global-layout__header']}>
					<Header />
				</div>
				<div className={styles['global-layout__body']}>
					<div className={styles['global-layout__body--sidebar']}>
						<Sidebar
							items={pageMenuItems}
							isGetSupportButton={false}
							selectedSidebar="dashboard"
						/>
					</div>
					<div className={styles['global-layout__body--body']}>
						<Outlet />
					</div>
				</div>
			</div>
		</div>
	) : null;
};

export default GlobalLayout;
