import { makeStyles } from '@material-ui/core';

const styles = {
	txs: {
		paddingTop: '.75rem',
		fontSize: '.85rem',
	},
};

export const useStyles = makeStyles(styles, { name: 'TransactionsGrid' });
