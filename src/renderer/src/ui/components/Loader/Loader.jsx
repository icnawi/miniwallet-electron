import { useTranslation } from 'react-i18next';
import { Typography, CircularProgress } from '@material-ui/core';
import { useStyles } from './Loader.styles';

export const Loader = ({ type = 'default', children }) => {
    const { t } = useTranslation();
	const classes = useStyles();

	if (type === 'tornado') {
		return (
			<div className={`${classes.container} ${classes.tornadoContainer}`}>
				<div>
                    <svg viewBox="0 0 39.9 39.9" className={classes.tornadoIcon}>
                        <path
                            d="M40,19.4A17.3,17.3,0,0,0,22.8,2.8,17.1,17.1,0,0,0,8.6,10.4,11.3,11.3,0,0,1,19.3,0,17.1,17.1,0,0,0,2.8,17.1a16.8,16.8,0,0,0,7.7,14.2A11.3,11.3,0,0,1,0,20.6a17.1,17.1,0,0,0,31.3,9A11.4,11.4,0,0,1,20.6,39.9,17.1,17.1,0,0,0,37.1,22.8,17.3,17.3,0,0,0,29.5,8.6,11.8,11.8,0,0,1,40,19.4ZM20,27.2a7.4,7.4,0,0,1-5.2-2.1,7.1,7.1,0,0,1-2-5.1A7.2,7.2,0,1,1,20,27.2Z"
                        />
                    </svg>
					<Typography className={classes.loadingLabel}>
						{children || t('loading')}
					</Typography>
				</div>
			</div>
		);
	}

	return (
		<div className={classes.container}>
			<CircularProgress size={72} />
		</div>
	);
};
