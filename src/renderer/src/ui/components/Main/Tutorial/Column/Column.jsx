import { Title } from './Title/Title';
import { Content } from './Content/Content';

export const Column = ({ header, points, classNames }) => {
	return (
		<>
			<Title className={classNames.title}>{header}</Title>
			<Content className={classNames} points={points} />
		</>
	);
};
