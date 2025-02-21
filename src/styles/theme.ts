import { Paperlogy } from "@/styles/font";
import { border, extendTheme, withDefaultColorScheme } from "@chakra-ui/react";

export const theme = extendTheme(
  {
    fonts: {
      heading: Paperlogy.style.fontFamily,
      body: Paperlogy.style.fontFamily,
    },
    fontWeights: {
      thin: 100,
      extralight: 200,
      light: 300,
      regular: 400,
      medium: 500,
      semibold: 600,
      bold: 700,
      extrabold: 800,
      black: 900,
    },
    fontSizes: {
      xs: "11px",
      s: "13px",
      m: "16px",
      l: "20px",
      xl: "24px",
    },
    shadows: {
      card: "0px 4px 30px #0D298C19",
    },
    radii: {
      card: "16px",
    },
    colors: {
      primary: {
        _default: "var(--general-primary-color)",
        shade0: "var(--shade-0)",
        shade1: "var(--shade-1)",
        shade2: "var(--shade-2)",
        shade3: "var(--shade-3)",
        shade4: "var(--shade-4)",
      },
      secondary: "var(--general-secondary-color)",
      success: "var(--general-success)",
      danger: "var(--general-danger)",
      warning: "var(--general-warning)",
      body: "var(--general-body)",
      grey: {
        _default: "var(--general-grey)",
        shade0: "var(--grey-0)",
        shade1: "var(--grey-1)",
        shade2: "var(--grey-2)",
      },
      gradient:
        "linear-gradient(151deg, var(--gradient-primary), var(--gradient-secondary))",
      gradient2:
        "linear-gradient(151deg, var(--gradient-primary2), var(--gradient-secondary2))",
    },
    textStyles: {
      gradient: {
        background: "gradient",
        backgroundClip: "text",
        color: "transparent",
      },
      gradient2: {
        background: "gradient2",
        backgroundClip: "text",
        color: "transparent",
      },
    },
    semanticTokens: {
      colors: {
        primary: "primary._default",
        gray: "grey._default",
      },
    },
    components: {
      Button: {
        baseStyle: {
          fontSize: "m",
          borderRadius: "10px",
        },
        sizes: {
          md: {
            h: "50px",
            fontSize: "m",
            px: 20,
          },
        },
        variants: {
          solid: {
            bg: "primary",
            color: "white",
            fontSize: "m",
            fontWeight: "regular",
            _hover: {
              bg: "primary.shade1",
            },
          },
        },
        defaultProps: {
          size: "md",
          variant: "solid",
          colorScheme: "primary",
        },
      },
      Input: {
        baseStyle: {},
        sizes: {
          md: {
            field: {
              fontSize: "14px",
            },
          },
        },
        variants: {
          outline: {
            field: {
              borderColor: "grey",
              color: "black",
              _hover: {
                borderColor: "grey",
              },
              _focusVisible: {
                borderColor: "secondary",
              },
              _placeholder: {
                color: "grey",
              },
            },
          },
        },
        defaultProps: {
          variant: "outline",
        },
      },
      Card: {
        baseStyle: {
          container: {
            bg: "white",
            shadow: "0 4px 30px 0 rgba(0, 0, 0, 8%)",
            color: "black",
          },
        },
        sizes: {
          md: {
            container: {
              borderRadius: "16px",
            },
          },
        },
        variants: {
          elevated: {
            container: {
              bg: "white",
              shadow: "0 4px 30px 0 rgba(0, 0, 0, 8%)",
            },
          },
        },
      },
      Tabs: {
        baseStyle: {
          tablist: {
            gap: 2,
          },
        },
        sizes: {
          sm: {
            tab: {
              fontSize: "xs",
            },
          },
        },
        variants: {
          outlined: {
            tab: {
              px: "10px",
              h: "30px",
              borderWidth: "1px",
              borderColor: "grey",
              borderRadius: "8px",
              color: "grey",
              _selected: {
                color: "primary",
                borderColor: "primary",
              },
            },
          },
        },
      },
      Modal: {
        baseStyle: {
          dialog: {
            bg: "white",
          },
        },
      },
      Badge: {
        baseStyle: {
          w: "fit-content",
          h: "fit-content",
          px: "14px",
          py: "4px",
          borderRadius: "24px",
          fontSize: "s",
          fontWeight: "regular",
          bg: "primary",
          color: "white",
        },
      },
      Switch: {
        baseStyle: {
          track: {
            bg: "grey.shade1",
            borderRadius: "full",
            position: "relative",
            _checked: {
              bg: "primary",
            },
          },
          thumb: {
            bg: "white",
            position: "absolute",
            top: "50%",
            left: "2px",
            transform: "translateY(-50%)",
            transition: "transform 0.2s ease-in-out",
            _checked: {
              transform: "translateY(-50%) translateX(calc(100% + 6px))",
            },
          },
        },
        sizes: {
          sm: {
            track: { w: "32px", h: "16px", p: "2px" },
            thumb: { w: "12px", h: "12px" },
            _checked: {
              thumb: { transform: "translateY(-50%)" },
            },
          },
          md: {
            track: { w: "40px", h: "20px", p: "2px" },
            thumb: { w: "16px", h: "16px" },
            _checked: {
              thumb: { transform: "translateY(-50%)" },
            },
          },
          lg: {
            track: { w: "48px", h: "24px", p: "2px" },
            thumb: { w: "20px", h: "20px" },
            _checked: {
              thumb: { transform: "translateY(-50%)" },
            },
          },
        },
        defaultProps: {
          size: "md",
        },
      },
      Checkbox: {
        baseStyle: {
          control: {
            w: "24px",
            h: "24px",
            borderRadius: "4px",
          },
        },
      },
    },
  },
  withDefaultColorScheme({
    colorScheme: "primary",
    components: ["Button"],
  })
);
