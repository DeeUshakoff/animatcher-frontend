module.exports = {
  presets: ['module:@react-native/babel-preset'],
  plugins: [
    [
      'module-resolver',
      {
        root: ['./app'],
        alias: {
          '@': './app',
          '@components': './app/components',
          '@screens': './app/screens',
          '@navigation': './app/navigation',
          '@theme': './app/theme',
          '@assets': './app/assets',
        },
      },
    ],
  ],
};
