Mitroi Eduard Ionut
  
                        Proba tehnica - Backend
                        
Rulare aplicatie:
    1) adauga un fisier .env in care adaugi ACCESS_TOKEN_SECRET pentru jwt.
    Valoare pentru token o poti obtine ruland in node comanda:
    require('crypto').randomBytes(64).toString('hex')
    Ex: 41cad8704b4014375a2ce496756bdccd968d8e8c3742f2b40a8aa9cb8e0eab05b9557513b0c80fd46894719887eb1b55d46caecf2a3f7ee27162954a020cfa57

    2) npm install - instaleaza pachetele necesare
    
    3) mongod - porneste baza de date
    
    4) node app.js - porneste aplicatia
  
Implementare:
  Am impartit implementarea in probei in 3 foldere:
    -> routes - contine routele
    -> models - contine schemele entitatilor
    -> middleware - contine functii de validare pentru autentificare si autorizare
  
  Pentru enrolments, nu am creat o entitate nou, ci doar am realizat o relatie 
  many-to-many, o clasa avand un array de studenti si studentii avand un array de
  clase. In cazurile in care am adaugat intr-o entitate un array de obiecte, am 
  populat obiectul pentru a putea vedea in clar continutul array-ului, nu doar id-ul.
  
  Partea cea mai grea a probei a fost realizarea autentificarii si sa inteleg cum
  functioneaza JWT token, care a fost metoda pe care am ales-o pentru a implementa
  autentificare si autorizare. Pentru a realiza autorizarea pentru rutele la care
  un singur rol le putea accesa, am considerat ca token se afla in headers ->
  Authorization -> Bearer token_jwt.

 
 
