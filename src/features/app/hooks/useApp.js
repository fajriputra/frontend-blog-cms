import { useState } from 'react';
import { appSlice } from '../store/app.slice';
import { useReduxDispatch } from '../../../shared/hooks/useReduxDispatch/useReduxDispatch';
import { useReduxSelector } from '../../../shared/hooks/useReduxSelector/useReduxSelector';
import { MenuItem } from '../constant/menu';

export const useApp = () => {
	const [openKeys, setOpenKeys] = useState(['']);

	const state = useReduxSelector((state) => state.app);
	const dispatch = useReduxDispatch();

	function ToggleSideBar(param) {
		if (typeof param === 'boolean') {
			dispatch(appSlice.actions.toggleSidebar(param));
		}
	}

	function onOpenChange(keys) {
		const latestOpenKey = keys.find((key) => openKeys.indexOf(key) === -1);

		const menuKeys = MenuItem.map((v) => v.key);

		if (menuKeys.indexOf(latestOpenKey) === -1) {
			setOpenKeys(keys);
		} else {
			setOpenKeys(latestOpenKey ? [latestOpenKey] : []);
		}
	}

	return {
		ToggleSideBar,
		state,
		onOpenChange,
		openKeys,
	};
};
