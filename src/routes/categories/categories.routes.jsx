import React from 'react';
import { Navigate } from 'react-router-dom';

import BasePageLoader from '../../shared/components/BasePageLoader/BasePageLoader';
import BasePageMetaHead from '../../shared/components/BasePageMetaHead/BasePageMetaHead';

export const categoriesRoutes = [
	{
		index: true,
		element: <Navigate to='list' />,
	},
	{
		path: 'list',
		element: (
			<React.Fragment>
				<BasePageMetaHead title='List Category Page' />
				<BasePageLoader pagePath='categories/PageListCategory' />
			</React.Fragment>
		),
	},
	{
		path: 'create',
		element: (
			<React.Fragment>
				<BasePageMetaHead title='Create Category Page' />
				<BasePageLoader pagePath='categories/PageCreateCategory' />
			</React.Fragment>
		),
	},
	{
		path: 'edit/:id',
		element: (
			<React.Fragment>
				<BasePageMetaHead title='Edit Category Page' />
				<BasePageLoader pagePath='categories/PageEditCategory' />
			</React.Fragment>
		),
	},
	{
		path: 'detail/:id',
		element: (
			<React.Fragment>
				<BasePageMetaHead title='Detail Category Page' />
				<BasePageLoader pagePath='categories/PageDetailCategory' />
			</React.Fragment>
		),
	},
];
