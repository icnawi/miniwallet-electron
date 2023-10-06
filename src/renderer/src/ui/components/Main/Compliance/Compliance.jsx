import { Typography } from '@material-ui/core';
import { useStoreActions, useStoreState } from 'easy-peasy';
import { useEffect } from 'react';
import { useForm } from 'react-hook-form';
import { useTranslation } from 'react-i18next';

import { useStyles } from './Compliance.styles';
// import { ComplianceReport } from './ComplianceReport/ComplianceReport';
import { ComplianceResult } from './ComplianceResult/ComplianceResult';
import { Note } from './Note/Note';

export const Compliance = () => {
  const { t } = useTranslation();
  const network = useStoreState(state => state.common.user.network);
  const depositData = useStoreState(state => state.compliance.depositData);
  const withdrawalData = useStoreState(state => state.compliance.withdrawalData);
  const resetCompliance = useStoreActions(actions => actions.compliance.resetState);
  const { control, reset } = useForm();
  const classes = useStyles();

  useEffect(() => {
    resetCompliance();
    reset({ note: '' });
  }, [resetCompliance, reset, network]);

  return (
    <div className={classes.container}>
      <Typography variant="h2" className={classes.heading}>
        {t('monsoon')} <span className={classes.highlighted}>{t('complianceTool')}</span>
      </Typography>
      <Typography className={classes.description}>
        {t('complianceDescription.line1')} <br />
        {t('complianceDescription.line2')} <br />
        {t('complianceDescription.line3')}
      </Typography>
      <Note control={control} />
      {!!depositData && <ComplianceResult />}
      {/*{!!withdrawalData && <ComplianceReport />}*/}
    </div>
  );
};
