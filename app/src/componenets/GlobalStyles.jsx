import { createGlobalStyle } from 'styled-components';

export const StyledGlobal = createGlobalStyle`
*,
*::after,
*::before {
	margin: 0;
	padding: 0;
	box-sizing: inherit;
}
html {
	font-size: 62.5%;

}

body {
	font-family: 'Lato', 'Anton',  sans-serif;
	font-weight: 400;
	font-size: 16px;
	line-height: 1.6;
	box-sizing: border-box;

}
`;
