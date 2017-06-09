import React, {Component} from 'react';
import BorderType from './BorderType';

class Square extends Component {

  convertToBorderCss(borderTypes) {
    let css = '';
    borderTypes.forEach(x =>
      css += this.getBorderSize(x) + 'px '
    );
    return css;
  }

  getBorderSize(borderType) {
    switch (borderType) {
      case BorderType.OUTER:
        return 4;
      case BorderType.INNER_BOX:
        return 2;
      case BorderType.NORMAL:
        return 1;
      default:
        return undefined;
    }
  }

  render() {
    let {style} = this.props;
    let {borderTypes} = this.props;

    let mergedStyles = Object.assign({
      borderStyle: 'solid',
      borderWidth: this.convertToBorderCss(borderTypes),
      textAlign: 'center',
      fontSize: style.width / 2
    }, style);

    mergedStyles.width -= this.getBorderSize(borderTypes[1]) + this.getBorderSize(borderTypes[3]);
    mergedStyles.height -= this.getBorderSize(borderTypes[0]) + this.getBorderSize(borderTypes[2]);

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
