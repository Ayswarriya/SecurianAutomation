import type { Options } from '@wdio/types'
export const config: Options.Testrunner = {
    
    runner: 'local',
    autoCompileOpts: {
        autoCompile: true,
        tsNodeOpts: {
            project: './test/tsconfig.json',
            transpileOnly: true
        }
    },
    
    specs: [
        './test/specs/**/form.spec.ts'
    ],
    exclude: [
        // 'path/to/excluded/files'
    ],
   
    maxInstances: 10,
   
    capabilities: [{
        browserName: 'chrome' // or "firefox", "microsoftedge", "safari"
    }],

    logLevel: 'info',
    
    bail: 0,
    
    baseUrl: 'http://localhost',
    
    waitforTimeout: 100000,
    
    connectionRetryTimeout: 120000,
  
    connectionRetryCount: 3,
   
    services: ['chromedriver'],

    framework: 'mocha',
    
    reporters: ['spec',
    ['allure', {
        outputDir: 'allure-results',
        disableWebdriverStepsReporting: true,
        disableWebdriverScreenshotsReporting: true,
    }]],

    mochaOpts: {
        ui: 'bdd',
        timeout: 600000
    },
   
}
