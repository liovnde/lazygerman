export type CEFRLevel = "A1" | "A2" | "B1" | "B2" | "C1";

export interface SentenceItem {
  english: string;
  german: string;
  note: string;
  keywords?: string[];
}

export interface SentenceSet {
  level: CEFRLevel;
  sentences: SentenceItem[];
}

export const sentenceSets: Record<CEFRLevel, SentenceItem[]> = {
  A1: [
    { english: "I live in Berlin with my sister.", german: "Ich wohne mit meiner Schwester in Berlin.", note: "'wohnen' is used for where you live. Dative after 'mit': meiner Schwester.", keywords: ["wohnen", "Schwester"] },
    { english: "My name is Anna and I am 25 years old.", german: "Ich heiße Anna und ich bin 25 Jahre alt.", note: "'heißen' to state your name; age uses 'sein' + Jahre alt.", keywords: ["heißen", "alt"] },
    { english: "I drink coffee in the morning.", german: "Ich trinke morgens Kaffee.", note: "'morgens' = in the mornings (habitual).", keywords: ["trinken", "morgens"] },
    { english: "We have a small dog.", german: "Wir haben einen kleinen Hund.", note: "Accusative: einen kleinen Hund (masculine).", keywords: ["haben", "Hund"] },
    { english: "Do you speak English?", german: "Sprichst du Englisch?", note: "'sprechen' is a stem-changing verb: du sprichst.", keywords: ["sprechen"] },
    { english: "The book is on the table.", german: "Das Buch liegt auf dem Tisch.", note: "'liegen' for horizontal position; dative after 'auf' (location).", keywords: ["liegen", "Tisch"] },
    { english: "I would like a glass of water, please.", german: "Ich möchte ein Glas Wasser, bitte.", note: "'möchten' is the polite form for ordering.", keywords: ["möchten", "Wasser"] },
    { english: "Today is Monday.", german: "Heute ist Montag.", note: "Days of the week are masculine and capitalized.", keywords: ["Montag"] },
    { english: "She goes to school by bike.", german: "Sie fährt mit dem Fahrrad zur Schule.", note: "'mit + dative' for means of transport; 'zur' = zu der.", keywords: ["fahren", "Fahrrad"] },
    { english: "I don't understand that.", german: "Das verstehe ich nicht.", note: "Position 1 can be the object for emphasis; verb stays second.", keywords: ["verstehen"] },
  ],
  A2: [
    { english: "Yesterday I went to the cinema with my friends.", german: "Gestern bin ich mit meinen Freunden ins Kino gegangen.", note: "Perfekt with 'sein' for movement: bin gegangen.", keywords: ["gehen", "Kino"] },
    { english: "Can you help me, please?", german: "Kannst du mir bitte helfen?", note: "'helfen' takes the dative: mir.", keywords: ["helfen"] },
    { english: "I have to work tomorrow.", german: "Ich muss morgen arbeiten.", note: "Modal verb 'müssen' sends the infinitive to the end.", keywords: ["müssen"] },
    { english: "The weather is better today than yesterday.", german: "Das Wetter ist heute besser als gestern.", note: "Comparative: besser; comparisons use 'als'.", keywords: ["besser", "Wetter"] },
    { english: "I bought a new jacket.", german: "Ich habe eine neue Jacke gekauft.", note: "Perfekt with 'haben'; weak verb: gekauft.", keywords: ["kaufen", "Jacke"] },
    { english: "We are going on vacation next week.", german: "Nächste Woche fahren wir in den Urlaub.", note: "Time expression in position 1; 'in den Urlaub fahren' is a fixed phrase.", keywords: ["Urlaub", "fahren"] },
    { english: "He has been living in Munich for two years.", german: "Er wohnt seit zwei Jahren in München.", note: "German uses present tense + 'seit' for ongoing duration.", keywords: ["seit", "wohnen"] },
    { english: "I am looking for my keys.", german: "Ich suche meine Schlüssel.", note: "'suchen' takes the accusative directly, no preposition.", keywords: ["suchen", "Schlüssel"] },
    { english: "Could you repeat that, please?", german: "Könnten Sie das bitte wiederholen?", note: "'könnten' is the polite Konjunktiv II form.", keywords: ["wiederholen"] },
    { english: "I forgot my umbrella at home.", german: "Ich habe meinen Regenschirm zu Hause vergessen.", note: "'vergessen' is irregular but takes 'haben' in Perfekt.", keywords: ["vergessen", "Regenschirm"] },
  ],
  B1: [
    { english: "If I had more time, I would learn another language.", german: "Wenn ich mehr Zeit hätte, würde ich eine weitere Sprache lernen.", note: "Konjunktiv II: hätte + würde-construction.", keywords: ["Konjunktiv", "Sprache"] },
    { english: "I'm looking forward to seeing you next weekend.", german: "Ich freue mich darauf, dich nächstes Wochenende zu sehen.", note: "'sich freuen auf' + da-compound + zu-infinitive.", keywords: ["sich freuen", "darauf"] },
    { english: "Although it was raining, we went for a walk.", german: "Obwohl es regnete, sind wir spazieren gegangen.", note: "'obwohl' is a subordinating conjunction: verb to the end.", keywords: ["obwohl", "spazieren"] },
    { english: "She told me that she wouldn't come.", german: "Sie hat mir gesagt, dass sie nicht kommen würde.", note: "'dass'-clause sends the verb to the end; würde for reported conditional.", keywords: ["dass", "sagen"] },
    { english: "The film I watched yesterday was really interesting.", german: "Der Film, den ich gestern gesehen habe, war wirklich interessant.", note: "Relative pronoun 'den' (accusative, masculine).", keywords: ["Relativsatz"] },
    { english: "I need to get used to the new job.", german: "Ich muss mich an den neuen Job gewöhnen.", note: "'sich gewöhnen an' + accusative.", keywords: ["gewöhnen"] },
    { english: "He decided to study abroad.", german: "Er hat sich entschieden, im Ausland zu studieren.", note: "'sich entscheiden' + zu-infinitive clause.", keywords: ["entscheiden", "Ausland"] },
    { english: "The package was delivered this morning.", german: "Das Paket wurde heute Morgen geliefert.", note: "Passive Präteritum: wurde + Partizip II.", keywords: ["Passiv", "Paket"] },
    { english: "I'm not sure whether I should accept the offer.", german: "Ich bin mir nicht sicher, ob ich das Angebot annehmen soll.", note: "'ob' introduces an indirect yes/no question.", keywords: ["ob", "Angebot"] },
    { english: "The more I practice, the better I get.", german: "Je mehr ich übe, desto besser werde ich.", note: "'je … desto …' construction; verb-last in 'je'-clause.", keywords: ["je", "desto"] },
  ],
  B2: [
    { english: "Despite the difficulties, the project was completed on time.", german: "Trotz der Schwierigkeiten wurde das Projekt rechtzeitig abgeschlossen.", note: "'trotz' takes the genitive; passive with 'wurde'.", keywords: ["trotz", "Genitiv"] },
    { english: "She is said to have lived in Japan for several years.", german: "Sie soll mehrere Jahre in Japan gelebt haben.", note: "'sollen' expresses hearsay; perfect infinitive 'gelebt haben'.", keywords: ["sollen", "Hörensagen"] },
    { english: "The proposal was rejected without any explanation.", german: "Der Vorschlag wurde ohne jegliche Erklärung abgelehnt.", note: "'jeglich-' is a more formal alternative to 'irgendein'.", keywords: ["Vorschlag", "ablehnen"] },
    { english: "Had I known earlier, I would have acted differently.", german: "Hätte ich es früher gewusst, hätte ich anders gehandelt.", note: "Konjunktiv II Plusquamperfekt; conditional inversion without 'wenn'.", keywords: ["Konjunktiv II", "Plusquamperfekt"] },
    { english: "The company is committed to reducing its carbon footprint.", german: "Das Unternehmen setzt sich dafür ein, seinen CO2-Ausstoß zu reduzieren.", note: "'sich einsetzen für' + da-compound + zu-infinitive.", keywords: ["sich einsetzen", "CO2"] },
    { english: "He insisted on paying the bill himself.", german: "Er bestand darauf, die Rechnung selbst zu bezahlen.", note: "'bestehen auf' + dative / da-compound 'darauf'.", keywords: ["bestehen auf"] },
    { english: "It's not worth getting upset about it.", german: "Es lohnt sich nicht, sich darüber aufzuregen.", note: "'sich lohnen' + zu-infinitive; trennbar: aufzuregen.", keywords: ["sich lohnen", "aufregen"] },
    { english: "Instead of complaining, you should look for a solution.", german: "Anstatt zu klagen, solltest du nach einer Lösung suchen.", note: "'anstatt … zu' infinitive construction.", keywords: ["anstatt", "Lösung"] },
    { english: "The results exceeded all our expectations.", german: "Die Ergebnisse übertrafen all unsere Erwartungen.", note: "'übertreffen' is strong verb: übertraf in Präteritum.", keywords: ["übertreffen", "Erwartungen"] },
    { english: "Whoever arrives first should reserve a table.", german: "Wer zuerst ankommt, sollte einen Tisch reservieren.", note: "'wer' as relative/indefinite pronoun: 'whoever'.", keywords: ["wer", "reservieren"] },
  ],
  C1: [
    { english: "Given the current circumstances, a postponement seems inevitable.", german: "Angesichts der aktuellen Umstände erscheint eine Verschiebung unvermeidlich.", note: "'angesichts' + genitive; formal register.", keywords: ["angesichts", "unvermeidlich"] },
    { english: "The minister refused to comment on the allegations.", german: "Der Minister lehnte es ab, sich zu den Vorwürfen zu äußern.", note: "'sich äußern zu' + dative; 'ablehnen' + zu-infinitive.", keywords: ["sich äußern", "Vorwürfe"] },
    { english: "Were it not for his support, the project would have failed.", german: "Wäre seine Unterstützung nicht gewesen, wäre das Projekt gescheitert.", note: "Inverted Konjunktiv II without 'wenn'; literary tone.", keywords: ["Konjunktiv II", "scheitern"] },
    { english: "The data suggest a clear correlation between the two phenomena.", german: "Die Daten lassen eine klare Korrelation zwischen den beiden Phänomenen erkennen.", note: "'erkennen lassen' = to suggest/reveal; nuanced lassen-construction.", keywords: ["lassen", "Korrelation"] },
    { english: "Such an approach would be tantamount to admitting defeat.", german: "Ein solches Vorgehen käme einem Eingeständnis der Niederlage gleich.", note: "'gleichkommen' + dative = to be tantamount to; Konjunktiv II 'käme'.", keywords: ["gleichkommen", "Niederlage"] },
    { english: "He is regarded as one of the most influential thinkers of his time.", german: "Er gilt als einer der einflussreichsten Denker seiner Zeit.", note: "'gelten als' + nominative; superlative + partitive genitive.", keywords: ["gelten als", "einflussreich"] },
    { english: "The reform was implemented without taking public opinion into account.", german: "Die Reform wurde durchgesetzt, ohne die öffentliche Meinung zu berücksichtigen.", note: "'ohne … zu' infinitive; 'durchsetzen' = to push through.", keywords: ["durchsetzen", "berücksichtigen"] },
    { english: "Far from solving the problem, the new law has made it worse.", german: "Statt das Problem zu lösen, hat das neue Gesetz es verschärft.", note: "'statt … zu' + infinitive; 'verschärfen' = to intensify/worsen.", keywords: ["verschärfen", "Gesetz"] },
    { english: "It remains to be seen whether these measures will prove effective.", german: "Es bleibt abzuwarten, ob sich diese Maßnahmen als wirksam erweisen werden.", note: "'es bleibt abzuwarten'; 'sich erweisen als' + nominative.", keywords: ["abwarten", "Maßnahmen"] },
    { english: "Under no circumstances should confidential information be shared.", german: "Unter keinen Umständen dürfen vertrauliche Informationen weitergegeben werden.", note: "Negative inversion; passive with modal 'dürfen'.", keywords: ["Umstände", "vertraulich"] },
  ],
};
