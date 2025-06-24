import {
    DarkTheme as NavigationDarkTheme,
    DefaultTheme as NavigationDefaultTheme
} from '@react-navigation/native';
import {
    configureFonts,
    MD3Theme,
    MD3DarkTheme as PaperDarkTheme,
    MD3LightTheme as PaperDefaultTheme
} from 'react-native-paper';

export const CustomLightTheme: MD3Theme = {
    ...PaperDefaultTheme,
    ...NavigationDefaultTheme,
    dark: false,
    roundness: 4,
    version: 3,
    isV3: true,
    colors: {
        ...PaperDefaultTheme.colors,
        ...NavigationDefaultTheme.colors,
        "primary": "rgb(56, 107, 1)",
        "onPrimary": "rgb(255, 255, 255)",
        "primaryContainer": "rgb(183, 244, 129)",
        "onPrimaryContainer": "rgb(13, 32, 0)",
        "secondary": "rgb(186, 26, 32)",
        "onSecondary": "rgb(255, 255, 255)",
        "secondaryContainer": "rgb(255, 218, 214)",
        "onSecondaryContainer": "rgb(65, 0, 3)",
        "tertiary": "rgb(0, 104, 116)",
        "onTertiary": "rgb(255, 255, 255)",
        "tertiaryContainer": "rgb(151, 240, 255)",
        "onTertiaryContainer": "rgb(0, 31, 36)",
        "error": "rgb(186, 26, 26)",
        "onError": "rgb(255, 255, 255)",
        "errorContainer": "rgb(255, 218, 214)",
        "onErrorContainer": "rgb(65, 0, 2)",
        "background": "rgb(253, 253, 245)",
        "onBackground": "rgb(26, 28, 24)",
        "surface": "rgb(253, 253, 245)",
        "onSurface": "rgb(26, 28, 24)",
        "surfaceVariant": "rgb(224, 228, 214)",
        "onSurfaceVariant": "rgb(68, 72, 62)",
        "outline": "rgb(116, 121, 109)",
        "outlineVariant": "rgb(196, 200, 186)",
        "shadow": "rgb(0, 0, 0)",
        "scrim": "rgb(0, 0, 0)",
        "inverseSurface": "rgb(47, 49, 44)",
        "inverseOnSurface": "rgb(241, 241, 234)",
        "inversePrimary": "rgb(156, 215, 105)",
        "elevation": {
            "level0": "transparent",
            "level1": "rgb(243, 246, 233)",
            "level2": "rgb(237, 241, 226)",
            "level3": "rgb(231, 237, 218)",
            "level4": "rgb(229, 236, 216)",
            "level5": "rgb(225, 233, 211)"
        },
        "surfaceDisabled": "rgba(26, 28, 24, 0.12)",
        "onSurfaceDisabled": "rgba(26, 28, 24, 0.38)",
        "backdrop": "rgba(45, 50, 40, 0.4)"
    },
    fonts: configureFonts(),
    animation: {
        scale: 1.0,
    },
};

export const CustomdDarkTheme: MD3Theme = {
    ...PaperDarkTheme,
    ...NavigationDarkTheme,
    dark: true,
    roundness: 4,
    version: 3,
    isV3: true,
    colors: {
        ...PaperDarkTheme.colors,
        ...NavigationDarkTheme.colors,
        primary: 'rgb(255, 183, 134)',
        // ... etc.
    },
    fonts: configureFonts(),
    animation: {
        scale: 1.0,
    },
};