/*
----- Dictionary (il8n) ---
*/
(function ($) {
    var _pe = window.pe || {
        fn: {}
    };
    _pe.dic = {
        get: function (key, state, mixin) {
            if (mixin != null) {
                return this.ind[key][state].replace('[MIXIN]', mixin);
            } else {
                return this.ind[key];
            }
            if (state != null) {
                return this.ind[key][state];
            } else {
                return this.ind[key];
            }
        },
/*
      @dictionary function : pe.dic.ago()
      @returns: a human readable time difference text
      */
        ago: function (time_value) {
            var delta, parsed_date, r, relative_to;
            parsed_date = pe.date.convert(time_value);
            relative_to = (arguments.length > 1 ? arguments[1] : new Date());
            delta = parseInt((relative_to.getTime() - parsed_date) / 1000);
            delta = delta + (relative_to.getTimezoneOffset() * 60);
            r = "";
            if (delta < 60) {
                r = this.get("%minute-ago");
            } else if (delta < 120) {
                r = this.get("%couple-of-minutes");
            } else if (delta < (45 * 60)) {
                r = this.get("%minutes-ago", "mixin", (parseInt(delta / 60)).toString());
            } else if (delta < (90 * 60)) {
                r = this.get("%hour-ago");
            } else if (delta < (24 * 60 * 60)) {
                r = this.get("%hours-ago", "mixin", (parseInt(delta / 3600)).toString());
            } else if (delta < (48 * 60 * 60)) {
                r = this.get("%yesterday");
            } else {
                r = this.get("%days-ago", "mixin", (parseInt(delta / 86400)).toString());
            }
            return r;
        },
        ind: {
            "%top-of-page": "Haut de la page",
            "%you-are-in": "Vous êtes dans :",
            "%welcome-to": "Bienvenue à : " + $('#cn-site-title').text(),
            "%archived-page": "Cette page Web a ï¿½tï¿½ archivï¿½e dans le Web.",
            "%sub-menu-help": "(ouvrir le sous-menu avec la touche de la fleche descendante)",
            "%tab-rotation": {
                "disable": "Arrï¿½ter la rotation d'onglets",
                "enable": "Lancer la rotation d'onglets"
            },
            "%search": "Recherche",
            "%search-for-terms" : "Recherche de terme(s) :",
            "%no-match-found" : "Aucune correspondance trouvée",
            "%matches-found" : {
                 "mixin": "[MIXIN] correspondance(s) trouvées"
            },
            "%menu": "Menu",
            "%play": "Jouer",
            "%stop": "Pause",
            "%close": "Fermer",
            "%rewind": "Reculer ",
            "%next" : "Prochaine",
            "%previous" : "Précedent",
            "%fast-forward": "Avancer ",
            "%mute": {
                "enable": "Activer le mode muet",
                "disable": "DÃ©sactiver le mode muet"
            },
            "%closed-caption": {
                "disable": "Masquer le sous-titrage",
                "enable": "Afficher le sous-titrage"
            },
            "%audio-description": {
                "enable": "Activer l'audiodescription",
                "disable": "DÃ©sactiver l'audiodescription"
            },
            "%progress-bar": "utilisez les touches GAUCHE ou DROITE pour avancer ou reculer le progrï¿½s des mï¿½dias",
            "%no-video": "Votre navigateur ne semble pas avoir les capacitï¿½ nï¿½cessaires pour lire cette vidï¿½o, s'il vous plaï¿½t tï¿½lï¿½charger la vidï¿½o ci-dessous",
            "%position": "Position actuelle : ",
            "%duration": "Temps total : ",
            "%buffered": "Mis en mï¿½moire-tampon : ",
            "%minute-ago": "il ya une minute",
            "%couple-of-minutes": "il ya quelques minutes",
            "%minutes-ago": {
                "mixin": "il ya [MIXIN] minutes"
            },
            "%hour-ago": "il ya une heure",
            "%hours-ago": {
                "mixin": "il ya [MIXIN] heures"
            },
            "%days-ago": {
                "mixin": "il ya [MIXIN] jours"
            },
            "%yesterday": "hier"
        }
    };
    window.pe = _pe;
    _pe.dance();
    return _pe;
})(jQuery);