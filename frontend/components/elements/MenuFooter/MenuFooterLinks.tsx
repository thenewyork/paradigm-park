import styled from 'styled-components';
import PrimaryLink from '../PrimaryLink';
import pxToRem from '../../../utils/pxToRem';

const siteOptions = require('../../../json/siteSettings.json');

const MenuFooterLinksWrapper = styled.div`
	display: flex;
	column-gap: ${pxToRem(12)};

	@media ${(props) => props.theme.mediaBreakpoints.mobile} {
		column-gap: 0;

		.primary-link {
			border: none;
		}
	}
`;

const MenuFooterLinks = () => {
	const {
		instagramUrl,
		generalEmail,
	} = siteOptions;

	return (
		<MenuFooterLinksWrapper>
			{instagramUrl && (
				<PrimaryLink
					title="Instagram"
					url={instagramUrl}
					isOutline
				/>
			)}
			<PrimaryLink
				title="Studio News"
				url="/learn"
				isOutline
			/>
			{generalEmail && (
				<PrimaryLink
					title="Email"
					url={`mailto:${generalEmail}`}
					isOutline
				/>
			)}
		</MenuFooterLinksWrapper>
	);
};

export default MenuFooterLinks;
