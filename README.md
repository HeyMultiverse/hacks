# hacks
Iframe behavior in Webkit PPACA's proposal

* iframe_pixel_behavior - Hacky little project to test what happens on PPACA enabled Safari browser, when an image pixel is loaded from iframe.

This project is influenced by Subodh Iyengar's sample project for testing PPACA. So naturally follows similar structure.

Prerequisites
-------------
* nodejs
* safari tech preview browser

Steps
-------------

1) Add the hosts to your /etc/hosts

  ```
  127.0.0.1 search.example
  127.0.0.1 shop.example
  127.0.0.1 iframe.example
  ```

2) Generate the certs to enable https for the sites( from [siyenger's](https://github.com/siyengar/attribution) page)

  * First generate certificates for your server in this repo directory

  `openssl req -x509 -nodes -days 30 -newkey rsa:2048 -keyout key.pem -out certificate.pem -config req.conf -extensions 'v3_req'`

  * Add certificate.pem to your keychain and double click to trust it

  For example like in https://tosbourn.com/getting-os-x-to-trust-self-signed-ssl-certificates/

3) Start the servers(*.js) in each site - searchpublisher(ad), shop, and iframe.

4) On your Safari Tech preview browser, visit https://search.example click on Ad Link to follow to shop page. Load the iframe in the page.


Expected
-------------
 
 In your terminal, load the PPACA logs `$ log stream -info | grep AdClickAttribution`

```
$ log stream -info | grep AdClickAttribution
2020-05-21 14:46:40.451372-0700 0x10266    Info        0x0                  8222   0    com.apple.WebKit.Networking: (WebKit) [com.apple.WebKit:AdClickAttribution] Storing an ad click.
2020-05-21 14:46:40.468323-0700 0x10266    Info        0x0                  8222   0    com.apple.WebKit.Networking: (WebKit) [com.apple.WebKit:AdClickAttribution] Got a conversion with conversion data: 25 and priority: 26.
2020-05-21 14:46:40.468420-0700 0x10266    Info        0x0                  8222   0    com.apple.WebKit.Networking: (WebKit) [com.apple.WebKit:AdClickAttribution] Converted a stored ad click with conversion data: 25 and priority: 26.
2020-05-21 14:46:40.468615-0700 0x10266    Info        0x0                  8222   0    com.apple.WebKit.Networking: (WebKit) [com.apple.WebKit:AdClickAttribution] Setting timer for firing conversion requests to the debug mode timeout of 60.000000 seconds where the regular timeout would have been 168380.398042 seconds.
2020-05-21 14:46:44.466974-0700 0x10266    Info        0x0                  8222   0    com.apple.WebKit.Networking: (WebKit) [com.apple.WebKit:AdClickAttribution] Got a conversion with conversion data: 25 and priority: 27.
2020-05-21 14:46:44.467002-0700 0x10266    Info        0x0                  8222   0    com.apple.WebKit.Networking: (WebKit) [com.apple.WebKit:AdClickAttribution] Re-converted an ad click with a new one with conversion data: 25 and priority: 27 because it had higher priority.

2020-05-21 14:47:40.470869-0700 0x10266    Info        0x0                  8222   0    com.apple.WebKit.Networking: (WebKit) [com.apple.WebKit:AdClickAttribution] About to fire an attribution request for a conversion.
```
