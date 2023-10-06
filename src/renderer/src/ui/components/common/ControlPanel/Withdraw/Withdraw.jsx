import { Button } from '@material-ui/core';
import { useStoreActions, useStoreState } from 'easy-peasy';
import { useEffect, useMemo, useState } from 'react';
import { useForm, useWatch } from 'react-hook-form';
import { useTranslation } from 'react-i18next';
import { validator } from 'web3';

import { Note } from './Note/Note';
import { Recipient } from './Recipient/Recipient';
import { useStyles } from './Withdraw.styles';
import { WithdrawConfirmModal } from './WithdrawConfirmModal/WithdrawConfirmModal';
import { WithdrawNotification } from './WithdrawNotification/WithdrawNotification';
import { Loader } from '../../../Loader/Loader';

export const Withdraw = () => {
  const { t } = useTranslation();
  const classes = useStyles();
  const { control, handleSubmit, setValue, reset } = useForm();
  const [isConfirmOpen, setConfirmOpen] = useState(false);
  const recipient = useWatch({ control, name: 'recipient' });
  const isRecipientValid = useMemo(() => validator.isAddress(recipient), [recipient]);

  const isProofLoading = useStoreState(state => state.withdraw.isProofLoading);
  const withdrawLoadingMessage = useStoreState(state => state.withdraw.withdrawLoadingMessage);
  const noteError = useStoreState(state => state.withdraw.noteError);
  const depositData = useStoreState(state => state.withdraw.depositData);
  const resetWithdrawState = useStoreActions(actions => actions.withdraw.resetState);
  const generateProof = useStoreActions(actions => actions.withdraw.onGenerateProof);

  // Reset withdraw state on first render
  useEffect(() => {
    resetWithdrawState();
  }, [resetWithdrawState]);

  useEffect(() => {
    if (!withdrawLoadingMessage) {
      reset({ note: '', recipient: '' });
    }
  }, [withdrawLoadingMessage, reset]);

  const openConfirm = () => setConfirmOpen(true);
  const closeConfirm = () => setConfirmOpen(false);

  const onSubmit = async data => {
    try {
      await generateProof(data.recipient);
      openConfirm();
    } catch (err) {
      console.error(err);
    }
  };

  return (
    <form className={classes.form} onSubmit={handleSubmit(onSubmit)} autoComplete="off">
      <Note control={control} />
      <Recipient
        control={control}
        setValue={setValue}
        hasError={!isRecipientValid && !!recipient}
      />
      <Button
        type="submit"
        variant="contained"
        color="primary"
        className={classes.submitButton}
        disabled={!!noteError || !isRecipientValid || !depositData}
        disableFocusRipple
        disableRipple
        disableTouchRipple>
        {t('withdraw')}
      </Button>
      <WithdrawConfirmModal open={isConfirmOpen} onClose={closeConfirm} />
      {isProofLoading ? <Loader type="tornado">{t('generatingProof')}</Loader> : ''}
      {!isProofLoading && withdrawLoadingMessage ? (
        <Loader type="tornado">{withdrawLoadingMessage}</Loader>
      ) : (
        ''
      )}
      <WithdrawNotification />
    </form>
  );
};
