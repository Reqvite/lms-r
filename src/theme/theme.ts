export const darkTheme = {
  colors: {
    mainBackground: "rgb(32, 32, 35)",
    secondaryBgColor: "rgba(240, 240, 240, 0.1)",
    headerBgColor: "rgba(32, 32, 35, 0.9);",
    mainTextColor: "#ffffff",
    accentColor: "#9090c296",
    notActive: "rgba(187, 3, 49, 0.5)",
    active: "rgba(44, 160, 49, 0.8)",
    timerColor: "rgba(240, 240, 240, 0.5)",
  },
  fontSizes: [12, 14, 16, 20, 24, 32, 48, 64],
  space: [0, 4, 8, 16, 32, 64, 128, 256, 512],
  sizes: {},
  fontWeights: {
    body: 400,
    heading: 700,
    bold: 700,
  },
  lineHeights: {
    body: 1.5,
    heading: 1.125,
  },
  letterSpacings: {
    body: "normal",
    caps: "0.2em",
  },
  borders: {
    baseBorder: "12px",
    dropDownBorder: "1px solid #cccccc;",
  },
  shadows: {
    profileShadow: "rgb(38, 57, 77) 0px 20px 30px -10px",
  },
  flexCentered: {
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
  },
  components: {
    buttons: {
      mainButton: {
        color: "#ffffff",
        backgroundColor: "rgba(240, 240, 240, 0.5)",
        fontWeight: "700",
        height: "50px",
        display: "block",
        border: "none",
        padding: "10px 20px",
        borderRadius: "12px",
        cursor: "pointer",
      },
      secondaryButton: {
        color: "#ffffff",
        backgroundColor: "rgba(240, 240, 240, 0.5)",
        fontWeight: "700",
        height: "50px",
        display: "block",
        border: "none",
        padding: "10px 20px",
        borderRadius: "12px",
        cursor: "pointer",
      },
      iconButton: {
        display: "flex",
        justifyContent: "center",
        width: "50px",
        height: "50px",
        alignItems: "center",
        backgroundColor: "rgba(240, 240, 240, 0.1)",
        border: "none",
        borderRadius: "10px",
        cursor: "pointer",
      },
    },
    activeNavLink: {
      backgroundColor: "rgba(240, 240, 240, 0.1)",
      borderRadius: "12px",
      cursor: "pointer",
    },
  },
};

export const lightTheme = {
  colors: {
    mainBackground: "rgb(255, 255, 255)",
    secondaryBgColor: "rgba(240, 240, 240, 0.9)",
    headerBgColor: "rgba(255, 255, 255, 0.7)",
    mainTextColor: "#000000",
    accentColor: "#9090c296",
    notActive: "rgba(187, 3, 49, 0.5)",
    active: "rgba(44, 160, 49, 0.8)",
    timerColor: "rgba(180, 180, 180, 0.5)",
  },
  fontSizes: [12, 14, 16, 20, 24, 32, 48, 64],
  space: [0, 4, 8, 16, 32, 64, 128, 256, 512],
  sizes: {},
  fontWeights: {
    body: 400,
    heading: 700,
    bold: 700,
  },
  lineHeights: {
    body: 1.5,
    heading: 1.125,
  },
  letterSpacings: {
    body: "normal",
    caps: "0.2em",
  },
  borders: {
    baseBorder: "12px",
    dropDownBorder: "1px solid rgb(38, 57, 77);",
  },
  shadows: {
    profileShadow: "rgb(38, 57, 77) 0px 20px 30px -10px",
  },
  flexCentered: {
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
  },
  components: {
    buttons: {
      mainButton: {
        color: "#000000",
        backgroundColor: "rgba(220, 220, 220, 0.9)",
        fontWeight: "700",
        height: "50px",
        display: "block",
        border: "none",
        padding: "10px 20px",
        borderRadius: "12px",
        cursor: "pointer",
      },
      secondaryButton: {
        color: "#000000",
        backgroundColor: "rgba(180, 180, 180, 0.5)",
        fontWeight: "700",
        height: "50px",
        display: "block",
        border: "none",
        padding: "10px 20px",
        borderRadius: "12px",
        cursor: "pointer",
      },
      iconButton: {
        display: "flex",
        justifyContent: "center",
        width: "50px",
        height: "50px",
        alignItems: "center",
        backgroundColor: "rgba(220, 220, 220, 0.9)",
        border: "none",
        borderRadius: "10px",
        cursor: "pointer",
      },
    },
    activeNavLink: {
      backgroundColor: "rgba(180, 180, 180, 0.5)",
      borderRadius: "12px",
      cursor: "pointer",
    },
  },
};

export const lightMenu = {
  bmBurgerButton: {
    position: "fixed",
    right: "36px",
    width: "20px",
    height: "20px",
    top: "20px",
  },
  bmBurgerBars: {
    background: "#000000",
  },
  bmBurgerBarsHover: {
    background: "#a90000",
  },
  bmCrossButton: {
    height: "24px",
    width: "24px",
  },
  bmCross: {
    background: "#bdc3c7",
  },
  bmMenuWrap: {
    position: "fixed",
    height: "100%",
  },
  bmMenu: {
    background: "rgb(255, 255, 255)",
    padding: "2.5em 1.5em 0",
    fontSize: "1.15em",
  },
  bmMorphShape: {
    fill: "#373a47",
  },
  bmItemList: {
    padding: "0.8em",
  },
  bmItem: {
    display: "inline-block",
  },
  bmOverlay: {
    background: "rgba(0, 0, 0, 0.3)",
  },
};

export const darkMenu = {
  bmBurgerButton: {
    position: "fixed",
    right: "36px",
    width: "20px",
    height: "20px",
    top: "20px",
  },
  bmBurgerBars: {
    background: "#ffffff",
  },
  bmBurgerBarsHover: {
    background: "#a90000",
  },
  bmCrossButton: {
    height: "24px",
    width: "24px",
  },
  bmCross: {
    background: "#bdc3c7",
  },
  bmMenuWrap: {
    position: "fixed",
    height: "100%",
  },
  bmMenu: {
    background: "rgb(32, 32, 35)",
    padding: "2.5em 1.5em 0",
    fontSize: "1.15em",
  },
  bmMorphShape: {
    fill: "#373a47",
  },
  bmItemList: {
    padding: "0.8em",
  },
  bmItem: {
    display: "inline-block",
  },
  bmOverlay: {
    background: "rgba(0, 0, 0, 0.3)",
  },
};
