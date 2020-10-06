import { component } from 'omniscient-tools'
import ContentEditable from '../common/content-editable'
import { generateParts } from '../common/drawing'

export default component('Picture', function ({
  picture,
  selectedPicture,
  index
}) {
  var title = picture.get('title')

  function onMouseUp () {
    title.update('editing', () => title.get('current'))
  }

  function onChange (_title) {
    title.update('current', () => _title)
  }

  function onFinish (_title) {
    title.update('current', () => _title)
    title.remove('editing')
  }

  function selectPicture () {
    selectedPicture.update('current', () => index)
  }

  function isSelected () {
    return selectedPicture.get('current') === index
  }

  var classes = isSelected() ? 'picture --selected' : 'picture'

  return (
    <div>
      <div className={classes} onClick={selectPicture}>
        <svg width={220}>{generateParts(picture.get('steps'), 1 / 6, 5)}</svg>
      </div>
      <div style={{ textAlign: 'center', marginBottom: 15 }}>
        {title.get('editing') ? (
          <ContentEditable
            text={title.get('editing')}
            onChange={onChange}
            onFinish={onFinish}
          />
        ) : (
          <div onMouseUp={onMouseUp}>{title.get('current')}</div>
        )}
      </div>
    </div>
  )
})
