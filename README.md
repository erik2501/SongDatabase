# Dokumetasjon

## Beskrivelse av nettside

Vi har valgt å lage en nettside som presenterer 2000 topp-hitter fra spotify mellom 2000-2019 og lar klienter legge inn vurderinger av sanger. For å navigere seg gjennom sangene kan man på hjemmesiden søke på navn eller artist, filtrere på hvilket år sangen ble laget, og sortere sangene på rekkefølge. Man kan da velge mellom eldst-nyest eller nyest-eldst, mhp når sangene ble lagt til i databasen. Vi har gjort søkefunksjonen case insensitive, slik at store og små bokstaver ikke har noe å si. Datasettet fant vi på kaggle som en csv fil, men hadde opprinnelig ingen bilder. Derfor skrev vi et python script som hentet ut bilde url-er fra Google bilder og la til hver sang i databasen. 

## Teknologi stakk

Vi har valgt å bruke en stakk som kalles MERN. Stakken består av MongoDB som database, Express som web rammeverk, React med typescript på klientside og Node for web server. Oppgavebeskrivelsen satt Node og React som krav og etter å ha lest oss opp fant gruppen ut at MERN stakken var et godt valg. Ettersom ingen på gruppen hadde erfaring med noen av stakkene fra før, var god dokumentasjon et viktig aspekt i utvelgelsesprosessen. MongoDB fungerer meget bra med Node og det tilbys også verktøy som Compass som gjør navigering i databasen enkelt. Express gjør det enkelt å mappe URLer til funksjoner på server. Dette er de argumentene vi la i grunn ved valg av stakk. 

## Backend Graphql

Gruppen har, som nevnt, valgt å bruke MongoDB som database. Databasen består av to collections, songs og reviews. I ettertid har vi reflektert over løsningen og kommet frem til at det heller er ønskelig med en liste med reviews til hver sang fremfor en egen Collection av reviews. Grunnen for dette var vår initielle forståelse av databasestrukturer for å unngå redundans og anomalier. For hver sang henter vi også ut en gjennomsnittlig review-score. Her gjøres det da en graphql-spørring for hver av de ti sangen. Hadde vi endret databasestrukturen slik foreslått ville løsningen vært penere. Vi har dog ikke valgt å gjøre om på dette ettersom vi ikke prioriterte å gjøre om på fungerende løsninger.

I backend mappen i prosjektet, har vi kun en fil, App.js, hvor vi oppretter alle Schemas, Models og types. Her blir også alle GraphQL querysene skrevet i backend og express serveren blir satt opp. Vi kunne sortert ut models, types og schemas men ettersom dette hadde skapt flere mindre filer ønsket vi å holde backend samlet . App.js filen er skrevet i JavaScript ettersom vi etter råd fra stud.ass skulle gjøre om denne til typescript etter den var ferdig. Dette viste seg å være vanskeligere enn først antatt og vi har dermed valgt å fokusere vår tid på mer vitale deler av oppgaven. 

## GitLab

Gjennom utviklingsprosessen har vi brukt verktøyet Gitlab for å samarbeide om kode og ha en oversikt over fremgangen i prosjektet. Oversikt over issues, commits, branches og merges er funksjoner i gitlab som gjør samarbeidet i gruppen lettere. Vi valgte å ha en “main”, en “dev”-branch og separate branches til hvert issue. Etter å ha løst et issue merget vi den tilhørende branchen til “dev” og merget kun til “main” når produktet var ferdig og fullt funksjonelt. Som konvensjon i gruppen bestemte vi at alle issues skulle bli representert i et board, delt inn i åpne, påbegynte og lukkede issues. For å starte på et issue ble det flyttet over i påbegynt og tildelt en assignee, slik at alle på gruppen hadde oversikt over hva de andre gruppemedlemmene gjorde. Til hvert issue lagde vi en ny branch, og vi forsøkte å ikke ha alt for store og omfattende issues. Dette gjorde det lettere å holde dev-branchen så oppdatert som mulig og minimerte merge-konflikter i stor grad. Vi valgte å skrive både issues og commit-meldinger på engelsk, ettersom koden er på engelsk og det gjør kodebasen mer universal.

## Universell utforming

Når det kommer til fremvisning av sanger har vi mhp. brukervennlighet valgt å fremvise 10 og 10 sanger av gangen i en vertikal liste, med paginerings-funksjonalitet. I et forsøk på å utføre bærekraftig utvikling har vi valgt å kun ha med det vi mener er nødvendig på siden som viser frem sangene: sangtittel, artistnavn og albumcover om hver sang. På denne måten henter vi kun litt info om hver sang, mens hvis man vil vite mer om hver sang, så kan man trykke på sangen og få mer info. Vi har også brukt debounce for å sørge for at graphql-spørringen venter 500 millisekunder etter at en bruker har begynt å skrive inn i søkefeltet. Dette for å redusere antall kall, slik at det ikke hentes data hver gang en bokstav endres. Et annet grep for som sørger for bærekraftig utvikling er å holde brukergrensesnittet på nettsiden enkelt. Ved å unngå animasjoner og gifs, men holde oss til et minimalistisk design kan vi spare klienten for både datatrafikk og energibruk. 

## State management Recoil

Vi har valgt å bruke Recoil som state management. I prosjektet har gruppen et komponent hierarki der tre løvnode-komponenter trenger den samme informasjonen. Vi startet med å sende rundt denne informasjonen som props via en foreldre node. Vi synes dette var kronglete, så vi valgte derfor heller å implementere Recoil state management for å gi komponentene tilgang til nødvendige states og verdier. 

## Testing

Som generell praksis har vi brukertestet brancher underveis i utviklingsprosessen før vi har merget til dev. Dette har vi gjort ved at to på gruppen har sjekket at branchen har riktig funksjonalitet for begge før den merges inn i dev. Slik unngår vi at dev inneholder feil, i tillegg til at det oppdages nye issues.

Gruppen har testet siden på en 13 tommer skjerm i Google Chrome, ettersom det ikke var spesifisert at siden skulle ha responsivt web-design. Vi vil derfor anbefale at brukeren tester siden i Google Chrome.

Gruppen har valgt å bruke React Testing Library og Jest for å lage snapshot-tester og enhetstester, ettersom dette ble anbefalt i forelesning, samt at gruppen hadde erfaring med bibliotekene fra forrige prosjekt. Vi har implementert tre snapshot-tester; en av SongCard, en av ReviewCard og en av ScrollButton. Det er også implementert to enhetstester, en av Searchbar og en av ReviewComponent. Det falt mest naturlig å enhetsteste disse komponentene ettersom det er her brukere har mulighet til å interagere med nettsiden. I Searchbar-testen har vi testet søke-tekstfeltet, dropdown-menyene og clear-knappen. I ReviewComponent har vi testet tekstfeltene Name og Description, samt testing av stjerne-ratingen. Her inkluderte vi også mocking i testingen, for å slippe at testene faktisk skriver reviews til databasen. 

Vi har valgt å bruke Cypress til å gjennomføre end-to-end testing, ettersom det er et oversiktlig bibliotek som hadde god dokumentasjon og gode tutorials på nettet. Reviewene er ikke koblet til en spesifikk bruker og vi valgte dermed å ikke lage en egen database for testing. En konsekvens av dette er at en sang har tilknyttet mange like reviews, men dette re er ikke noe vi ser på som et nevneverdig problem. 

## Material UI

Material UI er styling biblioteket vi har valgt å bruke i denne oppgaven. Alle på gruppa har jobbet med dette før, og biblioteket inneholder alle komponenter vi trengte på sida, og var dermed det naturlige valget for oss. Valget sørget også for at alle komponentene har lik styling uavhengig av hvem på gruppen som utviklet. Dette sørger for et gjennomgående tema på nettsiden, samt et godt brukergrensesnitt. 

## Bemerkelser

- Ettersom datasettet inneholder de sangene som har vært på topplistene i gitte perioder vil noen sanger dukke opp flere ganger ettersom de har vært der på ulike uavhengige tidspunkt

- Vi har kun valgt å vise de siste 10 reviewene for hver sang. Her kunne vi implementert paginering og vist alle reviewene, men ettersom dette var noe vi allerede har implementert så vi ikke på dette som hensiktsmessig.

- Da vi satte opp databasen vår, var vi ikke klar over at vi kunne bruke mongoDB sin ObjectID, så vi bruker songID som vi vet har unike verdier for alle sanger. Ville brukt ObjectID om vi skulle gjort det på nytt.

- Dersom bruker skriver et review vil han/hun komme tilbake til homepage uten filtrering ved å trykke på  “return to songsearch”  ettersom vi mener dette er mest hensiktsmessig.








