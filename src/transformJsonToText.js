const chalk = require('chalk');

function transformJsonToString(json) {
  switch (json.translate) {
    case 'chat.type.text':
      return Chat$Text(json);
    case 'chat.type.announcement':
      return Chat$Announcement(json);
    case 'commands.list.players': //list
      return Chat$List(json);
    case 'chat.type.emote': //me
      return Chat$Me(json);
    case 'commands.message.display.incoming': //tell
      return Chat$Tell(json, false);
    case 'commands.message.display.outgoing': //tell
      return Chat$Tell(json, true);
    case 'commands.seed.success': //seed
      return Chat$Seed(json);
    case 'chat.square_brackets':
      return Chat$SquareBrackets(json);
    default:
      return transformComponent(json);
  }
};

function Chat$List(json) {
  return [
    'There are ',
    transformWithItem(json.with[0]),
    ' of a max of ',
    transformWithItem(json.with[1]),
    ' players online: ',
    transformWithItem(json.with[2])
  ].join('');
}

function Chat$Text(json) {
  return ['<', transformWithItem(json.with[0]), '> ',
    transformWithArray(json.with.slice(1))
  ].join('');
}

function Chat$Announcement(json) {
  return ['[', transformWithItem(json.with[0]), '] ',
    transformWithArray(json.with.slice(1))
  ].join('');
}

function Chat$Me(json) {
  return chalk.italic.grey([
    '* ',
    transformWithItem(json.with[0]),
    ' ',
    transformWithArray(json.with.slice(1))
  ].join(''));
}
function Chat$Tell(json, isOutgoing) {
  return getChalkFrom(json)([
    isOutgoing ? 'To' : 'From',
    ' <',
    transformWithItem(json.with[0]),
    '> ',
    transformWithArray(json.with.slice(1))
  ].join(''));
}
function Chat$Seed(json) {
  return 'Seed: ' + transformJsonToString(json.with[0]);
}
function Chat$SquareBrackets(json) {
  return [
    '[',
    transformWithArray(json.with),
    ']'
  ].join('');
}

function transformWithArray(array) {
  return array.map(transformWithItem).join('');
}
function transformWithItem(item) {
  if (typeof item === 'string') return item;
  return transformComponent(item);
}
function transformComponent(component) {
  let output = transformComponentExtra(component);
  if (Array.isArray(component.extra)) {
    output += (component.extra || []).map(transformComponent).join('');
  }
  return output;
}
function transformComponentExtra(extra) {
  return getChalkFrom(extra)(extra.text);
}

function getChalkFrom(component) {
  let style = chalk.reset;
  if (component.italic) style = style.italic;
  if (component.bold) style = style.bold;
  if (component.underline) style = style.underline;
  if (component.color in style) style = style[component.color];
  return style;
}

module.exports = transformJsonToString;
