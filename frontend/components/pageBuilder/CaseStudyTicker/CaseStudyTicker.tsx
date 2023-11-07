import styled from 'styled-components';
import Marquee from "react-fast-marquee";
import pxToRem from '../../../utils/pxToRem';
import Link from 'next/link';
import { SlugType } from '../../../shared/types/types';
import { useInView } from 'react-intersection-observer';

type Props = {
	tickerContent: string;
	tickerLinkTitle: string;
	tickerButtonExternalLink: string;
	tickerInternalLink: SlugType;
}

const CaseStudyTickerWrapper = styled.section`
	padding: ${pxToRem(30)} 0;
	margin-left: ${pxToRem(-30)};
	width: calc(100vw + 30px);
	position: relative;
	overflow: hidden;

	@media ${(props) => props.theme.mediaBreakpoints.tabletPortrait} {
		padding: ${pxToRem(60)} 0;
		margin-left: ${pxToRem(-15)};
		width: 100vw;
	}

	@media ${(props) => props.theme.mediaBreakpoints.mobile} {
		padding: ${pxToRem(30)} 0;
	}

	.rfm-child {
		margin-right: ${pxToRem(30)};
		font-size: ${pxToRem(82)};
		line-height: normal;
		font-family: var(--font-reslindale);

		@media ${(props) => props.theme.mediaBreakpoints.tabletPortrait} {
			font-size: ${pxToRem(45)};
		}
	}
`;

const LinkTag = styled.a``;

const MobileLinkButton = styled.div`
	display: none !important;

	@media ${(props) => props.theme.mediaBreakpoints.tabletPortrait} {
		display: block !important;
		position: absolute;
		top: 50%;
		left: 50%;
		transform: translate(-50%, -50%);
		z-index: 2;
	}
`;

const CaseStudyTicker = (props: Props) => {
	const {
		tickerContent,
		tickerLinkTitle,
		tickerButtonExternalLink,
		tickerInternalLink
	} = props;

	const hasLink = (tickerButtonExternalLink || tickerInternalLink) && tickerLinkTitle;

	const handleLink = (): string => {
		if (tickerButtonExternalLink) {
			return tickerButtonExternalLink;
		}

		if (tickerInternalLink) {
			return `/${tickerInternalLink?.current}`
		}

		return '';
	};

	const { ref, inView } = useInView({
		triggerOnce: true,
		threshold: 0.2,
		rootMargin: '-50px'
	});

	return (
		<CaseStudyTickerWrapper
			ref={ref}
			className={`view-element-fade-in ${
				inView ? 'view-element-fade-in--in-view' : ''
			}`}
		>
			{hasLink ? (
				<Link href={handleLink()} passHref scroll={false}>
					<LinkTag
						className={hasLink ? 'frame-link' : ''}
						data-title={tickerLinkTitle ? tickerLinkTitle : ''}
						target={tickerButtonExternalLink ? '_blank' : '_self'}
					>
						{tickerContent && (
							<Marquee autoFill>
								{tickerContent}
							</Marquee>
						)}
						<MobileLinkButton className="primary-link-style">
							{tickerLinkTitle ? tickerLinkTitle : ''}
						</MobileLinkButton>
					</LinkTag>
				</Link>
			) : (
				tickerContent && (
					<Marquee autoFill>
						{tickerContent}
					</Marquee>
				)
			)}
		</CaseStudyTickerWrapper>
	);
};

export default CaseStudyTicker;
