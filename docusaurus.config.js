// @ts-check
// Note: type annotations allow type checking and IDEs autocompletion

const {DOCUSAURUS_VERSION} = require("@docusaurus/utils");
const fs = require("fs");
const path = require('path');

const openApiDocsRoot = 'docs/apis';

function writeLabelFile(dirPath, label, collapsed) {
    if (!fs.existsSync(dirPath)) {
        fs.mkdirSync(dirPath, {recursive: true});
    }

    fs.writeFileSync(path.join(dirPath, '_category_.json'), JSON.stringify({
        label: label,
        collapsed: collapsed
    }));
}

function generateDocusaurusOpenApiConfig() {
    const allSpecifications = JSON.parse(fs.readFileSync("specifications.json", "utf-8"));

    const openApiConfig = {};

    allSpecifications.organizations.forEach(org => {
        const orgId = org.id;
        const orgLabel = org.label;
        const organizationDir = path.join(openApiDocsRoot, orgId);

        writeLabelFile(organizationDir, orgLabel, false);
        org.specifications.forEach(spec => {
            const specId = spec.id;
            const specLabel = spec.label;

            const outputDir = path.join(organizationDir, specId);
            const specPath = `https://raw.githubusercontent.com/ivpk/api-specifications/main/openapi/${orgId}_${specId}.json`;
            const downloadUrl = spec.url;

            writeLabelFile(outputDir, specLabel, true);

            openApiConfig[specId] = {specPath, downloadUrl, outputDir};
        });
    });

    return openApiConfig;
}


/** @type {import('@docusaurus/types').Config} */
const config = {
    title: "Valstybės API katalogas",
    tagline: "Valstybės informacinių sistemų ir registrų API sąsajų katalogas",
    url: "https://api.gov.lt",
    baseUrl: "/",
    onBrokenLinks: "warn",
    onBrokenMarkdownLinks: "warn",
    favicon: "img/favicon.ico",
    organizationName: "ivpk",
    projectName: "public-api-catalog",
    trailingSlash: true,

    presets: [
        [
            "classic",
            /** @type {import('@docusaurus/preset-classic').Options} */
            ({
                docs: {
                    routeBasePath: "/",
                    sidebarPath: require.resolve("./sidebars.js"),
                    editUrl:
                        "https://github.com/ivpk/public-api-catalog/tree/main",
                    docLayoutComponent: "@theme/DocPage",
                    docItemComponent: "@theme/ApiItem", // Derived from docusaurus-theme-openapi
                },
                blog: false,
                theme: {
                    customCss: require.resolve("./src/css/custom.css"),
                },
                gtag: {
                    trackingID: 'G-JQZGEQZ25X',
                    anonymizeIP: true,
                },
            }),
        ],
    ],

    themeConfig:
    /** @type {import('@docusaurus/preset-classic').ThemeConfig} */
        ({
            docs: {
                sidebar: {
                    hideable: true,
                },
            },
            navbar: {
                title: "Valstybės API katalogas",
                logo: {
                    alt: "Keytar",
                    src: "img/ivpk-logo.png",
                },
                items: [
                    {
                        type: "doc",
                        docId: "intro",
                        position: "left",
                        label: "Apie projektą",
                    },
                    {
                        type: "doc",
                        docId: "udts/intro",
                        position: "left",
                        label: "UDTS sąsajos",
                    },
                    {
                        href: "https://github.com/ivpk/public-api-catalog",
                        position: "right",
                        className: "header-github-link",
                        "aria-label": "GitHub repository",
                    },
                ],
            },
            footer: {
                style: "dark",
                links: [
                    {
                        title: "Docs",
                        items: [
                            {
                                label: "OpenAPI Docs",
                                to: "/",
                            },
                        ],
                    },
                    {
                        title: "Community",
                        items: [
                            {
                                label: "Stack Overflow",
                                href: "https://stackoverflow.com/questions/tagged/docusaurus",
                            },
                            {
                                label: "Discord",
                                href: "https://discordapp.com/invite/docusaurus",
                            },
                            {
                                label: "Twitter",
                                href: "https://twitter.com/docusaurus",
                            },
                        ],
                    },
                    {
                        title: "More",
                        items: [
                            {
                                label: "Blog",
                                href: "https://medium.com/palo-alto-networks-developer-blog",
                            },
                            {
                                label: "GitHub",
                                href: "https://github.com/PaloAltoNetworks/docusaurus-openapi-docs",
                            },
                        ],
                    },
                ],
                copyright: `Copyright © ${new Date().getFullYear()} Informacinės visuomenės plėtros komitetas.`,
            },
            prism: {
                additionalLanguages: ["ruby", "csharp", "php", "java"],
            },
            languageTabs: [
                {
                    highlight: "bash",
                    language: "curl",
                    logoClass: "bash",
                },
                {
                    highlight: "python",
                    language: "python",
                    logoClass: "python",
                    variant: "http.client",
                },
                {
                    highlight: "go",
                    language: "go",
                    logoClass: "go",
                },
                {
                    highlight: "javascript",
                    language: "nodejs",
                    logoClass: "nodejs",
                    variant: "axios",
                },
                // {
                //   highlight: "ruby",
                //   language: "ruby",
                //   logoClass: "ruby",
                // },
                {
                    highlight: "csharp",
                    language: "csharp",
                    logoClass: "csharp",
                    variant: "httpclient",
                },
                // {
                //   highlight: "php",
                //   language: "php",
                //   logoClass: "php",
                // },
                {
                    highlight: "java",
                    language: "java",
                    logoClass: "java",
                    variant: "unirest",
                },
            ],
            algolia: {
                apiKey: "59c25e11bff46edad859688ebeaf5ac1",
                appId: "MSY41BB1TD",
                indexName: "api-catalog",
            },
        }),

    plugins: [
        [
            "docusaurus-plugin-openapi-docs",
            {
                id: "openapi",
                docsPluginId: "classic",
                config: generateDocusaurusOpenApiConfig(),
            },
        ],
        [
            "@docusaurus/plugin-pwa",
            {
                debug: true,
                offlineModeActivationStrategies: [
                    "appInstalled",
                    "standalone",
                    "queryString",
                ],
                pwaHead: [
                    {
                        tagName: "link",
                        rel: "icon",
                        href: "/img/ivpk-logo.png",
                    },
                    {
                        tagName: "link",
                        rel: "manifest",
                        href: "/manifest.json",
                    },
                    {
                        tagName: "meta",
                        name: "theme-color",
                        content: "rgb(255, 255, 255)",
                    },
                ],
            },
        ],
    ],
    themes: ["docusaurus-theme-openapi-docs"],
    stylesheets: [
        {
            href: "https://use.fontawesome.com/releases/v5.11.0/css/all.css",
            type: "text/css",
        },
    ],
};

async function createConfig() {
    const lightTheme = (await import("./src/utils/prismLight.mjs")).default;
    const darkTheme = (await import("./src/utils/prismDark.mjs")).default;
    // @ts-expect-error: we know it exists, right
    config.themeConfig.prism.theme = lightTheme;
    // @ts-expect-error: we know it exists, right
    config.themeConfig.prism.darkTheme = darkTheme;
    return config;
}

module.exports = createConfig;
