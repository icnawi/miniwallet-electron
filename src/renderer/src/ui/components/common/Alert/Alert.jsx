import React from 'react';
import { Alert as AlertBar } from '@material-ui/lab';
import { IconButton, Collapse } from '@material-ui/core';
import { Close as CloseIcon } from '@material-ui/icons';
import { useStyles } from './Alert.styles';

export const Alert = ({ message, closable = true, alertColor }) => {
	const classes = useStyles({ alertColor });
	const [open, setOpen] = React.useState(true);

	const handleShutAlert = () => setOpen(false);
	return (
		<Collapse in={open} className={classes.collapsible}>
			<AlertBar
				className={classes.container}
				severity="info"
				variant="outlined"
				action={
                    closable ? <IconButton
						aria-label="close"
						color="inherit"
						size="medium"
						className={classes.crossButton}
						onClick={handleShutAlert}>
						<CloseIcon fontSize="inherit" />
					</IconButton> : undefined
				}>
				{message}
			</AlertBar>
		</Collapse>
	);
};
