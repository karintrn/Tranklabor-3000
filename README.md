# 🧪 Tranklabor 3000

In diesem digitalen Kartenspiel brauen die Spieler Tränke in einem verrückten Labor.  
Ziel ist es, möglichst viele Punkte zu sammeln, indem man geschickte Kartenkombinationen verwendet, ohne dass das Labor explodiert.  
Doch Vorsicht: Überladung kann das Labor jederzeit zerstören!

---

## 🎯 Ziel des Spiels
- Sammle Punkte, indem du Tränke herstellst
- Wer am Ende die meisten Punkte hat, gewinnt
- Explodiert das Labor, können Punkte verloren gehen

---

## ⚙️ Spielstart
1. Öffne die Datei **index.html** mit dem **Live Server** (z. B. in VS Code).  
2. Das Spiel öffnet sich automatisch im Browser.  
3. Kombiniere und braue deine Tränke!

---

## 🧩 Spielprinzip
- Jeder Spieler beginnt mit **3 Handkarten**.  
- In der Mitte liegen **3 Laborbank-Karten** offen.  
- Nach jedem Zug wird sowohl die Hand als auch die Laborbank wieder auf **3 Karten** aufgefüllt.  
- Das Spiel endet, nachdem jeder **5 Tränke** hergestellt hat.

---

## 🔬 Ablauf
1. **Trank herstellen:**  
   Wähle 3 Karten aus deiner Hand oder optional eine Karte von der Laborbank, um einen Trank zu brauen.

2. **Punkte berechnen:**  
   Summe der Zahlenkarten + Effekte von J, Q, K, A.

3. **Explosion prüfen:**  
   - Gesamtwert > 13 → Explosion (−3 Punkte), außer A, Q oder K ist dabei.  

4. **Runde abschließen:**  
   - Handkarten und Laborbank werden nach jedem Zug wieder aufgefüllt – klicke dazu auf den Nachziehstapel.

---

## 💥 Karten-Effekte
| Karte | Effekt |
|:------|:--------|
| **J (Bube)** | +2 Punkte auf aktuellen Trank |
| **Q (Dame)** | Verhindert Explosion |
| **K (König)** | Verhindert Explosion |
| **A (Ass)** | Schutz vor Explosion; zählt als 1 Punkt |

---

## 🧪 Tranktypen
| Art des Tranks | Bedingung | Punkte | Besonderheit |
|:----------------|:-----------|:--------|:--------------|
| **Normaler Trank** | 3 beliebige Zahlenkarten | Summe der Zahlenwerte | Zahlenwert > 13 → Explosion (−3 Punkte) |
| **Dreifach-Trank** | 3 Karten mit gleichem Zahlenwert | 10 Punkte fest | Stabiler Trank; explodiert nicht |
| **Reiner Trank** | 3 gleiche Farben | Summe + 3 Punkte | Stabiler Trank; explodiert nicht |
| **Perfekter Trank** | Summe ist genau 13 | 15 Punkte fest | Meistertrank |

---

## 🧠 Tipp
Kombiniere geschickt die Karten, um mächtige Tränke zu brauen, aber halte den Gesamtwert im Blick, sonst fliegt dir das Labor um die Ohren!
