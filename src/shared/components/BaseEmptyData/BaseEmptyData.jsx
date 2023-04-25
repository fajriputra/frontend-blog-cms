import { Typography, Image } from 'antd';

import './BaseEmptyData.scss';

const BaseEmptyData = (props) => {
	let forgedCssWrapper = '';
	let forgedCssSVG = '';
	if (props.componentType === 'Table') {
		forgedCssWrapper = 'BaseEmptyData__type--table';
		forgedCssSVG = 'BaseEmptyData__heading--table';
	}
	if (props.componentType === 'Select') {
		forgedCssWrapper = 'BaseEmptyData__type--select';
		forgedCssSVG = 'BaseEmptyData__svg--select';
	}
	return (
		<div className={`shared-component BaseEmptyData ${forgedCssWrapper}`}>
			<Image
				className={`BaseEmptyData__svg  ${forgedCssSVG}`}
				preview={false}
				src='https://res.cloudinary.com/ddo4hnmnv/image/upload/v1682065293/nqljos2zz2yr7dsk4aq6.png'
			/>
			<Typography.Text className={`BaseEmptyData__heading`} strong>
				{props?.heading && props.heading}
				{!props?.heading && 'Data Not Found'}
			</Typography.Text>
			{props?.subHeading ||
				(props?.componentType === 'Table' && (
					<Typography.Text className='BaseEmptyData__sub-heading' type='cool-grey-400'>
						{props?.subHeading && props.subHeading}
						{!props?.subHeading && 'Oops, there is no data list available yet, please add the desired data.'}
					</Typography.Text>
				))}
		</div>
	);
};

export default BaseEmptyData;
