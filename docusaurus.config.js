// @ts-check
// Note: type annotations allow type checking and IDEs autocompletion

const {DOCUSAURUS_VERSION} = require("@docusaurus/utils");

/** @type {import('@docusaurus/types').Config} */
const config = {
    title: "Valstybės informacinių sistemų API katalogas",
    tagline: "Valstybės informacinių sistemų ir registrų API sąsajų katalogas",
    url: "https://api.gov.lt",
    baseUrl: "/public-api-catalog/",
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
                title: "Valstybės informacinių sistemų API sąsajų katalogas",
                logo: {
                    alt: "Keytar",
                    src: "img/docusaurus-openapi-docs-logo.svg",
                },
                items: [
                    {
                        type: "doc",
                        docId: "intro",
                        position: "left",
                        label: "Katalogas",
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
                copyright: `Copyright © ${new Date().getFullYear()} Palo Alto Networks, Inc. Built with Docusaurus ${DOCUSAURUS_VERSION}.`,
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
                config: {
                    petstore_versioned: {
                        specPath: "examples/petstore.yaml",
                        outputDir: "docs/apis/am/petstore_versioned", // No trailing slash
                        sidebarOptions: {
                            groupPathsBy: "tag",
                            categoryLinkSource: "tag",
                        },
                        version: "2.0.0", // Current version
                        label: "v2.0.0", // Current version label
                        baseUrl: "/petstore_versioned/swagger-petstore-yaml", // Leading slash is important
                        versions: {
                            "1.0.0": {
                                specPath: "examples/petstore-1.0.0.yaml",
                                outputDir: "docs/apis/am/petstore_versioned/1.0.0", // No trailing slash
                                label: "v1.0.0",
                                baseUrl: "/petstore_versioned/1.0.0/swagger-petstore-yaml", // Leading slash is important
                            },
                        },
                    },
                    petstore: {
                        specPath: "examples/petstore.yaml",
                        outputDir: "docs/apis/sumin/petstore",
                        downloadUrl:
                            "https://raw.githubusercontent.com/PaloAltoNetworks/docusaurus-openapi-docs/main/demo/examples/petstore.yaml",

                    },
                    infostatyba: {
                        specPath: "https://statau.eptptest.lt/eInfostatyba-ws-app/v2/api-docs?group=Universali_integracija",
                        outputDir: "docs/apis/am/infostatyba",

                    },
                    iprws: {
                        // specPath: "https://iprws.esveikata.lt/rest/ipr-docs",
                        specPath: "specs/iprws.json",
                        outputDir: "docs/apis/sam/iprws",
                    },
                    gitlab: {
                        specPath: "https://gitlab.com/gitlab-org/gitlab/-/raw/master/doc/api/openapi/openapi.yaml",
                        downloadUrl: "https://gitlab.com/gitlab-org/gitlab/-/raw/master/doc/api/openapi/openapi.yaml",
                        outputDir: "docs/apis/sumin/gitlab",
                    },
                    cos: {
                        specPath: "examples/openapi-cos.json",
                        outputDir: "docs/apis/zum/cos",
                    },
                    burgers: {
                        specPath: "examples/food/burgers/openapi.yaml",
                        outputDir: "docs/apis/zum/burgers",
                    },
                    yogurt: {
                        specPath: "examples/food/yogurtstore/openapi.yaml",
                        outputDir: "docs/apis/zum/yogurtstore",
                    },
                },
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
                        href: "/img/docusaurus-openapi-docs-logo.svg",
                    },
                    {
                        tagName: "link",
                        rel: "manifest",
                        href: "/manifest.json", // your PWA manifest
                    },
                    {
                        tagName: "meta",
                        name: "theme-color",
                        content: "rgb(37, 194, 160)",
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
