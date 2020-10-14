const xx = '  ';
const xxxx = xx + xx;

const cache = {};

const kebab = (camel) => {
  if (camel.toLowerCase() === camel) {
    return camel;
  }

  if (cache[camel] !== undefined) {
    return cache[camel];
  }

  const letters = camel.split('');
  const out = [];
  letters.forEach((x) => {
    if (x.toLowerCase() === x) { // lower
      out.push(x);
    } else { // upper
      out.push('-');
      out.push(x.toLowerCase());
    }
  });
  return out.join('');
};

const httpType = 'get';

function generateFetch(objName, method) {
  const pathVars = method.args.map((arg) => (
    arg !== 'params' ? ` + '/' + ${arg}` : ''
  )).join('');

  let out = '';

  out += `${xx}${kebab(objName)}.${method.name} = function(${method.args.join(', ')}) {\n`;
  out += `${xxxx}const path = '/${kebab(objName)}/${kebab(method.name)}'${pathVars};\n`;
  out += `${xxxx}return axios.${httpType}(path`;
  out += method.args[method.args.length - 1] === 'params' ? ', params' : '';
  out += ');\n';
  out += `${xx}};\n`;

  return out;
}

const out = generateFetch('products', { name: 'update', args: ['id', 'params'] });
// eslint-disable-next-line no-console
console.log(out);

