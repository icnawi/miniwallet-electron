import { useState } from 'react';
import { useTranslation } from 'react-i18next';
import { useStoreActions, useStoreState } from 'easy-peasy';
import { List, ListItem, Button } from '@material-ui/core';
import {
	Tune as TuneIcon,
	AccountBalanceWalletOutlined as WalletIcon,
	ExitToApp as LogoutIcon,
} from '@material-ui/icons';
import { Modal } from '../../../Modal/Modal';
import { Connect } from '../../../Connect/Connect';
import { ChangeToken } from './ChangeToken/ChangeToken';
import { useStyles } from './Preferences.styles';
import { Settings } from './Settings/Settings';

export const Preferences = () => {
    const { t } = useTranslation();
	const classes = useStyles();
	const [isSettingsOpen, setSettingsOpen] = useState(false);
	const [isConnectOpen, setConnectOpen] = useState(false);
	const isConnected = useStoreState(state => state.common.user.isConnected);
	const setIsConnected = useStoreActions(actions => actions.common.setIsConnected);

	const logout = () => setIsConnected(false);

	const openSettings = () => setSettingsOpen(true);
	const closeSettings = () => setSettingsOpen(false);

	const openConnect = () => setConnectOpen(true);
	const closeConnect = () => setConnectOpen(false);

	return (
		<>
			<List component="nav" className={classes.navbarButtons} disablePadding>
				<ListItem button className={classes.buttonGroup} disableRipple>
                    <ChangeToken />
					<Button
						variant="outlined"
						color="primary"
						className={classes.button}
						startIcon={<TuneIcon />}
						onClick={openSettings}
						disableFocusRipple>
                        {t('settings')}
					</Button>
					{isConnected ? (
						<Button
							variant="outlined"
							color="primary"
							className={classes.button}
							startIcon={<LogoutIcon />}
							onClick={logout}
							disableFocusRipple>
                            {t('logout')}
						</Button>
					) : (
						<Button
							variant="outlined"
							color="primary"
							className={classes.button}
							startIcon={<WalletIcon />}
							onClick={openConnect}
							disableFocusRipple>
                            {t('connect')}
						</Button>
					)}
				</ListItem>
			</List>
			<Modal open={isSettingsOpen} onClose={closeSettings} title={t('settings')} top>
                <Settings onClose={closeSettings} />
			</Modal>
			<Modal open={isConnectOpen} onClose={closeConnect} title={t('yourWallet')}>
				<Connect onClose={closeConnect} />
			</Modal>
		</>
	);
};
