# NPMBP
Das Akronym 'NPMBP' hält hoffentlich, was es verspricht. Eine super simple **B**oiler**P**late zum Erstellen von statischen Websiten ausschließlich mit **NPM**-Skripten.

Die Skripte sind vorwiegend von diesem [Blog-Post](https://wweb.dev/blog/how-to-create-static-website-npm-scripts/#html) *inspiriert*, bzw. übernommen. Also ein großes Dankeschön an [@wweb.dev](https://github.com/wwebdev) für den sehr gelungenen Beitrag. 

## Inspiration
Ich befinde mich oft in der Lage, dass ich einfache und statische Seiten erstellen, aber dennoch nicht auf die Vorzüge von eher dynamischen Systemen verzichten möchte. 
Mal abgesehen von dem Performance-Vorteil statisch-erzeugter Seiten, sind andere Frameworks oder *Static-Site-Generators (SSGs)* für meinen Geschmack oft überladen an Funktionen und die Lernkurve ist steiler, als würde man ein kleines Projekt kurz von Hand in HTML tippen.

Die Anforderungen lassen sich also wie folgt beschreiben: 
* Volle Kontrolle über die Ausgabe
* Keine vorgefertige Konfigurationen oder Muster
* Private Seiten oder Kleinunternehmen brauchen selten mehr 10+ Seiten und der Inhalt ändert sich nur sporadisch
  * dafür aber auch keine Formulare (füllt die jemals wirklich wer aus ?) - für den Kontakt gibt es eine e-Mail-Adresse
* Vorzüge von SASS und Bundles
* Keine Duplikation von Code
* Nutzung von Variablen
* Um dem ganzen Drama mit *Crosssite-Cookies* aus dem Weg zu gehen, werden einfach keine genutzt 
  * Ihr nutzt *fontawesome* oder *Google Fonts* - kein Problem, kann man auch lokal hosten
  * Einen Banner zur Datenschutz-Erklärung gibt es aber dennoch dazu (der legt den **EINZIGEN** Cookie an, damit beim erneuten Besuchen der Seite der Banner nicht erneut weggeklickt werden muss)
  * Ihr wollt Fonts/JS bei einem CDN hosten? Auch kein Problem - würde ich aber in der Datenschutzerklärung erwähnen

## Features
Folgend eine kleine Aufzählung der Möglichkeiten dieser Herangehensweise, die hoffentlich mit der Zeit noch wächst... 
* Automatisches Übersetzen von SASS in CSS mit allen seinen Vorzügen (@imports, nesting, minification, etc..)
* Bundling von JS/TS-Modulen mittels Webpack, das auch die Nutzung von node-modules zulässt
* Image-Compression über imagemin
* HTML-Templating mit partials/modules und Nutzung von globalen und lokalen Variablen mittels posthml
* Live-Vorschau ohne LAMP/XAMPP-Stack
* Die Ausgabe kann prinzipiell überall gehostet werden. Keine Ansprüche an php, Datenbanken, server-side Skriptsprachen, etc..

## Was es (bisher) nicht ist
Es wurde bewusst auf einige Features verzichtet, die typische *SSGs* mitbringen
* Keine MarkDown-Übersetzung - Seiten werden als reguläre HTML-Dateien erzeugt (wäre über posthtml nicht schwer zu realisieren und wird vielleicht folgen...)
* Kein CMS, keine Datenbanken, keine server-side Actions - die Ausgabe ist plainHTML mit ein wenig CSS und JS 
* Keine schlüsselfertige Lösung - Interesse für Erweiterung muss vorhanden sein. Es ist ein Einstieg, der alles mitbringt, um euren Erweiterungen ein Spielfeld zu bieten

Um es auf den Punkt zu bringen: Diese Lösung kann man auf einer *potato* hosten, wenn es sein muss. Euer Hoster (oder gar ihr selber) unterstützt die Darstellung von HTML-Seiten? You`re off to the races... 

## Nutzung
Die Skripte in der *package.json* sind hoffentlich selbsterklärend, jedoch hier ein kurzer Sprung in die Vorgehensweise.

Alles *subscripts* (die beginnen mit z.B. build:XYZ) sind nicht wirklich von Belang und kümmern sich nur um den Hintergrund. Interessant sind eigentlich nur die Commands, die ohne *':'* auskommen.

Gestartet werden diese wie ein NPM-Script - verblüffend, ich weiß...
```npm
npm run <script-name>

```
* **serve**: Sollte eigentlich niemals genutzt werden - startet nur *browsersync* für die lokale Entwicklungsumgebung - da ist mir aber kein besserer Name für eingefallen
* **watch**: Damit solltet ihr in der Entwicklungsphase am meisten zu tun haben:
  * Dieser Task macht genau das, was er soll. Er passt auf jede Änderung im Filesystem auf und führt entsprechende Aktionen aus
  * Änderungen an HTML, SASS, Images oder Fonts? Quellen werden neu übersetzt und in *public_html* zur Verfügung gestellt 
  * In der Entwicklungsphase wird also nur dieser Task gestartet und es gibt immer ein Live-Feedback wie die Ausgabe aussehen könnte. 
  * Nicht erschrecken, falls sich plötzlich ein Browserfenster öffnet. Das soll so sein und zeigt den aktuellen Stand eurer Site
* **build**: Sollte eigentlich auch niemals genutzt werden. Nur eine Sammlung der ganzen Übersetzungsprozesse. Falls ihr aber mal nicht extra einen Live-Server für eure Änderungen aufrufen wollt, ist das ein guter Punkt, um alles auf einen aktuellen Stand zu kompilieren. **Beachte:** das ist aber die Dev-Umgebung 
* **production**: Jetzt kommen Butter bei die Fische! Ihr habt im Watch-Task alles bearbeitet und auf dem lokalen System seid ihr zufrieden? Dann löschen wir jetzt erstmal alles, übersetzen es neu und schreiben es in den *public_html*-Ordner. Vor allem entfernen wir jetzt auch alles unnütze CSS, dass in euren HTML-Dateien überhaupt nicht genutzt wird. Den Inhalt einfach auf euren Webspace kopieren und ihr seid live. 
* **purge**: Nein, nein... Keine Anspielung auf die Filmreihe. Aber manchmal will man alle seinen Ausgaben löschen. Hier wird eigentlich nur das *public_html*-Verzeichnis gekillt 
