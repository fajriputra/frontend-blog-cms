import { Menu } from 'antd';

import { useApp } from '../../hooks/useApp';

import { MenuItem } from '../../constant/menu';

const AppMenu = (props) => {
	const app = useApp();

	return (
		<Menu
			items={MenuItem}
			mode='inline'
			onClick={props.onClickMenu}
			onOpenChange={app.onOpenChange}
			openKeys={app.openKeys}
			selectedKeys={[props.selectedKeys]}
			style={{ height: '100%' }}
		/>
	);
};

export default AppMenu;
