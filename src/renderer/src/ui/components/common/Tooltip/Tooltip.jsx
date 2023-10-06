import { Tooltip as MuiTooltip } from '@material-ui/core';
import infoIcon from '../../../images/icons/info-icon.svg';
import { useStyles } from './Tooltip.styles';

export const Tooltip = ({ children, width, mode, placement = 'top', ...rest }) => {
	const classes = useStyles({ width, placement, mode });

	return (
		<MuiTooltip
			{...rest}
			placement={placement}
			arrow
			classes={{
				tooltip: classes.tooltip,
				arrow: classes.arrow
			}}
		>
			{children || <img src={infoIcon} alt="i" className={classes.icon} />}
		</MuiTooltip>
	);
};
