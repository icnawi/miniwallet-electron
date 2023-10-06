import { Route, Switch } from 'react-router-dom';
import { Header } from '../common/Header/Header';
import { Footer } from '../common/Footer/Footer';
import { NetworkNotifications } from '../common/NetworkNotifications/NetworkNotifications';
import { useStyles } from './Main.styles';
import { Dashboard } from './Dashboard/Dashboard';
import { routes } from '../../config';
import { Tutorial } from './Tutorial/Tutorial';
import { Compliance } from './Compliance/Compliance';

export const Main = () => {
	const classes = useStyles();
	return (
		<div className={classes.mainContainer}>
			<Header />
			<Switch>
				<Route
					exact
					path="/"
					component={() => (
						<>
							<NetworkNotifications />
							<Dashboard />
						</>
					)}
				/>
				<Route exact path={routes.tutorial} component={Tutorial} />
                <Route exact path={routes.compliance} component={Compliance} />
			</Switch>

			<Footer />
		</div>
	);
};
