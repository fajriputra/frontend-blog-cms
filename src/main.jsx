import ReactDOM from 'react-dom/client';
import { BrowserRouter } from 'react-router-dom';
import { Provider } from 'react-redux';

import { App, ConfigProvider } from 'antd';

import { reduxStore } from './shared/store/redux';

import BaseEmptyData from '@shared/components/BaseEmptyData/BaseEmptyData';
import RoutesComponent from './routes/RoutesComponent';


import 'antd/dist/reset.css';
import '@shared/styles/styles.scss';

ReactDOM.createRoot(document.getElementById('root')).render(
	<ConfigProvider
		renderEmpty={(v) => <BaseEmptyData componentType={v} />}
		// theme={{
		// 	token: {
		// 		colorPrimary: '#3d7e77',
		// 		colorText: '#6aa098',
		// 		fontFamily: 'Roboto',
		// 	},
		// }}
	>
		<Provider store={reduxStore}>
		<BrowserRouter>
			<App>
				<RoutesComponent />
			</App>
		</BrowserRouter>
		</Provider>
	</ConfigProvider>,
);
