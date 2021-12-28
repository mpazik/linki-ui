module.exports = {
  "stories": [
    "../examples/*.ts"
  ],
  "addons": [
    {
      name: "storybook-addon-turbo-build",
      options: {
        optimizationLevel: 3,
      },
    },
  ],
  "framework": "linki-ui-storybook"
}
