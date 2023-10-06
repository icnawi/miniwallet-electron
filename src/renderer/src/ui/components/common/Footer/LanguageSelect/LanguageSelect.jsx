import { useMemo, useState } from 'react';
import { useTranslation } from 'react-i18next';
import { IconButton, MenuItem, Fade, Menu } from '@material-ui/core';
import enIcon from '../../../../images/languages/en.svg';
import ruIcon from '../../../../images/languages/ru.svg';
import cnIcon from '../../../../images/languages/cn.svg';
import { useStyles } from './LanguageSelect.styles';

const languages = [
	{
		key: 'en',
		name: 'EN',
		icon: enIcon,
	},
	{
		key: 'ru',
		name: 'RU',
		icon: ruIcon,
	},
	{
		key: 'cn',
		name: 'CN',
		icon: cnIcon,
	},
];

export const LanguageSelect = () => {
    const { i18n } = useTranslation();
	const [anchorEl, setAnchorEl] = useState(null);
	const open = Boolean(anchorEl);
	const classes = useStyles();
    const activeLang = useMemo(() => {
        return languages.find(({ key }) => key === i18n.language) || {};
    }, [i18n.language]);

	const handleMenuOpen = event => setAnchorEl(event.currentTarget);
	const handleMenuClose = () => setAnchorEl(null);

	const handleLanguageSelect = (activeKey) => {
        i18n.changeLanguage(activeKey);
		handleMenuClose();
	};

	return (
		<div className={classes.container}>
			<IconButton
				aria-label="language select"
				aria-controls="language-select"
				className={classes.button}
				onClick={handleMenuOpen}
			>
				<img src={activeLang.icon} alt={activeLang.name}  className={classes.icon} />
			</IconButton>
			<Menu
				id="language-select"
				anchorEl={anchorEl}
				open={open}
				anchorOrigin={{ vertical: 'top', horizontal: 'right' }}
				transformOrigin={{ vertical: 'bottom', horizontal: 'right' }}
				TransitionComponent={Fade}
				getContentAnchorEl={null}
				onClose={handleMenuClose}
			>
				{languages.map((language) => (
					<MenuItem
						key={language.key}
						value={language.key}
						className={classes.menuItem}
						selected={activeLang.key === language.key}
						onClick={() => handleLanguageSelect(language.key)}
					>
						<img src={language.icon} alt={language.name}  className={classes.icon} />
						{language.name}
					</MenuItem>
				))}
			</Menu>
		</div>
	);
};
