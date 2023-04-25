import { Card, Col, Image, Row, Space, Typography } from 'antd';

import './BasePageNotFound.scss';

const BasePageNotFound = () => {
	return (
		<Row gutter={[0, 24]}>
			<Col xs={24}>
				<Card bordered={false} className='page404'>
					<Row align='middle' justify='center'>
						<Space align='center' direction='vertical'>
							<Image
								preview={false}
								src='https://res.cloudinary.com/ddo4hnmnv/image/upload/v1682065293/nqljos2zz2yr7dsk4aq6.png'
								style={{ width: 256 }}
							/>
							<Typography.Text strong>Page Not Found</Typography.Text>
							<Typography.Text type='cool-grey-400'>Oops, the page you are looking for was not found</Typography.Text>
						</Space>
					</Row>
				</Card>
			</Col>
		</Row>
	);
};

export default BasePageNotFound;
