/**
 * Authentication types supported by Postman
 * @see https://learning.postman.com/docs/sending-requests/authorization/authorization-types/
 */
export enum AuthType {
  NoAuth = "noauth",
  ApiKey = "apikey",
  Bearer = "bearer",
  JwtBearer = "jwt-bearer",
  Basic = "basic",
  Digest = "digest",
  OAuth1 = "oauth1",
  OAuth2 = "oauth2",
  Hawk = "hawk",
  AWSSignature = "awsv4",
  NTLM = "ntlm",
  Akamai = "edgegrid",
  Asap = "asap",
}

/**
 * Request body modes supported by Postman
 * @see https://schema.postman.com/collection/json/v2.1.0/collection.json
 */
export enum BodyMode {
  Raw = "raw",
  Urlencoded = "urlencoded",
  Formdata = "formdata",
  File = "file",
  GraphQL = "graphql",
}

/**
 * Language/format options for raw body content
 */
export enum RawBodyLanguage {
  Html = "html",
  JavaScript = "javascript",
  Json = "json",
  Text = "text",
  Xml = "xml",
}

/**
 * Valid URL protocols supported by Postman
 * Based on Postman's protocol support including HTTP, WebSocket, FTP and others
 * @see https://learning.postman.com/docs/sending-requests/requests/
 */
export enum UrlProtocol {
  Http = "http",
  Https = "https",
  Ws = "ws",
  Wss = "wss",
  Ftp = "ftp",
}
