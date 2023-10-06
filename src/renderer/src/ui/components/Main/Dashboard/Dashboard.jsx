import { useEffect } from 'react';
import { useStoreActions, useStoreState } from 'easy-peasy';
import { useTranslation } from 'react-i18next';
import { Alert } from '../../common/Alert/Alert';
import { ControlPanel } from '../../common/ControlPanel/ControlPanel';
import { useStyles } from './Dashboard.styles';
import { TransactionsGrid } from '../../common/TransactionsGrid/TransactionsGrid';

export const Dashboard = () => {
    const { t } = useTranslation();
	const classes = useStyles();
    const isInitialized = useStoreState(state => state.common.user.isInitialized);
	const transactions = useStoreState(state => state.deposit.transactions);
    const loadTxs = useStoreActions(actions => actions.deposit.onGetTxs);

    useEffect(() => {
        let intervalId;

        if (isInitialized) {
            loadTxs();

            // Update Transaction statuses every 30 seconds
            intervalId = setInterval(() => {
                loadTxs();
            }, 30000);
        }

        return () => {
            clearInterval(intervalId);
        };
    }, [isInitialized, loadTxs]);

	return (
		<div className={classes.container}>
			<Alert message={t('noTokenAlert')} />
			<div className={classes.panels}>
				<ControlPanel type="tornado" />
				<ControlPanel type="stats" />
			</div>
			{transactions.length ? <TransactionsGrid /> : null}
		</div>
	);
};
