import { component } from 'omniscient-tools'
import immutable from 'immutable'
import { generateParts, getDomMsg } from '../common/drawing'
import evalStuff from '../common/eval-stuff'

import PictureStore from '../pictures/store'

var startx = null
var starty

export default component('BigPicture', function ({
  mode,
  steps,
  selectedStep,
  bigPictureStuff,
  pictureData,
  selectedPicture
}) {
  function mouseDown (e) {
    startx = e.nativeEvent.offsetX
    starty = e.nativeEvent.offsetY
  }

  function mouseMove (e) {
    if (startx === null) return
    var endx = e.nativeEvent.offsetX
    var endy = e.nativeEvent.offsetY
    if (mode === 'circle') {
      var dist = distance(startx, starty, endx, endy)
      setPreview('circle', { type: 'circle', x1: startx, y1: starty, r: dist })
    } else if (mode === 'rect') {
      setPreview('rect', {
        type: 'rect',
        x1: startx,
        y1: starty,
        x2: endx,
        y2: endy
      })
    } else if (mode === 'line') {
      setPreview('line', {
        type: 'line',
        x1: startx,
        y1: starty,
        x2: endx,
        y2: endy
      })
    }
  }

  function mouseUp (e) {
    var endx = e.nativeEvent.offsetX
    var endy = e.nativeEvent.offsetY
    if (mode === 'circle') {
      var dist = distance(startx, starty, endx, endy)
      removePreview('circle')
      addStep({ type: 'circle', x1: startx, y1: starty, r: dist })
    } else if (mode === 'rect') {
      removePreview('rect')
      addStep({ type: 'rect', x1: startx, y1: starty, x2: endx, y2: endy })
    } else if (mode === 'line') {
      removePreview('line')
      addStep({ type: 'line', x1: startx, y1: starty, x2: endx, y2: endy })
    } else if (mode === 'text') {
      addStep({ type: 'text', x1: endx, y1: endy })
    }
    startx = null
  }

  function distance (x, y, x2, y2) {
    return Math.sqrt(Math.pow(x2 - x, 2) + Math.pow(y2 - y, 2))
  }

  function addStep (step) {
    for (var key in step) {
      if (key !== 'type') {
        step[key] = { value: step[key] }
      }
    }
    steps.update(oldSteps => {
      return oldSteps.push(immutable.fromJS(step))
    })
    selectedStep.update('current', () => steps.size)
    PictureStore.updatePicture(selectedPicture.get('current'))
  }

  function setPreview (key, preview) {
    for (var _key in preview) {
      if (_key !== 'type') {
        preview[_key] = { evaluated: preview[_key] }
      }
    }
    bigPictureStuff.get('previews').update(key, () => immutable.fromJS(preview))
  }

  function removePreview (key) {
    bigPictureStuff.get('previews').remove(key)
  }

  var svgParts = generateParts(steps.slice(0, selectedStep.get('current') + 1))
  var previewParts = generateParts(bigPictureStuff.get('previews'))

  var step = steps.get(selectedStep.get('current'))

  return (
    <div id='bigPicture'>
      <div style={{ textAlign: 'center', height: 18 }}>
        {getDomMsg(step, pictureData, selectedPicture.get('current'))}
      </div>
      <div id='picture-box' className='picture --big'>
        <svg
          width={720}
          height={900}
          onMouseDown={mouseDown}
          onMouseUp={mouseUp}
          onMouseMove={mouseMove}
        >
          {svgParts}
          {previewParts}
        </svg>
      </div>
    </div>
  )
})
