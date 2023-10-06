import { useStyles } from './TransactionsGrid.styles';
import { FilterPanel } from '../FilterPanel/FilterPanel';
import { TxsTable } from '../TxsTable/TxsTable';

export const TransactionsGrid = () => {
	const classes = useStyles();
	return (
		<div className={classes.txs}>
			<FilterPanel />
			<TxsTable />
		</div>
	);
};
