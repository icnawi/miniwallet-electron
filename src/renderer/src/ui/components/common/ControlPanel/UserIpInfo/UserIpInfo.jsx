import { useEffect } from 'react';
import { useTranslation } from 'react-i18next';
import { useStoreState, useStoreActions } from 'easy-peasy';
import {  Link as Anchor } from '@material-ui/core';
import { Skeleton } from '@material-ui/lab';
import { Tooltip } from '../../Tooltip/Tooltip';
import { appConfig } from '../../../../../app.config';

export const UserIpInfo = ({ classes }) => {
    const { t } = useTranslation();
    const ipInfo = useStoreState(state => state.common.user.ipInfo);
    const getUserIpInfo = useStoreActions(state => state.common.onGetUserIpInfo);

    useEffect(() => {
        getUserIpInfo();
    }, [getUserIpInfo]);

    return (
        <>
            {
                !ipInfo.ip ? <Skeleton animation="pulse" width="120px" /> : (
                    <Tooltip
                        placement="top"
                        title={t('ipTooltip')}
                    >
                        <span className={classes.bottomLink}>
                            {t('yourIP')}{' '}
                            <Anchor
                                href={appConfig.urls.yourIP}
                                underline="none"
                                className={classes.anchor}
                            >
                                {ipInfo.ip}, {ipInfo.city}, {ipInfo.country}
                            </Anchor>
                        </span>
                    </Tooltip>
                )
            }
        </>
    );
};
