import React from 'react';

import { Col, Row } from 'antd';

import BaseDetailStrip from '../../../../shared/components/BaseDetailStrip/BaseDetailStrip';

const CategoryDetail = (props) => {
	return (
		<Row gutter={[16, 24]}>
			<Col md={12} xs={24}>
				<BaseDetailStrip title='Name'>{props.name}</BaseDetailStrip>
			</Col>
		</Row>
	);
};

export default CategoryDetail;
