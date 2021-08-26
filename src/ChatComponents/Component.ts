import { MinecraftClickEventAction, MinecraftHoverEvent } from "../types/MinecraftPackets";

const chalk = require('chalk');

const COLORS : Record<string, number[]> = {
  black: [0, 0, 0],
  dark_blue: [0, 0, 170],
  dark_green: [0, 170, 0],
  dark_aqua: [0, 170, 170],
  dark_red: [170, 0, 0],
  dark_purple: [170, 0, 170],
  gold: [255, 170, 0],
  gray: [170, 170, 170],
  dark_gray: [85, 85, 85],
  blue: [85, 85, 255],
  green: [85, 255, 85],
  aqua: [85, 255, 255],
  red: [255, 85, 85],
  light_purple: [255, 85, 255],
  yellow: [255, 255, 85],
  white: [255, 255, 255]
};

export default class Component {

  bold : boolean;
  italic : boolean;
  underlined : boolean;
  strikethrough : boolean;
  obfuscated: boolean;
  color : string|null;
  insertion : string|null;
  clickEvent : MinecraftClickEventAction|null;
  hoverEvent : MinecraftHoverEvent|null;
  extra : (Component|string)[]|null;

  constructor(json : any = {}) {
    this.bold = json.bold || false;
    this.italic = json.italic || false;
    this.underlined = json.underlined || false;
    this.strikethrough = json.strikethrough || false;
    this.obfuscated = json.obfuscated || false;
    this.color = json.color || null;
    this.insertion = json.insertion || null;
    this.clickEvent = json.clickEvent || null;
    this.hoverEvent = json.hoverEvent || null;
    // "extra" added from parser
    this.extra = null;
  }

  toJson(): Record<string, any> {
    const output : Record<string, any> = {};
    if (this.bold) output['bold'] = this.bold;
    if (this.italic) output['italic'] = this.italic;
    if (this.underlined) output['underlined'] = this.underlined;
    if (this.strikethrough) output['strikethrough'] = this.strikethrough;
    if (this.obfuscated) output['obfuscated'] = this.obfuscated;
    if (this.color) output['color'] = this.color;
    if (this.insertion) output['insertion'] = this.insertion;
    if (this.clickEvent) output['clickEvent'] = this.clickEvent;
    if (this.hoverEvent) output['hoverEvent'] = this.hoverEvent;
    if (this.extra) output['extra'] = this.extra;
    return output;
  }

  getFormatter() {
    let formatter = chalk.reset;
    if (this.bold) formatter = formatter.bold;
    if (this.underlined) formatter = formatter.underline;
    if (this.italic) formatter = formatter.italic;
    if (this.strikethrough) formatter = formatter.strikethrough;
    if (this.color) {
      if (this.color.startsWith('#')) {
        formatter = formatter.hex(this.color);
      } else if (COLORS[this.color]) {
        formatter = formatter.rgb(...COLORS[this.color]);
      }
    }
    return formatter;
  }

  toString(): string {
    if (Array.isArray(this.extra)) {
      return this.extra.map((comp) => comp.toString()).join('');
    }
    return '';
  }
}
