<a name="module_ConfigService"></a>

## ConfigService
NodeJS Config Service.Simplified config management for node applications. ConfigService accepts a configuration object of properties to be defined using the node process env and run time overrides.


* [ConfigService](#module_ConfigService)
    * [.ConfigService#version](#module_ConfigService.ConfigService+version)
    * [.ConfigService#ConfigService](#module_ConfigService.ConfigService+ConfigService)
    * [.ConfigService#errors](#module_ConfigService.ConfigService+errors)
    * [.configService](#module_ConfigService.configService) : <code>ConfigService</code>
    * ["loadEnv"](#module_ConfigService.event_loadEnv)

<a name="module_ConfigService.ConfigService+version"></a>

### ConfigService.ConfigService#version
The ConfigService version#### Example:    console.log(configService.version); // '1.x.x'

**Kind**: static property of [<code>ConfigService</code>](#module_ConfigService)  
**Api**: public  
**Properties**

| Name |
| --- |
| version | 

<a name="module_ConfigService.ConfigService+ConfigService"></a>

### ConfigService.ConfigService#ConfigService
The ConfigService constructorThe exports of the configService module is an instance of this class.#### Example:    const appConfig = require('configService');    const moduleConfig = new configService.ConfigService();

**Kind**: static property of [<code>ConfigService</code>](#module_ConfigService)  
**Access**: public  
**Properties**

| Name |
| --- |
| ConfigService | 

<a name="module_ConfigService.ConfigService+errors"></a>

### ConfigService.ConfigService#errors
Key and class object map of custom error methods.

**Kind**: static property of [<code>ConfigService</code>](#module_ConfigService)  
**Access**: public  
**Properties**

| Name | Type | Description |
| --- | --- | --- |
| errors | <code>Object</code> | Key and class object map of custom error methods. |

<a name="module_ConfigService.configService"></a>

### ConfigService.configService : <code>ConfigService</code>
The exports object is an instance of ConfigService.

**Kind**: static constant of [<code>ConfigService</code>](#module_ConfigService)  
**Access**: public  
<a name="module_ConfigService.event_loadEnv"></a>

### "loadEnv"
Load environment variables into process.env using [dotenv](https://www.npmjs.com/package/dotenv).NOTE: Should be placed as early as possible on startup.

**Kind**: event emitted by [<code>ConfigService</code>](#module_ConfigService)  
