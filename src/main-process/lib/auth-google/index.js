module.exports = {
  storage: require('electron-json-storage'),
  initOAuth2: function(window, tokens, callback) {
    let OAuth2 = require('googleapis').auth.OAuth2
    let secret = require('../../../../config/google-secret.json')
    oauth2Client = new OAuth2(secret.web.client_id, secret.web.client_secret, secret.web.redirect_uris[0])
    if (tokens) {
      oauth2Client.setCredentials({access_token: tokens.access_token, refresh_token: tokens.id_token})
      return callback(null, oauth2Client)
    }

    console.info('try google oauth token data')
    let url = oauth2Client.generateAuthUrl({
      access_type: 'offline',
      scope: [
        'https://www.googleapis.com/auth/plus.login',
        'https://www.googleapis.com/auth/plus.me',
        'https://www.googleapis.com/auth/userinfo.email',
        'https://www.googleapis.com/auth/userinfo.profile'
      ]
    })
    window.loadURL(url)
    window.webContents.on('did-get-redirect-request', function (event, oldUrl, newUrl) {
      console.log('google oauth did-get-redirect');

      let Url         = require('url')
      let queryString = require('querystring')
      let query       = queryString.parse(Url.parse(newUrl).query);

      if (query.error || !query.code) return callback(query.error, null)

      oauth2Client.getToken(query.code, function(err, tokens) {
        if (err) return callback(err, null)

        let storage = require('electron-json-storage')
        storage.set('tokens', tokens, function(error) {
          if (error) return callback(error, null)
        });

        oauth2Client.setCredentials({access_token: tokens.access_token, refresh_token: tokens.id_token})
        return callback(null, oauth2Client)
      })
    })
  },
  plusMe: function(oauth2Client, callback){
    let plus = require('googleapis').plus('v1')
    plus.people.get({
      userId: 'me',
      auth: oauth2Client
    }, function (err, response) {
      if (err) return callback(err, null)

      let authorizationDomains = require('../../../../config/authorization-domain.json').domains
      if (authorizationDomains.length == 0) return callback(null, response)
      for (let i = 0; i < authorizationDomains.length; i++) {
        if (response.domain == authorizationDomains[i]) return callback(null, response)
      }

      return callback('domain not match error', null)
    });
  },
  auth: function(window, callback) {
    console.info('google oauth Start')

    let initOAuth2 = this.initOAuth2
    let plusMe  = this.plusMe
    let storage = this.storage

    Promise.resolve()
    .then(function () {
      return new Promise(function(resolve, reject) {
        storage.get('tokens', function(error, tokens) {
          if (error) return reject(error)
          let empty = require('is-empty');
          let authenticated = false
          // storageに認証データがある場合
          if (!empty(tokens)) {
            console.log('already auth data in storage')
            initOAuth2(window, tokens, function(error, oauth2Client){
              if (error) return reject(error)
              return resolve({ oauth2Client: oauth2Client, authenticated: false })
            })
          } else {
            initOAuth2(window, null, function(error, oauth2Client){
              if (error) return reject(error)
              return resolve({ oauth2Client: oauth2Client, authenticated: true })
            })
          }
        })
      })
    })
    .then(function(value) {
      return new Promise(function(resolve, reject) {
        let oauth2Client = value.oauth2Client
        let authenticated = value.authenticated
        plusMe(oauth2Client, function(err, response){
          if (!err)          return resolve(response)
          if (authenticated) return reject(err)

          initOAuth2(window, null, function(error, oauth2Client){
            if (error) return reject(error)

            plusMe(oauth2Client, function(err, response) {
              if (!err) return resolve(response)
              return reject(err)
            })
          })
        })
      })
    })
    .then(function(value) {
      return callback(null, value)
    }).catch(function (error) {
      return callback(error, null);
    });
  }
}
