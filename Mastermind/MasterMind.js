var MasterMindJS = { //Objet MastermindJS, les options sont variables ainsi on pourra augmenter la difficulté du jeu
    name: 'MasterMindJS',
    colors: {
        1: '#000000', // noir
        2: '#FFFFFF', // blanc
        3: '#CC3333', // rouge
        4: '#ff9600', // orange
        5: '#fff000', // jaune
        6: '#0005c2', // bleu
        },
        
        settings: {
        lines: 12, // lignes disponibles pour arriver au résultat
        columns: 4, // colonnes de couleurs
        colors: 6, // couleurs disponibles
        },
        
        game: {
        turn: 1, // tour en cours
        column: 1, // colonne en cours
        selection: new Array(), // sélection de couleur du joueur
        soluce: new Array(), // solution de la partie
        },

        initialise: function() { //appelée une fois, directement au lancement de la fenêtre
            this.startGame();
            },

        startGame: function() { //lance le début d'une partie avec l'affichage du plateau, remise à 0 de la partie et définition d'une solution
                this.drawGameBoard();
                this.resetGame();
                this.defineSoluce();
                },

        drawGameBoard: function() {
            board = document.getElementById('plateau');
            board.innerHTML = '';
            
            for (i = this.settings['lines']; i>0; i--) {
            
                //définition d'une ligne
            line = document.createElement('tr');
            line.id = 'turn-'+i;
            
                //définition d'une cellule du tableau
            cell = document.createElement('td');
            cell.innerHTML = i;
            cell.style.width = '32px';
            line.appendChild(cell);
            
            //les cellules où l'on rentre nos valeurs
            for (j = 1; j <= this.settings['columns']; j++) { 
            cell = document.createElement('td');
            cell.innerHTML = '';
            cell.id = 'turn-'+i+'-'+j;
            cell.style.width = '32px';
            cell.setAttribute('onclick', this.name+'.selectColumn('+i+', '+j+');');
            line.appendChild(cell);
            }
            
            // les cellules de résultat à droite !!!
            for (j = 1; j <= this.settings['columns']; j++) { 
            cell = document.createElement('td');
            cell.innerHTML = '';
            cell.id = 'result-'+i+'-'+j;
            cell.style.width = '16px';
            line.appendChild(cell);
            }
            
            //je sais pas
            cell = document.createElement('td');
            cell.innerHTML = 'OK';
            cell.id = 'valid-'+i;
            cell.className = 'valid';
            cell.style.width = '16px';
            cell.setAttribute('onclick', this.name+'.checkLine('+i+');');
            line.appendChild(cell);
            
            board.appendChild(line);
            }
            
            colorSelector = document.getElementById('colorSelector');
            colorSelector.innerHTML = '';
            
            //les couleurs que l'on selectionne
            line = document.createElement('tr');
            for (i=1; i <= this.settings['colors']; i++) {
            cell = document.createElement('td');
            cell.innerHTML = '';
            cell.style.width = '32px';
            line.appendChild(cell);
            
            //les pions
            pion = document.createElement('div');
            pion.className = 'pion';
            pion.style.background = this.colors[i];
            pion.setAttribute('onclick', this.name+'.selectColor('+i+');');
            cell.appendChild(pion);
            }
            colorSelector.appendChild(line);
            },

            //remise à zero du jeu
            resetGame: function() {
                this.game['turn'] = 1;
                this.game['column'] = 1;
                
                document.getElementById('turn-1').className = 'selected';
                document.getElementById('turn-1-1').className = 'selected';
                },

                //solution aléatoire de couleurs à définir
            defineSoluce: function() {
                this.game['soluce'] = new Array();
                for (i = 1; i <= this.settings['columns']; i++) {
                color = parseInt(Math.random()*this.settings['colors'])+1;
                this.game['soluce'][i] = color;
                  }
                },

            selectColor: function(color) {
                /* Verifie si la partie est toujours active */
                if (this.game['turn'] == -1) {
                return;
                }
                
                /* Retire la precedente selection si elle existe */
                document.getElementById('turn-'+this.game['turn']+'-'+this.game['column']).innerHTML = '';
                
                /* Ajoute la couleur a la selection faite par le joueur */
                this.game['selection'][this.game['column']] = color;
                
                /* Ajoute visuellement la couleur sur le plateau */
                pion = document.createElement('div');
                pion.className = 'pion';
                pion.style.background = this.colors[color];
                document.getElementById('turn-'+this.game['turn']+'-'+this.game['column']).appendChild(pion);
                
                /* Retire le marquage visuel de la case courante */
                document.getElementById('turn-'+this.game['turn']+'-'+this.game['column']).className = '';
                
                /* Verifie que le curseur n est pas sur la derniere case */
                if (this.game['column'] == this.settings['columns']) {
                /* Place le curseur a la premiere case */
                this.game['column'] = 1;
                } else {
                /* Deplace le curseur du joueur sur la case suivante */
                this.game['column'] ++;
                }
                
                /* Ajoute le marquage visuel sur la nouvelle case courante */
                document.getElementById('turn-'+this.game['turn']+'-'+this.game['column']).className = 'selected';
                },

                //permet de cliquer sur une case poru chosir où l'on place notre pion
            selectColumn: function(line, column) {
                /* Verifie si la ligne est bien la ligne courante, verifie en meme temps, si la partie est toujours active */
                if (line != this.game['turn']) {
                return;
                }
                    
                /* Retire le marquage visuel de la case courante */
                document.getElementById('turn-'+line+'-'+this.game['column']).className = '';
                    
                /* Selectionne la nouvelle colonne */
                this.game['column'] = column;
                    
                /* Applique le marquage visuel sur la nouvelle case courante */
                document.getElementById('turn-'+line+'-'+this.game['column']).className = 'selected';
                },

            //méthode pour vérifier que les pions placés sont corrects, donc équivalents aux couleurs choisies par defineSoluce
            checkLine: function(line) {
                /* Verifie si la ligne est bien la ligne courante, verifie en meme temps, si la partie est toujours active */
                if (line != this.game['turn']) {
                return;
                }
                
                /* Verifie que la ligne a ete entierement remplie par le joueur */
                for (i = 1; i <= this.settings['columns']; i++) {
                if (!this.game['selection'][i]) {
                return;
                }
                }
                
                /* Duplique la solution pour pouvoir la modifier sans alterer l originale */
                soluce = this.game['soluce'].slice(0);
                
                /* Initialise les variables de verification */
                correct = 0;
                misplaced = 0;
                
                /* Verifie les pions bien places */
                for (i = 1; i <= this.settings['columns']; i++) {
                if (this.game['selection'][i] == soluce[i]) {
                correct++;
                soluce[i] = 0;
                this.game['selection'][i] = 0;
                }
                }
                
                /* Verifie si tous les pions sont biens places, et auquel cas, afficher la victoire */
                if (correct == this.settings['columns']) {
                /* Utilise un return pour sortir de la method et ne pas continuer la verification */
                return this.displayWin();
                }
                
                /* Verifie les pions mal places, parmi les pions restant */
                for (i = 1; i <= this.settings['columns']; i++) {
                if (this.game['selection'][i] == 0) {
                continue;
                }
                loc = soluce.indexOf(this.game['selection'][i]);
                
                if (loc != -1) {
                this.game['selection'][i] = 0;
                soluce[loc] = 0;
                misplaced++;
                }
                }
                
                /* Affiche le bon nombre de pions bien places */
                for (i = 1; i <= correct; i++) {
                pion = document.createElement('div');
                pion.className = 'correct';
                document.getElementById('result-'+this.game['turn']+'-'+i).appendChild(pion);
                }
                
                /* Affiche le bon nombre de pions mal places */
                for (j = i; j < i+misplaced; j++) {
                pion = document.createElement('div');
                pion.className = 'misplaced';
                document.getElementById('result-'+this.game['turn']+'-'+j).appendChild(pion);
                }
                
                /* Prepare le jeu pour le tour suivant */
                
                /* Re-initialise la selection du joueur */
                this.game['selection'] = new Array();
                
                /* Retire le marquage visuel de la ligne courante  */
                document.getElementById('turn-'+this.game['turn']).className = '';
                
                /* Verifie que la ligne n etait pas la derniere, si auquel cas, afficher la defaite */
                if (this.game['turn'] == this.settings['lines']) {
                /* Utilise un return pour sortir de la method et ne pas continuer la verification */
                return this.displayLose();
                }
                
                /* Deplace le curseur sur la ligne suivante */
                this.game['turn'] ++;
                
                /* Applique le marquage sur la nouvelle ligne courante */
                document.getElementById('turn-'+this.game['turn']).className = 'selected';
                
                /* Place le curseur sur la premiere case */
                this.game['column'] = 1;
                
                /* Applique le marquage sur la premiere case */
                document.getElementById('turn-'+this.game['turn']+'-1').className = 'selected';
                },
            
                //si on gagne
                displayWin: function() {
                    /* Affiche le resultat dans l espace dedie, en couleur */
                    document.getElementById('result').innerHTML = 'Gagné';
                    document.getElementById('result').style.color = '#43b456';
                    
                    /* Affiche le marquage specific a la victoire sur la ligne courante */
                    document.getElementById('turn-'+this.game['turn']).className = 'win';
                    
                    /* Marque la fin de la partie en indiquant une valeur null au tour en cours */
                    this.game['turn'] = -1;
                    },
                    
                //si on perd
                displayLose: function() {
                    /* Affiche le resultat dans l espace dedie, en couleur */
                    document.getElementById('result').innerHTML = 'Perdu';
                    document.getElementById('result').style.color = '#CC3333';
                    
                    /* Marque la fin de la partie en indiquant une valeur nulle au tour en cours */
                    this.game['turn'] = -1;
                    },
};