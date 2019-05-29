<?php
/**
 * General Configuration
 *
 * All of your system's general configuration settings go in here. You can see a
 * list of the available settings in vendor/craftcms/cms/src/config/GeneralConfig.php.
 *
 * @see craft\config\GeneralConfig
 */

return [
    // Global settings
    '*' => [
        // Default Week Start Day (0 = Sunday, 1 = Monday...)
        'defaultWeekStartDay' => 0,

        // Enable CSRF Protection (recommended)
        'enableCsrfProtection' => true,

        // Whether generated URLs should omit "index.php"
        'omitScriptNameInUrls' => true,

        // Control Panel trigger word
        'cpTrigger' => 'admin',

        // The secure key Craft will use for hashing and encrypting data
        'securityKey' => getenv('SECURITY_KEY'),
        // custom aliases
        'aliases' => [
            '@assetBasePath' => getenv('ASSET_BASE_PATH'),
            '@assetBaseUrl' => getenv('ASSET_BASE_URL'),
            '@mediaBasePath' => getenv('MEDIA_BASE_PATH'),
            '@mediaBaseUrl' => getenv('MEDIA_BASE_URL'),
        ],
    ],

    // Dev environment settings
    'dev' => [
        // Base site URL
        'siteUrl' => '',

        // Dev Mode (see https://craftcms.com/support/dev-mode)
        'devMode' => true,
    ],

    // Staging environment settings
    'demo' => [
        // Base site URL
        'siteUrl' => '',
    ],

    // Staging environment settings
    'staging' => [
        // Base site URL
        'siteUrl' => '',
    ],

    // Production environment settings
    'production' => [
        // Base site URL
        'siteUrl' => '',
    ],
];
