import { makeStyles } from '@material-ui/core';

const styles = ({ colors }) => ({
    container: {
        maxWidth: 960,
        flexGrow: 1,
        margin: '0 auto',
        position: 'relative',
        width: '100%',
    },
    heading: {
        fontFamily: `"PT mono", monospace`,
        fontWeight: 800,
        textAlign: 'center',
        fontSize: '3rem',
        marginBottom: 16
    },
    highlighted: {
        color: colors.PRIMARY
    },
    description: {
        marginBottom: 30,
        textAlign: 'center'
    }
});

export const useStyles = makeStyles(styles, { name: 'Compliance' });
