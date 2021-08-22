
# ========================= PACKAGES + MORE =========================

import discord
import json
import os
from discord.ext import commands
from dotenv import load_dotenv
from webserver import keep_alive

load_dotenv()
keep_alive()

# ========================= STARTING =========================

def get_prefix(client, message):
    with open('prefixes.json', 'r') as f:
        prefixes = json.load(f)

    return prefixes[str(message.guild.id)]

intents = discord.Intents.default()
intents.members = True

client = commands.Bot(command_prefix = get_prefix, intents = intents)


# ========================= EVENTS =========================

@client.event
async def on_ready():
    await client.change_presence(status=discord.Status.idle, activity=discord.Game(os.getenv("STATUS")))
    print(f'Logged in as {client.user}')

@client.event
async def on_command_error(ctx, error):
    if isinstance(error, commands.MissingRequiredArgument):
        await ctx.send('Please pass in all required arguments.')
    if isinstance(error, commands.CommandNotFound):
        await ctx.send("Invalid command used.")
    if isinstance(error, commands.MissingPermissions):
        await ctx.send("You don't have permission.")

# Create Prefix Event
@client.event
async def on_guild_join(guild):
    with open('prefixes.json', 'r') as f:
        prefixes = json.load(f)

    prefixes[str(guild.id)] = os.getenv("PREFIX")

    with open('prefixes.json', 'w') as f:
        json.dump(prefixes, f, indent=4)

# Delete Prefix Event
@client.event
async def on_guild_remove(guild):
    with open('prefixes.json', 'r') as f:
        prefixes = json.load(f)

    prefixes.pop(str(guild.id))

    with open('prefixes.json', 'w') as f:
        json.dump(prefixes, f, indent=4)

# ========================= COMMANDS =========================

# ChangePrefix Command
@client.command()
@commands.has_permissions(administrator=True)
async def changeprefix(ctx, prefix):
    with open('prefixes.json', 'r') as f:
        prefixes = json.load(f)

    prefixes[str(ctx.guild.id)] = prefix

    with open('prefixes.json', 'w') as f:
        json.dump(prefixes, f, indent=4)
    
    await ctx.send(f'Prefix changes to: {prefix}')

# Ping Command
@client.command()
async def ping(ctx):
    embed = discord.Embed(
        title = "Pong!",
        description = f"WebSocket ping is `{round(client.latency * 1000)}ms`",
        colour = discord.Colour.red()
    )
    await ctx.send(embed=embed)

# ========================= HANDLER =========================

# Load files
for filename in os.listdir('./cogs'):
    if filename.endswith('.py'):
        client.load_extension(f'cogs.{filename[:-3]}')

# ========================= LOGIN =========================

client.run(os.getenv("TOKEN"))