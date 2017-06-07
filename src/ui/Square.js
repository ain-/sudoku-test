import React, {Component} from 'react';

class Square extends Component {
  render() {
    let {style} = this.props;
    let border = 1;
    let mergedStyles = Object.assign({
      borderStyle: 'solid',
      borderWidth: border + 'px',
      textAlign: 'center',
      fontSize: style.width / 2
    }, style);
    mergedStyles.width -= border * 2;
    mergedStyles.height -= border * 2;

    let numberMargin = style.width / 2;

    let numberStyles = {
      marginLeft: numberMargin,
      marginTop: numberMargin,
      //top: '50%',
      //left: '50%',
      transform: 'translate(-50%, -50%)',
      //margin: 'auto'
    }

    return (
      <div style={mergedStyles}>
        <div style={numberStyles}>
          {this.props.value}
        </div>
      </div>
    );
  }
}

export default Square;
