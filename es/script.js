
/* ==========================================================================
   CONFIGURACIÓN Y UTILIDADES
   ========================================================================== */
// Variable global para rastrear el NPC actual
let ultimoNPCGenerado = null;

// Seleccionador aleatorio
const getRandom = (arr) => {
    if (!arr || arr.length === 0) return "";
    return arr[Math.floor(Math.random() * arr.length)];
};

function obtenerTipoCategoria(especie) {
  const small = new Set(["Mediano", "Gnomo", "Goblin", "Kobold"]);
  const categoria = small.has(especie) ? "pequeño" : "mediano";
  return `Humanoide ${categoria}`;
}

function conSigno(n) {
  const num = Number(n) || 0;
  return num >= 0 ? `+${num}` : `${num}`;
}

// --------------------------
// COMBATE: DÉBIL vs FUERTE
// --------------------------
const COMBATE_FUERTE_CFG = {
  hpMult: 1.8,
  acPlus: 3,
  iniPlus: 1,
  speedPlus: 0,

  atkPlus: 3,
  spellPlus: 3,
  dcPlus: 2,

  // Salvaciones (diferenciadas)
  savePrincipalPlus: 2,
  saveBasePlus: 1,
  saveMalaPlus: 0,

  // Daño: 1dX -> 1dX + (nivel * mult)
  damagePerLevelMult: 1,

  // Hechizos/día: suma usos por nivel de conjuro
  spellsPerDayBasePlus: 1,
  spellsPerDayExtraAtLevel: 7,      // desde aquí, +1 extra
  spellsPerDayExtraPlus: 1,

  alcancePlus: 0
};


function clamp(n, min, max) {
  return Math.max(min, Math.min(max, n));
}

function deepCopy(obj) {
  return obj ? JSON.parse(JSON.stringify(obj)) : obj;
}

function bumpNumbersInText(text, delta) {
  // Suma delta a cada número con signo opcional: "+3", "3", "-2"
  if (text == null) return text;
  const s = String(text);

  return s.replace(/([+-]?\d+)/g, (m) => {
    const n = parseInt(m, 10);
    if (Number.isNaN(n)) return m;
    const v = n + delta;

    // Mantén el "+" explícito si antes lo tenía, o si el número era parte de "+N"
    if (m.startsWith("+")) return (v >= 0 ? `+${v}` : `${v}`);
    return `${v}`;
  });
}

function addBonusToFirstDice(dmgStr, bonus) {
  // Encuentra el primer "XdY" dentro del string y le agrega/actualiza "+N"
  if (!dmgStr || typeof dmgStr !== "string") return dmgStr;

  const re = /(\d+\s*d\s*\d+)\s*(?:\+\s*(\d+))?/i;
  const m = re.exec(dmgStr);
  if (!m) return dmgStr;

  const diceRaw = m[1];
  const dice = diceRaw.replace(/\s+/g, ""); // "1 d 8" -> "1d8"
  const existing = m[2] ? parseInt(m[2], 10) : 0;
  const total = existing + bonus;

  const before = dmgStr.slice(0, m.index);
  const after = dmgStr.slice(m.index + m[0].length);

  const plusPart = total > 0 ? `+${total}` : (total < 0 ? `${total}` : "");
  return `${before}${dice}${plusPart}${after}`;
}

function upgradeSpellsPorDia(spellsPorDia, magia, nivel) {
  if (!spellsPorDia) return spellsPorDia;

  const out = deepCopy(spellsPorDia);

  // cuánto sube por default
  let plus = COMBATE_FUERTE_CFG.spellsPerDayBasePlus;
  if (nivel >= COMBATE_FUERTE_CFG.spellsPerDayExtraAtLevel) {
    plus += COMBATE_FUERTE_CFG.spellsPerDayExtraPlus;
  }

  for (const k of Object.keys(out)) {
    const usos = Number(out[k] ?? 0);

    // Si ya tenía usos, súbelo
    if (usos > 0) {
      out[k] = usos + plus;
      continue;
    }

    // Si no tenía usos pero en magia hay hechizos de ese nivel, dale 1 uso (o plus mínimo)
    const hechizosEnEseNivel = magia?.porNivel?.[k]?.length || 0;
    if (hechizosEnEseNivel > 0) {
      out[k] = Math.max(1, plus);
    } else {
      out[k] = usos; // se queda 0
    }
  }

  return out;
}


function parseDice(diceStr) {
  // Espera formato "XdY" (ej: "1d10")
  if (!diceStr || typeof diceStr !== "string") return null;
  const m = diceStr.trim().match(/^(\d+)\s*d\s*(\d+)$/i);
  if (!m) return null;
  return { x: parseInt(m[1], 10), y: parseInt(m[2], 10) };
}

function stepDieY(y, steps = 1) {
  const ladder = [4, 6, 8, 10, 12];
  const idx = ladder.indexOf(y);
  if (idx === -1) return y; // si no es un dado estándar, lo dejamos
  const nextIdx = idx + steps;
  if (nextIdx <= ladder.length - 1) return ladder[nextIdx];
  // si ya estás en d12 y subes más, mantén d12
  return 12;
}

function upgradeDice(diceStr, steps = 1) {
  const d = parseDice(diceStr);
  if (!d) return diceStr;

  const newY = stepDieY(d.y, steps);
  // si no pudo subir (ya en d12), aumenta cantidad de dados
  const newX = (newY === d.y && d.y === 12) ? (d.x + 1) : d.x;

  return `${newX}d${newY}`;
}

function copiarStatblock(sb) {
  if (!sb) return null;
  return JSON.parse(JSON.stringify(sb));
}

function construirStatblockFuerteDesdeDebil(sbDebil, nivel) {
  if (!sbDebil) return null;

  const sb = deepCopy(sbDebil);

  // Ofensiva: to hit
  if (sb.ataqueMelee != null) sb.ataqueMelee = Number(sb.ataqueMelee) + COMBATE_FUERTE_CFG.atkPlus;
  if (sb.ataqueRange != null) sb.ataqueRange = Number(sb.ataqueRange) + COMBATE_FUERTE_CFG.atkPlus;

  // Alcance
  if (sb.ataqueD != null) sb.ataqueD = Number(sb.ataqueD) + COMBATE_FUERTE_CFG.alcancePlus;

  // Daño: 1dX -> 1dX + (nivel * mult)
  const dmgBonus = Math.max(0, Math.floor((nivel || 1) * COMBATE_FUERTE_CFG.damagePerLevelMult));
  if (typeof sb.melee === "string") sb.melee = addBonusToFirstDice(sb.melee, dmgBonus);
  if (typeof sb.range === "string") sb.range = addBonusToFirstDice(sb.range, dmgBonus);

  // Magia
  if (sb.hechizoBono != null) sb.hechizoBono = Number(sb.hechizoBono) + COMBATE_FUERTE_CFG.spellPlus;
  if (sb.dc != null) sb.dc = Number(sb.dc) + COMBATE_FUERTE_CFG.dcPlus;

  // Salvaciones: principal > base, mala no sube
  if (sb.saves) {
    // Si son números
    if (typeof sb.saves.principal === "number") sb.saves.principal += COMBATE_FUERTE_CFG.savePrincipalPlus;
    if (typeof sb.saves.Base === "number") sb.saves.Base += COMBATE_FUERTE_CFG.saveBasePlus;
    if (typeof sb.saves.Mala === "number") sb.saves.Mala += COMBATE_FUERTE_CFG.saveMalaPlus;

    // Si son strings tipo "Fue 3, Con 3", aplicamos suma a los números dentro del texto
    if (typeof sb.saves.principal === "string") sb.saves.principal = bumpNumbersInText(sb.saves.principal, COMBATE_FUERTE_CFG.savePrincipalPlus);
    if (typeof sb.saves.Base === "string") sb.saves.Base = bumpNumbersInText(sb.saves.Base, COMBATE_FUERTE_CFG.saveBasePlus);
    if (typeof sb.saves.Mala === "string") sb.saves.Mala = bumpNumbersInText(sb.saves.Mala, COMBATE_FUERTE_CFG.saveMalaPlus);
  }

  return sb;
}

function construirPerfilCombateDebil(npc) {
  return {
    etiqueta: "Débil",
    hp: npc.hp,
    ac: npc.ac,
    iniciativa: npc.iniciativa,
    velocidad: npc.velocidad,
    statblock: npc.statblock || null,
    magia: npc.magia || null,
    spellsPorDia: npc.spellsPorDia || null,
    especial: npc.especial || null,
    nivel: npc.nivel
  };
}

function construirPerfilCombateFuerte(npc, debil) {
  const nivel = debil.nivel || npc.nivel || 1;

  return {
    etiqueta: "Fuerte",
    hp: Math.max(1, Math.ceil((debil.hp || 1) * COMBATE_FUERTE_CFG.hpMult)),
    ac: (debil.ac ?? 10) + COMBATE_FUERTE_CFG.acPlus,
    iniciativa: (debil.iniciativa ?? 0) + COMBATE_FUERTE_CFG.iniPlus,
    velocidad: (debil.velocidad ?? 30) + COMBATE_FUERTE_CFG.speedPlus,

    statblock: construirStatblockFuerteDesdeDebil(debil.statblock, nivel),

    magia: debil.magia,
    spellsPorDia: upgradeSpellsPorDia(debil.spellsPorDia, debil.magia, nivel),

    especial: debil.especial,
    nivel
  };
}


//---------------------------------------

function obtenerTipoGeneral(subTipo) {

    if (!subTipo) return null;

    if (subTipo.startsWith("spellcaster_")) return "spellcaster";
    if (subTipo.startsWith("hibrido_")) return "hibrido";
    if (subTipo.startsWith("combate_")) return "combate";

    return null;
}

function getRandomUnique(arr, cantidad) {
    if (!arr || arr.length === 0) return [];

    // Copia para no modificar el original
    const copia = [...arr];
    const resultado = [];

    const max = Math.min(cantidad, copia.length);

    for (let i = 0; i < max; i++) {
        const index = Math.floor(Math.random() * copia.length);
        resultado.push(copia[index]);
        copia.splice(index, 1); // elimina para evitar repetición
    }

    return resultado;
}

// Dados para niveles y variaciones
const roll = (min, max) => Math.floor(Math.random() * (max - min + 1)) + min;

// ==========================================================================
// NPC CIVIL A MEDIDA (con overrides opcionales)
// ==========================================================================
function generarNPCCivilAMedida(opciones = {}) {
    const {
        especie: especieForzada = null,     // string o null
        contexto: contextoForzado = null,   // 'pueblo' | 'ciudad' | null
        estatus: estatusForzado = null,     // 'pobre' | 'media' | 'rica' | null
        actitud: actitudForzada = null      // string (de DATA.estados) o null
    } = opciones;

    const nivel = 1;

    // Contexto 50/50 si no se fuerza
    const contexto = (contextoForzado === 'pueblo' || contextoForzado === 'ciudad')
        ? contextoForzado
        : (Math.random() < 0.5 ? 'pueblo' : 'ciudad');

    // Estatus: si no se fuerza, mantiene tu lógica original por contexto
    let estatus;
    if (estatusForzado === 'pobre' || estatusForzado === 'media' || estatusForzado === 'rica') {
        estatus = estatusForzado;
    } else {
        if (contexto === 'pueblo') estatus = Math.random() < 0.7 ? 'pobre' : 'media';
        else estatus = Math.random() < 0.7 ? 'media' : 'rica';
    }

    // Especie: si no se fuerza, aleatoria
    const especie = (especieForzada && DATA.nombres?.[especieForzada]) ? especieForzada : getRandom(DATA.especies);

    // Nombre (siempre habrá por especie, pero dejo fallback seguro)
    const nombresGlobales =
        DATA.nombres_globales ||
        DATA.nombres?.Nombres_Globales ||
        DATA.nombres?.["Nombres_Globales"] ||
        [];
    const nombre = getRandom(DATA.nombres[especie] || nombresGlobales);

    // Construcción NPC civil
    const npc = {
        nombre,
        especie,
        nivel,
        personalidad: actitudForzada || getRandom(DATA.estados),
        voz: getRandom(DATA.voces),
        acting: getRandom(DATA.acting),
        fisico: getRandom(DATA.fisico),
        trinket: (typeof TRINKETS_MASTER_LIST !== 'undefined') ? getRandom(TRINKETS_MASTER_LIST) : "Una moneda común gastada",
        want: getRandom(DATA.wants),
        twist: getRandom(DATA.twists),
        esAventurero: false,
        tipoGeneral: "ciudadano",
        estatusSocial: estatus,
        contextoCivil: contexto
    };

    npc.profesion = getRandom(DATA.profesiones[contexto][estatus]);

    const poolRopa = [
        ...DATA.ropas[estatus],
        ...DATA.ropas_extra[estatus]
    ];
    npc.ropa = getRandom(poolRopa);

    if (estatus === 'pobre') {
        npc.hp = roll(1, 3);
        npc.ac = roll(8, 9);
        npc.equipo = "Herramientas básicas y posesiones modestas";
    }
    if (estatus === 'media') {
        npc.hp = roll(2, 4);
        npc.ac = roll(9, 10);
        npc.equipo = "Herramientas de oficio y objetos personales de valor moderado";
    }
    if (estatus === 'rica') {
        npc.hp = roll(3, 5);
        npc.ac = roll(10, 11);
        const tieneGuardaespaldas = Math.random() < 0.4;
        npc.equipo = tieneGuardaespaldas
            ? "Objetos de lujo y escolta personal"
            : "Objetos de lujo y joyería discreta";
    }
    npc.velocidad = 30; // o "30"
    npc.iniciativa = calcularIni(npc.tipoGeneral, nivel);
    npc.tipoCategoria = obtenerTipoCategoria(npc.especie);

    return npc;
}

// ==========================================================================
// MODAL: NPC A MEDIDA
// ==========================================================================
function abrirModalNPC() {
    const backdrop = document.getElementById('npc-modal-backdrop');
    if (!backdrop) return;

    // Poblar select de especies (solo si está vacío)
    const selectEspecie = document.getElementById('select-especie');
    if (selectEspecie && selectEspecie.options.length === 0) {
        // opción Aleatorio
        const optRand = document.createElement('option');
        optRand.value = 'random';
        optRand.textContent = 'Aleatorio';
        selectEspecie.appendChild(optRand);

        // especies reales
        DATA.especies.forEach(esp => {
            const opt = document.createElement('option');
            opt.value = esp;
            opt.textContent = esp;
            selectEspecie.appendChild(opt);
        });

        selectEspecie.value = 'random';
    }


    // Poblar actitud (solo si está vacío)
    const actitudBox = document.getElementById('modal-actitud');
    if (actitudBox && actitudBox.childElementCount === 0) {
        actitudBox.insertAdjacentHTML(
            'beforeend',
            `<label class="opt"><input type="checkbox" name="actitud" value="random" checked> Aleatorio</label>`
        );

        DATA.estados.forEach(est => {
            actitudBox.insertAdjacentHTML(
                'beforeend',
                `<label class="opt"><input type="checkbox" name="actitud" value="${est}"> ${est}</label>`
            );
        });
    }

    // Single-select por grupo (checkboxes que se comportan como radio)
    habilitarSingleSelectModal();

    backdrop.classList.add('is-open');
    backdrop.setAttribute('aria-hidden', 'false');
}

function leerEspecieSelect() {
    const select = document.getElementById('select-especie');
    if (!select) return null;
    if (!select.value || select.value === 'random') return null;
    return select.value;
}


function cerrarModalNPC() {
    const backdrop = document.getElementById('npc-modal-backdrop');
    if (!backdrop) return;
    backdrop.classList.remove('is-open');
    backdrop.setAttribute('aria-hidden', 'true');
}

function habilitarSingleSelectModal() {
    const backdrop = document.getElementById('npc-modal-backdrop');
    if (!backdrop) return;

    // Evitar registrar el handler 100 veces
    if (backdrop.dataset.singleSelectReady === "1") return;
    backdrop.dataset.singleSelectReady = "1";

    backdrop.addEventListener('change', (e) => {
        const target = e.target;
        if (!target || target.type !== 'checkbox' || !target.name) return;

        const name = target.name;
        const group = backdrop.querySelectorAll(`input[type="checkbox"][name="${name}"]`);

        if (target.checked) {
            group.forEach(o => { if (o !== target) o.checked = false; });
        } else {
            // si queda todo desmarcado, vuelve a Aleatorio
            const anyChecked = Array.from(group).some(o => o.checked);
            if (!anyChecked) {
                const rnd = Array.from(group).find(o => o.value === 'random');
                if (rnd) rnd.checked = true;
            }
        }
    });
}

function leerSeleccionModal(name) {
    const backdrop = document.getElementById('npc-modal-backdrop');
    if (!backdrop) return null;
    const checked = backdrop.querySelector(`input[type="checkbox"][name="${name}"]:checked`);
    if (!checked || checked.value === 'random') return null;
    return checked.value;
}

function generarDesdeModal() {
    const especie = leerEspecieSelect();
    const contexto = leerSeleccionModal('ubicacion'); // 'ciudad'|'pueblo'|null
    const estatus = leerSeleccionModal('clase');      // 'pobre'|'media'|'rica'|null
    const actitud = leerSeleccionModal('actitud');    // string|null

    const npc = generarNPCCivilAMedida({ especie, contexto, estatus, actitud });
    mostrarNPC(npc);
    cerrarModalNPC();
}


/* ==========================================================================
   LÓGICA MATEMÁTICA DE COMBATE
   ========================================================================== */

function calcularHP(tipoGeneral, lvl) {
    const baseHP = {
        "spellcaster": 6,
        "hibrido": 8,
        "combate": 10
    };
    
    const base = baseHP[tipoGeneral] || 6;
    // Fórmula: HD base + (Nivel-1 * promedio redondeado hacia arriba)
    return base + ((lvl - 1) * (Math.floor(base / 2) + 1));
}

function calcularAC(tipoGeneral, lvl) {
    const baseAC = {
        "spellcaster": 11,
        "hibrido": 13,
        "combate": 15
    };
    const base = baseAC[tipoGeneral] || 11;
    // Sube +1 cada 3 niveles aprox.
    return base + Math.floor(lvl / 3);
}

function calcularIni(tipoGeneral, lvl) {
  // Ciudadano: random entre -2 y 1 (cada vez que generas el NPC)
  if (tipoGeneral === "ciudadano") {
    return Math.floor(Math.random() * 4) - 2; // -2, -1, 0, 1
  }

  // Spellcaster: 1-2:0, 3-5:1, 6-8:2, 9-10:3
  if (tipoGeneral === "spellcaster") {
    return Math.floor(lvl / 3); // [0,0,1,1,1,2,2,2,3,3] del 1 al 10
  }

  // Híbrido y Combate: como lo tienes ahora
  const base = (tipoGeneral === "hibrido") ? 1
             : (tipoGeneral === "combate") ? 2
             : 0;

  return base + Math.floor(lvl / 3);
}


/* ==========================================================================
   GENERADOR PRINCIPAL DE NPC
   ========================================================================== */

function generarNPC(tipoGlobal, subTipo = null, nivelManual = null) {
    // 1. Determinar Nivel (1-10)
    let nivel;

    if (tipoGlobal === "aventurero") {
        nivel = parseInt(nivelManual);
        if (!nivel || nivel < 1 || nivel > 10) {
            nivel = 1; // fallback mínimo seguro
        }
    } else {
        nivel = 1;
    }
        
    // 2. Determinar Especie y Nombre (Desde data_npc.js)
    const especie = getRandom(DATA.especies);
    const nombre = getRandom(DATA.nombres[especie] || DATA.nombres_globales);

    // 3. Objeto base del NPC
    let npc = {
        nombre: nombre,
        especie: especie,
        nivel: nivel,
        personalidad: getRandom(DATA.estados),
        voz: getRandom(DATA.voces),
        acting: getRandom(DATA.acting),
        fisico: getRandom(DATA.fisico),
        trinket: typeof TRINKETS_MASTER_LIST !== 'undefined' ? getRandom(TRINKETS_MASTER_LIST) : "Una moneda común gastada",
        want: getRandom(DATA.wants),
        twist: getRandom(DATA.twists),
        esAventurero: tipoGlobal === 'aventurero'
    };

    const tipoGeneral = obtenerTipoGeneral(subTipo);
    npc.tipoGeneral = tipoGeneral;

    npc.velocidad = 30; // pies, siempre
    npc.iniciativa = calcularIni(npc.tipoGeneral, nivel);
    npc.tipoCategoria = obtenerTipoCategoria(npc.especie);


    // 4. Lógica de Datos Específicos
    if (npc.esAventurero && npc_aventurero[subTipo]) {
        const arq = npc_aventurero[subTipo];
        npc.arquetipoNombre = subTipo.replace(/_/g, " ");
        npc.profesion = getRandom(arq.profesiones);
        
        // Determinar tramo de poder (Bajo 1-3, Medio 4-7, Alto 8-10)
        let tramo = 'bajo';
        if (nivel >= 4) tramo = 'medio';
        if (nivel >= 8) tramo = 'alto';


        // Stats y Habilidades
        npc.hp = calcularHP(tipoGeneral, nivel);
        npc.ac = calcularAC(tipoGeneral, nivel);
        
        // Manejo de Habilidad Especial (Soporta Array o Objeto por niveles)
        if (Array.isArray(arq.especial)) {
            npc.especial = arq.especial[0]; // Para Casters
        } else {
            npc.especial = arq.especial[tramo]; // Para Marciales
        }

        // Equipo Progresivo
        const eq = arq.equipo_progresivo[tramo];
        npc.equipo = `${getRandom(eq.arma)}, ${getRandom(eq.items)} y ${eq.ropa}`;

        // ==========================
        // LÓGICA DE MAGIA
        // ==========================

        if (npc.tipoGeneral === "spellcaster" || npc.tipoGeneral === "hibrido") {
            // --------------------------
            // 1. Slots por día según tramo
            // --------------------------
            const infoTramo = progresion_global[tramo];
            npc.spellsPorDia = infoTramo.spells_day?.[npc.tipoGeneral] || null;
            // --------------------------
            // 2. Estructura base de magia
            // --------------------------
            let trucos = [];
            let hechizosPorNivel = {
                lvl1: [],
                lvl2: [],
                lvl3: []
            };
            // ================= SPELLCASTER =================
            if (npc.tipoGeneral === "spellcaster") {

                // 1 cantrip utilidad + 1 ataque
                if (arq.cantrips_utilidad?.length) {
                    trucos.push(...getRandomUnique(arq.cantrips_utilidad, 1));
                }

                if (arq.cantrips_ataque?.length) {
                    trucos.push(...getRandomUnique(arq.cantrips_ataque, 1));
                }

                // -------- ESCALADO POR NIVEL --------

                if (nivel >= 1 && nivel <= 3) {
                    if (arq.hechizos_lvl1)
                        hechizosPorNivel.lvl1.push(...getRandomUnique(arq.hechizos_lvl1, 2));
                }

                else if (nivel >= 4 && nivel <= 6) {
                    if (arq.hechizos_lvl1)
                        hechizosPorNivel.lvl1.push(...getRandomUnique(arq.hechizos_lvl1, 3));

                    if (arq.hechizos_lvl2)
                        hechizosPorNivel.lvl2.push(...getRandomUnique(arq.hechizos_lvl2, 1));
                }

                else if (nivel >= 7 && nivel <= 9) {
                    if (arq.hechizos_lvl1)
                        hechizosPorNivel.lvl1.push(...getRandomUnique(arq.hechizos_lvl1, 3));

                    if (arq.hechizos_lvl2)
                        hechizosPorNivel.lvl2.push(...getRandomUnique(arq.hechizos_lvl2, 2));

                    if (arq.hechizos_lvl3)
                        hechizosPorNivel.lvl3.push(...getRandomUnique(arq.hechizos_lvl3, 1));
                }

                else if (nivel === 10) {
                    if (arq.hechizos_lvl1)
                        hechizosPorNivel.lvl1.push(...getRandomUnique(arq.hechizos_lvl1, 3));

                    if (arq.hechizos_lvl2)
                        hechizosPorNivel.lvl2.push(...getRandomUnique(arq.hechizos_lvl2, 2));

                    if (arq.hechizos_lvl3)
                        hechizosPorNivel.lvl3.push(...getRandomUnique(arq.hechizos_lvl3, 2));
                }
            }
            // ================= HÍBRIDO =================
            if (npc.tipoGeneral === "hibrido") {

                // 1 cantrip utilidad
                if (arq.cantrips_utilidad?.length) {
                    trucos.push(...getRandomUnique(arq.cantrips_utilidad, 1));
                }

                // Nivel 3–5
                if (nivel >= 3 && nivel <= 5) {
                    if (arq.hechizos_lvl1)
                        hechizosPorNivel.lvl1.push(...getRandomUnique(arq.hechizos_lvl1, 2));
                }

                // Nivel 6–10
                if (nivel >= 6) {
                    if (arq.hechizos_lvl1)
                        hechizosPorNivel.lvl1.push(...getRandomUnique(arq.hechizos_lvl1, 3));

                    if (arq.hechizos_lvl2)
                        hechizosPorNivel.lvl2.push(...getRandomUnique(arq.hechizos_lvl2, 2));
                }
            }
            // --------------------------
            // 3. Guardar magia solo si existe
            // --------------------------
            const tieneMagia =
                trucos.length > 0 ||
                hechizosPorNivel.lvl1.length > 0 ||
                hechizosPorNivel.lvl2.length > 0 ||
                hechizosPorNivel.lvl3.length > 0;

            if (tieneMagia) {
                npc.magia = {
                    trucos: trucos,
                    porNivel: hechizosPorNivel
                };
            }
        }
        // --------------------------
        // Statblock
        // --------------------------
        npc.statblock = construirStatblock(subTipo, nivel);    

    } else {
        // ==========================
        // LÓGICA DE CIVILES
        // ==========================


        npc.nivel = 1;
        npc.tipoGeneral = "ciudadano";
        // ---------- CONTEXTO ----------
        let contexto;
        if (tipoGlobal === "pueblo" || tipoGlobal === "ciudad") {
          contexto = tipoGlobal;
        } else {
          contexto = Math.random() < 0.5 ? "pueblo" : "ciudad";
        }
        // ---------- ESTATUS ----------
        let estatus;

        if (contexto === 'pueblo') {
            estatus = Math.random() < 0.7 ? 'pobre' : 'media';
        } else {
            estatus = Math.random() < 0.7 ? 'media' : 'rica';
        }

        npc.estatusSocial = estatus;
        npc.contextoCivil = contexto;  // 'pueblo' o 'ciudad'


        

        // ---------- PROFESIÓN ----------
        npc.profesion = getRandom(
            DATA.profesiones[contexto][estatus]
        );

        // ---------- ROPA ----------
        const poolRopa = [
            ...DATA.ropas[estatus],
            ...DATA.ropas_extra[estatus]
        ];

        npc.ropa = getRandom(poolRopa);

        // ---------- HP Y AC ----------
        if (estatus === 'pobre') {
            npc.hp = roll(1, 3);
            npc.ac = roll(8, 9);
            npc.equipo = "Herramientas básicas y posesiones modestas";
            npc.velocidad = 30; // pies, siempre
            npc.iniciativa = calcularIni(npc.tipoGeneral, nivel);
        }

        if (estatus === 'media') {
            npc.hp = roll(2, 4);
            npc.ac = roll(9, 10);
            npc.equipo = "Herramientas de oficio y objetos personales de valor moderado";
            npc.velocidad = 30; // pies, siempre
            npc.iniciativa = calcularIni(npc.tipoGeneral, nivel);
        }

        if (estatus === 'rica') {
            npc.hp = roll(3, 5);
            npc.ac = roll(10, 11);
            npc.velocidad = 30; // pies, siempre
            npc.iniciativa = calcularIni(npc.tipoGeneral, nivel);

            const tieneGuardaespaldas = Math.random() < 0.4;

            npc.equipo = tieneGuardaespaldas
                ? "Objetos de lujo y escolta personal"
                : "Objetos de lujo y joyería discreta";
        }
    }
    

    return npc;
}

function limpiarVista() {
  const container = document.getElementById('resultado');
  if (!container) return;

  container.innerHTML = `
    <p class="placeholder">Selecciona un tipo de NPC para generar...</p>
  `;
}


function renderEspecialPorPuntos(especialRaw) {
  const raw = (especialRaw || "").toString().trim();
  if (!raw) return `<p><strong>Habilidad especial</strong></p>`;

  // Divide por ". " (punto seguido). Mantiene el texto sin inventar separadores.
  const trozos = raw
    .split(". ")
    .map(s => s.trim())
    .filter(Boolean);

  const lineas = trozos.map(t => {
    // Si el split se comió el punto, lo dejamos tal cual (no lo necesitamos).
    const idx = t.indexOf(":");
    if (idx === -1) {
      // Fallback por si algún trozo viene sin ":" (idealmente no pasará)
      return `<p><strong>${t}</strong></p>`;
    }

    const nombre = t.slice(0, idx).trim();
    const efecto = t.slice(idx + 1).trim();

    return `<p><strong>${nombre}:</strong> ${efecto}</p>`;
  });

  return lineas.join("");
}




/* ==========================================================================
   RENDERIZADO EN EL DOM
   ========================================================================== */

function mostrarNPC(npc) {
    let claseColor = "tipo-ciudadano";
    if (npc.tipoGeneral === "combate") claseColor = "tipo-combate";
    if (npc.tipoGeneral === "hibrido") claseColor = "tipo-hibrido";
    if (npc.tipoGeneral === "spellcaster") claseColor = "tipo-spellcaster";
    const claseMap = { pobre: "Trabajadora", media: "Media", rica: "Adinerada" };
    const ubicacionMap = { ciudad: "Metrópolis/Ciudad", pueblo: "Pueblo/Aldea" };

    const claseTexto = claseMap[npc.estatusSocial];
    const ubicacionTexto = ubicacionMap[npc.contextoCivil];
    const tipoCategoriaHTML = `<span class="badge-sub">(${npc.tipoCategoria})</span>`;
    const claseUbicacionHTML =
      (claseTexto && ubicacionTexto)
        ? `<p><strong>Clase:</strong> ${claseTexto} (${ubicacionTexto})</p>`
        : "";


    if (npc.arquetipoNombre == "spellcaster Arcano") claseProfesion = "Arcanista"
    if (npc.arquetipoNombre == "spellcaster Divino") claseProfesion = "Devoto"
    if (npc.arquetipoNombre == "spellcaster Naturaleza") claseProfesion = "Chamán"
    if (npc.arquetipoNombre == "hibrido Paladin") claseProfesion = "Juramentado"
    if (npc.arquetipoNombre == "hibrido Ranger") claseProfesion = "Montaraz"
    if (npc.arquetipoNombre == "combate Guerrero") claseProfesion = "Caballero"
    if (npc.arquetipoNombre == "combate Sigilo") claseProfesion = "Espía"
    if (npc.arquetipoNombre == "combate Monje") claseProfesion = "Luchador"
    if (npc.arquetipoNombre == "combate Barbaro") claseProfesion = "Mercenario"

    const container = document.getElementById('resultado');
    if (!container) return;

    // --- NUEVOS ICONOS SVG (SOLO CONTORNO) ---
    const heartSVG = `
        <svg class="icon-svg" viewBox="0 0 24 24">
            <path class="heart-stroke" d="M12 21.35l-1.45-1.32C5.4 15.36 2 12.28 2 8.5 2 5.42 4.42 3 7.5 3c1.74 0 3.41.81 4.5 2.09C13.09 3.81 14.76 3 16.5 3 19.58 3 22 5.42 22 8.5c0 3.78-3.4 6.86-8.55 11.54L12 21.35z"/>
        </svg>`;
    
    const shieldSVG = `
        <svg class="icon-svg" viewBox="0 0 24 24">
            <path class="shield-stroke" d="M12 1L3 5v6c0 5.55 3.84 10.74 9 12 5.16-1.26 9-6.45 9-12V5l-9-4z"/>
        </svg>`;


    function renderStatsIcons(perfil) {
      return `
        <div class="stats-container">
          <div class="stat-wrapper stat-hp" title="HP" data-label="PG">
            ${heartSVG}
            <span class="stat-value">${perfil.hp}</span>
          </div>

          <div class="stat-wrapper stat-ac" title="AC" data-label="CA">
            ${shieldSVG}
            <span class="stat-value">${perfil.ac}</span>
          </div>

          <div class="stat-wrapper stat-ini" title="Iniciativa" data-label="Iniciativa">
            <span class="stat-value">${conSigno(perfil.iniciativa)}</span>
          </div>

          <div class="stat-wrapper stat-speed" title="Velocidad" data-label="Velocidad">
            <span class="stat-value">${perfil.velocidad}</span>
            <span class="stat-subvalue">pies</span>
          </div>
        </div>
      `;
    }
// --- BLOQUE DE MECÁNICAS ---
    function renderStatblock(sb) {
      if (!sb) return "";

      return `
        <div class="statblock-container">

          <div class="statblock-line">
            <span class="statblock-label"><strong>Salvaciones</strong></span>
          </div>
          <div class="statblock-line">
            <span class="statblock-value">${sb.saves?.principal ?? ""}, ${sb.saves?.Base ?? ""}, ${sb.saves?.Mala ?? ""}</span>
          </div>

          <div class="statblock-sep"></div>

          <div class="statblock-line">
            <span class="statblock-label"><strong>Ataques</strong></span>
          </div>

          <div class="statblock-line">
            <span class="statblock-sub"><strong>Cuerpo a cuerpo</strong></span>
            <span class="statblock-value">${sb.ataqueMelee}, hit ${sb.melee}</span>
          </div>

          <div class="statblock-line">
            <span class="statblock-sub"><strong>A Distancia</strong></span>
            <span class="statblock-value">${sb.ataqueRange}, hit ${sb.range} ${sb.ataqueD} pies</span>
          </div>
        </div>
      `;
    }
    // --- BLOQUE DE MAGIA ---

    function renderMagia(perfil) {
      const lanzamientoHTML = renderLanzamiento(perfil);

      const tieneMagia = !!(perfil.magia && perfil.spellsPorDia);
      if (!tieneMagia && !lanzamientoHTML) return "";

      let contenidoMagia = "";

      if (tieneMagia) {
        if (perfil.magia.trucos?.length) {
          contenidoMagia += `<p><strong>Trucos</strong> ${perfil.magia.trucos.join(", ")}</p>`;
        }

        Object.keys(perfil.magia.porNivel || {}).sort().forEach(nivelKey => {
          const hechizos = perfil.magia.porNivel[nivelKey] || [];
          const usos = perfil.spellsPorDia[nivelKey] || 0;
          if (hechizos.length === 0 || usos === 0) return;
          contenidoMagia += `<p><strong>Nivel ${nivelKey.replace("lvl","")} (${usos}/día)</strong> ${hechizos.join(", ")}</p>`;
        });
      }

      // Si solo hay lanzamiento y no hay hechizos, igual mostramos algo corto
      if (!contenidoMagia && lanzamientoHTML) {
        contenidoMagia = `<p style="margin:0; opacity:.85;">(Sin lista de hechizos)</p>`;
      }

      return `<div class="magia-box"><h3>Magia</h3>${lanzamientoHTML}${contenidoMagia}</div>`;
    }

    function renderLanzamiento(perfil) {
      const dc = perfil?.statblock?.dc;
      const atk = perfil?.statblock?.hechizoBono;

      if (dc == null && atk == null) return "";

      const parts = [];
      if (dc != null) parts.push(`<span><strong>CD:</strong> ${dc}</span>`);
      if (atk != null) parts.push(`<span><strong>Ataque:</strong> ${atk >= 0 ? "+" : ""}${atk}</span>`);

      return `<p class="magia-meta">${parts.join(" &nbsp; | &nbsp; ")}</p>`;
    }



    // 3. Construimos el bloque exterior de acciones y firma
    const accionesHTML = `
        <div class="npc-actions-container">
            <div class="npc-actions-buttons">
                <button class="btn-action" id="btn-clear">🧹 Limpiar</button>
                <button class="btn-action" id="btn-export-img">💾 Exportar JPG</button>
                <button class="btn-action" id="btn-copy-prompt">🎨 Copiar Prompt IA</button>
                <button class="btn-action btn-save" id="btn-save-local">📌 Guardar</button>
            </div>
            
        </div>
    `;
    ultimoNPCGenerado = npc; // Guardamos el objeto para los botones

    // --- RENDER FINAL ---
    if (npc.esAventurero) {
      const debil = construirPerfilCombateDebil(npc);
      const fuerte = construirPerfilCombateFuerte(npc, debil);

      function renderCombatPanel(perfil, variantClass) {
        return `
          <section class="combat-panel ${variantClass}">
            <h3>Combate - Nivel ${perfil.nivel} - ${perfil.etiqueta}</h3>
            ${renderStatsIcons(perfil)}
            ${renderStatblock(perfil.statblock)}
            <div class="especial-box">${renderEspecialPorPuntos(perfil.especial)}</div>
            ${renderMagia(perfil)}
          </section>
        `;
      }

      contenidoFinal = `
        <div class="npc-card ${claseColor}">
          <div class="npc-layout">
            <div class="npc-left">
              <div class="header">
                <div class="header-titles">
                  <h2>${npc.nombre}</h2>
                  <span class="badge">${npc.especie} - ${claseProfesion}</span>
                  ${tipoCategoriaHTML}
                </div>
              </div>

              <div class="col-social">
                <h3>Interacción</h3>
                ${claseUbicacionHTML}
                <p><strong>Profesión</strong> ${npc.profesion}</p>
                <p><strong>Físico</strong> ${npc.fisico}</p>
                <p><strong>Voz/Acting</strong> ${npc.voz}</p>
                <p><strong>Actitud</strong> ${npc.personalidad}</p>
                ${npc.ropa ? `<p><strong>Ropa</strong> ${npc.ropa}</p>` : ""}
                <p><strong>Equipo</strong> ${npc.equipo}</p>

                <div class="flavor-text">
                  <p><strong>Trinket</strong> ${npc.trinket}</p>
                  <p><strong>Motivación</strong> ${npc.want}</p>
                  <p><strong>Twist</strong> <em>${npc.twist}</em></p>
                </div>
              </div>
            </div>

            <div class="npc-right">
              ${renderCombatPanel(debil, "is-weak")}
              ${renderCombatPanel(fuerte, "is-strong")}
            </div>
          </div>
        </div>
      `;
    } else {
        contenidoFinal = `
            <div class="npc-card ${claseColor}">
                <div class="header">
                    <div class="header-titles">
                        <h2>${npc.nombre}</h2>
                        <span class="badge">${npc.especie}</span>
                        ${tipoCategoriaHTML}
                    </div>
                    ${statsIconsHTML}
                </div>
                
                ${claseUbicacionHTML}
                <p><strong>Profesión:</strong> ${npc.profesion}</p>
                <p><strong>Físico:</strong> ${npc.fisico}</p>
                <p><strong>Voz/Acting:</strong> ${npc.voz}</p>
                <p><strong>Actitud:</strong> ${npc.personalidad}</p>
                ${npc.ropa ? `<p><strong>Ropa:</strong> ${npc.ropa}</p>` : ""}
                <p><strong>Equipo:</strong> ${npc.equipo}</p>
                
                <div class="especial-box">
                    <p><strong>Especial:</strong> ${npc.especial || 'Uso de herramientas de oficio'}</p>
                </div>

                <div class="flavor-text">
                    <p><strong>Trinket:</strong> ${npc.trinket}</p>
                    <p><strong>Motivación:</strong> ${npc.want}</p>
                    <p><strong>Twist:</strong> <em>"${npc.twist}"</em></p>
                </div>
            </div>
        `;
    }

    container.innerHTML = contenidoFinal + accionesHTML;

}


/* ==========================================================================
   FACTORY DE STATBLOCKS
   ========================================================================== */

function construirStatblock(subTipo, nivel) {
    const tipoGeneral = obtenerTipoGeneral(subTipo); // 'Spellcaster', 'Hibrido' o 'Combate'
    if (!tipoGeneral) return null;

    // 1. Determinar Tramo
    let tramo = 'bajo';
    if (nivel >= 10) tramo = 'max';
    else if (nivel >= 7) tramo = 'alto';
    else if (nivel >= 4) tramo = 'medio';

    // 2. Obtener Base de Datos (los objetos que definimos: stats_combate, etc.)
    const mapping = {
        'spellcaster': stats_spellcaster,
        'hibrido': stats_hibrido,
        'combate': stats_combate
    };
    const dataBase = mapping[tipoGeneral].base;

    // 3. Obtener Bonos de Progresión
    // Asumiendo que progresion_global está definido como el objeto de la respuesta anterior
    const infoTramo = progresion_global[tramo];
    const llaveTipo = tipoGeneral.toLowerCase();
    
    const bonoAtaque = infoTramo.atk[llaveTipo];
    const bonoHechizo = infoTramo.spell[llaveTipo];
    const salvaciones = infoTramo.salvaciones[llaveTipo]


    // 4. Retornar el objeto listo
    return {
        tipo: tipoGeneral,
        tramo: tramo,
        ataqueMelee: bonoAtaque.melee,
        ataqueRange: bonoAtaque.range,
        ataqueD: bonoAtaque.d,
        hechizoBono: bonoHechizo,
        dc: bonoHechizo ? (9 + bonoHechizo) : null,
        melee: `${dataBase.melee_dado} (${dataBase.melee_tipo})`,
        range: `${dataBase.range_dado} (${dataBase.range_tipo})`,
        saves: salvaciones
    };
}

function guardarNPC() {
    if (!ultimoNPCGenerado) return alert("¡Primero genera un NPC!");

    // 1. Obtener lo que ya hay en memoria o crear un array vacío
    let historial = JSON.parse(localStorage.getItem('historial_npcs')) || [];
    
    // 2. Añadir el nuevo (con una marca de tiempo para identificarlos)
    const npcAGuardar = {
        ...ultimoNPCGenerado,
        id_guardado: Date.now() 
    };
    
    historial.push(npcAGuardar);
    
    // 3. Guardar de nuevo
    localStorage.setItem('historial_npcs', JSON.stringify(historial));
    alert(`¡${ultimoNPCGenerado.nombre} ha sido guardado en la biblioteca!`);
}


function getHistorialNPCs() {
  return JSON.parse(localStorage.getItem('historial_npcs')) || [];
}

function setHistorialNPCs(arr) {
  localStorage.setItem('historial_npcs', JSON.stringify(arr));
}

function abrirBibliotecaModal() {
  const backdrop = document.getElementById('library-modal-backdrop');
  if (!backdrop) return;

  renderBibliotecaLista();
  backdrop.classList.add('is-open');
  backdrop.setAttribute('aria-hidden', 'false');
}

function cerrarBibliotecaModal() {
  const backdrop = document.getElementById('library-modal-backdrop');
  if (!backdrop) return;

  backdrop.classList.remove('is-open');
  backdrop.setAttribute('aria-hidden', 'true');
}

function renderBibliotecaLista() {
  const list = document.getElementById('library-list');
  if (!list) return;

  const historial = getHistorialNPCs();

  if (historial.length === 0) {
    list.innerHTML = `<div class="library-item"><div class="library-item-title">La biblioteca está vacía.</div></div>`;
    return;
  }

  // Más nuevo primero (opcional)
  const ordenado = [...historial].sort((a,b) => (b.id_guardado||0) - (a.id_guardado||0));

  list.innerHTML = ordenado.map(npc => {
    const id = npc.id_guardado;
    const nombre = npc.nombre || '(Sin nombre)';
    const especie = npc.especie || '(Sin especie)';
    return `
      <div class="library-item">
        <div class="library-item-title">
          <strong>${nombre}</strong> — ${especie}
        </div>
        <div class="library-item-actions">
          <button class="btn-action-modal" data-action="open" data-id="${id}">Abrir</button>
          <button class="btn-action btn-danger" data-action="delete" data-id="${id}">Eliminar</button>
        </div>
      </div>
    `;
  }).join('');
}

function abrirNPCGuardadoPorId(idGuardado) {
  const historial = getHistorialNPCs();
  const npc = historial.find(n => String(n.id_guardado) === String(idGuardado));
  if (!npc) return;

  mostrarNPC(npc);
  cerrarBibliotecaModal();
}

function eliminarNPCGuardadoPorId(idGuardado) {
  const historial = getHistorialNPCs();
  const npc = historial.find(n => String(n.id_guardado) === String(idGuardado));

  if (!npc) return;
  const ok = confirm(`¿Eliminar a "${npc.nombre}" de la biblioteca?`);
  if (!ok) return;

  const nuevo = historial.filter(n => String(n.id_guardado) !== String(idGuardado));
  setHistorialNPCs(nuevo);
  renderBibliotecaLista();
}


function copiarPromptIA() {
    if (!ultimoNPCGenerado) return;

    const npc = ultimoNPCGenerado;
    // Construimos una descripción visual rica
    const prompt = `Retrato de personaje fantástico de un ${npc.especie} ${npc.profesion}, 
    descripción física: ${npc.fisico}. 
    Ropas: ${npc.ropa || 'traveller clothes'}. 
    Equipado con: ${npc.equipo}. 
    Atmosfera: ${npc.personalidad}, estilo de arte de alta fantasía, pintura digital detallada, 
    estética de dungeons and dragons, luz cinematográfica, alta resolución.`;

    navigator.clipboard.writeText(prompt).then(() => {
        const btn = document.getElementById('btn-copy-prompt');
        const textoOriginal = btn.innerText;
        btn.innerText = "✅ ¡Copiado!";
        setTimeout(() => btn.innerText = textoOriginal, 2000);
    });
}
async function exportarJPG() {
  const card = document.querySelector('#resultado .npc-card');
  if (!card) return alert("Primero genera un NPC para exportar.");

  // Opcional: esperar a que carguen fuentes
  try { if (document.fonts?.ready) await document.fonts.ready; } catch (_) {}

  const canvas = await html2canvas(card, {
    scale: 2,
    useCORS: true,
    backgroundColor: '#fdf6e3' // si lo pones null, puede quedar transparente [web:34]
  });

  const dataURL = canvas.toDataURL('image/jpeg', 0.95); // JPEG via toDataURL [web:23]

  const safeName = (ultimoNPCGenerado?.nombre || 'npc')
    .toString()
    .trim()
    .replace(/[^\w\-]+/g, '_')
    .slice(0, 40);

  const a = document.createElement('a');
  a.href = dataURL;
  a.download = `${safeName}.jpg`;
  document.body.appendChild(a);
  a.click();
  a.remove();
}



/* ==========================================================================
   LISTENERS (EJEMPLOS PARA TUS BOTONES)
   ========================================================================== */

// Esperar a que el DOM cargue
document.addEventListener('DOMContentLoaded', () => {
    
    // Generación de Ciudadano
    const btnCivil = document.getElementById('btn-rapido');
    if (btnCivil) {
        btnCivil.onclick = () => mostrarNPC(generarNPC('civil_auto'));
    }

    // NPC a medida (abre modal)
    const btnCustom = document.getElementById('btn-custom');
    if (btnCustom) {
        btnCustom.onclick = () => abrirModalNPC();
    }

    // Botones del modal
    const btnClose = document.getElementById('btn-modal-close');
    if (btnClose) btnClose.onclick = () => cerrarModalNPC();

    const btnGen = document.getElementById('btn-modal-generate');
    if (btnGen) btnGen.onclick = () => generarDesdeModal();

    // Cerrar al clickear fuera del modal + Escape
    const backdrop = document.getElementById('npc-modal-backdrop');
    if (backdrop) {
        backdrop.addEventListener('click', (e) => {
            if (e.target === backdrop) cerrarModalNPC();
        });
    }
    document.addEventListener('keydown', (e) => {
        if (e.key === 'Escape') cerrarModalNPC();
    });

    // Función ayudante para Aventureros
    const clickAventurero = (id, subTipo) => {
        const btn = document.getElementById(id);
        if (btn) {
            btn.onclick = () => {
                const lvl = parseInt(document.getElementById('nivel-input').value) || 1;
                mostrarNPC(generarNPC('aventurero', subTipo, lvl));
            };
        }
    };
    const libBackdrop = document.getElementById('library-modal-backdrop');
    if (libBackdrop) {
      libBackdrop.addEventListener('click', (e) => {
        if (e.target === libBackdrop) cerrarBibliotecaModal();
      });
    }

    document.addEventListener('keydown', (e) => {
      if (e.key === 'Escape') cerrarBibliotecaModal();
    });


    // Mapeo de botones de clase
    clickAventurero('btn-guerrero', 'combate_Guerrero');
    clickAventurero('btn-barbaro', 'combate_Barbaro');
    clickAventurero('btn-sigilo', 'combate_Sigilo');
    clickAventurero('btn-monje' , 'combate_Monje');
    clickAventurero('btn-divino', 'spellcaster_Divino');
    clickAventurero('btn-arcano', 'spellcaster_Arcano');
    clickAventurero('btn-naturaleza', 'spellcaster_Naturaleza');
    clickAventurero('btn-paladin', 'hibrido_Paladin');
    clickAventurero('btn-ranger', 'hibrido_Ranger');



    // Listener GLOBAL para botones dinámicos (los que aparecen dentro de la tarjeta)
    document.addEventListener('click', (e) => {
        if (!e.target) return;

        if (e.target.id === 'btn-save-local') {
            guardarNPC();
        } 
        else if (e.target.id === 'btn-clear') {
          limpiarVista();
        }

        else if (e.target.id === 'btn-copy-prompt') {
            copiarPromptIA();
        }
        else if (e.target.id === 'btn-export-img') {
          exportarJPG();
        }

        if (e.target.id === 'btn-abrir-biblioteca') {
            abrirBibliotecaModal();
        }
        if (e.target.id === 'btn-library-close') {
            cerrarBibliotecaModal();
        }
        // Click en Abrir/Eliminar dentro de la lista   
        const action = e.target.dataset?.action;
        const id = e.target.dataset?.id;

        if (action === 'open' && id) abrirNPCGuardadoPorId(id);
        if (action === 'delete' && id) eliminarNPCGuardadoPorId(id);
    });
});
