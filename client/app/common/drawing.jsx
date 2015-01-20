function generateParts(steps, proportion=1, fontSize=16) {
  return steps.map((s) => {
    switch (s.get('type')) {
      case 'circle':
        return <circle cx={proportion*s.get('x1')} cy={proportion*s.get('y1')} r={proportion*s.get('r')} fill="#cacaca"/>
      case 'rect':
        var x = Math.min(s.get('x1'), s.get('x2'));
        var y = Math.min(s.get('y1'), s.get('y2'));
        var w = Math.abs(s.get('x1') - s.get('x2'));
        var h = Math.abs(s.get('y1') - s.get('y2'));
        return <rect x={proportion*x} y={proportion*y} width={proportion*w} height={proportion*h} fill="#cacaca"/>
      case 'line':
        return <line x1={proportion*s.get('x1')} y1={proportion*s.get('y1')} x2={proportion*s.get('x2')} y2={proportion*s.get('y2')} stroke="#cacaca"/>
      case 'text':
        return <text fontSize={fontSize} x={proportion*s.get('x1')} y={proportion*s.get('y1')} fill="#cacaca">Hi!</text>
    }
  }).toJS();
}

function getMsg(s) {
  if (!s) return '';
  var x1 = round(s.get('x1'));
  var x2 = round(s.get('x2'));
  var y1 = round(s.get('y1'));
  var y2 = round(s.get('y2'));
  var r = round(s.get('r'));
  switch (s.get('type')) {
    case 'circle': return `Draw circle around ( ${x1} , ${y1} ), ${r} px in radius.`;
    case 'rect': return `Draw rect from ( ${x1} , ${y1} ), ${x2 - x1} px horizontally, ${y2 - y1} px vertically.`;
    case 'line': return `Draw line from ( ${x1} , ${y1} ), ${x2 - x1} px horizontally, ${y2 - y1} px vertically.`;
    case 'text': return `Draw text at ( ${x1} , ${y1} )`;
  }
  return '';
}

function round(num, mult=10) {
  return Math.floor(num * mult) / mult;
}

module.exports = {
  generateParts,
  getMsg
};
