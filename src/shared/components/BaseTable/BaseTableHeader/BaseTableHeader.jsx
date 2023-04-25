import React, { useEffect, useState } from 'react';

import { FaSearch } from 'react-icons/fa';
import { useDebounceFn, useResponsive } from 'ahooks';

import { Col, Input, Row, Select } from 'antd';

import BaseEmptyData from '../../../components/BaseEmptyData/BaseEmptyData';

const BaseTableHeader = (props) => {
	const { filterOptions, showFilter, showInput, data, onChange } = props;

	const [searchValue, setSearchValue] = useState('');
	const [state, setState] = useState({ search: '' });

	const responsive = useResponsive();
	const searchDebounce = useDebounceFn(
		(v) => {
			internalHandleOnChange({ search: v });
		},
		{
			wait: 500,
		},
	);

	const internalHandleOnChange = (param) => {
		const tmpData = JSON.parse(JSON.stringify(state));

		if (param.filter) {
			const tmpFilter = JSON.parse(JSON.stringify(param.filter));
			const idx = state.filter?.findIndex((v) => v.key === tmpFilter.key);
			if (idx >= 0 && tmpData.filter) {
				tmpData.filter[idx].value = tmpFilter?.value;
			} else {
				tmpData.filter?.push({ key: tmpFilter.key, value: tmpFilter.value });
			}
		}
		if (typeof param.search === 'string') {
			tmpData.search = param.search;
		}
		setState({ ...tmpData });
		onChange && onChange({ ...tmpData });
	};

	useEffect(() => {
		setState({
			filter: data?.filter || [],
			search: data?.search,
		});
		setSearchValue(data?.search);
	}, [data]);

	return (
		<>
			{showFilter && (
				<div className={`BaseTable__header-wrap ${!responsive['md'] && 'BaseTable__header-wrap--mobile'}`}>
					<Row gutter={[8, 16]}>
						{showInput && (
							<Col md={6} xs={24}>
								<Input
									allowClear
									onChange={(v) => {
										setSearchValue(v.target.value);
										searchDebounce.run(v.target.value);
									}}
									prefix={<FaSearch />}
									value={searchValue}
									placeholder='Input keywords'
									id='input_keyword'
								/>
							</Col>
						)}
						<React.Fragment>
							{filterOptions?.map((ctx, idx) => (
								<Col flex={responsive['md'] ? '1' : undefined} key={idx} xs={24}>
									<Select
										allowClear
										autoFocus={true}
										filterOption={(inpt, opt) =>
											opt?.label.toUpperCase()?.includes(inpt.toUpperCase()) ? true : false
										}
										maxTagCount={'responsive'}
										notFoundContent={
											<BaseEmptyData
												componentType='Select'
												heading='Filter Not Found'
												subHeading='Try Using Other Filters'
											/>
										}
										onChange={(v) => internalHandleOnChange({ filter: { key: ctx.key, value: v } })}
										options={ctx.options}
										placeholder={ctx.placeholder || 'Select ' + ctx.key}
										style={{ width: '100%' }}
										value={state.filter?.find((fst) => fst.key === ctx.key)?.value}
									/>
								</Col>
							))}
						</React.Fragment>
					</Row>
				</div>
			)}
		</>
	);
};

export default BaseTableHeader;
