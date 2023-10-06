import { useTranslation } from 'react-i18next';
import { useCallback, useEffect, useState } from 'react';
import { useStoreActions, useStoreState } from 'easy-peasy';
import { useForm } from 'react-hook-form';
import { Button } from '@material-ui/core';
import { API } from '../../../../../../binance';
import { SimpleTabs } from '../../../SimpleTabs/SimpleTabs';
import { Tooltip } from '../../../Tooltip/Tooltip';
import { RelayerSettings } from './RelayerSettings/RelayerSettings';
import { WalletSettings } from './WalletSettings/WalletSettings';
import { useStyles } from './WithdrawalSettings.styles';

export const WithdrawalSettings = ({ onSave }) => {
    const { t } = useTranslation();
    const classes = useStyles();
    const [relayerInfo, setRelayerInfo] = useState({});
    const netId = useStoreState(state => state.common.user.network);
    const relayer = useStoreState(state => state.withdraw.relayer);
    const useWallet = useStoreState(state => state.withdraw.useWallet);
    const relayerApis = useStoreState(state => state.common.networkConfig.relayerApis);
    const resetWithdrawalSettings = useStoreActions(actions => actions.withdraw.resetWithdrawalSettings);
    const saveWithdrawalSettings = useStoreActions(actions => actions.withdraw.onSaveWithdrawalSettings);
    const { control, handleSubmit, watch, setValue, reset } = useForm({
        defaultValues: {
            activeTab: useWallet ? 1 : 0,
            relayerName: relayer.name,
        },
    });
    const [activeTab, relayerName, customUrl] = watch(['activeTab', 'relayerName', 'customUrl']);
    const canSave = (activeTab === 1) || (!relayerInfo.error && !(relayerName === 'Custom' && !customUrl));

    const getSelectedRelayer = useCallback(() => {
        if (relayerName === 'Custom') {
            return {
                name: relayerName,
                url: customUrl
            };
        }

        if (relayerName === 'default') {
            return relayerApis[0];
        }

        return relayerApis.find(({ name }) => name === relayerName);
    }, [customUrl, relayerName, relayerApis]);

    useEffect(() => {
        // Load relayer info with delay
        const timeoutId = setTimeout(async () => {
            const selectedRelayer = getSelectedRelayer();

            if (selectedRelayer && selectedRelayer.url) {
                setRelayerInfo(await API.tornado.getRelayerInfo(netId, selectedRelayer));
            }
        }, 500);

        return () => {
            clearTimeout(timeoutId);
        };
    }, [relayerName, customUrl, getSelectedRelayer, netId]);

    const handleChange = (event, newValue) => setValue('activeTab', newValue);

    const onSubmit = async (data) => {
        saveWithdrawalSettings({
            relayer: getSelectedRelayer(),
            useWallet: data.activeTab === 1,
        });
        onSave();
    };

    const setToDefaults = async () => {
        resetWithdrawalSettings();
        reset({
            activeTab: 0,
            relayerName: 'default',
        });
    };

    return (
        <form className={classes.form} autoComplete="off">
            <SimpleTabs
                activeIndex={activeTab}
                onChange={handleChange}
                tabs={[
                    {
                        id: 'relayer',
                        label: (
                            <>
                                <span>{t('relayer')}</span>
                                <Tooltip
                                    placement="right"
                                    title={t('relayerWithdrawTooltip')}
                                />
                            </>
                        ),
                        content: <RelayerSettings control={control} watch={watch} relayerInfo={relayerInfo} />
                    },
                    {
                        id: 'wallet',
                        label: (
                            <>
                                <span>{t('wallet')}</span>
                                <Tooltip
                                    placement="left"
                                    title={t('walletWithdrawTooltip')}
                                />
                            </>
                        ),
                        content: <WalletSettings />
                    }
                ]}
            />
            <div className={classes.buttonsContainer}>
                <Button
                    type="button"
                    variant="outlined"
                    color="primary"
                    size="large"
                    className={classes.outlinedButton}
                    onClick={setToDefaults}
                    disableFocusRipple
                    disableRipple
                    disableTouchRipple
                >
                    {t('setToDefaults')}
                </Button>
                <Button
                    type="submit"
                    variant="contained"
                    color="primary"
                    size="large"
                    className={classes.submitButton}
                    onClick={handleSubmit(onSubmit)}
                    disabled={!canSave}
                    disableFocusRipple
                    disableRipple
                    disableTouchRipple
                >
                    {t('save')}
                </Button>
            </div>
        </form>
    );
};
