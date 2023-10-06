import { useTranslation } from 'react-i18next';
import { useStoreState } from 'easy-peasy';
import { Fee } from '../../Fee/Fee';
import { useStyles } from './WalletSettings.styles';

export const WalletSettings = () => {
    const { t } = useTranslation();
    const classes = useStyles();
    const walletFee = useStoreState(state => state.withdraw.walletFee);

    return (
        <div>
            <div className={classes.warning}>
                {t('walletWithdrawWarning')}
            </div>
            <Fee fee={walletFee} />
        </div>
    );
};
