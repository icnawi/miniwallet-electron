import { useStoreActions, useStoreState } from 'easy-peasy';
import { useTranslation } from 'react-i18next';
import { useStyles } from './Note.styles';
import { TextField } from '../../../common/TextField/TextField';
import { Loader } from '../../../Loader/Loader';

export const Note = ({ control }) => {
    const { t } = useTranslation();
    const classes = useStyles();
    const netId = useStoreState(state => state.common.user.network);
    const isNoteLoading = useStoreState(state => state.compliance.isNoteLoading);
    const noteError = useStoreState(state => state.compliance.noteError);

    const parseNote = useStoreActions(actions => actions.compliance.onParseNote);

    const handleChange = note => parseNote({ note, netId });

    return (
        <>
            <TextField
                name="note"
                variant="outlined"
                control={control}
                label={t('note')}
                placeholder={t('enterNotePlaceholder')}
                fullWidth
                classes={classes}
                onChange={handleChange}
                error={!!noteError}
                helperText={noteError}
            />
            {isNoteLoading ? <Loader type="tornado">{t('gettingNoteData')}</Loader> : ''}
        </>
    );
};
