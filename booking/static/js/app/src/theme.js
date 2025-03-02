import { createMuiTheme } from '@material-ui/core/styles';

const DISPLAY_FONT_STACK = "'Modern Era', -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Oxygen, Ubuntu, Cantarell, 'Fira Sans', 'Droid Sans', 'Helvetica Neue', Arial, sans-serif, 'Apple Color Emoji', 'Segoe UI Emoji', 'Segoe UI Symbol'";
const BODY_FONT_STACK = "'GT Zirkon', -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Oxygen, Ubuntu, Cantarell, 'Fira Sans', 'Droid Sans', 'Helvetica Neue', Arial, sans-serif, 'Apple Color Emoji', 'Segoe UI Emoji', 'Segoe UI Symbol'";
const BASE_FONT_SIZE = 16;

export default createMuiTheme({
    typography: {
        useNextVariants: true,
        htmlFontSize: BASE_FONT_SIZE,
        fontSize: BASE_FONT_SIZE,
        body1: {
          fontFamily: BODY_FONT_STACK,
          fontWeight: 400,
          fontSize: "1rem",
          lineHeight: 1.4285,
          letterSpacing: "0em",
          textRendering: "optimizeLegibility",
          webkitFontSmoothing: "subpixel-antialiased",
        },
        body2: {
          fontFamily: BODY_FONT_STACK,
          fontWeight: 300,
          fontSize: "0.875rem",
          lineHeight: 1.375,
          letterSpacing: "0",
          textRendering: "optimizeLegibility",
          webkitFontSmoothing: "subpixel-antialiased",
        },
        subtitle1: {
          fontFamily: DISPLAY_FONT_STACK,
          fontWeight: 400,
          fontSize: "1rem",
          lineHeight: 1.375,
          letterSpacing: "0em",
          textRendering: "optimizeLegibility",
          webkitFontSmoothing: "subpixel-antialiased",
        },
        subtitle2: {
          fontFamily: DISPLAY_FONT_STACK,
          fontWeight: 400,
          fontSize: "0.875rem",
          lineHeight: 1.4285,
          letterSpacing: "0",
          textRendering: "optimizeLegibility",
          webkitFontSmoothing: "subpixel-antialiased",
        },
        caption: {
          fontFamily: BODY_FONT_STACK,
          fontWeight: 400,
          fontSize: "0.75rem",
          lineHeight: 1.66,
          letterSpacing: "0.06em",
        },
        overline: {
          fontFamily: BODY_FONT_STACK,
          fontWeight: 500,
          fontSize: "0.75rem",
          lineHeight: 1.66,
          letterSpacing: "0.0133em",
          textTransform: "uppercase",
        },
        h6: {
          fontFamily: DISPLAY_FONT_STACK,
          fontWeight: 500,
          fontSize: "1.25rem",
          lineHeight: 1.25,
          letterSpacing: "0.0075em",
        },
        h5: {
          fontFamily: DISPLAY_FONT_STACK,
          fontWeight: 500,
          fontSize: "1.5rem",
          lineHeight: 1.33,
          letterSpacing: "0em",
        },
        h4: {
          fontFamily: DISPLAY_FONT_STACK,
          fontWeight: 400,
          fontSize: "2rem",
          lineHeight: 1.25,
          letterSpacing: "0.00735em",
        },
        h3: {
          fontFamily: DISPLAY_FONT_STACK,
          fontWeight: 600,
          fontSize: "2.25rem",
          lineHeight: 1.222,
          letterSpacing: "0em",
        },
        h2: {
          fontFamily: DISPLAY_FONT_STACK,
          fontWeight: 600,
          fontSize: "3rem",
          lineHeight: 1.229,
          letterSpacing: "-0.00833em",
        },
        h1: {
          fontFamily: DISPLAY_FONT_STACK,
          fontWeight: 600,
          fontSize: "4rem",
          lineHeight: 1.21875,
          letterSpacing: "-0.01562em",
        },
        button: {
          fontFamily: DISPLAY_FONT_STACK,
          fontWeight: 600,
          fontSize: "1rem",
          lineHeight: 1.18,
          letterSpacing: "0",
          textTransform: "none",
        },
    },
    palette: {
        primary: {
            main:"#2B4BD1",
            light:"#7280E3",
            dark:"#0025B2",
            contrastText: "#FFFFFF",
        },
        primaryTonal: {
          50:"#E8EAFA",
          100:"#C4C9F2",
          200:"#9DA6E9",
          300:"#73883E0",
          400:"#5267D9",
          500:"#2B4BD1",
          600:"#2543C6",
          700:"#1838BA",
          800:"#072DAF",
          900:"#00189C",
        },
        secondary: {
            main:"#2BD1B3",
            light:"#AEEBDE",
            dark:"#00B890",
            contrastText: "rgba(0,0,0,0.87)",
        },
        secondaryTonal: {
          50:"#DFF7F3",
          100:"#B0EBDE",
          200:"#78DFC9",
          300:"#2BD1B3",
          400:"#00C5A1",
          500:"#00B791",
          600:"#00A983",
          700:"#009872",
          800:"#008764",
          900:"#006946",
        },
        grey: {
            50:"#F5F9FA",
            100:"#E9F2F5",
            200:"#DDEAED",
            300:"#CEDDE0",
            400:"#A2B7BD",
            500:"#83989E",
            600:"#607175",
            700:"#4D5C61",
            800:"#333F42",
            900:"#031B21",
            A100:"#C7D3D6",
            A200:"#96A6AB",
            A400:"#152A30",
            A700:"#4D5C61"
        },
        background: {
            default: "#F5F9FA",
            paper: "#FFFFFF"
        },
    },
    overrides:{
        MuiInput: {
            underline: {
                '&:before': {
                    borderBottomColor: "#96A6AB", // grey[A200]
                    borderBottomWidth: 1,
                }
            },
        },
        MuiToggleButton: {
            root: {
                height: 'auto', // Height is hardcoded in px by default
                '&:hover': {
                    backgroundColor: 'auto', // Random harsh color change by default
                }
            },
            selected: {
                '&:after': {
                    display: 'none', // Strange muting overlay by default
                }
            }
        }
    },
  });
