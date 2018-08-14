const pkg = require('./package.json');

module.exports = require('yargs')
    .usage(pkg.name + ' ' + pkg.version + '\n' + pkg.description + '\n\nUsage: $0 [options]')
    .describe('mqtt-url', 'mqtt broker url. See https://github.com/mqttjs/MQTT.js#connect-using-a-url')
    .describe('insecure', 'allow tls connections with invalid certificates')
    .describe('filter', 'topic filter')
    .describe('verbosity', 'possible values: "error", "warn", "info", "debug"')
    .describe('help', 'show help')
    .boolean('insecure')
    .alias({
        m: 'mqtt-url',
        f: 'filter',
        v: 'verbosity',
        h: 'help'
    })
    .default({
        'mqtt-url': 'mqtt://127.0.0.1',
        'insecure': false,
        verbosity: 'info'
    })
    .demandOption([
        'filter'
    ])
    .version()
    .help('help')
    .argv;