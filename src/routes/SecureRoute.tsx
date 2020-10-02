import React, { Suspense } from 'react';
import { Route, Switch } from 'react-router-dom';
import DefaultLayout from 'layout/DefaultLayout';

import routes from './';

export const SecureRoute: React.FC = (props) => {
	return (
		<DefaultLayout>
			<Suspense fallback="Loading...">
				<Switch>
					{routes.map((route: any, idx: any) => {
						return <Route key={idx} path={route.path} exact={route.exact} component={route.component} />;
					})}
				</Switch>
			</Suspense>
		</DefaultLayout>
	);
};

export default SecureRoute;
