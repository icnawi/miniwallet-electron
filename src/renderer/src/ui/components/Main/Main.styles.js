import { makeStyles } from '@material-ui/core';

const styles = {
	mainContainer: {
		display: 'flex',
		flexDirection: 'column',
		minHeight: '100vh',
	},
	mainWrapper: {
		maxWidth: 960,
		flexGrow: 1,
		margin: '0 auto',
		position: 'relative',
		width: 'auto',
	},
};

export const useStyles = makeStyles(styles, { name: 'Main' });
