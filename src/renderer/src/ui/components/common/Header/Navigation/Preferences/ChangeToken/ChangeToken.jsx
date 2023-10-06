import { useState } from 'react';
import cn from 'classnames';
import { useStoreActions, useStoreState } from 'easy-peasy';
import { useTranslation } from 'react-i18next';
import { Tooltip } from '../../../../Tooltip/Tooltip';
import { Modal } from '../../../../Modal/Modal';
import { appConfig } from '../../../../../../../app.config';
import { useStyles } from './ChangeToken.styles';
import { NetworkChange } from '../ChangeNetwork/ChangeNetwork';

export const ChangeToken = () => {
    const { t } = useTranslation();
    const classes = useStyles();
    const [isChangeNetworkOpen, setChangeNetworkOpen] = useState(false);
    const tokenConfig = useStoreState(state => state.common.tokenConfig);
    const network = useStoreState(state => state.common.user.network);
    const changeToken = useStoreActions(action => action.common.onChangeToken);

    const openChangeNetwork = () => setChangeNetworkOpen(true);
    const closeChangeNetwork = () => setChangeNetworkOpen(false);

    const renderTokens = () => appConfig.tokens.map(({ token, networks, styles }) => {
        const activeNetwork = networks.find(({ netId }) => Number(netId) === Number(network)) || networks[0];
        const buttonStyles = { backgroundColor: styles.colors.DARK_PRIMARY, borderColor: styles.colors.PRIMARY };

        if (tokenConfig.token === token) {
            return (
                <Tooltip
                    interactive
                    mode="dark"
                    title={
                        <>
                            {activeNetwork?.name}
                            <br />
                            <button
                                type="button"
                                className={classes.textButton}
                                onClick={openChangeNetwork}
                            >
                                {t('change')}
                            </button>
                        </>
                    }>
                    <div className={classes.navbarIcon} style={buttonStyles}>
                        <img src={activeNetwork?.icon} alt="" />
                    </div>
                </Tooltip>
            );
        }

        return (
            <button
                className={cn(classes.navbarIcon, classes.notSelected)}
                type="button"
                onClick={() => changeToken(activeNetwork.netId)}
                style={buttonStyles}
            >
                <img src={activeNetwork?.icon} alt="" />
            </button>
        );
    });

    return (
        <>
            {renderTokens()}
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
