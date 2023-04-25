import { Suspense, useMemo, lazy } from 'react';

import BaseLoaderFull from '../BaseLoaderFull/BaseLoaderFull';

const PageLoader = (props) => {
	const Component = useMemo(() => lazy(async () => await import('../../../pages/' + props.pagePath)), [props.pagePath]);

	return (
		<Suspense fallback={<BaseLoaderFull />}>
			<Component />
		</Suspense>
	);
};

export default PageLoader;
