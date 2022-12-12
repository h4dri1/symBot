# SymBot 0.1.0

A NodeJs script to create a symbolic link between a torrent download folder and a media library folder. Ideally, this is a script that can be used with Rtorrent and to be triggered when a torrent download is finished. It will then create a symbolic link with an understandable file name for indexing in a multimedia server (Plex example). Your downloaded torrent file therefore remains in the same folder as its associated .torrent file (you continue to seed) and it is accessible for playback with your multimedia service.

--------------------------------------------------------

## For starting

You can use this script in two ways:

- Either you execute it directly by manually passing the name of the downloaded torrent.
- Either you use it with rTorrent by configuring the .rtorrent.rc file so that it executes the script at the end of a download.

You will need to configure an .env file which will contain the path of the different files involved (torrents, movies, tv shows).

### Prerequisites

- NodeJs >= 12
- rTorrent (Optional)

--------------------------------------------------------

### Installation

- 1/ Install Nodejs/npm if you don't have them yet, you can install node for all users or just one in particular.
- 2/ Clone repo in local :
```bash
git clone git@github.com:h4dri1/symBot
```
- 3/ Install dependencies :
```bash
npm i
```
- 4/ Configure .env file
```bash
mv .env.example .env && nano .env
```
- 5/ If you want to configure automatic triggering with rTorrent (Optional)
```bash
nano ~/.rtorrent.rc
```
And add at the end :
```bash
method.set_key = event.download.finished,complete,"execute2=/home/(user who own rtorrent.rc)/torrent-postprocess.sh,$d.name="
```
Then create torrent-postprocess.sh file
```bash
nano torrent-postprocess.sh
```
And paste this :
```bash
#!/bin/bash
echo $* >> /home/(user who own rtorrent.rc)/symBot.log

#If you installed node for all users you can uncomment this line:
# node /home/(user who own rtorrent.rc)/symBot.js "$@"

#If you installed node only for the user running rtorrent keep this line otherwise comment there
/home/(user who own rtorrent.rc)/.nvm/versions/node/v18.12.1/bin/node /home/(user who own rtorrent.rc)/symBot.js "$@"
#You will find your node version and its path in the .bashrc file of the user running rtorrent
```
- 6/ Restart rtorrent
```bash
sudo service (user)-torrent restart
```
--------------------------------------------------------

## Starting

To manually use the script :

```bash
node symBot.js "/path/to/the/file/or/folder/torrent"
```

--------------------------------------------------------

## Versions

0.1.0

## Bugs

- Some exotic torrent formats will not match the available regex. Refinement over time and examples of failures will need to be done.
- For example, avoid torrents that do not start with their name (eg: NIkkOX - Star Wars (2018).mkv).
- Certain movie names that have numbers in their name may react badly.
- Series that do not respect the S00E00 format

