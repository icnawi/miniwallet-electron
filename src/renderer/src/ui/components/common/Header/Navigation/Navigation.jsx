import { AppBar, Toolbar } from '@material-ui/core';
import { useStyles } from './Navigation.styles';
import { Preferences } from './Preferences/Preferences';
import { MenuBar } from './MenuBar/MenuBar';
import { Brand } from '../Brand/Brand';

export const Navigation = () => {
	const classes = useStyles();

	return (
		<div className={classes.navigation}>
			<AppBar position="static">
				<Toolbar className={classes.toolbar}>
					<Brand />
					<MenuBar />
					<Preferences />
				</Toolbar>
			</AppBar>
		</div>
	);
};
