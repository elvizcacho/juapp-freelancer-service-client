import * as YAML from 'yamljs';
import * as semver from 'semver';
import packageJSON from './package.json';
import * as fs from 'fs';

const currentSchema = YAML.load('./src/schema.yaml');
const newSchema = YAML.load('./service/src/documentation/build/openapi.yaml');

const currentVersion = currentSchema.info.version;
const newVersion = newSchema.info.version;

if (!semver.gt(newVersion, currentVersion)) {
  console.log('New version is not greater than current version');
  process.exit(1);
}

console.log(`Publish new version: ${newVersion}`);
packageJSON.version = newVersion;
fs.writeFileSync('./package.json', JSON.stringify(packageJSON, null, 2));
process.exit(0);
