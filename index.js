const Mqtt = require('mqtt')
const log = require('yalm')
const pkg = require('./package.json')
const config = require('./config.js')

log.setLevel(config.verbosity)
log.info(pkg.name + ' ' + pkg.version + ' starting')

let mqttConnected;

log.info('mqtt trying to connect', config.mqttUrl);

const mqtt = Mqtt.connect(config.mqttUrl, {
    clientId: 'ClearRetained_' + Math.random().toString(16).substr(2, 8),
    rejectUnauthorized: !config.insecure
});

mqtt.on('connect', () => {
    mqttConnected = true;
    log.info('mqtt connected', config.mqttUrl);
    log.info('mqtt subscribing to', config.filter);
    mqtt.subscribe(config.filter);
});

mqtt.on('close', () => {
    if (mqttConnected) {
        mqttConnected = false;
        log.error('mqtt closed ' + config.mqttUrl);
    }
});

mqtt.on('error', err => {
    log.error('mqtt', err);
});

mqtt.on('close', () => {
    log.warn('mqtt close');
});

mqtt.on('offline', () => {
    log.warn('mqtt offline');
});

mqtt.on('reconnect', () => {
    log.info('mqtt reconnect');
});

mqtt.on('message', (topic, payload) => {
    log.debug('mqtt <', topic, payload);
    if (payload)
        if (payload != '')
            mqtt.publish(topic, null, { retain: true });
});
