import _ from 'lodash';

const spotifyUrlRegex = /^https:\/\/open\.spotify\.com\/track\/(\w+)$/;
const youtubeShortUrlRegex = /^https:\/\/youtu\.be\/(\w+)$/;
const youtubeLongUrlRegex = /^https:\/\/www\.youtube\.com\/watch\?.*v=(\w+).*$/;

const spotifyTemplate = (id) => {
    return `<iframe src="https://open.spotify.com/embed/track/${id}" width="300" height="380" frameborder="0" allowtransparency="true" allow="encrypted-media"></iframe>`;
};

// const soundcloudTemplate = (id) => {
//     return `<iframe width="100%" height="300" scrolling="no" frameborder="no" allow="autoplay" src="https://w.soundcloud.com/player/?url=${}&color=%23ff5500&auto_play=false&hide_related=false&show_comments=true&show_user=true&show_reposts=false&show_teaser=true&visual=true"></iframe>`;
// };

const youtubeTemplate = (id) => {
    return `<iframe width="560" height="315" src="https://www.youtube.com/embed/${id}" frameborder="0" allow="accelerometer; autoplay; encrypted-media; gyroscope; picture-in-picture" allowfullscreen></iframe>`;
};

const isSrc = (str) => {
    const src = str;
    const whitelist = ['soundcloud.com', 'open.spotify.com', 'www.youtube.com', 'youtu.be']; // TODO: move this
    return _.some(whitelist, (domain) => {
        return src.indexOf(`https://${domain}`) === 0;
    });
}

export const getEmbedCode = (str) => {
  // Str could be an embed code or an src
  if(!isSrc(str)) return str;

  // It is an src!
  const src = str;

  // Just return the url and let the error handle it
  return getSpotifyEmbedCode(src) || getYoutubeEmbedCode(src) || src;
}

const getSpotifyEmbedCode = (urlStr) => {
    const match = urlStr.match(spotifyUrlRegex);
    console.log('*********', match);
    if(!match) return null;

    const id = match[1];

    return spotifyTemplate(id);
}

// const getSoundcloudEmbedCode = (urlStr) => {
//     const re = /^https:\/\/soundcloud\.com\/\w+\/([\w-]+)$/;
// }

const getYoutubeEmbedCode = (urlStr) => {
    // There are two different formats that we could accept
    let match = urlStr.match(youtubeShortUrlRegex);
    if(!match) match = urlStr.match(youtubeLongUrlRegex);

    // Neither worked
    if(!match) return null;

    const id = match[1];

    return youtubeTemplate(id);
}
