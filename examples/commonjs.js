console.info('Testing `node-config-service` in commonjs imports.');

try {
    const nodeConfigService = require('../dist/node-config-service.min.js');
    console.debug(nodeConfigService);

    if (!nodeConfigService) throw new ReferenceError('`node-config-service` was not imported.');


    const { ConfigService } = nodeConfigService;
    console.debug(ConfigService);

    if (!ConfigService)
        throw new ReferenceError('`ConfigService` was not correctly assigned to the imports.');


    const config = new ConfigService();
    console.debug(config);

    if (!config) throw new ReferenceError('`ConfigService` failed to be instantiated.');

    config.init();

    const env = config.get('environment');
    console.info(env);
    if (!env) throw new ReferenceError(`Could not get environment value from config.`);

    console.info(`environment:${env}`);
    console.info('`node-config-service` commonjs import success');
} catch (error) {
    console.error(error);
}
