
# ========================= PACKAGES =========================

import discord
import os

load_dotenv()

# ========================= STARTING =========================

intents = discord.Intents.default()
intents.members = True

client = discord.Client()


# ========================= EVENTS =========================

@client.event
async def on_ready():
    print(f'Logged in as {client.user}')

@client.event
async def on_message(message):
    if message.content == "go pico":
        return;
    await message.channel.send("go pico")

# ========================= LOGIN =========================

client.run(os.getenv("TOKEN"), bot=False)