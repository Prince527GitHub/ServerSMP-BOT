import discord
from discord.ext import commands

class Mods(commands.Cog):

    def __init__(self, client):
        self.client = client

    # Purge Command
    @commands.command()
    @commands.has_permissions(manage_messages=True)
    async def clear(self, ctx, amount: int):
        await ctx.channel.purge(limit=amount)
        await ctx.send(f'**Purged `{amount}` messages!**')

    # Kick Command
    @commands.command()
    @commands.has_permissions(kick_members=True)
    async def kick(self, ctx, member: discord.Member, *, reason=None):
        await member.kick(reason=reason)
        await ctx.send(f'**Banned** {member.mention}')

    # Ban Command
    @commands.command()
    @commands.has_permissions(ban_members=True)
    async def ban(self, ctx, member: discord.Member, *, reason=None):
        await member.ban(reason=reason)
        await ctx.send(f'**Banned** {member.mention}')

def setup(client):
    client.add_cog(Mods(client))