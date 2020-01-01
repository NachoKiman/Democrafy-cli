# Democrafy cli
This is one of the user applications of the Democrafy System. The Democrafy-cli lets you interact with the Democrafy server by requesting data 
of the current song and requesting that the song is skipped.This is the only application you have to 
download being a normal user. 

## Democrafy system
The Democrafy System allows a group a people to listen to music that the whole group enjoy. An administrator user will 
start up the Democrafy-server and the Democrafy-web-client. Then the people that want to participate in the 
Spotify Democracy will log on to the Democrafy-web-client or the Democrafy-cli and vote for skipping current playing 
song, see the current status and lots of relevant data of a song and adding new songs to the server queue.

## Requirements
- Node 11 or above and NPM 6.4.1 or above.
- You need a Linux computer to see the notifications.

## Installation
#### Download
- Either clone o download the repository

```shell
git clone https://github.com/NachoKiman/Democrafy-cli.git
```

### Setup
```shell
npm install
```

### Configuration
There is a file in called config.json where you can find your current configuration.
- **server_ip**: is the ip of the computer where the server is running.
- **server_port**: is the port configured by the server where de Democrafy-server is running.
- **skip_key**: is the key which will let you skip a song.
- **get_song_key**: is the key which will let you get a Linux notification with data of the current song.

###### List of some example keys to configure
- Page Down
- Right Shift
- NumPad Enter
- Left Control
- Left Alt
- Left Shift
- Tab
- Num Lock
- NumPad Divide
- NumPad Multiply
- NumPad Subtract
- NumPad 1
- NumPad 2
- NumPad Add
- NumPad Separator
- Context Menu
- Num Lock
- Insert
- Down
- F1
- F2
- F3
- F4
- A
- Q
- W
- 1
- 2
- Space

### Usage
```shell
npm start
```

You will need to log in. Currently you can only register a new user from the Democrafy-web-client.
