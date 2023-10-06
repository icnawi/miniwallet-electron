import { useStoreActions, useStoreState } from 'easy-peasy';
import { RadioButtonList } from '../../../../RadioButtonList/RadioButtonList';
import { useStyles } from './ChangeNetwork.styles';

export const NetworkChange = ({ onClose }) => {
	const classes = useStyles();
	const networkId = useStoreState(state => state.common.user.network);
    const tokenConfig = useStoreState(state => state.common.tokenConfig);
	const setNetwork = useStoreActions(action => action.common.setNetwork);
    const loadTxs = useStoreActions(actions => actions.deposit.onGetTxs);

	const changeNetwork = chainId => {
		setNetwork(chainId);
        loadTxs();
		onClose();
	};

	const options = tokenConfig.networks.map(({ netId, name, icon }) => ({
		id: Number(netId),
		value: Number(netId),
		label: (
			<div className={classes.network}>
				<img src={icon} alt="" /> {name}
			</div>
		),
	}));

	return <RadioButtonList options={options} value={Number(networkId)} onChange={changeNetwork} />;
};
