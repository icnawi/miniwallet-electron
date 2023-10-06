import { useTranslation } from 'react-i18next';
import { Button } from '@material-ui/core';
import { Column } from '../Column/Column';
import { Row } from '../Row/Row';
import { useStyles } from './TxHead.styles';

export const TxHead = ({ columns }) => {
    const { t } = useTranslation();
    const classes = useStyles();

    return (
        <div className={classes.txHead}>
            <Row classNames={classes} isHeader>
                {columns.map(col => (
                    <Column key={col.id} className={col.className}>
                        <Button
                            variant="text"
                            className={classes.colBtn}
                            disableRipple
                            disableFocusRipple
                            disableTouchRipple>
                            {t(col.name)}
                        </Button>
                    </Column>
                ))}
            </Row>
        </div>
    );
};
