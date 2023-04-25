import { Space, Typography } from 'antd';

const BaseDetailStrip = (props) => {
	return (
		<Space direction='vertical' size={4}>
			<Typography.Text className={`text ${props.titleClassName || ''}`} strong={props.strong} type={props.type}>
				{props.title}
			</Typography.Text>
			<Typography.Text strong={props.strong} type={props.type}>
				{props.children || '-'}
			</Typography.Text>
		</Space>
	);
};

export default BaseDetailStrip;
