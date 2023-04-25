import React from 'react';
import { Navigate } from 'react-router-dom';

import BasePageLoader from '../../shared/components/BasePageLoader/BasePageLoader';
import BasePageMetaHead from '../../shared/components/BasePageMetaHead/BasePageMetaHead';

export const articlesRoutes = [
	{
		index: true,
		element: <Navigate to='list' />,
	},
	{
		path: 'list',
		element: (
			<React.Fragment>
				<BasePageMetaHead title='List Article Page' />
				<BasePageLoader pagePath='articles/PageListArticle' />
			</React.Fragment>
		),
	},
	{
		path: 'create',
		element: (
			<React.Fragment>
				<BasePageMetaHead title='Create Article Page' />
				<BasePageLoader pagePath='articles/PageCreateArticle' />
			</React.Fragment>
		),
	},
	{
		path: 'edit/:id',
		element: (
			<React.Fragment>
				<BasePageMetaHead title='Edit Article Page' />
				<BasePageLoader pagePath='articles/PageEditArticle' />
			</React.Fragment>
		),
	},
	{
		path: 'detail/:id',
		element: (
			<React.Fragment>
				<BasePageMetaHead title='Detail Article Page' />
				<BasePageLoader pagePath='articles/PageDetailArticle' />
			</React.Fragment>
		),
	},
];
