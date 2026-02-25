const npc_aventurero= {

    // --- 1. SPELLCASTERS ---
    "spellcaster_Divino": {
        profesiones: [
            "Wandering acolyte of a forgotten faith", "Watcher of sacred relics",
            "Urban hospice healer", "Missionary of the wild lands",
            "Low-rank exorcist", "Preacher of squares and marketplaces",
            "Reserve military chaplain", "Hermit devoted to the Light",
            "Seeker of sacred iconography", "Cemetery purifier"
        ],

        especial:["Healing prayer: Can heal 6 HP + Level"],
        cantrips_ataque: ["Sacred Flame", "Word of Radiance", "Toll the Dead"],
        cantrips_utilidad: ["Guidance", "Thaumaturgy", "Light", "Resistance"],

        hechizos_lvl1: ["Cure Wounds", "Bless", "Guiding Bolt", "Shield of Faith", "Inflict Wounds", "Ceremony", "Detect Evil and Good","Detect Poison and Disease", "Protection from Evil and Good", "Purify Food and Drink", "Sanctuary"],
        hechizos_lvl2: ["Lesser Restoration", "Spiritual Weapon", "Calm Emotions", "Aid", "Enhance Ability", "Prayer of Healing"],
        hechizos_lvl3: ["Revivify", "Aura of Vitality", "Dispel Magic", "Create Food and Water", "Daylight", "Glyph of Warding", "Magic Circle", "Meld into Stone"],

        equipo_progresivo: {

            bajo: { // Level 1-3
                arma: ["Reinforced wooden mace", "Iron sickle", "Oak club"],
                items: ["Wooden holy symbol", "Stained prayer book", "Clean bandages", "Bead rosary"],
                ropa: "Linen tunic with the symbol of the faith"
            },

            medio: { // Level 4-7
                arma: ["Polished steel mace", "Brass flail", "Reinforced wooden shield"],
                items: ["Silver holy symbol", "Small reliquary", "2 healing potions", "Blessed incense"],
                ropa: "Clerical habit reinforced with leather"
            },

            alto: { // Level 8-10
                arma: ["Enchanted war mace", "Minor scepter of command"],
                items: ["Gold-and-gem holy symbol", "Silver ritual chalice", "Greater holy water", "Prayer scroll"],
                ropa: "Heavy silk ceremonial robe"
            }
        }
    },

    "spellcaster_Naturaleza": {

        profesiones: [
            "Keeper of the sacred grove", "Deep-swamp herbalist",
            "Voice of the primeval jungle", "Totemic hermit",
            "Spring guardian", "Shaman of a nomadic tribe",
            "Watcher of stone circles", "Tracker of extreme climates",
            "Healer of wounded beasts", "Spiritual guide of the woods"
        ],

        especial:["Beast transformation: Once per day can transform into a beast of CR Level/4"],
        cantrips_ataque: ["Produce Flame", "Shillelagh", "Thorn Whip", "Primal Savagery", "Frostbite", "Poison Spray"],
        cantrips_utilidad: ["Druidcraft", "Guidance", "Mending", "Shape Water", "Resistance", "Mold Earth", "Gust", "Create Bonfire"],

        hechizos_lvl1: ["Entangle", "Cure Wounds", "Create or Destroy Water", "Goodberry", "Animal Friendship", "Absorb Elements", "Detect Magic", "Earth Tremor", "Faerie Fire", "Fog Cloud", "Snare"],
        hechizos_lvl2: ["Spike Growth", "Barkskin", "Heat Metal", "Air Bubble", "Animal Messenger", "Darkvision", "Earthbind", "Gust of Wind", "Lesser Restoration"],
        hechizos_lvl3: ["Aura of Vitality", "Sleet Storm", "Conjure Animals", "Plant Growth", "Daylight", "Erupting Earth", "Revivify", "Water Breathing", "Water Walk"],

        equipo_progresivo: {

            bajo: { // Level 1-3
                arma: ["Ash staff", "Flint scimitar", "Bone dagger"],
                items: ["Feather-and-claw talisman", "Seed pouch", "Water horn", "Leather satchel"],
                ropa: "Coarse wool clothes with strips of bark"
            },

            medio: { // Level 4-7
                arma: ["Ancient bronze scimitar", "Hardwood rod"],
                items: ["Sacred mistletoe focus", "Herbalism kit", "Bag of rare berries", "Wooden mask"],
                ropa: "Animal-hide hood and green tunic"
            },

            alto: { // Level 8-10
                arma: ["Green steel scimitar", "Staff of nature"],
                items: ["Totem carved from a monster tusk", "Potion of resistance", "Earth elemental gem", "Ritual dreamcatcher"],
                ropa: "Cloak of evergreen leaves and predator hide"
            }
        }
    },

    "spellcaster_Arcano": {

        // 10 specific professions for this archetype
        profesiones: [
            "Expelled academy student", "Street-trick gambler",
            "Scribe of forbidden scrolls", "Heir to a latent bloodline",
            "Librarian of arcane tomes", "Former tutor to noble children",
            "Seeker of mystical relics", "Weave theorist",
            "Apprentice to a hermit mage", "Forger of magical seals"
        ],

        especial:["Arcane Recovery: Can recover Level/3 daily spell uses (rounded down)"],

        // Spell pools
        cantrips_ataque: ["Acid Splash", "Chill Touch", "Ray of Frost", "Shocking Grasp", "Mind Sliver", "Frostbite", "Poison Spray"],
        cantrips_utilidad: ["Mage Hand", "Prestidigitation", "Minor Illusion", "Light", "Minor Illusion", "Message", "Mending"],

        // Spells by spell level
        hechizos_lvl1: ["Shield", "Magic Missile", "Thunderwave", "Sleep", "Mage Armor", "Catapult", "Color Spray", "Ice Knife", "Identify", "Tasha's Hideous Laughter"],
        hechizos_lvl2: ["Misty Step", "Scorching Ray", "Mirror Image", "Hold Person", "Arcane Lock", "Blur", "Cloud of Daggers", "Darkvision","Dragon's Breath", "Knock","Levitate"],
        hechizos_lvl3: ["Blink", "Catnap", "Dispel Magic", "Fly", "Glyph of Warding", "Hypnotic Pattern", "Leomud's Tiny Hut", "Sending", "Sleet Storm", "Thunder Step", "Tidal Wave"],

        // Gear by level (progressive quality)
        equipo_progresivo: {

            bajo: { // Level 1-3
                arma: ["Dagger", "Ash-wood staff"],
                items: ["Component pouch", "Ink and 3 scrolls", "Notebook", "Glass vial"],
                ropa: "Simple linen robe"
            },

            medio: { // Level 4-7
                arma: ["Runic steel dagger", "Carved crystal wand"],
                items: ["Amethyst arcane focus", "Leather grimoire", "2 healing potions", "Pearl worth 100 gp"],
                ropa: "Reinforced silk robe"
            },

            alto: { // Level 8-10
                arma: ["Minor rod of power", "Enchanted silver dagger"],
                items: ["Iron-bound grimoire", "Potion of invisibility", "3rd-level scroll", "Brass ring (focus)"],
                ropa: "Minor archmage robe"
            }
        }
    },

    // --- 2. COMBAT + SPELLS ---
    "hibrido_Paladin": {

        profesiones: [
            "Initiate of a chivalric order", "Squire under oath",
            "Enforcing arm of the faith", "Beggar-knight on the road",
            "Highway vigilante", "Watcher of war relics",
            "Repentant ex-mercenary", "Protector of pilgrims",
            "Herald of a war deity", "Sacred shadow hunter"
        ],

        // They usually don't use cantrips (by classic rules), but we'll give 1 utility cantrip
        cantrips_utilidad: ["Guidance", "Light"],

        especial: ["Lay on Hands: Can heal 3 HP + Level"],

        hechizos_lvl1: ["Searing Smite", "Bless", "Heroism", "Shield of Faith", "Compelled Duel"],
        hechizos_lvl2: ["Aid", "Branding Smite", "Lesser Restoration", "Find Steed", "Gentle Repose","Magic Weapon", "Prayer of Healing", "Zone of Truth"],

        equipo_progresivo: {

            bajo: { // Level 1-3
                arma: ["Iron warhammer", "Dented longsword"],
                items: ["Wooden shield with emblem", "Copper holy symbol", "Tabard with the colors of their order"],
                ropa: "Rusty or worn chain mail"
            },

            medio: { // Level 4-7
                arma: ["Steel mace", "Officer's greatsword"],
                items: ["Polished steel shield", "Silver holy symbol", "Order cloak"],
                ropa: "Splint armor (splint + mail)"
            },

            alto: { // Level 8-10
                arma: ["Blessed warhammer", "Engraved cavalry lance"],
                items: ["Reinforced heavy shield", "Gold reliquary", "Large-buckle belt"],
                ropa: "Engraved full plate armor"
            }
        }
    },

    "hibrido_Ranger": {

        profesiones: [
            "Borderlands tracker", "Novice monster hunter",
            "Wilderness guide", "Deep-forest stalker",
            "Royal guard scout", "Mountain-pass watcher",
            "Exotic pelt hunter", "Trail protector",
            "Jungle mercenary", "Desert wanderer"
        ],

        cantrips_utilidad: ["Guidance", "Light"],

        especial: ["Hunter: Advantage on tracking checks; at the start of combat choose an enemy as prey, +(Level/2) to attack and damage against the prey (min 1); if the prey falls unconscious, you may choose another."],

        hechizos_lvl1: ["Hunter's Mark", "Ensnaring Strike", "Goodberry", "Fog Cloud", "Longstrider", "Absorb Elements", "Alarm", "Entangle", "Hail of Thorns"],
        hechizos_lvl2: ["Pass without Trace", "Spike Growth", "Silence", "Darkvision","Aid", "Animal Messenger", "Barkskin", "Cordon of Arrows", "Find Traps", "Lesser Restoration", "Magic Weapon", "Summon Beast"],

        equipo_progresivo: {

            bajo: { // Level 1-3
                arma: ["Shortbow", "Two hunting shortswords"],
                items: ["Wolf-hide quiver", "Bear trap", "Leather waterskin", "Hemp rope"],
                ropa: "Hardened leather and a wool travel cloak"
            },

            medio: { // Level 4-7
                arma: ["Yew longbow", "Scimitar and shortsword"],
                items: ["Quiver with 20 arrows", "Herbalism kit", "Small hunting trophy"],
                ropa: "Studded leather armor and camouflage cloak"
            },

            alto: { // Level 8-10
                arma: ["Reinforced longbow", "Two blue-steel handaxes"],
                items: ["Silver-tipped arrows", "Monster-hide cloak", "Brass goggles"],
                ropa: "Scale armor or leather from an exotic creature"
            }
        }
    },

    // --- 3. PURE COMBAT ---
    // --- PURE COMBAT UPDATE ---
    "combate_Sigilo": {

        profesiones: [
            "Dockside cutpurse", "Highway robber", "Agent of the shadow network",
            "Palace infiltrator", "Urban bounty hunter", "Tomb looter",
            "Clandestine courier", "Evidence forger", "Low-tier assassin", "Rooftop rogue"
        ],

        especial: {

            bajo: "Sneak Attack: +1d4 damage if you have advantage.",

            medio: "Sneak Attack: +1d6 damage if you have advantage. Simple Evasion: React to halve area damage.",

            alto: "Sneak Attack: +2d6 damage if you have advantage. Simple Evasion: React to halve area damage. Cunning Action: Can Hide as a movement action."
        },

        equipo_progresivo: {

            bajo: { // Level 1-3
                arma: ["Rusty dagger", "Iron shortsword"],
                items: ["Thieves' tools", "Hooded cloak", "Bag of caltrops", "Rope with hook"],
                ropa: "Dark, worn clothes of light leather"
            },

            medio: { // Level 4-7
                arma: ["Steel rapier", "Throwing daggers (x5)"],
                items: ["Vial of basic poison", "Precision lockpicks", "Small spyglass", "Suede gloves"],
                ropa: "Studded leather dyed black"
            },

            alto: { // Level 8-10
                arma: ["Engraved dueling rapier", "Dark crystal dagger"],
                items: ["Belt of hidden tools", "Vial of paralyzing poison", "Spider-silk cloak"],
                ropa: "Luxury leather reinforced with steel plates"
            }
        }
    },

    "combate_Barbaro": {

        profesiones: [
            "Exile from the northern lands", "Illegal pit fighter", "Furious frontier lumberjack",
            "Circus gladiator", "Criminal syndicate bruiser", "Alpha-beast hunter",
            "Tribe protector", "Border raider", "Heavy-axe mercenary", "Militia line-breaker"
        ],

        especial: {

            bajo: "Minor Frenzy: +2 to Strength damage, but enemies have advantage against them.",

            medio: "Tenacious Rage: +2 to damage. Toughness: Resistance to physical damage (bludgeoning, piercing, slashing).",

            alto: "Blood Rage: +3 to damage. Toughness: Resistance to physical damage (bludgeoning, piercing, slashing). Survivor: If reduced to 0 HP, can make a Constitution save (DC 10) to remain at 1 HP. Multiattack: 2 attacks"
        },

        equipo_progresivo: {

            bajo: { // Level 1-3
                arma: ["Iron greataxe", "Heavy wooden mace"],
                items: ["Ear-or-tooth trophies", "Waterskin of spirits", "War paint", "Bone necklace"],
                ropa: "Animal hides and rawhide belts"
            },

            medio: { // Level 4-7
                arma: ["Steel greataxe", "Two-handed war flail"],
                items: ["Bear-hide cloak", "Rough whetstone", "Bronze bracers"],
                ropa: "Cured hides reinforced with bits of mail"
            },

            alto: { // Level 8-10
                arma: ["Enchanted double-edged greataxe", "Volcanic-stone warhammer"],
                items: ["Power-animal totem", "Giant strength belt (cosmetic)", "Monster-hide cloak"],
                ropa: "Exotic hides and young-dragon leather cuirass"
            }
        }
    },

    "combate_Monje": {

        profesiones: [
            "Novice of a remote monastery", "Traveling ascetic", "Seeker of inner harmony",
            "Mountain hermit", "Bare-knuckle street fighter", "Messenger of sacred temples",
            "Guardian of ancient manuscripts", "Former monk escort", "Martial arts student", "Avenger of honor"
        ],

        especial: {

            bajo: "Martial Arts: 1d4. Quick Reflexes: Can use your reaction to reduce projectile damage by 1d6.",

            medio: "Martial Arts: 1d6. Quick Reflexes: Can use your reaction to reduce projectile damage by 1d6. Palm Strike: After attacking, can attempt to push the enemy 2 meters (Strength save).",

            alto: "Martial Arts: 1d8. Fists of Steel: Unarmed strikes count as magical. Quick Reflexes: Can use your reaction to reduce projectile damage by 1d6. Palm Strike: After attacking, can attempt to push the enemy 2 meters (Strength save). Multiattack: 2 attacks"
        },

        equipo_progresivo: {

            bajo: { // Level 1-3
                arma: ["Ash-wood staff", "Bamboo darts (x10)"],
                items: ["Wooden prayer beads", "Alms bowl", "Hand wraps", "Rope belt"],
                ropa: "Simple linen tunic and sandals"
            },

            medio: { // Level 4-7
                arma: ["Iron-reinforced staff", "Steel nunchaku"],
                items: ["Jade spiritual symbol", "Mantra book", "Meditation incense"],
                ropa: "Durable silk tunic with embroidered sash"
            },

            alto: { // Level 8-10
                arma: ["Engraved ironwood staff", "Hardened leather gauntlets"],
                items: ["Relic of an ancient master", "Vials of rare herbal tea", "Secret technique scroll"],
                ropa: "High-quality heavy silk habit"
            }
        }
    },

    "combate_Guerrero": {

        profesiones: [
            "Veteran of a hundred wars", "Captain of the city guard", "Hired steel mercenary",
            "Renowned duelist", "Noble bodyguard", "Drill instructor for recruits",
            "Disgraced knight", "Luxury caravan watch", "Armed herald", "Local tournament champion"
        ],

        especial: {

            bajo: "Military Training: Weapon Mastery (1) and +1 to attack rolls with that weapon.",

            medio: "Military Training: Weapon Mastery (2) and +1 to attack rolls with one of those weapons. Second Wind: Can regain 1d10 + level HP as a bonus action (once per day).",

            alto: "Military Training: Weapon Mastery (2) and +2 to attack rolls with one of those weapons. Second Wind: Can regain 1d10 + level HP as a bonus action (once per day). Multiattack: 2 attacks."
        },

        equipo_progresivo: {

            bajo: { // Level 1-3
                arma: ["Iron longsword", "Infantry spear"],
                items: ["Reinforced wooden shield", "Dented helmet", "Whetstone", "Neck scarf"],
                ropa: "Chain shirt or studded leather"
            },

            medio: { // Level 4-7
                arma: ["Tempered steel longsword", "Lucerne hammer or pike"],
                items: ["Steel shield with coat of arms", "Metal gauntlets", "Military cloak"],
                ropa: "Full chain mail or banded armor"
            },

            alto: { // Level 8-10
                arma: ["Silver sword", "Blue-steel war mace"],
                items: ["Heavy tower shield", "Engraved steel gorget", "Small personal banner"],
                ropa: "Well-maintained plate armor"
            }
        }
    }
};


/* ==========================================================================
STATBLOCKS BASE PER ARCHETYPE
========================================================================== */

const stats_spellcaster = {

    base: {

        melee_dado: "1d4",
        melee_tipo: "piercing", // Dagger / Staff

        range_dado: "1d4",
        range_tipo: "piercing", // Thrown dagger

        save_principales: ["Int", "Wis"]
    }
};

const stats_hibrido = {

    base: {

        melee_dado: "1d8",
        melee_tipo: "piercing/slashing", // Rapier / Longsword

        range_dado: "1d6",
        range_tipo: "piercing", // Shortbow / Light crossbow

        save_principales: ["Dex", "Cha"]
    }
};

const stats_combate = {

    base: {

        melee_dado: "1d10",
        melee_tipo: "slashing/bludgeoning", // Battleaxe / Flail

        range_dado: "1d8",
        range_tipo: "piercing", // Heavy crossbow / Longbow

        save_principales: ["Str", "Con"]
    }
};


/* ==========================================================================
GLOBAL PROGRESSION TABLE (Reference for future logic)
========================================================================== */

const progresion_global = {

    bajo: {

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
            combate:     { principal: "Str + 3, Con +3", Base: "Dex +1, Int +1, Wis +1", Mala: "Cha -2"},
            hibrido:     { principal: "Dex + 3, Cha +3", Base: "Con +1, Str +1, Wis +1", Mala: "Int -2"},
            spellcaster: { principal: "Int + 3, Wis +3", Base: "Con +1, Dex +1, Cha +1", Mala: "Str -2"}
        },

        spells_day :{
            hibrido:     {lvl1: 1, lvl2: 0},
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
            combate:     { principal: "Str + 4, Con +4", Base: "Dex +2, Int +2, Wis +2", Mala: "Cha -2"},
            hibrido:     { principal: "Dex + 4, Cha +4", Base: "Con +2, Str +2, Wis +2", Mala: "Int -2"},
            spellcaster: { principal: "Int + 4, Wis +4", Base: "Con +2, Dex +2, Cha +2", Mala: "Str -2"}
        },

        spells_day :{
            hibrido:     {lvl1: 1, lvl2: 0},
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
            combate:     { principal: "Str + 5, Con +5", Base: "Dex +3, Int +3, Wis +3", Mala: "Cha -1"},
            hibrido:     { principal: "Dex + 5, Cha +5", Base: "Con +3, Str +3, Wis +3", Mala: "Int -1"},
            spellcaster: { principal: "Int + 5, Wis +5", Base: "Con +3, Dex +3, Cha +3", Mala: "Str -1"}
        },

        spells_day :{
            hibrido:     {lvl1: 2, lvl2: 1},
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
            combate:     { principal: "Str + 6, Con +6", Base: "Dex +3, Int +3, Wis +3", Mala: "Cha -1"},
            hibrido:     { principal: "Dex + 6, Cha +6", Base: "Con +3, Str +3, Wis +3", Mala: "Int -1"},
            spellcaster: { principal: "Int + 6, Wis +6", Base: "Con +3, Dex +3, Cha +3", Mala: "Str -1"}
        },

        spells_day :{
            hibrido:     {lvl1: 3, lvl2: 2},
            spellcaster: {lvl1 :3, lvl2: 2, lvl3: 1}
        }
    }
};
