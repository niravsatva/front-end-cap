import { Sidebar } from 'components/Global';
import { FORMDATA } from 'constants/Data';
import styles from './index.module.scss';
import { FC } from 'react';
import { SettingsLayoutProps } from './types';

// Settings page layout
const SettingsLayout: FC<SettingsLayoutProps> = (props) => {
	// inits
	const { settingsMenuItems } = FORMDATA;
	const { children, onSideBarChange, selectedSidebar } = props;
	// JSX
	return (
		<div className={styles['settings-layout']}>
			<div className={styles['settings-layout__wrapper']}>
				<Sidebar
					items={settingsMenuItems}
					isGetSupportButton={true}
					handleSidebar={onSideBarChange}
					selectedSidebar={selectedSidebar as string}
				/>
				<div className={styles['settings-layout__body']}>{children}</div>
			</div>
		</div>
	);
};

export default SettingsLayout;
