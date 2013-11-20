WikiPerm
========

wikiperm.ru sources


INSTALL
========

1. Unzip archive with wikiperm or clone repository to the root of your web server ;
2. Register on https://www.firebase.com/ and create firebase on https://www.firebase.com/account/ ;
3. Go to "Forge" -> "Auth" and add your domain to "Authorized Request Origins";
4. Go to https://github.com/settings/applications and register new application;
5. Return to "Forge" -> "Auth" -> "Authentication Providers" -> "GitHub"; Enable auth from github and paste "GitHub Client ID" and "Secret";
6. Go to "Forge" -> "Security"; Create some rules (do not forget to replace myuser1 and myuser2 with your github usernames):
```
{

  "rules": {
    ".read": true,
    "approved": {
      "$item": {
        ".write": "auth.username == 'myuser1' || auth.username == 'myuser2'",
      }
    },
    "temp": {
      ".write": true,
      "left": {
        "$item": {
          ".validate": "newData.val().length <= 140"
        }
      },
      "right": {
        "$item": {
          ".validate": "newData.val().length <= 140"
        }
      }
    },
    "chat": {
      ".write": true,
      "$item": {
        "messages": {
          "$item": {
            ".validate": "newData.val().length <= 140"
          }
        }
      }
    }
  }
}
```
7. Replace https://wikiperm.firebaseio.com with your firebase url in main.js and controllers.js;
8. Check application works.

Main url: http://your.domain

Admin url: http://your.domain/secret.index.html (auth link in footer)