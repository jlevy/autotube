import { components as ChakraReactSelectComponents } from 'chakra-react-select';
import { extendTheme, ResponsiveValue } from '@chakra-ui/react';

// Common shared colors.
export const colors = {
  background: 'hsl(0, 0%, 100%)',

  // Focus and selections:
  // Brightest focus for most important items (like selection ring):
  brightFocus: 'hsl(181, 25%, 60%)',
  // For selection frames and indicators, a little dimemer than brightFocus:
  selectionAccent: 'hsl(181, 20%, 72%)',
  dimFocus: 'hsl(166, 20%, 90%)',
  selectorCurrent: 'hsl(166, 24%, 93%)',
  selectorGentle: 'hsl(180, 15%, 96%)',
  selectorBasic: 'hsl(0, 0%, 94%)', // gray.200

  // Text colors:
  // linkText: "hsl(221, 41%, 46%)",
  linkText: 'hsl(203, 62%, 32%)',
  activeText: 'hsl(181, 20%, 42%)',
  selectedText: 'hsl(176, 6%, 30%)', // brand
  menuText: 'hsl(176, 6%, 30%)', // brand
  hintText: 'hsl(174, 6%, 50%)', // brand.600
  labelText: 'hsl(174, 6%, 50%)', // brand.600
  secondaryText: 'hsl(0, 0%, 60%)', // for content annotations
  boldText: 'hsl(0, 0%, 35%)',

  // Other colors:
  lightIcon: 'hsl(166, 8%, 72%)', // brand.400
  boxBorder: 'hsl(0, 0%, 90%)',
  normalBorder: 'hsl(0, 0%, 90%)',
  transientBorder: 'hsl(0, 0%, 90%)',
  snippetBorder: 'hsl(0, 0%, 90%)',
  docBackground: 'hsl(50, 100%, 99%)',
  tooltipBackground: 'hsl(174, 6%, 55%)',
  tooltipText: 'hsl(0, 0%, 100%)',
  diagramBorder: 'hsl(0, 0%, 50%)',

  // Functional colors for items:
  bgTopic: 'hsl(61, 32%, 94%)',
  bgGrouping: 'hsl(40, 28%, 90%)',
  bgNote: 'hsl(0, 0%, 93%)',
  bgQuestion: 'hsl(255, 41%, 95%)',
  bgAnswer: 'hsl(190, 40%, 94%)',
  bgResource: 'hsl(120, 25%, 93%)',
  bgOther: 'hsl(0, 0%, 88%)',
  bgBox: 'hsl(0, 0%, 98%)',
  bgTransient: 'hsl(0, 0%, 98%)',
  bgHighlight: 'hsl(0, 0%, 100%)',

  // Functional colors for states:
  fgTransient: 'hsl(0, 0%, 50%)',
  fgDraft: 'hsl(0, 0%, 30%)',
  fgReviewed: 'hsl(120, 45%, 30%)',
  fgRecommended: 'hsl(65, 95%, 28%)',
  fgGenerated: 'hsl(219, 58%, 30%)',
  fgOther: 'hsl(0, 0%, 30%)',
};

export const colorSchemes = {
  background: {
    red: 'hsl(5, 51%, 94%)',
    crimson: 'hsl(20, 90%, 94%)',
    orange: 'hsl(30, 100%, 94%)',
    yellow: 'hsl(46, 95%, 95%)',
    vanilla: 'hsl(61, 32%, 94%)',
    olive: 'hsl(82, 32%, 94%)',
    green: 'hsl(120, 45%, 91%)',
    teal: 'hsl(166, 45%, 91%)',
    blue: 'hsl(219, 58%, 93%)',
    violet: 'hsl(272, 56%, 95%)',
    tan: 'hsl(34, 37%, 96%)',
    brown: 'hsl(40, 28%, 88%)',
  },
  foreground: {
    red: 'hsl(5, 51%, 30%)',
    crimson: 'hsl(20, 90%, 30%)',
    orange: 'hsl(30, 100%, 30%)',
    yellow: 'hsl(46, 95%, 30%)',
    vanilla: 'hsl(61, 32%, 30%)',
    olive: 'hsl(82, 32%, 30%)',
    green: 'hsl(120, 45%, 30%)',
    teal: 'hsl(166, 45%, 30%)',
    blue: 'hsl(219, 58%, 30%)',
    violet: 'hsl(272, 56%, 35%)',
    tan: 'hsl(34, 37%, 30%)',
    brown: 'hsl(40, 28%, 35%)',
  },
  gray: {
    100: 'hsl(0, 0%, 93%)',
    200: 'hsl(0, 0%, 90%)',
    300: 'hsl(0, 0%, 82%)',
    400: 'hsl(0, 0%, 70%)',
    500: 'hsl(0, 0%, 58%)',
    600: 'hsl(0, 0%, 45%)',
    700: 'hsl(0, 0%, 30%)',
    800: 'hsl(0, 0%, 10%)',
    900: 'hsl(0, 0%, 6%)',
  },
  // Original Chakra brand colors for reference:
  // brand: {
  //   50: "hsl(204, 45%, 98%)",
  //   100: "hsl(210, 38%, 95%)",
  //   200: "hsl(214, 32%, 91%)",
  //   300: "hsl(211, 25%, 84%)",
  //   400: "hsl(214, 20%, 69%)",
  //   500: "hsl(216, 15%, 52%)",
  //   600: "hsl(218, 17%, 35%)",
  //   700: "hsl(218, 23%, 23%)",
  //   800: "hsl(220, 26%, 14%)",
  //   900: "hsl(230, 21%, 11%)",
  // },
  brand: {
    50: 'hsl(156, 14%, 98%)',
    100: 'hsl(160, 14%, 96%)',
    200: 'hsl(162, 12%, 94%)',
    300: 'hsl(164, 10%, 86%)',
    400: 'hsl(166, 8%, 76%)',
    500: 'hsl(168, 6%, 58%)',
    600: 'hsl(174, 6%, 45%)',
    700: 'hsl(176, 6%, 29%)',
    800: 'hsl(182, 6%, 20%)',
    900: 'hsl(193, 6%, 11%)',
  },
  shade: {
    50: 'hsl(0, 0%, 99%)',
    100: 'hsl(0, 0%, 98%)',
    200: 'hsl(0, 0%, 96%)',
    300: 'hsl(0, 0%, 90%)',
    400: 'hsl(0, 0%, 81%)',
    500: 'hsl(0, 0%, 62%)',
    600: 'hsl(0, 0%, 44%)',
    700: 'hsl(0, 0%, 31%)',
    800: 'hsl(0, 0%, 18%)',
    900: 'hsl(0, 0%, 6%)',
  },
  bright: {
    100: 'hsl(160, 0%, 95%)',
    200: 'hsl(162, 15%, 91%)',
    300: 'hsl(164, 21%, 87%)',
    400: 'hsl(166, 25%, 83%)',
    500: 'hsl(168, 27%, 80%)',
    600: 'hsl(174, 30%, 75%)',
    700: 'hsl(185, 31%, 72%)',
    800: 'hsl(187, 35%, 70%)',
    900: 'hsl(193, 48%, 69%)',
  },
  // TODO: Consider adapting all named color schemes to be more subtle and in line with our look.
  // For highlights.
  green: {
    100: 'hsl(175, 20%, 95%)',
    200: 'hsl(175, 20%, 85%)',
    300: 'hsl(175, 20%, 70%)',
    400: 'hsl(175, 20%, 65%)',
    500: 'hsl(175, 20%, 50%)',
    600: 'hsl(175, 25%, 45%)',
    700: 'hsl(175, 25%, 38%)',
    800: 'hsl(175, 25%, 30%)',
    900: 'hsl(175, 25%, 20%)',
  },
  // For serious errors, used by Chakra.
  red: {
    100: 'hsl(10, 40%, 95%)',
    200: 'hsl(10, 40%, 85%)',
    300: 'hsl(10, 40%, 75%)',
    400: 'hsl(10, 40%, 65%)',
    500: 'hsl(10, 40%, 55%)',
    600: 'hsl(10, 40%, 45%)',
    700: 'hsl(10, 45%, 38%)',
    800: 'hsl(10, 50%, 30%)',
    900: 'hsl(10, 50%, 20%)',
  },
  // For dangerous buttons etc.
  caution: {
    100: 'hsl(10, 44%, 95%)',
    200: 'hsl(10, 44%, 92%)',
    300: 'hsl(10, 44%, 86%)',
    400: 'hsl(10, 44%, 78%)',
    500: 'hsl(10, 44%, 67%)',
    600: 'hsl(10, 44%, 60%)',
    700: 'hsl(10, 44%, 52%)',
    800: 'hsl(10, 44%, 45%)',
    900: 'hsl(10, 44%, 35%)',
  },
  orange: {
    100: 'hsl(20, 50%, 95%)',
    200: 'hsl(20, 50%, 87%)',
    300: 'hsl(20, 50%, 75%)',
    400: 'hsl(20, 50%, 65%)',
    500: 'hsl(20, 50%, 55%)',
    600: 'hsl(20, 58%, 45%)',
    700: 'hsl(20, 58%, 38%)',
    800: 'hsl(20, 58%, 30%)',
    900: 'hsl(20, 58%, 20%)',
  },
};

export const borders = {
  widgetRadius: '0.375rem', // Chakra md radius.

  // Caution: To avoid shifting, use boxShadows or only switch between borders of the same width on focus and hover.
  normal: `1px solid ${colors.normalBorder}`,
  active: `1px solid ${colors.brightFocus}`,

  // Form selection rings.
  dimRing: `2px solid ${colors.dimFocus}`,
  activeRing: `2px solid ${colors.brightFocus}`,

  // Boxes.
  snippet: `2px solid ${colors.snippetBorder}`,
  boxSolid: `2px solid ${colors.boxBorder}`,
  boxTransient: `2px solid ${colors.transientBorder}`, // Could use dashed but was more cluttered.

  // Extra bright accent to make selections obvious.
  selectionAccent: `2px solid ${colors.selectionAccent}`,
  selectinoAccentOff: `2px solid transparent`,

  // Diagrams.
  diagramOuter: `1px solid ${colors.normalBorder}`,
  diagramBox: `1px solid ${colors.diagramBorder}`,
};

export const boxShadows = {
  activeRing: `0 0 0 2px ${colors.brightFocus}`,
};

export const textStyles = {
  capLetterSpacing: '.06em',
};

export const fontSizes = {
  smallest: '0.75rem', // Chakra xs button.
  smaller: '0.825rem', // Good for slightly smaller buttons.
  small: '0.875rem', // Chakra sm button.
};

type TextTransform = 'uppercase' | 'lowercase' | 'capitalize' | 'none';

// TODO: Consistent, gentle hover transitions everywhere.

const chromeStyles = {
  size: 'sm',
  textTransform: 'uppercase' as ResponsiveValue<TextTransform>, // help TypeScript
  letterSpacing: textStyles.capLetterSpacing,
  fontWeight: 'medium',
  bg: 'transparent',
  color: 'gray.500',
  border: '1px',
  borderColor: 'transparent',
  fontSize: '0.875rem', // chakra-sm
};

// TODO: Move this to theme.

export const widgetStyles = {
  chromeStyles,
  // Add to buttons.
  buttonStyles: {
    ...chromeStyles,
    borderRadius: 'md',
    _hover: {
      bg: 'selectorGentle',
    },
  },
  tabStyles: {
    ...chromeStyles,
    px: 4,
    py: 1,
    borderRadius: 'none',
    color: 'menuText',
    _hover: {
      bg: 'selectorGentle',
    },
  },
};

// Create-select styles.
//
// From https://react-select.com/styles
// clearIndicator
// container
// control
// dropdownIndicator
// group
// groupHeading
// indicatorsContainer
// indicatorSeparator
// input
// loadingIndicator
// loadingMessage
// menu
// menuList
// menuPortal
// multiValue
// multiValueLabel
// multiValueRemove
// noOptionsMessage
// option
// placeholder
// singleValue
// valueContainer

// Unfortanately, just using "width" on Chakra-React-Select doesn't work so we pass
// it in as a param here.
type CustomSelectOpts = {
  width?: string;
  bgColor?: string;
};

const defaultChooserWidth = '8rem';

export const selectSmallStyle = (opts: CustomSelectOpts = {}) => ({
  control: (baseStyles: any, state: any) => {
    const boxShadow = state.isFocused ? boxShadows.activeRing : 'none';
    return {
      ...baseStyles,
      boxShadow: boxShadow,
      '&:hover': {
        boxShadow: boxShadow,
      },
      border: borders.normal,
      width: opts.width || defaultChooserWidth,
      color: colors.menuText,
      borderColor: colors.normalBorder,
      borderRadius: borders.widgetRadius,
      ...opts,
    };
  },
  menu: (baseStyles: any, state: any) => ({
    ...baseStyles,
    width: opts.width || defaultChooserWidth,
  }),
  valueContainer: (baseStyles: any, state: any) => ({
    ...baseStyles,
    padding: '0 0 0 0.4rem', // Less space.
  }),
  menuList: (baseStyles: any, state: any) => ({
    ...baseStyles,
    padding: '0', // Less space.
  }),
  option: (baseStyles: any, state: any) => ({
    ...baseStyles,
    backgroundColor: state.isFocused ? colors.selectorBasic : null,
    color: colors.menuText,
    padding: '0.3rem 0 0.3rem 0.4rem', // Less space.
  }),
  dropdownIndicator: (baseStyles: any, state: any) => ({
    ...baseStyles,
    backgroundColor: 'transparent',
    width: '1.5rem', // Smaller.
  }),
});

export const createSelectMenuStyle = {
  // React-select uses a bright blue shadow. Instead match it to our theme.
  // https://stackoverflow.com/questions/52614304/react-select-remove-focus-border
  control: (baseStyles: any, state: any) => {
    const boxShadow = state.isFocused ? boxShadows.activeRing : 'none';
    const border = borders.normal;
    return {
      ...baseStyles,
      boxShadow: boxShadow,
      '&:hover': {
        boxShadow: boxShadow,
      },
      border: border,
      innerWidth: '100%',
      borderColor: colors.normalBorder,
      borderRadius: borders.widgetRadius,
    };
  },
  option: (baseStyles: any, state: any) => ({
    ...baseStyles,
    backgroundColor: state.isFocused ? colors.selectorBasic : null,
  }),
};

export const createSelectAutoCompleteStyle = {
  ...createSelectMenuStyle,
  // Enlarge the dropdown menu.
  // "menu" sets the box enclosing the menu, and "menuList" is the actual menu.
  menuList: (baseStyles: any, _state: any) => ({
    ...baseStyles,
    // Ensure this is big enough to always show max set of options.
    maxHeight: '600px',
  }),
};

export const createSelectGroupingStyle = {
  control: (baseStyles: any, state: any) => ({
    ...baseStyles,
    borderColor: colors.normalBorder,
    borderRadius: borders.widgetRadius,
  }),
  singleValue: (baseStyles: any, state: any) => ({
    ...baseStyles,
    color: 'secondaryText',
    fontWeight: '500',
    width: 'fit-content',
    padding: '0 .6rem',
    backgroundColor: colors.bgGrouping,
    borderColor: colors.normalBorder,
    borderRadius: borders.widgetRadius,
  }),
  option: (baseStyles: any, state: any) => ({
    ...baseStyles,
    backgroundColor: state.isFocused ? colors.bgGrouping : null,
  }),
  dropdownIndicator: (baseStyles: any, _state: any) => ({
    ...baseStyles,
    backgroundColor: colors.bgGrouping,
  }),
};

export const createSelectConceptStyle = {
  control: (baseStyles: any, state: any) => ({
    ...baseStyles,
    borderColor: colors.normalBorder,
    borderRadius: borders.widgetRadius,
  }),
  option: (baseStyles: any, state: any) => ({
    ...baseStyles,
    backgroundColor: state.isFocused ? colors.bgTopic : null,
  }),
  multiValue: (baseStyles: any, _state: any) => ({
    ...baseStyles,
    color: 'secondaryText',
    fontWeight: '500',
    backgroundColor: colors.bgTopic,
    fontSize: '14px', // Chakra sm, to match size of single value selects.
  }),
  dropdownIndicator: (baseStyles: any, _state: any) => ({
    ...baseStyles,
    backgroundColor: colors.bgTopic,
  }),
};

const NullComponent = () => null;

/**
 * Hack: add components={noDropdownIndicator} to chakra-react-select components
 * to remove the dropdown indicator.
 */
export const noDropdownIndicator = {
  ...ChakraReactSelectComponents,
  DropdownIndicator: NullComponent,
  IndicatorSeparator: NullComponent,
};

// Chakra theme.

// TODO: Consider using withDefaultProps or withDefaultColorScheme to make this more maintainable.

export const chakraTheme = extendTheme({
  fonts: {
    // Global font settings:
    body: 'National2, system-ui, sans-serif',
    heading: 'National2, system-ui, sans-serif',
  },

  colors: {
    ...colors,
    ...colorSchemes,
  },

  // For the focus ring on buttons (doesn't seem to affect other focus rings):
  shadows: {
    outline: `0 0 0 2px ${colors.brightFocus}`,
  },

  components: {
    // Match focus ring to theme.
    Input: {
      defaultProps: {
        focusBorderColor: 'brightFocus',
      },
      baseStyle: {
        borderColor: colors.normalBorder,
      },
    },
    Textarea: {
      baseStyle: {
        borderColor: colors.normalBorder,
      },
    },
    Select: {
      defaultProps: {
        focusBorderColor: 'brightFocus',
      },
      baseStyle: {
        borderColor: colors.normalBorder,
      },
    },
    FormLabel: {
      baseStyle: {
        fontSize: 'xs',
        textTransform: 'uppercase',
        letterSpacing: textStyles.capLetterSpacing,
        color: colors.labelText,
      },
    },
    Spinner: {
      baseStyle: {
        thickness: '2px',
        speed: '4s',
        emptyColor: 'brand.900',
        color: 'hsl(164, 10%, 88%)',
      },
    },
    Tag: {
      // Prevent text wrap within the tag, which looks bad.
      baseStyle: {
        whiteSpace: 'nowrap',
        overflow: 'hidden',
      },
    },
    Button: {
      baseStyle: widgetStyles.buttonStyles,
      variants: {
        // You can create custom button variants, such as "primary" and "secondary"
        primary: {
          bg: 'brand.200',
          color: 'menuText',
          border: '1px',
          borderColor: 'brand.300',
          fontSize: '0.875rem',
          _hover: {
            bg: 'brand.200',
          },
        },
        secondary: {
          borderColor: colors.normalBorder,
          // borderColor: "brand.400",
        },
        subtle: {},
      },
      // TODO: Figure out how to customize the Toast color.
      Alert: {
        variants: {
          subtle: {
            bg: 'brand.200',
            color: 'menuText',
          },
        },
      },
      defaultProps: {
        variant: 'secondary', // Set the default button variant
      },
    },
    // TODO: Styling for MenuGroup, MenuList etc not working.
    // MenuGroup: {
    //   baseStyle: {
    //     color: 'green',
    //     background: 'blue',
    //   },
    // },
    // MenuList: {
    //   baseStyle: {
    //     color: 'green',
    //     background: 'blue',
    //   },
    // },
    Tooltip: {
      baseStyle: {
        color: 'tooltipText',
        background: 'tooltipBackground',
      },
    },
  },
  styles: {
    global: {
      '.text-container a': {
        color: 'linkText',
        textDecoration: 'none',
        '&:hover': {
          textDecoration: 'underline',
        },
      },
      '.subtle-links a': {
        textDecoration: 'none',
        '&:hover': {
          textDecoration: 'none',
        },
      },
    },
  },
});
