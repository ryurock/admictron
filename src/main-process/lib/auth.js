const empty = require('is-empty')
const storage = require('electron-json-storage')
const OAuth2 = require('googleapis').auth.OAuth2
const plus   = require('googleapis').plus('v1')
const googleSecret = require('../../../config/google-secret.json')
const Url          = require('url')
const queryString  = require('querystring')

class Auth {
  constructor (browser) {
    this.oAuth2Client = new OAuth2(
      googleSecret.web.client_id,
      googleSecret.web.client_secret,
      googleSecret.web.redirect_uris[0]
    )
    this.browser = browser
    this.scopes  = [
      'https://www.googleapis.com/auth/plus.login',
      'https://www.googleapis.com/auth/plus.me',
      'https://www.googleapis.com/auth/userinfo.email',
      'https://www.googleapis.com/auth/userinfo.profile'
    ]
    this.authorizationDomains = { allow: [], deny: [] }
  }

  allowAuthorizationDomain(domains = []) {
    this.authorizationDomains.allow = domains
  }

  denyAuthorizationDomain(domains = []) {
    this.authorizationDomains.deny = domains
  }

  setCallbackUrl(url) {
    this.callbackUrl = url
  }

  authenticate (callback) {
    Promise.resolve()
    .then(() => {
      return this.loadTokenFromApplicationStorage()
    })
    .then((tokenAndAuthenticated) => {
      return this.setAuthenticatedAndCredentials(tokenAndAuthenticated)
    })
    .catch(() => {
      return this.tryFetchTokenFromGoogle()
    })
    .then(() => {
      return this.fetchUserMeFromGoogle()
    })
    .then((response) => {
      return callback(null, response)
    })
    .catch((err) => {
      return callback(err, null)
    })
  }

  setAuthenticatedAndCredentials (tokenAndAuthenticated) {
    return new Promise((resolve) => {
      this.authenticated = tokenAndAuthenticated.authenticated
      this.oAuth2Client.setCredentials({
        access_token: tokenAndAuthenticated.token.access_token,
        refresh_token: tokenAndAuthenticated.token.id_token
      })
      resolve()
    })
  }

  fetchUserMeFromGoogle () {
    return new Promise((resolve, reject) => {
      plus.people.get({
        userId: 'me',
        auth: this.oAuth2Client
      }, (err, response) => {
        if (err) {
          if (this.authenticated == false && err.code == 401) return this.retryAuthenticate()
          return reject(err)
        }

        if (this.authorizationDomains.deny.length > 0) {
          for (let i = 0; i < this.authorizationDomains.deny.length; i++) {
            if (response.domain == this.authorizationDomains.deny[i]) return reject(new Error('Authorization Domains deny Error'))
          }
        }

        if (this.authorizationDomains.allow.length > 0) {
          for (let i = 0; i < this.authorizationDomains.allow.length; i++) {
            if (response.domain == this.authorizationDomains.allow[i]) return resolve({
              email: response.emails[0].value,
              name:  response.displayName,
              thumbnail: response.image.url
            })
          }
        }

        resolve({
          email: response.emails[0].value,
          name:  response.displayName,
          thumbnail: response.image.url
        })
      })
    })
  }

  retryAuthenticate () {
    Promise.resolve()
    .then(() => {
      return this.tryFetchTokenFromGoogle()
    })
    .then((tokenAndAuthenticated) => {
      return this.setAuthenticatedAndCredentials(tokenAndAuthenticated)
    })
  }

  tryFetchTokenFromGoogle () {
    return new Promise((resolve, reject) => {
      Promise.resolve()
      .then(() => {
        return this.requestOAuthCode()
      })
      .then((code) => {
        return this.fetchTokenFromGoogle(code)
      })
      .then((tokens) => {
        storage.set('tokens', tokens, function(error) {
          return resolve({ token: tokens, authenticated: true })
        })
      })
      .catch((err) => {
        reject(err)
      })

    })
  }

  fetchTokenFromGoogle (code) {
    return new Promise((resolve, reject) => {
      this.oAuth2Client.getToken(code, (err, tokens) => {
        if (err) return reject(err)
        return resolve(tokens)
      })
    })
  }

  requestOAuthCode (reject, resolve) {
    return new Promise((resolve, reject) => {
      let url = this.oAuth2Client.generateAuthUrl({ access_type: 'offline', scope: this.scopes})
      this.browser.loadURL(url)
      this.browser.webContents.on('did-get-redirect-request', (event, oldUrl, newUrl) => {
        let query = queryString.parse(Url.parse(newUrl).query)
        if (query.error || !query.code) return reject(query.error, null)
        this.browser.loadURL(Url.format({
            pathname: this.callbackUrl,
            protocol: 'file:',
            slashes: true
        }))
        return resolve(query.code)
      })

    })
  }

  loadTokenFromApplicationStorage () {
    return new Promise((resolve, reject) => {
      // path ~/Library/Application Support/<package.json[name]>
      storage.get('tokens', function(error, tokens) {
        if (empty(tokens)) return reject()
        return resolve({token: tokens, authenticated: false})
      })
    })
  }
}

module.exports = Auth
