# react-selection-popover
Popover menu for selected text

## Getting started

Add the `SelectionPopover` component to the div that contains the selectable text. Add the `data-selectable` attribute to the same div.

Add any children and props (including styling) to `SelectionPopover`.
```js
  import React from 'react';
  import SelectionPopover from 'react-selection-popover'

  export default class Demo extends React.Component {
    render() {
      return (
        <div data-selectable>
          I am selectable text!
          <SelectionPopover>
            <button>save</button>
            <button>share</button>
          </SelectionPopover>
        </div>
      )
    }
  }
```

## Props
| prop          | description   | type     |
| ------------- |-------------| --------|
| `onChange`    | fired when visibility of popover changes | function |
| `topOffset`   | distance from selection and top of box (default 30px)   | integer  |
| `style`       | any ole style prop      |    object |
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
