import { useStoreActions, useStoreState } from 'easy-peasy';
import { useTranslation } from 'react-i18next';
import { Button } from '@material-ui/core';
import { Modal } from '../../../Modal/Modal';
import { useStyles } from './WithdrawConfirmModal.styles';

export const WithdrawConfirmModal = ({ open, onClose }) => {
    const { t } = useTranslation();
    const classes = useStyles();
    const proof = useStoreState(state => state.withdraw.proof);
    const withdraw = useStoreActions(actions => actions.withdraw.onWithdraw);

    const confirm = () => {
        withdraw();
        onClose();
    };

    return (
        <Modal open={open && !!proof} onClose={onClose} title={t('withdrawalConfirmation')}>
            {t('zkProofGenerated')}
            <Button
                type="button"
                variant="contained"
                color="primary"
                size="large"
                className={classes.confirmButton}
                disableFocusRipple
                disableRipple
                disableTouchRipples
                onClick={confirm}
            >
                {t('confirm')}
            </Button>
        </Modal>
    );
};
