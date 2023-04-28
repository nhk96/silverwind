const breakpoint = {
  mobile: 767,
  tablet: 991,
  laptop: 1199,
  desktop: 1200,
};

//Please change only breakpoint value, do not touch code below.

const mobile = `@media only screen and (max-width: ${breakpoint.mobile}px)`;
const tablet = `@media only screen and (min-width: ${
  breakpoint.mobile + 1
}px) and (max-width:${breakpoint.tablet}px)`;
const laptop = `@media only screen and (min-width:  ${
  breakpoint.tablet + 1
}px) and (max-width:${breakpoint.laptop}px)`;
const desktop = `@media only screen and (min-width:${breakpoint.desktop}px)`;

export { mobile, tablet, laptop, desktop };
