import React from 'react';

import Icon from '@ant-design/icons';

import { MdOutlineArticle, MdOutlineCategory } from 'react-icons/md';

export const MenuItem = [
	{
		id: 'menu__articles',
		key: 'articles',
		label: 'Articles',
		icon: React.createElement(Icon, { component: MdOutlineArticle }),
	},
	{
		id: 'menu__categories',
		key: 'categories',
		label: 'Categories',
		icon: React.createElement(Icon, { component: MdOutlineCategory }),
	},
];
