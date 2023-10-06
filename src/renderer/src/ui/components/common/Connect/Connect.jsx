import React from 'react';
import { useTranslation } from 'react-i18next';
import { useStoreState, useStoreActions } from 'easy-peasy';
import { Typography } from '@material-ui/core';
import metamaskIcon from '../../../images/icons/metamask.svg';
import { appConfig } from '../../../../app.config';
import { isChrome } from '../../../../utils';
import { Loader } from '../../Loader/Loader';
import { useStyles } from './Connect.styles';

export const Connect = ({ onClose }) => {
    const { t } = useTranslation()
	const classes = useStyles();
	const [isLoading, setLoading] = React.useState(false);
	const isInstalled = useStoreState(state => state.common.user.isInstalled);
	const connectToMetaMask = useStoreActions(actions => actions.common.onEstablishConnection);

	const connect = async () => {
		setLoading(true);
		await connectToMetaMask();
		onClose();
		setLoading(false);
	};

	return (
		<div className={classes.container}>
			<Typography>{t('pleaseSelectWallet')}</Typography>
			{isInstalled ? (
				<button type="button" className={classes.metamaskButton} onClick={connect}>
					<img className={classes.metamaskIcon} src={metamaskIcon} alt="metamask" />
                    {t('metamask')}
				</button>
			) : (
				<a
					href={
						isChrome()
							? appConfig.urls.metamaskChrome
							: appConfig.urls.metamask
					}
					target="_blank"
					rel="noreferrer"
					className={`${classes.metamaskButton} ${classes.metamaskInstallButton}`}>
					<img className={classes.metamaskIcon} src={metamaskIcon} alt="metamask" />
                    {t('installMetamask')}
				</a>
			)}
			{isLoading ? <Loader type="tornado" /> : ''}
		</div>
	);
};
