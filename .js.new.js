module.exports = config => {
  return {
    ...config,
    template: 'react',
    outputDir: '.dist',
    ignore: /^\.|\.md$/,
    skipTransform: /\.html$|\.toml$/
  }
}
