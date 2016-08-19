# Cache Localization Manager (CLM)
Tool for translating Caché [message dictionaries](http://docs.intersystems.com/cache20152/csp/docbook/DocBook.UI.Page.cls?KEY=GZAP_localization#GZAP_C196068).

# Installation

1. Download the latest release xml file: [CLM.Installer.xml](https://github.com/intersystems-ru/cache-localization-manager/releases/)
2. Import it to any Caché namespace, f.e. to USER.
3. Run in terminal:
```
  USER> do ##class(CLM.Installer).Setup()
```


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
| SSLConfig    | CLM                             | Valid SSL config. Would be used to connect to yandex server           |
