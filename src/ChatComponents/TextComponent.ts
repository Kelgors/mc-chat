import Component from './Component';

export default class TextComponent extends Component {

  text : string;

  constructor(json : any = {}) {
    const isStringLitteral = typeof json === 'string';
    super(isStringLitteral ? {} : json);
    this.text = isStringLitteral ? json : (json.text || '');
  }

  toJson(): Record<string, any> {
    return {
      text: this.text || '',
      ...super.toJson(),
    };
  }

  toString(): string {
    return this.getFormatter()(this.text + super.toString());
  }
}
