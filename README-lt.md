# Bankas ver. 4

P.S Paryškintu tekstu pažymėti pakitimai nuo versijos u3 (tai kas dar nepadaryta)

(Banko aplikacijos versija su **duonbaze ir failų ikėlimu**)

Banką sudaro du puslapiai su bendru meniu ir prisijungimo puslapis

**Pirmame puslapyje (home) pateikta bendra informacija apie banką**:

- [x] klientų skaičius, bendra laikoma suma **ir vidutinė suma sąskaitoje (su dviem skaičiais po kablelio)**.

- [x] Taip pat patalpinti kažkokie grafiniai elementai, užpildantys puslapį.

- [x] Į šį puslapį gali patekti ir prisijungę ir neprisijungę vartotojai.

**Antrame puslapyje yra**:

- [x] Sąskaitų sąrašas su Vardu, Pavarde, Sąskaitos suma, **Paveiksliuku su asmens dokumento kopija**, Mygtuku “ištrinti”,**"užblokuoti", Mygtuku "keisti, pridėti ar trinti dokumentą"**, laukeliu vertei įrašyti ir dviem mygtukais tam laukeliui: “pridėti lėšų” ir “nuskaičiuoti lėšas”

- [x] Naujos sąskaitos sukūrimas (įvedami duomenys: vardas, pavardė **ir įkeliamas paveikslėlis su asmens dokumento kopija(galima paveikslėlio iškart ir nekelti, tada vietoj jo sąraše rodomas koks nors bendras "kopijos dar nėra" paveikslėlis)**)

- [x] Puslapio viršuje atvaizduojama statistika: klientų skaičius ir bendra laikoma suma. **Klientų, kurie neturi paveiksliukų su asmens dokumentu. Klientų skaičius, kurių sąskaitos nulinės, klientų skaičius, kurių sąskaitos minusinės, klientų skaičius, kurių sąskaitose yra pinigų.**

- [x] **Rodomas mygtukas, "mokesčiai", kur5 paspaudus nuo visų (ir blokuotų) sąskaitų yra nuskaičiuojamas 5 eur mokestis. Jeigu sąskaitoje nėra tiek pinigų, sąskaita tampa minusinė**

- [x] **Rodomas filtras, kuris filtruoja blokuotas, neblokuotas**, nulines, **minusines** ir pliusines sąskaitas

- [x] **Yra galimybė rūšiuoti sąskaitas pagal pavardę, sumą ir grįžti į pradinį nerūšiuotą variantą.**

- [x] Nauja sąskaita sukuriama su pradine 0 suma, o lėšos pridedamos/nuimamos sąraše įvedant sumą ir spaudžiant atitinkamą mygtuką.

- [x] **Jeigu pridedama suma yra didesnė nei 1000 eurų turi pasirodyti langas, prašantis patvirtinti sumos pridėjimą (jeigu mažesnė, pridedama iškarto).**

- [x] **Paspaudus mygtuką “užblokuoti”, sąskaita užblokuojama, jokios operacijos, trynimas, pridėjimas, atėmimas su tokia sąskaita negalimos. Blokuotos sąskaitos mygtukas, pakeičiamas mygtuku “atblokuoti”, kurį paspaudus, sąskaita atblokuojama. Rodomas klaidos pranešimas bandant atlikti kažkokią operaciją su blokuota sąskaita.**

- [x] Sąskaitos, kurioje yra lėšų ištrinti neturi būti galima.

- [x] **Sąskaitos pradžioje rodomos niekaip neišrūšiuotos.**

- [x] Sąskaitoje likusi suma negali būti minusinė. Rodomas klaidos pranešimas bandant nuskaičiuoti daugiau nei yra.

- [x] Duomenų bazė - Express serveris su **MariaDB arba MySQ**.

- [x] Po kiekvienos įrašymo (trynimo) operacijos turi būti parodomas pranešimas apie operacijos rezultatus.

- [x] Į šį puslapį gali patekti tik prisijungę vartotojai. Bandant patekti neprisijungusiam vartotojui, jis turi būti nukreipiamas į prisijungimo puslapį.

**Prisijungimo puslapis**:

- [x] meniu neturi.

- [x] Vartotojai (vardas ir slaptažodžio hash) rankiniu būdu surašyti **surašyti į MariaDB arba MySQL duomenų bazę** veikiančią Express serveryje. (Kacius, kacius@pele.lt : Kacius123; Pelius, pelius@pele.lt:Pelius123).

- [x] Meniu keičiasi priklausomai ar puslapyje yra prisijungęs vartotojas ar ne. Prisijungusiam vartotojui meniu yra rodomas atsijungimo mygtukas ir jo vardas, o neprisijungusiam- linkas į prisijungimo puslapį.

- [x] **Filtravimas ir rūšiavimas turi veikti kartu, tai yra turi būti galimybė išrūšiuoti jau nufiltruotas sąskaitas ir panašiai**.

- [x] **Sąskaita turi būti unikali ir nesikartoti** _(tikrinu pagal vardą ir pavardę, nors šiaip žmonių vardai galėtų ir kartotis, bet šiuo atveju daugiau duomenų nėra)_
