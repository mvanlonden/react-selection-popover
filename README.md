# react-selection-popover
Popover menu for selected text

## Getting started

Add the `SelectionPopover` component as a sibling of the element that contains the selectable text. Add the `data-selectable` attribute to the element that contains the selectable text. Make sure the common parent has its `position` set to `relative`.

Add any children and props (including styling) to `SelectionPopover`.
```js
import React from 'react';
import SelectionPopover from 'react-selection-popover'

export default class Demo extends React.Component {
  render() {
    state = {
      showPopover: false
    }
    return (
      <div style={{
        position: 'relative'
      }}>
        <div data-selectable>
          <p>
            This is the first selectable paragraph. Looking pretty good.
          </p>
          <p>
            Lorem ipsum dolor sit amet, consectetur adipisicing.
          </p>
        </div>
        <SelectionPopover
          showPopover={this.state.showPopover}
          onTextSelect={() => {this.setState({showPopover: true})}}
          onTextDeselect={() => {this.setState({showPopover: false})}}
        >
          <button>save</button>
          <button>share</button>
        </SelectionPopover>
      </div>
    )
  }
}
```

## Props
| prop             | description                                           | type                           | required
| -------------    | -------------                                         | --------                       | --------
| `topOffset`      | distance from selection and top of box (default 30px) | integer                        | false
| `style`          | any ole style prop                                    | object                         | false
| `onTextDeselect` | fired when text selection is cleared                  | function                       | true
| `onTextSelect`   | fired when text is selected                           | function<selectedText: string> | true
| `showPopover`    | shows or hides the popover                            | boolean                        | true

You can pass any other `div` compatible props


## Contributing

Clone repo then
```js
npm install
npm start
```

### TODO
- add tests
- disable user selection for children of popover

## License

*react-selection-popover* is available under MIT. See LICENSE for more details.
