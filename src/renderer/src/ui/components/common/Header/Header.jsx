import { Navigation } from './Navigation/Navigation';
import { useStyles } from './Header.styles';

export const Header = () => {
	const classes = useStyles();

	return (
		<div className={classes.container}>
			<Navigation />
		</div>
	);
};
