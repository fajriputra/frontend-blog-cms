import { Navigate, Outlet } from 'react-router-dom';

import AppLayoutContainer from '../features/app/container/AppLayoutContainer/AppLayoutContainer';

import BasePageNotFound from '../shared/components/BasePageNotFound/BasePageNotFound';

import { categoriesRoutes } from './categories/categories.routes';
import { articlesRoutes } from './articles/articles.routes';

export const AppRoutes = [
	{
		children: [
			{
				element: <Outlet />,
				index: true,
			},
			{
				path: 'articles',
				children: [
					{
						children: articlesRoutes,
						element: <Outlet />,
					},
				],
				element: <Outlet />,
			},
			{
				path: 'categories',
				children: [
					{
						children: categoriesRoutes,
						element: <Outlet />,
					},
				],
				element: <Outlet />,
			},
			{
				element: <BasePageNotFound />,
				path: '404',
			},
			{
				element: <Navigate replace={true} to='/app/404' />,
				path: '/app/*',
			},
		],
		element: <AppLayoutContainer />,
	},
];
