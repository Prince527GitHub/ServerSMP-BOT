import discord
from discord.ext import commands
from datetime import datetime
import random

class Memes(commands.Cog):

    def __init__(self, client):
        self.client = client

    # Duck Command
    @commands.command()
    async def duck(self, ctx):
        embed = discord.Embed(
            title = "Random duck",
            description = "A random duck from `https://random-d.uk/`.",
            colour = discord.Colour.red()
        )
        embed.set_image(url=f'https://random-d.uk/api/v2/randomimg?t={datetime.now().strftime("%H%M%S")}')
        await ctx.send(embed=embed)

    # 8ball Command
    @commands.command(aliases=['8ball'])
    async def _8ball(self, ctx, *, question):
        responses = [
            "It is certain.",
            "It is decidedly so.",
            "Without a doubt.",
            "Yes - definitely.",
            "You may rely on it.",
            "As I see it, yes.",
            "Most likely.",
            "Outlook good.",
            "Yes.",
            "Signs point to yes.",
            "Reply hazy, try again.",
            "Ask again later.",
            "Better not tell you now.",
            "Cannot predict now.",
            "Concentrate and ask again.",
            "Don't count on it.",
            "My reply is no.",
            "My sources say no.",
            "Outlook not so good.",
            "Very doubtful."
        ]
        embed = discord.Embed(
            title = "8ball",
            description = f'**Question**: `{question}`\n**Answer**: `{random.choice(responses)}`',
            colour = discord.Colour.red()
        )
        await ctx.send(embed=embed)

def setup(client):
    client.add_cog(Memes(client))