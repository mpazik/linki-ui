module.exports = {
  "stories": [
    "../src/**/*.stories.mdx",
    "../src/stories/*.ts"
  ],
  "addons": [
    {
      name: "storybook-addon-turbo-build",
      options: {
        optimizationLevel: 3,
      },
    },
  ],
  "framework": "@storybook/html"
}
