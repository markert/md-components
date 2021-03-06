
import React from 'react'
import classNames from 'classnames'
import keycode from 'keycode'
import {RadioButtonChecked, RadioButtonUnchecked} from '../icon'

class RadioButton extends React.Component {
  state = {
    kbPressed: false
  }

  setKbPressed = (e) => {
    if (e.which === keycode('space')) {
      e.preventDefault()
      if (this.props.selectedValue !== e.target.value) {
        this.props.onChange(e.target.value)
      }
    }
    if (!this.state.kbPressed) {
      this.setState({kbPressed: e.shiftKey ? 'shift' : true})
    }
  }

  resetKbPressed = () => {
    this.setState({kbPressed: false})
  }

  render () {
    // state handling & event handlers are necessary to mimic
    // native radio behaviour, which requires differentiating between
    // focus by keyboard and focus by mouse/touch interaction.
    const {name, selectedValue, items, onChange} = this.props
    const {kbPressed} = this.state
    const shouldFocus = kbPressed && items.indexOf(selectedValue) < 0
    const focusIndex = kbPressed === 'shift' ? items.length - 1 : 0
    return (
      <div className={classNames('RadioButton', {'RadioButton--keyboard': kbPressed})}
        onKeyUp={this.setKbPressed}
        onClick={this.resetKbPressed}
        onBlur={this.resetKbPressed}
        >
        {items.map((item, index) => {
          var checked = item.toLowerCase() === selectedValue.toLowerCase()
          return (
            <label key={index}
              className={classNames('RadioButton-item', {'RadioButton-item--keyboard': index === focusIndex && shouldFocus})}
              >
              <input
                checked={checked}
                className='RadioButton-input'
                name={name}
                onChange={onChange.bind(this, item)}
                type='radio'
                value={item}
              />
              <div className='RadioButton-icon'>
                {checked
                  ? <RadioButtonChecked />
                  : <RadioButtonUnchecked />
                }
              </div>
              <span className='RadioButton-label'>
                {item}
              </span>
            </label>
          )
        })}
      </div>
    )
  }
}

RadioButton.propTypes = {
  name: React.PropTypes.string.isRequired,
  selectedValue: React.PropTypes.string,
  items: React.PropTypes.array,
  onChange: React.PropTypes.func.isRequired
}

RadioButton.defaultProps = {
  selectedValue: 'two',
  items: ['one', 'two', 'three']
}

export default RadioButton
