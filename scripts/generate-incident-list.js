const fs = require('fs');
const path = require('path');

const incidentsPath = path.join(__dirname, '..', 'content', 'incidents');
const files = fs.readdirSync(incidentsPath);
const list = files.filter(f => f.endsWith('.mdx'));

const output = `export const incidentList = ${JSON.stringify(list, null, 2)};`;

fs.writeFileSync(path.join(__dirname, '..', 'src', 'lib', 'incident-list.ts'), output);