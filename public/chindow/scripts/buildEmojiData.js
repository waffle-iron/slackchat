const EmojiConvertor = require('emoji-js');
const emojiData = require('emoji-datasource');

const emojiConverter = new EmojiConvertor();

emojiConverter.init_env();
emojiConverter.replace_mode = 'unified';
emojiConverter.allow_native = true;

const emojis = emojiData.map(emoji => {
  return emojiConverter.replace_colons(`:${emoji.short_name}:`);
});

console.log(emojis);
