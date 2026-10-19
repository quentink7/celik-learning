# Génère la base d'exemple du cours SQL (boutique Nong-Taaba, Ouagadougou) -> courses/sql-data.js + boutique.db
import random, sqlite3, json, sys, os

OUT_JS = sys.argv[1]
OUT_DB = sys.argv[2]
rnd = random.Random(2026)

schema = """CREATE TABLE clients (
  id         INTEGER PRIMARY KEY,
  prenom     TEXT NOT NULL,
  nom        TEXT NOT NULL,
  ville      TEXT NOT NULL,
  quartier   TEXT,
  telephone  TEXT,
  inscrit_le TEXT NOT NULL
);
CREATE TABLE produits (
  id        INTEGER PRIMARY KEY,
  nom       TEXT NOT NULL,
  categorie TEXT NOT NULL,
  prix      INTEGER NOT NULL,
  stock     INTEGER NOT NULL
);
CREATE TABLE ventes (
  id         INTEGER PRIMARY KEY,
  client_id  INTEGER REFERENCES clients(id),
  produit_id INTEGER NOT NULL REFERENCES produits(id),
  quantite   INTEGER NOT NULL,
  date_vente TEXT NOT NULL,
  paiement   TEXT NOT NULL
);"""

# prénom, nom, ville, quartier (None = inconnu), téléphone ? , inscription
clients = [
 ("Awa","Ouédraogo","Ouagadougou","Pissy"),
 ("Moussa","Sawadogo","Ouagadougou","Tampouy"),
 ("Aminata","Traoré","Bobo-Dioulasso","Sarfalao"),
 ("Issouf","Kaboré","Ouagadougou","Gounghin"),
 ("Salimata","Compaoré","Koudougou",None),
 ("Boukary","Zongo","Ouagadougou","Dassasgho"),
 ("Fatimata","Ilboudo","Ouagadougou","Patte d'Oie"),
 ("Abdoul","Kinda","Ouahigouya",None),
 ("Mariam","Sanou","Bobo-Dioulasso","Accart-Ville"),
 ("Ousmane","Diallo","Ouagadougou","Zogona"),
 ("Rasmata","Ouattara","Banfora",None),
 ("Seydou","Coulibaly","Bobo-Dioulasso","Belleville"),
 ("Adama","Konaté","Ouagadougou","Ouaga 2000"),
 ("Clarisse","Yaméogo","Koudougou",None),
 ("Jean-Baptiste","Zoungrana","Ouagadougou","Tanghin"),
 ("Pascaline","Nikiéma","Ouagadougou","Wemtenga"),
 ("Hamidou","Bationo","Kaya",None),
 ("Noufou","Tapsoba","Ouagadougou","Cissin"),
 ("Alizèta","Sawadogo","Ouagadougou","Kalgondin"),
 ("Inoussa","Kaboré","Tenkodogo",None),
 ("Djénéba","Sanogo","Bobo-Dioulasso","Dogona"),
 ("Wendpouiré","Kaboré","Ouagadougou","Somgandé"),
 ("Nafissatou","Barry","Fada N'Gourma",None),
 ("Yacouba","Ouédraogo","Ouahigouya",None),
 ("Sylvie","Kiemdé","Ouagadougou","Pissy"),
 ("Arouna","Sana","Dédougou",None),
 ("Prisca","Somé","Ouagadougou","Gounghin"),
 ("Daouda","Ouattara","Banfora",None),
 ("Kadidia","Diarra","Ouagadougou","Tampouy"),
 ("Ibrahim","Guiro","Kaya",None),
]
# id : (sans téléphone)
no_phone = {5, 11, 17, 23, 28}
# clients qui n'achètent jamais
never_buy = {14, 26, 30}

produits = [
 ("Sac de riz 25 kg","Alimentation",17500,12),
 ("Bidon d'huile 5 L","Alimentation",6500,20),
 ("Sucre en morceaux 1 kg","Alimentation",800,45),
 ("Lait en poudre 500 g","Alimentation",2750,18),
 ("Spaghetti 500 g","Alimentation",400,60),
 ("Tomate concentrée","Alimentation",350,80),
 ("Soumbala 100 g","Alimentation",250,30),
 ("Thé vert","Alimentation",300,50),
 ("Bissap séché 500 g","Alimentation",1000,0),
 ("Farine de mil 1 kg","Alimentation",600,35),
 ("Savon en morceau","Soins",250,100),
 ("Lessive 1 kg","Soins",1200,25),
 ("Dentifrice","Soins",600,40),
 ("Beurre de karité 500 g","Soins",1500,15),
 ("Moustiquaire","Maison",3500,10),
 ("Lampe solaire","Maison",8500,6),
 ("Recharge gaz 6 kg","Maison",2000,0),
 ("Natte","Maison",3000,8),
 ("Pagne Faso Dan Fani","Textile",12000,7),
 ("Tee-shirt","Textile",2500,22),
 ("Cahier 100 pages","Fournitures",300,120),
 ("Stylo à bille","Fournitures",100,200),
 ("Cartable","Fournitures",5000,9),
 ("Recharge de crédit 1000","Mobile",1000,500),
 ("Chargeur de téléphone","Mobile",2000,14),
]
never_sold = {18, 23}  # Natte, Cartable

def phone(i):
    p = ["70","71","72","73","74","75","76","77","78","56","57","60","61","65","66"]
    return f"{rnd.choice(p)} {rnd.randint(10,99)} {rnd.randint(10,99)} {rnd.randint(10,99)}"

def date(y0, y1):
    y = rnd.randint(y0, y1); m = rnd.randint(1, 12 if y < 2026 else 9); d = rnd.randint(1, 28)
    return f"{y:04d}-{m:02d}-{d:02d}"

def q(v):
    if v is None: return "NULL"
    if isinstance(v, int): return str(v)
    return "'" + v.replace("'", "''") + "'"

rows_c = []
for i, (pr, nom, ville, quart) in enumerate(clients, 1):
    tel = None if i in no_phone else phone(i)
    rows_c.append((i, pr, nom, ville, quart, tel, date(2024, 2026)))

weights = {1:5, 2:6, 3:10, 4:6, 5:9, 6:8, 7:6, 8:8, 9:3, 10:5, 11:10, 12:6, 13:5, 14:4, 15:3, 16:2, 17:5, 19:2, 20:4, 21:7, 22:7, 24:12, 25:3}
pids = list(weights.keys()); pw = [weights[k] for k in pids]
buyers = [r[0] for r in rows_c if r[0] not in never_buy]
rows_v = []
dates = sorted(f"2026-{rnd.randint(1,9):02d}-{rnd.randint(1,28):02d}" for _ in range(160))
for vid, dv in enumerate(dates, 1):
    pid = rnd.choices(pids, pw)[0]
    cid = None if rnd.random() < 0.12 else rnd.choice(buyers)
    qmax = 2 if produits[pid-1][2] >= 5000 else 6
    qt = rnd.randint(1, qmax)
    pay = rnd.choices(["Espèces", "Orange Money", "Moov Money"], [45, 40, 15])[0]
    rows_v.append((vid, cid, pid, qt, dv, pay))

data = []
data.append("INSERT INTO clients VALUES\n" + ",\n".join("(" + ",".join(q(v) for v in r) + ")" for r in rows_c) + ";")
data.append("INSERT INTO produits VALUES\n" + ",\n".join("(" + ",".join(q(v) for v in (i, *p)) + ")" for i, p in enumerate(produits, 1)) + ";")
data.append("INSERT INTO ventes VALUES\n" + ",\n".join("(" + ",".join(q(v) for v in r) + ")" for r in rows_v) + ";")
data_sql = "\n".join(data)

# Variante : mêmes tables, données légèrement changées, pour qu'une réponse recopiée « en dur » ne passe pas.
variant = """UPDATE produits SET prix = prix + 50 WHERE id % 4 = 1;
UPDATE produits SET stock = stock + 3 WHERE id % 3 = 0;
DELETE FROM ventes WHERE id % 6 = 0;
UPDATE ventes SET quantite = quantite + 1 WHERE id % 5 = 2;
UPDATE ventes SET paiement = 'Orange Money' WHERE id % 11 = 3;
INSERT INTO clients (prenom, nom, ville, quartier, telephone, inscrit_le) VALUES
('Ali','Sawadogo','Ouagadougou','Pissy','76 40 52 61','2026-03-15'),
('Mariam','Zongo','Koudougou',NULL,NULL,'2025-11-02'),
('Hawa','Traoré','Bobo-Dioulasso','Sarfalao','70 18 33 94','2026-06-09');
INSERT INTO ventes (client_id, produit_id, quantite, date_vente, paiement) VALUES
(31, 3, 2, '2026-04-02', 'Orange Money'), (33, 24, 3, '2026-07-21', 'Espèces'), (2, 19, 1, '2026-08-30', 'Moov Money');"""

# base sqlite pour mes vérifications
if os.path.exists(OUT_DB): os.remove(OUT_DB)
con = sqlite3.connect(OUT_DB); con.executescript(schema + "\n" + data_sql); con.commit(); con.close()
con = sqlite3.connect(OUT_DB.replace(".db", "-variant.db"))
con.executescript("DROP TABLE IF EXISTS ventes; DROP TABLE IF EXISTS produits; DROP TABLE IF EXISTS clients;" + schema + "\n" + data_sql + "\n" + variant); con.commit(); con.close()

js = "/* Cours SQL : la base d'exemple, la boutique Nong-Taaba à Ouagadougou (données inventées). Généré par un script, ne pas éditer à la main. */\n"
js += "window.SQL_BASE = " + json.dumps({"schema": schema, "data": data_sql, "variant": variant}, ensure_ascii=False, indent=0) + ";\n"
open(OUT_JS, "w").write(js)
print(len(js), "octets ;", len(rows_c), "clients,", len(produits), "produits,", len(rows_v), "ventes")
