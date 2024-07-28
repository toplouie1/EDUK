// frontend/craco.config.js
const CssMinimizerPlugin = require("css-minimizer-webpack-plugin");

module.exports = {
	webpack: {
		configure: (webpackConfig) => {
			if (webpackConfig.optimization && webpackConfig.optimization.minimizer) {
				webpackConfig.optimization.minimizer =
					webpackConfig.optimization.minimizer.map((plugin) => {
						if (plugin.constructor.name === "CssMinimizerPlugin") {
							return new CssMinimizerPlugin({
								minimizerOptions: {
									preset: [
										"default",
										{
											discardComments: { removeAll: true },
											// Additional options can be added here if necessary
										},
									],
								},
							});
						}
						return plugin;
					});
			}
			return webpackConfig;
		},
	},
};
