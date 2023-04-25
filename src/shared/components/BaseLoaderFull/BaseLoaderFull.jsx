import { LoadingOutlined } from '@ant-design/icons';

import './BaseLoaderFull.scss';

const BaseLoaderFull = () => {
	return (
		<div className='shared-component__BaseLoaderFullWH__wrapper'>
			<LoadingOutlined size={256} />
		</div>
	);
};

export default BaseLoaderFull;
