# SymBot 0.1.0

Un script NodeJs pour créer un lien symbolique entre un dossier de téléchargement de torrent et un dossier de bibliothèque multimédia. Dans l'idéal il s'agit d'un script utilisable avec Rtorrent et à déclancher lors de la fin de téléchargement d'un torrent. Il crééra alors un lien symbolique avec un nom de fichier compréhensible pour une indexation dans un serveur multimédia (exemple Plex). Votre fichier torrent téléchargé reste donc dans le même dossier que son .torrent associé (vous continuez à seeder) et il est accéssible à la lecture avec votre service multimédia. Une requête vers l'API themoviesdb permet de récupérer les info sur les films/serie et d'obtenir un nom de fichier et une année correct pour le film.

----------------------------

## Pour commencer

Vous pouvez utiliser ce script de deux manière:

- Soit vous l'executez directement en passant manuellement le nom du torrent téléchargé.
- Soit vous l'utilisez avec rTorrent en configurant le fichier .rtorrent.rc pour qu'il execute le script à la fin d'un téléchargement.

Il vous faudra configurer un fichier .env qui contiendra le chemin des différents dossiers impliqué (torrents, movies, tv shows).

### Pré-requis

- NodeJs >= 17.5 (fetch)
- rTorrent (Facultatif)
- Un compte themoviedb.org pour obtenir une clé API

----------------------------

### Installation

- 1/ Installer Nodejs/npm si vous ne les avez pas encore, vous pouvez installer node pour tous les utilisateurs ou un seul en particulier.
- 2/ Cloner le dépot en local :
```bash
git clone git@github.com:h4dri1/symBot
```
- 3/ Installer les dependances :
```bash
npm i
```
- 4/ Configurer le fichier.env
```bash
mv .env.example .env && nano .env
```
- 5/ Si vous souhaitez configurer le déclanchement automatique avec rTorrent (Facultatif)
```bash
nano ~/.rtorrent.rc
```
Et ajouter à la fin :
```bash
method.set_key = event.download.finished,complete,"execute2=/home/(utilisateur qui possède rtorrent.rc)/torrent-postprocess.sh,$d.name="
```
Ensuite créez le fichier torrent-postprocess.sh
```bash
nano torrent-postprocess.sh
```
Et collez ceci :
```bash
#!/bin/bash
echo $* >> /home/(utilisateur qui possède rtorrent.rc)/symBot.log

#Si vous avez installé node pour tous les utilisateurs vous pouvez décommenter cette ligne :
# node /home/(utilisateur qui possède rtorrent.rc)/app.js "$@"

#Si vous avez installé node uniquement pour l'utilisateur qui execute rtorrent garder cette ligne sinon commentez là
/home/(utilisateur qui possède rtorrent.rc)/.nvm/versions/node/v18.12.1/bin/node /home/(utilisateur qui possède rtorrent.rc)/app.js "$@"
#Vous trouverez votre version de node et son chemin dans le fichier .bashrc de l'utilisateur qui excute rtorrent
```
Puis rendez le script executable :
```bash
chown +x torrent-postprocess.sh
```
- 6/ Redémarrez rtorrent
```bash
sudo service (user)-torrent restart
```

## Démarrage

Pour utiliser le script manuellement :

```bash
node app.js "/path/to/the/file/or/folder/torrent"
```

----------------------------

## Versions

0.1.0

## Bugs

- Certain format exotique de torrent ne matcherons pas avec les regexs disponible un affinage avec le temps et les exemple de raté devra être fait.
- Eviter par exemple les torrents qui ne commence pas par leur nom (ex: NIkkOX - Star Wars (2018).mkv).
- Certain nom de film qui possède des chiffres dans leur nom risque de mal réagir.
- Les série qui ne respecte pas le format S00E00
