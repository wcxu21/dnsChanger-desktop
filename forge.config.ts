import type { ForgeConfig } from '@electron-forge/shared-types';
import { MakerSquirrel } from '@electron-forge/maker-squirrel';
import { MakerDeb } from '@electron-forge/maker-deb';
import { MakerRpm } from '@electron-forge/maker-rpm';
import { WebpackPlugin } from '@electron-forge/plugin-webpack';

import { mainConfig } from './_config/webpack.main.config';
import { rendererConfig } from './_config/webpack.renderer.config';
import dotenv from "dotenv"

dotenv.config()
const config: ForgeConfig = {
    packagerConfig: {
        win32metadata: {
            "requested-execution-level": "requireAdministrator",
            OriginalFilename: "dnsChanger"
        },
        name: "dnsChanger",
        icon: './assets/icon'
    },
    rebuildConfig: {},
    makers: [
        new MakerSquirrel({
            // ...
        }),
        new MakerDeb({}),
        new MakerRpm({})
    ],
    plugins: [
        new WebpackPlugin({
            mainConfig,
            devContentSecurityPolicy: "connect-src 'self' * 'unsafe-eval'",
            renderer: {
                config: rendererConfig,
                entryPoints: [
                    {
                        html: './src/renderer/index.html',
                        js: './src/renderer.ts',
                        name: 'main_window',
                        preload: {
                            js: './src/preload.ts',
                        },
                    },
                ],
            },
        }),
    ],
    publishers: [
        {
            name: '@electron-forge/publisher-github',
            config: {
                repository: {
                    owner: 'DnsChanger',
                    name: 'dnsChanger-desktop',
                    authToken: process.env.GITHUB_TOKEN,
                },
                prerelease: false,
                draft: true,
                tagPrefix: "v"
            }
        }
    ]
};

export default config;
