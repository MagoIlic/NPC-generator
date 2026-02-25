const npc_aventurero= {

    // --- 1. SPELLCASTERS ---
    "spellcaster_Divino": {
        profesiones: [
            "Acólito itinerante de una fe olvidada", "Vigía de reliquias sagradas", 
            "Sanador de hospicio urbano", "Misionero de tierras salvajes", 
            "Exorcista de nivel bajo", "Predicador de plazas y mercados", 
            "Capellán militar en reserva", "Ermitaño devoto de la luz", 
            "Buscador de iconografía sagrada", "Purificador de cementerios"
        ],

        especial:["Rezo curativo: Puede curar 6HP + Nivel"],
        cantrips_ataque: ["Sacred Flame", "Word of Radiance", "Toll the Dead"],
        cantrips_utilidad: ["Guidance", "Thaumaturgy", "Light", "Resistance"],
        
        hechizos_lvl1: ["Cure Wounds", "Bless", "Guiding Bolt", "Shield of Faith", "Inflict Wounds", "Ceremony", "Detect Evil and Good","Detect Poison and Disease", "Protection from Evil and Good", "Purify Food and Drink", "Sanctuary"],
        hechizos_lvl2: ["Lesser Restoration", "Spiritual Weapon", "Calm Emotions", "Aid", "Enhance Ability", "Prayer of Healing"],
        hechizos_lvl3: ["Revivify", "Aura of Vitality", "Dispel Magic", "Create Food and Water", "Daylight", "Glyph of Warding", "Magic Circle", "Meld into Stone"],

        equipo_progresivo: {
            bajo: { // Nivel 1-3
                arma: ["Maza de madera reforzada", "Hoz de hierro", "Garrote de roble"],
                items: ["Símbolo sagrado de madera", "Libro de rezos manchado", "Vendas limpias", "Rosario de cuentas"],
                ropa: "Túnica de lino con el símbolo de la fe"
            },
            medio: { // Nivel 4-7
                arma: ["Maza de acero pulido", "Mangual de latón", "Escudo de madera reforzado"],
                items: ["Símbolo sagrado de plata", "Relicario pequeño", "2 Pociones de curación", "Incienso bendecido"],
                ropa: "Hábito clerical reforzado con cuero"
            },
            alto: { // Nivel 8-10
                arma: ["Maza de guerra encantada", "Cetro de mando menor"],
                items: ["Símbolo sagrado de oro y gemas", "Cáliz ritual de plata", "Agua bendita superior", "Pergamino de plegaria"],
                ropa: "Túnica ceremonial de seda pesada"
            }
        }
    },
    "spellcaster_Naturaleza": {
        profesiones: [
            "Cuidador de la arboleda sagrada", "Herborista de pantanos profundos", 
            "Voz de la selva virgen", "Ermitaño totémico", 
            "Protector de manantiales", "Chamán de una tribu nómada", 
            "Observador de círculos de piedra", "Rastreador de climas extremos", 
            "Sanador de bestias heridas", "Guía espiritual de los bosques"
        ],
        especial:["Transformación en animal: 1 vez al día se puede transformar en una bestia de CR Nivel/4"],
        cantrips_ataque: ["Produce Flame", "Shillelagh", "Thorn Whip", "Primal Savagery", "Frostbite", "Poison Spray"],
        cantrips_utilidad: ["Druidcraft", "Guidance", "Mending", "Shape Water", "Resistance", "Mold Earth", "Gust", "Create Bonfire"],
        
        hechizos_lvl1: ["Entangle", "Cure Wounds", "Create or Destroy Water", "Goodberry", "Animal Friendship", "Absorb Elements", "Detect Magic", "Earth Tremor", "Faerie Fire", "Fog Cloud", "Snare"],
        hechizos_lvl2: ["Spike Growth", "Barkskin", "Heat Metal", "Air Bubble", "Animal Messenger", "Darkvision", "Earthbind", "Gust of Wind", "Lesser Restoration"],
        hechizos_lvl3: ["Aura of Vitality", "Sleet Storm", "Conjure Animals", "Plant Growth", "Daylight", "Erupting Earth", "Revivify", "Water Breathing", "Water Walk"],

        equipo_progresivo: {
            bajo: { // Nivel 1-3
                arma: ["Bastón de fresno", "Cimitarra de pedernal", "Daga de hueso"],
                items: ["Talismán de plumas y garras", "Bolsa de semillas", "Cuerno de agua", "Morral de cuero"],
                ropa: "Ropas de lana basta con trozos de corteza"
            },
            medio: { // Nivel 4-7
                arma: ["Cimitarra de bronce antiguo", "Vara de madera férrea"],
                items: ["Foco de muérdago sagrado", "Kit de herboristería", "Bolsa de bayas raras", "Máscara de madera"],
                ropa: "Capucha de piel de animal y túnica verde"
            },
            alto: { // Nivel 8-10
                arma: ["Cimitarra de acero verde", "Báculo de la naturaleza"],
                items: ["Tótem tallado en colmillo de monstruo", "Poción de resistencia", "Gema elemental de tierra", "Atrapasueños ritual"],
                ropa: "Manto de hojas perennes y piel de depredador"
            }
        }
    },
    "spellcaster_Arcano": {
        // 10 Profesiones específicas para este arquetipo
        profesiones: [
            "Estudiante expulsado de la academia", "Apostador de trucos callejeros", 
            "Escriba de pergaminos prohibidos", "Heredero de un linaje latente", 
            "Bibliotecario de tomos arcanos", "Ex-tutor de hijos nobles", 
            "Buscador de reliquias místicas", "Teórico de la urdimbre", 
            "Aprendiz de un mago ermitaño", "Falsificador de sellos mágicos"
        ],
        especial:["Recuperación Arcana: Puede recuperar Nivel/3 usos de hechizos diarios (redondeado hacia abajo)"],

        // Pools de Hechizos
        cantrips_ataque: ["Acid Splash", "Chill Touch", "Ray of Frost", "Shocking Grasp", "Mind Sliver", "Frostbite", "Poison Spray"],
        cantrips_utilidad: ["Mage Hand", "Prestidigitation", "Minor Illusion", "Light", "Minor Illusion", "Message", "Mending"],
        
        // Hechizos por nivel de conjuro
        hechizos_lvl1: ["Shield", "Magic Missile", "Thunderwave", "Sleep", "Mage Armor", "Catapult", "Color Spray", "Ice Knife", "Identify", "Tasha's Hideous Laughter"],
        hechizos_lvl2: ["Misty Step", "Scorching Ray", "Mirror Image", "Hold Person", "Arcane Lock", "Blur", "Cloud of Daggers", "Darkvision","Dragon's Breath", "Knock","Levitate"],
        hechizos_lvl3: ["Blink", "Catnap", "Dispel Magic", "Fly", "Glyph of Warding", "Hypnotic Pattern", "Leomud's Tiny Hut", "Sending", "Sleet Storm", "Thunder Step", "Tidal Wave"],

        // Equipo por Nivel (Calidad progresiva)
        equipo_progresivo: {
            bajo: { // Nivel 1-3
                arma: ["Daga", "Bastón de madera de fresno"],
                items: ["Bolsa de componentes", "Tinta y 3 pergaminos", "Libro de notas", "Vial de cristal"],
                ropa: "Túnica de lino sencilla"
            },
            medio: { // Nivel 4-7
                arma: ["Daga de acero rúnico", "Vara de cristal tallado"],
                items: ["Foco arcano de amatista", "Grimorio de cuero", "2 Pociones de curación", "Perla de 100po"],
                ropa: "Túnica de seda reforzada"
            },
            alto: { // Nivel 8-10
                arma: ["Vara de poder menor", "Daga de plata encantada"],
                items: ["Grimorio encuadernado en hierro", "Poción de invisibilidad", "Pergamino de nivel 3", "Anillo de latón (foco)"],
                ropa: "Túnica de archimago menor"
            }
        }
    },

    // --- 2. COMBATE + SPELLS ---
"hibrido_Paladin": {
        profesiones: [
            "Iniciado de una orden de caballería", "Escudero bajo juramento", 
            "Brazo ejecutor de la fe", "Caballero mendicante itinerante", 
            "Justiciero de caminos", "Vigilante de reliquias de guerra", 
            "Ex-mercenario arrepentido", "Protector de peregrinos", 
            "Heraldo de una deidad guerrera", "Cazador de sombras sagrado"
        ],
        // No suelen usar cantrips (según reglas clásicas), pero les daremos 1 de utilidad
        cantrips_utilidad: ["Guidance", "Light"],
        especial: ["Imposición de Manos: Puede curar 3HP + Nivel"],
        
        hechizos_lvl1: ["Searing Smite", "Bless", "Heroism", "Shield of Faith", "Compelled Duel"],
        hechizos_lvl2: ["Aid", "Branding Smite", "Lesser Restoration", "Find Steed", "Gentle Repose","Magic Weapon", "Prayer of Healing", "Zone of Truth"],

        equipo_progresivo: {
            bajo: { // Nivel 1-3
                arma: ["Martillo de guerra de hierro", "Espada larga abollada"],
                items: ["Escudo de madera con emblema", "Símbolo sagrado de cobre", "Tabardo con los colores de su orden"],
                ropa: "Cota de malla oxidada o gastada"
            },
            medio: { // Nivel 4-7
                arma: ["Mayordomo de acero", "Gran espada de oficial"],
                items: ["Escudo de acero pulido", "Símbolo sagrado de plata", "Capa de la orden"],
                ropa: "Armadura de placas y malla (Splint)"
            },
            alto: { // Nivel 8-10
                arma: ["Martillo de guerra bendecido", "Lanza de caballería grabada"],
                items: ["Escudo pesado reforzado", "Relicario de oro", "Cinturón de gran hebilla"],
                ropa: "Armadura de placas completa (Full Plate) grabada"
            }
        }
    },
    "hibrido_Ranger": {
        profesiones: [
            "Rastreador de fronteras", "Cazador de monstruos novato", 
            "Guía de tierras salvajes", "Acechador de bosques profundos", 
            "Explorador de la guardia real", "Vigía de pasos de montaña", 
            "Cazador de pieles exóticas", "Protector de senderos", 
            "Mercenario de jungla", "Errante del desierto"
        ],
        cantrips_utilidad: ["Guidance", "Light"],
        especial: ["Cazador: Ventaja en pruebas de rastreo; al comienzo del combate elige a un enemigo y se vuelve su presa, +(Nivel/2) al ataque y daño contra la presa (min 1); Si la presa queda inconsciente, puede elegir otra."],
        
        hechizos_lvl1: ["Hunter's Mark", "Ensnaring Strike", "Goodberry", "Fog Cloud", "Longstrider", "Absorb Elements", "Alarm", "Entangle", "Hail of Thorns"],
        hechizos_lvl2: ["Pass without Trace", "Spike Growth", "Silence", "Darkvision","Aid", "Animal Messenger", "Barkskin", "Cordon of Arrows", "Find Traps", "Lesser Restoration", "Magic Weapon", "Summon Beast"],

        equipo_progresivo: {
            bajo: { // Nivel 1-3
                arma: ["Arco corto", "Dos espadas cortas de caza"],
                items: ["Carcaj de piel de lobo", "Trampa de oso", "Odre de cuero", "Cuerda de cáñamo"],
                ropa: "Cuero endurecido y capa de viaje de lana"
            },
            medio: { // Nivel 4-7
                arma: ["Arco largo de tejo", "Cimitarra y espada corta"],
                items: ["Carcaj con 20 flechas", "Kit de herboristería", "Trofeo de caza menor"],
                ropa: "Armadura de cuero tachonado y capa de camuflaje"
            },
            alto: { // Nivel 8-10
                arma: ["Arco largo reforzado", "Dos hachas de mano de acero azul"],
                items: ["Flechas con punta de plata", "Capa de piel de monstruo", "Anteojos de latón"],
                ropa: "Armadura de escamas o cuero de criatura exótica"
            }
        }
    },

    // --- 3. COMBATE PURO ---
// --- ACTUALIZACIÓN COMBATE PURO ---

    "combate_Sigilo": {
        profesiones: [
            "Cortabolsas de los muelles", "Asaltante de caminos", "Agente de la red de sombras", 
            "Infiltrado de palacio", "Cazador de recompensas urbano", "Desvalijador de tumbas", 
            "Mensajero clandestino", "Falsificador de pruebas", "Asesino de baja estofa", "Pícaro de tejado"
        ],
        especial: {
            bajo: "Ataque Furtivo: +1d4 de daño si tiene ventaja.",
            medio: "Ataque Furtivo: +1d6 de daño si tiene ventaja. Evasión Simple: Rreacciona para reducir daño de área a la mitad.",
            alto: "Ataque Furtivo: +2d6 de daño si tiene ventaja. Evasión Simple: Reacciona para reducir daño de área a la mitad. Acción Astuta: Puede Esconderse como acción de movimiento."
        },
        equipo_progresivo: {
            bajo: { // Nivel 1-3
                arma: ["Daga oxidada", "Espada corta de hierro"],
                items: ["Herramientas de ladrón", "Capa con capucha", "Bolsa de abrojos (caltrops)", "Cuerda con gancho"],
                ropa: "Ropas oscuras y desgastadas de cuero ligero"
            },
            medio: { // Nivel 4-7
                arma: ["Ropera de acero", "Dagas de lanzamiento (x5)"],
                items: ["Vial de veneno básico", "Ganzúas de precisión", "Catalejo pequeño", "Guantes de ante"],
                ropa: "Armadura de cuero tachonado teñido de negro"
            },
            alto: { // Nivel 8-10
                arma: ["Ropera de duelo grabada", "Daga de cristal oscuro"],
                items: ["Cinturón de herramientas ocultas", "Vial de veneno paralizante", "Capa de seda de araña"],
                ropa: "Cuero de lujo reforzado con láminas de acero"
            }
        }
    },

    "combate_Barbaro": {
        profesiones: [
            "Desterrado de las tierras del norte", "Luchador de fosa ilegal", "Leñador de frontera furioso", 
            "Gladiador de circo", "Matón de sindicato criminal", "Cazador de bestias alfa", 
            "Protector de la tribu", "Saqueador de fronteras", "Mercenario de hacha pesada", "Rompefilas de la milicia"
        ],
        especial: {
            bajo: "Frenesí Menor: +2 al daño de fuerza, pero los enemigos tienen ventaja contra él.",
            medio: "Furia Tenaz: +2 al daño. Dureza: Resistencia a daño físico (Contundente, Perforante, Cortante).",
            alto: "Furia de Sangre: +3 al daño. Dureza:Resistencia a daño físico (Contundente, Perforante, Cortante). Sobreviviente: Si cae a 0 HP, puede hacer una salvación de Constitución (DC 10) para quedarse a 1 HP. Multiataque: 2 Ataques"
        },
        equipo_progresivo: {
            bajo: { // Nivel 1-3
                arma: ["Gran hacha de hierro", "Maza pesada de madera"],
                items: ["Trofeos de orejas o dientes", "Odre de aguardiente", "Pintura de guerra", "Collar de huesos"],
                ropa: "Pieles de animales y cinturones de cuero crudo"
            },
            medio: { // Nivel 4-7
                arma: ["Gran hacha de acero", "Mayal de guerra de dos manos"],
                items: ["Capa de piel de oso", "Piedra de afilar rústica", "Brazaletes de bronce"],
                ropa: "Pieles curtidas reforzadas con trozos de malla"
            },
            alto: { // Nivel 8-10
                arma: ["Gran hacha de doble filo encantada", "Martillo de guerra de piedra volcánica"],
                items: ["Tótem de animal de poder", "Cinturón de fuerza de gigante (estético)", "Capa de piel de monstruo"],
                ropa: "Pieles exóticas y coraza de cuero de dragón joven"
            }
        }
    },

    "combate_Monje": {
        profesiones: [
            "Novicio de un monasterio remoto", "Asceta viajero", "Buscador de la armonía interior", 
            "Ermitaño de las montañas", "Luchador callejero de manos desnudas", "Mensajero de templos sagrados", 
            "Guardián de manuscritos antiguos", "Ex-escolta de monjes", "Estudiante de artes marciales", "Vengador de honor"
        ],
        especial: {
            bajo: "Artes Marciales: 1d4. Reflejos Rápidos: Puede usar su reacción para reducir en 1d6 el daño de un proyectil.",
            medio: "Artes Marciales: 1d6. Reflejos Rápidos: Puede usar su reacción para reducir en 1d6 el daño de un proyectil. Golpe de Palma: Después de atacar, puede intentar empujar al enemigo 2 metros (Salvación de Fuerza). ",
            alto: "Artes Marciales: 1d8. Puños de Acero: Sus ataques desarmados cuentan como mágicos. Reflejos Rápidos: Puede usar su reacción para reducir en 1d6 el daño de un proyectil.  Golpe de Palma: Después de atacar, puede intentar empujar al enemigo 2 metros (Salvación de Fuerza). Multiataque: 2 Ataques"
        },
        equipo_progresivo: {
            bajo: { // Nivel 1-3
                arma: ["Bastón de madera de fresno", "Dardos de bambú (x10)"],
                items: ["Rosario de madera", "Cuenco de limosna", "Vendas para las manos", "Cinturón de cuerda"],
                ropa: "Túnica de lino simple y sandalias"
            },
            medio: { // Nivel 4-7
                arma: ["Bastón reforzado con hierro", "Nunchakus de acero"],
                items: ["Símbolo espiritual de jade", "Libro de mantras", "Incienso de meditación"],
                ropa: "Túnica de seda resistente con faja bordada"
            },
            alto: { // Nivel 8-10
                arma: ["Bastón de madera férrea grabada", "Guanteletes de cuero endurecido"],
                items: ["Reliquia de un maestro antiguo", "Viales de té de hierbas raras", "Pergamino de técnica secreta"],
                ropa: "Hábito de seda pesada de alta calidad"
            }
        }
    },

    "combate_Guerrero": {
        profesiones: [
            "Soldado veterano de mil guerras", "Capitán de la guardia urbana", "Mercenario de acero a sueldo", 
            "Duelista de renombre", "Guardia personal de nobles", "Instructor militar de reclutas", 
            "Caballero caído en desgracia", "Vigilante de caravanas de lujo", "Heraldo armado", "Campeón de torneos locales"
        ],
        especial: {
            bajo: "Entrenamiento Militar: Maestria de Armas (1) y +1 a las tiradas de ataque con esa arma.",
            medio: "Entrenamiento Militar: Maestria de Armas (2) y +1 a las tiradas de ataque con una de esas armas. Segundo Aliento: Puede recuperar 1d10 + nivel HP como acción adicional (1 vez al día)",
            alto: "Entrenamiento Militar:  Maestria de Armas (2) y +2 a las tiradas de ataque con una de esas armas. Segundo Aliento: Puede recuperar 1d10 + nivel HP como acción adicional (1 vez al día). Multiataque: 2 Ataques."
        },
        equipo_progresivo: {
            bajo: { // Nivel 1-3
                arma: ["Espada larga de hierro", "Lanza de infantería"],
                items: ["Escudo de madera reforzado", "Casco abollado", "Piedra de afilar", "Pañuelo de cuello"],
                ropa: "Camisote de malla (Chain shirt) o cuero tachonado"
            },
            medio: { // Nivel 4-7
                arma: ["Espada larga de acero templado", "Lucerna o pica"],
                items: ["Escudo de acero con blasón", "Guanteletes de metal", "Capa militar"],
                ropa: "Cota de malla completa (Chain mail) o armadura de bandas"
            },
            alto: { // Nivel 8-10
                arma: ["Espada de plata", "Maza de guerra de acero azul"],
                items: ["Escudo pesado de torre", "Gola de acero grabada", "Estandarte pequeño personal"],
                ropa: "Armadura de placas completa (Plate mail) bien mantenida"
            }
        }
    }
};
/* ==========================================================================
   STATBLOCKS BASE POR ARQUETIPO
   ========================================================================== */

const stats_spellcaster = {
    base: {
        melee_dado: "1d4",
        melee_tipo: "perforante", // Daga / Bastón
        range_dado: "1d4",
        range_tipo: "perforante", // Daga arrojadiza
        save_principales: ["Int", "Sab"]
    }
};

const stats_hibrido = {
    base: {
        melee_dado: "1d8",
        melee_tipo: "perforante/cortante", // Ropera / Espada larga
        range_dado: "1d6",
        range_tipo: "perforante", // Arco corto / Ballesta ligera
        save_principales: ["Des", "Car"]
    }
};
const stats_combate = {
    base: {
        melee_dado: "1d10",
        melee_tipo: "cortante/contundente", // Hacha de batalla / Mayal
        range_dado: "1d8",
        range_tipo: "perforante", // Ballesta pesada / Arco largo
        save_principales: ["Fue", "Con"]
    }
};

    /* ==========================================================================
       TABLA DE PROGRESIÓN GLOBAL (Referencia para lógica futura)
       ========================================================================== */
const progresion_global = {
    bajo:  {
        niveles: [1, 3],
        atk: {
            combate:     { melee: 4, range: 3, d: 120},
            hibrido:     { melee: 3, range: 2, d: 80},
            spellcaster: { melee: 2, range: 2, d: 20}
        },
        spell: {
            hibrido: 1,
            spellcaster: 4
        },
        salvaciones: { 
            combate: { principal: "Fue + 3, Con +3", Base: "Des +1, Int +1, Sab +1", Mala: "Car -2"}, 
            hibrido: { principal: "Des + 3, Car +3", Base: "Con +1, Fue +1, Sab +1", Mala: "Int -2"},
            spellcaster: { principal: "Int + 3, Sab +3", Base: "Con +1, Des +1, Car +1", Mala: "Fue -2"}
        },
        spells_day :{
            hibrido: {lvl1: 1, lvl2: 0},
            spellcaster: {lvl1: 2, lvl2: 0, lvl3: 0} 
        }
    },

    medio: {
        niveles: [4, 6],
        atk: {
            combate:     { melee: 6, range: 5, d: 120},
            hibrido:     { melee: 5, range: 4, d: 80 },
            spellcaster: { melee: 4, range: 4, d: 20 }
        },
        spell: {
            hibrido: 5,
            spellcaster: 6
        },
        salvaciones: { 
            combate: { principal: "Fue + 4, Con +4", Base: "Des +2, Int +2, Sab +2", Mala: "Car -2"},  
            hibrido: { principal: "Des + 4, Car +4", Base: "Con +2, Fue +2, Sab +2", Mala: "Int -2"},
            spellcaster: { principal: "Int + 4, Sab +4", Base: "Con +2, Des +2, Car +2", Mala: "Fue -2"}
        },
        spells_day :{
            hibrido: {lvl1: 1, lvl2: 0},
            spellcaster: {lvl1: 2, lvl2: 1, lvl3: 0} 
        }
    },

    alto: {
        niveles: [7, 9],
        atk: {
            combate:     { melee: 8, range: 6, d: 120 },
            hibrido:     { melee: 6, range: 5, d: 80 },
            spellcaster: { melee: 5, range: 5, d: 20 }
        },
        spell: {
            hibrido: 5,
            spellcaster: 8
        },
        salvaciones: { 
            combate: { principal: "Fue + 5, Con +5", Base: "Des +3, Int +3, Sab +3", Mala: "Car -1"}, 
            hibrido: { principal: "Des + 5, Car +5", Base: "Con +3, Fue +3, Sab +3", Mala: "Int -1"},
            spellcaster: { principal: "Int + 5, Sab +5", Base: "Con +3, Des +3, Car +3", Mala: "Fue -1"}
        },
        spells_day :{
            hibrido: {lvl1: 2, lvl2: 1},
            spellcaster: {lvl1 :3, lvl2: 1, lvl3: 1} 
        }
    },

    max: {
        niveles: [10, 10],
        atk: {
            combate:     { melee: 9, range: 7, d: 120 },
            hibrido:     { melee: 8, range: 6, d: 80 },
            spellcaster: { melee: 5, range: 5, d: 20 }
        },
        spell: {
            hibrido: 6,
            spellcaster: 9
        },
        salvaciones: { 
            combate: { principal: "Fue + 6, Con +6", Base: "Des +3, Int +3, Sab +3", Mala: "Car -1"}, 
            hibrido: { principal: "Des + 6, Car +6", Base: "Con +3, Fue +3, Sab +3", Mala: "Int -1"},
            spellcaster: { principal: "Int + 6, Sab +6", Base: "Con +3, Des +3, Car +3", Mala: "Fue -1"}
        },
        spells_day :{
            hibrido: {lvl1: 3, lvl2: 2},
            spellcaster: {lvl1 :3, lvl2: 2, lvl3: 1} 
        }
    }
};

