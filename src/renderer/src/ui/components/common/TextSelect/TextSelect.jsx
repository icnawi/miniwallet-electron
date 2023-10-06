import { FormControl, InputLabel, Select, MenuItem, Fade } from '@material-ui/core';
import { ExpandMore } from '@material-ui/icons';
import { useStyles } from './TextSelect.styles';

export const TextSelect = ({ label, options, loading, ...rest }) => {
	const classes = useStyles();

	return (
		<FormControl variant="outlined" className={classes.formControl}>
			{label ? <InputLabel className={classes.label}>{label}</InputLabel> : ''}
			<Select
				defaultValue={options[0].name}
				MenuProps={{
					TransitionComponent: Fade,
					anchorOrigin: {
						vertical: 'bottom',
						horizontal: 'left',
					},
					getContentAnchorEl: null,
					className: classes.menu,
				}}
				IconComponent={ExpandMore}
				{...rest}>
				{options.map(option => (
					<MenuItem key={option.id} value={option.name} className={classes.menuItem}>
						{option.name}
					</MenuItem>
				))}
			</Select>
		</FormControl>
	);
};
