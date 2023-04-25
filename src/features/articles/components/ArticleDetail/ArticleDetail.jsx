import React from 'react';

import { Col, Image, Row } from 'antd';

import BaseDetailStrip from '../../../../shared/components/BaseDetailStrip/BaseDetailStrip';

const ArticleDetail = (props) => {
	return (
		<Row gutter={[16, 24]}>
			<Col md={12} xs={24}>
				<BaseDetailStrip title='Title'>{props.title}</BaseDetailStrip>
			</Col>
			<Col md={12} xs={24}>
				<BaseDetailStrip title='Thumbnail'>
					<Image preview src={props.image_url} style={{ maxWidth: 256, width: '100%' }} />,
				</BaseDetailStrip>
			</Col>
			<Col md={12} xs={24}>
				<BaseDetailStrip title='Category'>{props.category?.name}</BaseDetailStrip>
			</Col>
			<Col md={12} xs={24}>
				<BaseDetailStrip title='Author'>{props.author?.username}</BaseDetailStrip>
			</Col>
			<Col md={12} xs={24}>
				<BaseDetailStrip title='Views'>{props.views}</BaseDetailStrip>
			</Col>
		</Row>
	);
};

export default ArticleDetail;
