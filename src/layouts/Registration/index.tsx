import { FC } from 'react';
import styles from './index.module.scss';
import { Row, Col, Image } from 'antd';
import { RegistrationLayoutInterface } from './types';

// Registration login forgot password page
const RegistrationLayout: FC<RegistrationLayoutInterface> = (props) => {
	const { children } = props;
	return (
		<div className={styles['registration']}>
			<Row
				className={styles['registration__wrapper']}
				justify={'space-between'}
				align={'middle'}
			>
				<Col className={styles['registration__details']} span={13}>
					<div className={styles['registration__details--logo']}>
						<Image
							src="/assets/images/cap-logo.png"
							preview={false}
							alt="group"
						/>
					</div>
					<div className={styles['registration__details--body']}>
						{children}
					</div>
				</Col>
				<Col className={styles['registration__layout']} span={11}>
					<Image
						className={styles['registration__layout--image']}
						src="/assets/images/login-image.png"
						preview={false}
						alt="group"
					/>
				</Col>
			</Row>
		</div>
	);
};

export default RegistrationLayout;
