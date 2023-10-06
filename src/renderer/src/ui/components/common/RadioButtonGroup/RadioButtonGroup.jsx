import { FormControl, InputLabel, FormControlLabel, RadioGroup, Radio } from '@material-ui/core';
import { useStyles } from './RadioButtonGroup.styles';
import { Tooltip } from '../Tooltip/Tooltip';
import { formatTokenAmount } from '../../../../utils';

export const RadioButtonGroup = ({ classNames, label, options, value, onChange, tooltipText }) => {
	const classes = useStyles();

	return (
		<FormControl variant="outlined" className={classes.formControl}>
			{label ? (
				<div className={classNames?.amountLabel}>
					<InputLabel className={classes.label}>{label}</InputLabel>
					<Tooltip placement="right" title={tooltipText} width={180} />
				</div>
			) : (
				''
			)}

					<RadioGroup className={classes.radioGroup}>
						{options.map(option => (
							<FormControlLabel
								key={option.id}
								onChange={() => onChange(option.value)}
								className={classes.formControlLabel}
								value={option.value}
								control={
									<Radio
										color="primary"
										className={classes.radio}
										disableRipple
									/>
								}
								label={`${formatTokenAmount(option.value)} ${option.label}`}
								labelPlacement="bottom"
								checked={option.value === value}
							/>
						))}
					</RadioGroup>

		</FormControl>
	);
};
