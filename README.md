# NPC-generator
Generador de NPCs en español e inglés

Esta herramienta genera NPCs para partidas de rol de forma rápida: civiles (ciudad/pueblo y clase social) y aventureros por clase, con nivel 1 a 10. 

## Cómo usar

1. Abre el archivo `index_en.html` en tu navegador.
2. Genera NPCs con los botones principales:
- Quick NPC: crea un NPC civil aleatorio.
- Custom NPC: abre un panel para elegir (o dejar en random) especie, ubicación, clase social y actitud, y luego genera el NPC.
- Botones de clase (Warrior, Barbarian, Rogue, Monk, Cleric, Wizard, Druid, Paladin, Ranger): elige primero el nivel y luego pulsa la clase para generar un aventurero. 

## Acciones dentro de la tarjeta

Cuando ya tienes un NPC generado, puedes:
- Clear: limpiar la vista.
- Save: guardar el NPC en la biblioteca del navegador (se almacena en localStorage). 
- NPC Library: abrir la biblioteca, cargar NPCs guardados o borrarlos.
- Copy Prompt for IA: copiar un prompt para generar un retrato con una IA.
- Export JPG: exportar la tarjeta del NPC como imagen (usa html2canvas).

## Notas y problemas comunes

- Si algo no funciona, revisa la consola del navegador: un error de sintaxis en un archivo de datos puede impedir que cargue todo el generador.
- La biblioteca depende del almacenamiento del navegador: si estás en modo incógnito o el navegador bloquea el almacenamiento, puede que no se guarden los NPCs.
- Si Export JPG no funciona, revisa que se esté cargando la librería `html2canvas` (si estás sin internet y no la tienes local). 
