import _ from 'lodash';

// TODO: could def be DRYed up a bit, but fine for now.

export const validate_video_embeds = (videos) => {

  const noEmbedCodeErrorMessage = 'Please paste an embed code from Youtube.'
  const whitelist = ['youtube.com']

  var validation_results = _.map(videos, (item) => {

    if(item.code === undefined) { return {} };

    var result = validate_embed(item.code, whitelist, noEmbedCodeErrorMessage);

    if(result === true) {
      return {}
    } else {
      return {code: result}
    }

  });

  return validation_results;

}


export const validate_audio_embeds = (videos) => {

  const noEmbedCodeErrorMessage = 'Please paste an embed code from SoundCloud.'
  const whitelist = ['soundcloud.com']

  var validation_results = _.map(videos, (item) => {

    if(item.code === undefined) { return {} };

    var result = validate_embed(item.code, whitelist, noEmbedCodeErrorMessage);

    if(result === true) {
      return {}
    } else {
      return {code: result}
    }

  });

  return validation_results;

}


export const validate_embed = (code, whitelist, noEmbedCodeErrorMessage) => {

  var parser = new DOMParser();
  var doc = parser.parseFromString(code, "text/html");
  var iframe = doc.body.childNodes[0]

  if (!iframe) {
    return noEmbedCodeErrorMessage;
  }

  // Make sure code is an iframe.
  //  Will need to change if we encounter a valid embed
  //  code that's not an iframe
  if( iframe.tagName !== 'IFRAME' ) {
    return noEmbedCodeErrorMessage;
  }

  // Very basically, iframe needs to have a src
  if( !iframe.hasAttribute('src') ) {
    return noEmbedCodeErrorMessage;
  }

  // Check the src against our whitelist
  const src = new URL(iframe.src);
  const src_results = _.map(whitelist, (host) =>{
    return (src.toString().indexOf(host) !== -1);
  });
  const has_valid_src = src_results.some((element, index, array) => {
    return element === true;
  })

  if( has_valid_src ) {
    return true;
  } else {
    return noEmbedCodeErrorMessage
  }

}

