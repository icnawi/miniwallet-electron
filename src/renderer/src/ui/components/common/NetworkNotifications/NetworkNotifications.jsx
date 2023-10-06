import { useEffect, useState } from 'react';
import { useTranslation } from 'react-i18next';
import { useStoreState } from 'easy-peasy';
import { Button } from '@material-ui/core';
import { Alert } from '@material-ui/lab';
import { Modal } from '../Modal/Modal';
import { NetworkChange } from '../Header/Navigation/Preferences/ChangeNetwork/ChangeNetwork';
import { Notification } from '../Notification/Notification';
import { useStyles } from './NetworkNotifications.styles';

export const NetworkNotifications = () => {
    const { t } = useTranslation();
	const classes = useStyles();
	const [isChangeNetworkOpen, setChangeNetworkOpen] = useState(false);
	const [isNetworkAlertOpen, setNetworkAlertOpen] = useState(false);
	const isConnected = useStoreState(state => state.common.user.isConnected);
	const network = useStoreState(state => state.common.user.network);
    const tokenConfig = useStoreState(state => state.common.tokenConfig);
	const metaMaskNetwork = useStoreState(state => Number(state.common.user.metaMaskNetwork));

	useEffect(() => {
		// If has metamask network and it is not supported
		if (
			isConnected &&
			metaMaskNetwork &&
            tokenConfig.networks.every(({ netId }) => Number(netId) !== metaMaskNetwork)
		) {
			setNetworkAlertOpen(true);
		} else {
			setNetworkAlertOpen(false);
		}
	}, [isConnected, metaMaskNetwork, tokenConfig.networks]);

	const openChangeNetwork = () => setChangeNetworkOpen(true);
	const closeChangeNetwork = () => setChangeNetworkOpen(false);

	const closeNetworkAlert = () => setNetworkAlertOpen(false);

	return (
		<>
			{metaMaskNetwork && Number(metaMaskNetwork) !== Number(network) ? (
				<Alert
					className={classes.networkAlert}
					severity="warning"
					icon={false}
					action={
						<Button className={classes.networkAlertButton} onClick={openChangeNetwork}>
                            {t('changeNetwork')}
						</Button>
					}>
                    {t('networkMismatchError', { network })}
				</Alert>
			) : (
				''
			)}
			<Notification
				open={isNetworkAlertOpen}
				onClose={closeNetworkAlert}
				message={t('networkNotSupportedError', { token: tokenConfig.token })}
			/>
			<Modal
				open={isChangeNetworkOpen}
				onClose={closeChangeNetwork}
				title={t('changeNetwork')}
				width={240}>
				<NetworkChange onClose={closeChangeNetwork} />
			</Modal>
		</>
	);
};
