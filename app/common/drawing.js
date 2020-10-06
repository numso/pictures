import ScalarVal from '../data/scalar-val'

function generateParts (steps, proportion = 1, fontSize = 16) {
  return steps
    .map(s => {
      switch (s.get('type')) {
        case 'circle':
          return (
            <circle
              cx={proportion * s.getIn(['x1', 'evaluated'])}
              cy={proportion * s.getIn(['y1', 'evaluated'])}
              r={proportion * s.getIn(['r', 'evaluated'])}
              fill='#cacaca'
            />
          )
        case 'rect':
          var x = Math.min(
            s.getIn(['x1', 'evaluated']),
            s.getIn(['x2', 'evaluated'])
          )
          var y = Math.min(
            s.getIn(['y1', 'evaluated']),
            s.getIn(['y2', 'evaluated'])
          )
          var w = Math.abs(
            s.getIn(['x1', 'evaluated']) - s.getIn(['x2', 'evaluated'])
          )
          var h = Math.abs(
            s.getIn(['y1', 'evaluated']) - s.getIn(['y2', 'evaluated'])
          )
          return (
            <rect
              x={proportion * x}
              y={proportion * y}
              width={proportion * w}
              height={proportion * h}
              fill='#cacaca'
            />
          )
        case 'line':
          return (
            <line
              x1={proportion * s.getIn(['x1', 'evaluated'])}
              y1={proportion * s.getIn(['y1', 'evaluated'])}
              x2={proportion * s.getIn(['x2', 'evaluated'])}
              y2={proportion * s.getIn(['y2', 'evaluated'])}
              stroke='#cacaca'
            />
          )
        case 'text':
          return (
            <text
              fontSize={fontSize}
              x={proportion * s.getIn(['x1', 'evaluated'])}
              y={proportion * s.getIn(['y1', 'evaluated'])}
              fill='#cacaca'
            >
              Hi!
            </text>
          )
      }
    })
    .toJS()
}

function getMsg (val, s) {
  if (!s) return ''
  var x1 = s.get('x1')
  var x2 = s.get('x2')
  var y1 = s.get('y1')
  var y2 = s.get('y2')
  var r = s.get('r')
  switch (s.get('type')) {
    case 'circle':
      return (
        <span>
          Draw circle around ( {val(x1)} , {val(y1)} ), {val(r)} px in radius.
        </span>
      )
    case 'rect':
      return (
        <span>
          Draw rect from ( {val(x1)} , {val(y1)} ), {getVal(x2) - getVal(x1)} px
          horizontally, {getVal(y2) - getVal(y1)} px vertically.
        </span>
      )
    case 'line':
      return (
        <span>
          Draw line from ( {val(x1)} , {val(y1)} ), {getVal(x2) - getVal(x1)} px
          horizontally, {getVal(y2) - getVal(y1)} px vertically.
        </span>
      )
    case 'text':
      return (
        <span>
          Draw text at ( {val(x1)} , {val(y1)} )
        </span>
      )
  }
  return ''
}

function getVal (numCursor) {
  return round(numCursor.get('evaluated'))
}

function getDom (pictureData, picID) {
  return numCursor => {
    return (
      <ScalarVal pictureData={pictureData} picID={picID} item={numCursor} />
    )
  }
}

function round (num, mult = 10) {
  return Math.floor(num * mult) / mult
}

export default {
  generateParts,
  getMsg: function (s) {
    return getMsg(getVal, s)
  },
  getDomMsg: function (s, pictureData, picID) {
    return getMsg(getDom(pictureData, picID), s)
  }
}
