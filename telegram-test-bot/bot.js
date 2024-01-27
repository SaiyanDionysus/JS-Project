require('dotenv').config();
const {Bot, GrammyError} = require('grammy');
const {Bot, Keyboard, InlineKeyboard } = require('grammy');

const bot = new Bot(process.env.BOT_API_KEY);
bot.start();

bot.command('start', async (ctx) => {
    const startKeyboard = new Keyboard()
    .text('Some text')
    .text('Some more text')
    .row()
    .text('Here')
    .text('Here')
    .resized
    await ctx.reply('Hey there!');
    
    await ctx.reply('What next?', {
        reply_markup: startKeyboard,
    });
});

bot.hears(['Smth', 'Here', 'Some text'], async (ctx) => {
    await ctx.reply(`Okay, using ${ctx.message.text}`);
});

bot.catch((err) => {
    const ctx = err.ctx;
    console.error(`Something went wrong ${ctx.update.update_id}:`);
    const e = err.error;
    if (e instanceof GrammyError) {
        console.error('Error in request:', e.description);
    } else if (e instanceof HttpError) {
        console.error('Could not contact Telegram', e);
    } else {
        console.error('Uknown error:', e);
    }
});