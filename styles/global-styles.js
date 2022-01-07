import { createGlobalStyle } from 'styled-components'
import * as theme from './theme.js'

const GlobalStyles = createGlobalStyle`
  :root {
    ${'' /* available weights: 300, 400 */}
    --body-font: 'Work Sans', sans-serif;
    ${'' /* available weights: 400, 500, 700 */}
    --title-font: 'Quicksand', sans-serif;
    --main-color: ${theme.aquaMarine};
    --dark-color: ${theme.black};
    --light-color: ${theme.white};
    --button-bg-default: ${theme.white};
    min-height: 100vh;
    max-width: 100vw;
  }

  *,
  *::before,
  *::after {
    box-sizing: inherit;
  }

  ::-webkit-scrollbar {
    /* Webkit */
    width: 0;
    height: 0;
  }

  html,
  html a {
    text-shadow: 1px 1px 1px rgba(0, 0, 0, 0.004);
    -webkit-font-smoothing: subpixel-antialiased;
  }

  img {
    max-width: 100%;
  }

  body {
    height: 100%;
    margin: 0 auto;
    font-family: var(--body-font);
    font-weight: 300;
    color: var(--light-color);
    background-color: var(--dark-color);
    cursor: default;
  }

  aside,
  footer,
  header,
  main,
  nav,
  section {
    display: block;
  }


  h1,
  h2,
  h3,
  h4,
  h5,
  h6 {
    margin: 0;
    font-family: var(--title-font);
    font-weight: 400;
  }

  p,
  li,
  a,
  span {
    margin: 0;
    font-family:var(--body-font);
    font-weight: 400;
    font-size: 14px;
    line-height: 1.786;
  }

  a {
    background: transparent;
    text-decoration: none;
    cursor: pointer;

    &:hover,
    &:active {
      outline: 0;
    }
  }

  a:focus {
    outline: thin dotted;
    outline: 5px auto -webkit-focus-ring-color;
    outline-offset: -2px;
  }

  hr {
    flex-basis: 1000000px;
    margin: 0;
    border-top: 1px solid var(--main-color);
    border-width: 0;
    border-style: hidden;
  }

  button,
  input,
  optgroup,
  select,
  textarea {
    margin: 0;
    color: inherit;
    font: inherit;
  }

  button {
    overflow: visible;
  }

  button,
  select {
    text-transform: none;
  }

  button,
  html input[type='button'],
  input[type='reset'],
  input[type='submit'] {
    cursor: pointer;
    -webkit-appearance: button;
  }

  button[disabled],
  html input[disabled] {
    cursor: not-allowed;
  }

  button::-moz-focus-inner,
  input::-moz-focus-inner {
    padding: 0;
    border: 0;
  }

  textarea {
    overflow: auto;
  }

  /* ets the text selection color */
  ::-moz-selection {
    background-color: var(--dark-color);
    color: var(--light-color);
  }

  ::selection {
    background-color: var(--dark-color);
    color: var(--light-color);
  }

  /* Remove number spinners on webkit browers */
  input[type='number']::-webkit-inner-spin-button,
  input[type='number']::-webkit-outer-spin-button {
    margin: 0;
    -webkit-appearance: none;
  }

  /* Removes clear 'x' on edge browsers. */
  input::-ms-clear {
    display: none;
  }

  h1.h0 {
  font-size: 40px;
  font-weight: 200;
  line-height: 1.125;
  text-transform: uppercase;
}

  h1 {
  font-size: 32px;
  font-weight: 600;
  line-height: 1.188;
}

  h2 {
  font-size: 24px;
  line-height: 1.167;
}

  h3 {
  font-size: 20px;
  line-height: 1.3;
}

  small {
  font-size: 12px;
  line-height: 1.786;
}

  label {
  font-size: 12px;
  line-height: 1.786;
}
`

export default GlobalStyles

