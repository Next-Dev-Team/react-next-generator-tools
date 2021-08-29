import AntdDayjsWebpackPlugin from 'antd-dayjs-webpack-plugin';
import { defineConfig } from 'umi';
import routeConfig from './routeConfig';

export default defineConfig({
  routes: routeConfig,
  mfsu: {},
  dynamicImport: {
    loading: '@ant-design/pro-layout/es/PageLoading',
  },
  esbuild: {},
  nodeModulesTransform: {
    type: 'none',
  },
  chainWebpack(config) {
    config.plugin('dayjs').use(AntdDayjsWebpackPlugin);
    return config;
  },
});
