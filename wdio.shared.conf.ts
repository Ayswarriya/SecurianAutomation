import url from 'node:url'
import path from 'node:path'

const __dirname = url.fileURLToPath(new URL('.', import.meta.url))

export const config: Omit<WebdriverIO.Config, 'capabilities'> = {
    runner: 'local',

    specs: [
        './test/specs/**/*.ts'
    ],
    exclude: [
    ],
   
    maxInstances: 10,
   
    logLevel: 'trace',
    outputDir: path.resolve(__dirname, 'logs'),
    
    bail: 0,
    
    baseUrl: 'http://the-internet.herokuapp.com',
    
    waitforTimeout: 10000,
    
    connectionRetryTimeout: 90000,
    
    connectionRetryCount: 3,
    
    framework: 'jasmine',
    
    reporters: ['spec'],
    
    jasmineOpts: {
        defaultTimeoutInterval: 60000,
    }
    }
