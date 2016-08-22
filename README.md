# Cache Localization Manager (CLM)
Tool for translating Caché [message dictionaries](http://docs.intersystems.com/cache20152/csp/docbook/DocBook.UI.Page.cls?KEY=GZAP_localization#GZAP_C196068).

## Installation

1. Download the latest release xml file: [CLM.Installer.xml](https://github.com/intersystems-ru/cache-localization-manager/releases/)
2. Import it to any Caché namespace, e.g. to USER.
3. Run in terminal:
```
  Set pVars("Namespace") = "<The namespace where you want CLM to be installed>" //e.g. SAMPLES
  Set pVars("SourceDir") = "<The folder for the offline installation>"          //e.g. C:\temp\CLM\
  USER> do ##class(CLM.Installer).Setup(pVars) //If you do not specify the default pVars then CLM namespace will be chosen by default
```


## Spellcheck installation

1. You can build [CNA](https://github.com/intersystems-ru/cna) by yourself or take already built [release](https://github.com/intersystems-ru/cna/releases) version
2. You can build [hunspell](http://hunspell.sourceforge.net/) by yourself or take already built [release](https://github.com/intersystems-ru/cache-localization-manager/releases/) version 
3. You can download dictionaries for spell check [here](https://drive.google.com/open?id=0B67IDZK3qoXJNDkySUxWNXY4dWM)
4. Set `CNAPath`, `hunspellPath`, `libcPath`, `dicPath`, `affPath` settings

## Auto-translate installation

1. Get yandex translate API [key](https://tech.yandex.com/translate/)
2. Set `yandexkey` settings


## Settings

You can set CLM settings in terminal with `do ##class(CLM.Utils).SetSetting(SettingName, Value)` comand.
You can set the following settings:

| Setting      | Sample value                    | Description                                                                       |
|--------------|---------------------------------|---------------------------------------------------------------------------------- |
| CNAPath      | libcna.so                       | Path to libcna.dll or libcna.so                                                   |
| libcPath     | C:/Windows/System32/msvcrt.dll  | Path to C standart library for windows (/lib/x86_64-linux-gnu/libc.so.6 for linux)|
| hunspellPath | libhunspell.dll                 | Path to hunspell shared library                                                   |
| affPath      | e.g. "C:/language/affs/"        | Path to your hunspell dictionary                                                  |
| dicPath      | e.g. "C:/language/dics/"        | Path to your hunspell dictionary                                                  |
| yandexkey    | trnsl.1.1.2015062...            | Your yandex translate api key                                                     |
