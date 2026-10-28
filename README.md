# A2 Flyers – příprava na zkoušku

Webová aplikace pro přípravu dětí (např. z bilingvních tříd) na zkoušku **Cambridge English A2 Flyers** (CEFR A2).
Obsahuje cvičení stejného typu jako všechny části skutečné zkoušky.

## Co aplikace obsahuje

| Sekce | Obsah |
| --- | --- |
| O zkoušce | formát zkoušky, hodnocení (štíty), tipy, odkazy na oficiální zdroje |
| Slovíčka | 10 témat, kartičky, překlad CZ → EN, diktát (poslech), definice |
| Listening | Part 1–5 (přiřazení jmen, formulář, přiřazení obrázků, výběr obrázku, vybarvi a napiš); nahrávky čte syntetický hlas prohlížeče, 2× jako u zkoušky |
| Reading & Writing | Part 1–7 (definice, dialog A–H, příběh se slovy, gramatika v textu, dokončení vět, dopis/deník, psaní příběhu) |
| Speaking | Part 1–4 (rozdíly, výměna informací, příběh v obrázcích, osobní otázky); volitelně rozpoznávání řeči |
| Gramatika | vysvětlení česky + kvízy |
| Zkušební test | Listening + Reading & Writing s časomírou a odhadem štítů |
| Pokrok | výsledky uložené v prohlížeči (localStorage) |

## Formát zkoušky A2 Flyers (zdroj: cambridgeenglish.org)

- **Listening** – cca 25 min, 5 částí, 25 otázek
- **Reading & Writing** – 40 min, 7 částí, 44 otázek
- **Speaking** – 7–9 min, 4 části
- Každá část max. 5 štítů, celkem 15. Nikdo „nepropadne“, každý dostane certifikát.

## Spuštění

Aplikace je čistě statická (HTML + CSS + JavaScript), bez instalace a bez závislostí.

- Stačí otevřít `index.html` v prohlížeči, nebo
- spustit lokální server (doporučeno kvůli mikrofonu):

  ```powershell
  python -m http.server 8000
  # pak otevřít http://localhost:8000
  ```

Nejlépe funguje v **Chrome** nebo **Edge** (hlasy pro poslech i rozpoznávání řeči).

### Zveřejnění na GitHub Pages

V repozitáři na GitHubu: *Settings → Pages → Source: Deploy from a branch → `main` / root*.

## Struktura

```
index.html      – kostra stránky, šablony „Domů“ a „O zkoušce“
css/style.css   – vzhled
js/data.js      – obsah: slovíčka, cvičení, gramatika (snadno rozšiřitelné)
js/app.js       – logika: routování, cvičení, řeč, ukládání pokroku
```

Novou sadu cvičení přidáte jednoduše přidáním objektu do příslušného pole v `js/data.js`
(např. `RW5`, `L4`, `SP3`) – v aplikaci se automaticky objeví.

## Upozornění

Neoficiální cvičný materiál, není spojen s Cambridge University Press & Assessment.
Všechny úlohy jsou vlastní, vytvořené podle veřejně popsaného formátu zkoušky.
Odhad štítů je pouze orientační.
