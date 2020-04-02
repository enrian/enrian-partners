/**
 *  Simple object to configure nodejs app
 *
 */
module.exports = {
  credentials: {
    "user": "noreply@enrian.com",
    "pass": "evwk liwg wqtt gpou"
  },
  options: {
    "from": "noreply@enrian.com",
    "to": "info@enrian.com",
    "subject": "New contact from Enrian page"
  },
  mailgun: {
    apiKey: 'key-d05b39f858d23a13255623c6dcc15ce6',
    domain: 'staging.mail.aleanapp.com'
  },
  port: process.env.PORT || 8070
};
