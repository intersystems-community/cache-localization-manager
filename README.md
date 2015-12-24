# Cache Localization Manager (CLM)
Tool for Caché localization resources' automatic spell check and manual editing

## Base installation

1. Download the project
2. Create ```clm``` namespace, with new DB and a standart web app
3. Check ```/csp/clm``` web app settings
  - Name: /csp/clm
  - Namespace: clm
  - Allowed Authentication Methods: Unauthenticated OR Password
  - Application Roles: %All
  - Session Cookie Path: /
  - Group By ID: clm
4. Import the project into clm namespace and compile. You may encounter compilation errors on CLM.SpellChecker. It's okay
5. Create web app ```/clm```
  - Name: /clm
  - Namespace: clm
  - Allowed Authentication Methods: Unauthenticated OR Password
  - Dispatch Class: CLM.Broker
  - Application Roles: %All
  - Session Cookie Path: /
  - Group By ID: clm
  
## Spellcheck installation

1. Install [CNA](https://github.com/intersystems-ru/cna)
2. Install [hunspell](http://hunspell.sourceforge.net/)
3. TODO set paths

## Auto-translate installation

1. Get yandex translate API [key](https://tech.yandex.com/translate/)
2. Store it in `mgr\yandex-translate-api-key.txt`
