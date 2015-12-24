# Cache Localization Manager (CLM)
Tool for translating Caché [message dictionaries](http://docs.intersystems.com/cache20152/csp/docbook/DocBook.UI.Page.cls?KEY=GZAP_localization#GZAP_C196068).

## Base installation

1. Download the project
2. Create ```clm``` namespace, with new DB and a standart web app (or use an existing one if you want to translate messages from that namespace)
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
6. Open `http://localhost:57772/csp/clm/index.csp`

## Spellcheck installation

1. Install [CNA](https://github.com/intersystems-ru/cna)
2. Install [hunspell](http://hunspell.sourceforge.net/)
3. Set `CNAPath`, `hunspellPath`, `libcPath` settings

## Auto-translate installation

1. Get yandex translate API [key](https://tech.yandex.com/translate/)
2. Set `SSLConfig`, `yandexkey` settings


## Settings

You can set CLM settings in terminal with `do ##class(CLM.Utils).SetSetting(SettingName, Value)` comand.
You can set the following settings:

| Setting      | Sample value                    | Description                                                           |
|--------------|---------------------------------|-----------------------------------------------------------------------|
| CNAPath      | libcna.so                       | Path to libcna.dll or libcna.so                                       |
| libcPath     | /lib/x86_64-linux-gnu/libc.so.6 | Path to C standart library                                            |
| hunspellPath | libhunspell.dll                 | Path to hunspell shared library                                       |
| affPath      | C:\ru.aff                       | Path to your hunspell dictionary if you don't want to use default one |
| dicPath      | C:\dic.aff                      | Path to your hunspell dictionary if you don't want to use default one |
| yandexkey    | trnsl.1.1.2015062...            | Your yandex translate api key                                         |
| SSLConfig    | CLM                             | Valid SSL config. Would be ysed to connect to yandex server           |
