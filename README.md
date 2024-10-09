# DT208G - Projektarbete
> Av: Jennifer Jakobsson, jeja2306@student.miun.se

Detta projekt har skapats i ramverket Angular och är skrivet i programmeringsspråket TypeScript. 
<br>
Webbplatsen är menad för ett universitet som vill uppvisa tillgängliga kurser. 
<br>
<br>
<b>Följande punkter har uppnåtts:</b>

- Kurserna kan sorteras på kurskod, kursnamn, poäng, ämne
- De kan filtreras på kurskod och kursnamn
- Kurs kan väljas utifrån ämne
- Alla kurser kan adderas till eget ramschema
- Antal kurser kan ses i aktuell sökning
- Valda kurser kan ses under "Ramschema" och dessa har då lagrats i localStorage
- Sammanlagda högskolepoäng kan ses för valda kurser
- Varje kurs kan raderas

<br>
<b>Objektet som tas emot går igenom ett interface som ser ut som följande:</b> 
<br>
<br>

``` typescript
export class Course {
    courseCode: string;
    subjectCode: string;
    level: string;
    progression: string;
    courseName: string;
    points: number;
    institutionCode: string;
    subject: string;
    syllabus: string;
}
```

 [Länk till publicerad webbplats](https://lynxakademi.netlify.app/home)
