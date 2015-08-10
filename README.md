# Mopster

[Mopidy](https://www.mopidy.com) client written in [Ember.js](http://emberjs.com)

* Online version (no need for manual updates)
* Mobile friendly

## Usage

Go to [Online version](http://mopster.cowbell-labs.com) or setup it locally on machine with Mopidy server.

On your machine with Mopidy server run:
```
git clone https://github.com/cowbell/mopster.git
cd mopster && git checkout gh-pages
```

Point your Mopidy config to repository path.

To update client, go to repository path and run `git pull origin gh-pages`

## Developing

This project is built on the ember.js framework and uses npm and bower to fetch
and resolve depedencies. Run these commands to get started developing.

```
$ [sudo] npm install
$ bower install
$ ember serve
```

This will build the project and serve it on <http://localhost:4200/>

## Support

Tested with Mopidy v1.0 and [mopidy-gmusic v1.0](https://github.com/hechtus/mopidy-gmusic)
