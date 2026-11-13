# M3 — Base de conocimiento

> Material fuente: `m3/modulo3-lectura1.md`, `m3/modulo3-lectura2.md`, `m3/modulo3-lectura3.md`, `m3/modulo3-lectura4.md`.
> Citas en formato `[archivo.md, L<línea>]` o `[archivo.md, Lec X de 4]`.
> Bibliografía principal: Sommerville, Ingeniería de Software (9na edición, 2005; citas a 2011 por re-edición).

---

## 1. Evolución del software

### 1.1 Conceptos clave

- **El desarrollo no se detiene cuando un sistema se entrega**: "El desarrollo del software no se detiene cuando un sistema se entrega, sino que continúa a lo largo de la vida de éste." [lectura1.md, L33-34]
- **Causas de la evolución**: cambios empresariales, cambios en expectativas del usuario, corrección de errores, adaptación a nueva plataforma (hardware/software) y mejoras de rendimiento u otras características no funcionales. [lectura1.md, L35-42]
- **Sistemas como activos críticos**: las organizaciones invierten grandes sumas en software y son dependientes de esos sistemas, considerados "activos empresariales críticos". [lectura1.md, L43-48]
- **Datos de costo de evolución**:
  - Erlikh (2000): entre el **85% y 90%** de los costos del software organizacional son costos de evolución. [lectura1.md, L51-54]
  - Otros estudios: aproximadamente **dos tercios** de los costos del software son evolución. [lectura1.md, L54-56]
  - Conclusión: "las compañías más grandes gastan más en conservar los sistemas existentes que en el desarrollo de sistemas nuevos". [lectura1.md, L48-50]
- **Vida útil larga del software**: grandes sistemas militares o de infraestructura (control de tráfico aéreo) duran 30 años o más; sistemas empresariales suelen superar los 10 años. [lectura1.md, L78-84]
- **Sistemas "tipo E"** (Lehman y Belady): sistemas organizacionales grandes en los que los requerimientos cambian para reflejar las necesidades cambiantes de la empresa y donde "las nuevas versiones del sistema son esenciales para que éste proporcione valor al negocio". [lectura1.md, L347-353]
- **"Desarrollo de software abandonado" / subutilizado** (Hopkins y Jenkins, 2008): sistemas que "tienen que desarrollarse y gestionarse en un ambiente donde dependen de muchos otros sistemas de software". [lectura1.md, L62-66]
- **Visión de Rajlich y Bennett (2000)**: distinguen tres fases en el ciclo de vida: **evolución**, **servicio** y **retiro gradual (phase-out)**. [lectura1.md, L128-134, L148-158]
  - En **evolución** se pueden hacer cambios significativos a la arquitectura y funcionalidad; hay propuestas constantes de cambio a requerimientos pero la estructura tiende a degradarse.
  - En **servicio** sólo se hacen cambios pequeños (tácticos); normalmente se considera cómo reemplazar el software.
  - En **retiro gradual** el software aún puede usarse pero no se implementan más cambios; los usuarios tienen que sobrellevar los problemas que descubran.
- **Proceso espiral de Sommerville**: "la ingeniería de software se debe considerar como un proceso en espiral, con requerimientos, diseño, implementación y pruebas continuas, a lo largo de la vida del sistema". [lectura1.md, L90-92]
- **Cambios urgentes**: surgen por tres razones — (1) falla seria que deba repararse; (2) cambios a sistemas del entorno con efectos inesperados; (3) cambios no anticipados a la empresa (competidores, nueva legislación). [lectura1.md, L243-251]
- **Reparación de emergencia**: cuando no puede seguirse el proceso formal, se hace una reparación rápida al programa; el riesgo es que los requerimientos, el diseño y el código se vuelvan inconsistentes y se acelere la "degeneración del software". [lectura1.md, L255-274]
- **Desarrollo vs evolución (mismo equipo vs equipos separados)**: si la transición del desarrollo a la evolución no es uniforme, el proceso posterior se conoce como **mantenimiento de software**, e incluye actividades adicionales como comprensión del programa. [lectura1.md, L115-126]

### 1.2 Leyes de Lehman

> Las leyes aplican a sistemas organizacionales grandes ("tipo E"). Propuestas originalmente por Lehman y Belady (1985); las primeras cinco son las iniciales; las restantes se agregaron después.

| # | Nombre | Contenido | Cita |
|---|--------|-----------|------|
| 1 | **Cambio continuo** | "Un programa usado en un entorno real debe cambiar; de otro modo, en dicho entorno se volvería progresivamente inútil." El mantenimiento es un proceso inevitable. | [lectura1.md, L355-360, L453-458] |
| 2 | **Complejidad creciente** | "A medida que cambia un programa en evolución, su estructura tiende a volverse más compleja. Deben dedicarse recursos adicionales para conservar y simplificar su estructura." Única manera de evitarlo: invertir en **mantenimiento preventivo**. | [lectura1.md, L361-368, L459-467] |
| 3 | **Evolución de programa grande (autorregulación)** | "La evolución del programa es un proceso autorregulador. Los atributos del sistema, como tamaño, tiempo entre versiones y número de errores reportados, son casi invariantes para cada versión del sistema." Limitada por factores **estructurales** (complejidad del sistema) y **organizacionales** (burocracias y presupuestos). | [lectura1.md, L369-404, L468-476] |
| 4 | **Estabilidad organizacional** | "Durante la vida de un programa, su tasa de desarrollo es aproximadamente constante e independiente de los recursos dedicados al desarrollo del sistema." Los proyectos grandes funcionan en estado "saturado": cambios en recursos/personal tienen efectos imperceptibles a largo plazo. | [lectura1.md, L405-414, L477-483] |
| 5 | **Conservación de familiaridad** | "A lo largo de la existencia de un sistema, el cambio incremental en cada liberación es casi constante." Grandes cambios incrementales en funcionalidad traen aparejadas nuevas fallas: una versión ulterior deberá dedicar esfuerzo a reparación con poca nueva funcionalidad. | [lectura1.md, L415-427, L485-491] |
| 6 | **Crecimiento continuo** | "La funcionalidad ofrecida por los sistemas tiene que aumentar continuamente para mantener la satisfacción del usuario." | [lectura1.md, L431-433, L492-497] |
| 7 | **Crecimiento de calidad** | "La calidad de los sistemas declinará, a menos que se modifiquen para reflejar los cambios en su entorno operacional." | [lectura1.md, L431-434, L498-503] |
| 8 | **Sistema de retroalimentación** | "Los procesos de evolución incorporan sistemas de retroalimentación multiagente y multiciclo. Además, deben tratarse como sistemas de retroalimentación para lograr una mejora significativa del producto." | [lectura1.md, L434-437, L504-511] |

> Fuente de la tabla: Sommerville, 2011, p. 241. [lectura1.md, L451, L512]

### 1.3 Modelos / ciclos de vida mencionados

- **Cascada / basado en un plan** (citado por contraste): "enfoque basado en un plan" — espera documentación detallada, documentos de requerimientos y diseño. [lectura1.md, L304-313]
- **Espiral**: "la ingeniería de software se debe considerar como un proceso en espiral, con requerimientos, diseño, implementación y pruebas continuas, a lo largo de la vida del sistema" — comienza con la versión 1, se proponen cambios, comienza la versión 2. [lectura1.md, L90-98]
- **Evolución / incremental** (incluye ágil): los métodos ágiles "se utilizan tanto para la evolución del programa como para su desarrollo. De hecho, puesto que dichos métodos se basan en el desarrollo incremental, hacer la transición del desarrollo ágil a la evolución posterior a la entrega no debería tener complicaciones." [lectura1.md, L287-291]
  - **Hibridación ágil ↔ plan**: dos situaciones problemáticas — (1) equipo ágil pasó a equipo que prefiere plan; (2) sistema basado en plan pasado a equipo ágil (puede requerir reingeniería antes). [lectura1.md, L300-321]
- **Rajlich y Bennett (modelo Evolución/Servicio/Phase-out)**: ver §1.1.
- **Proceso de evolución (Arthur, 1988)** — Sommerville lo adapta: actividades = análisis del cambio, planeación de la versión, implementación del sistema, liberación a los clientes. Cíclico. [lectura1.md, L195-211]
- **Programación extrema (XP)** en mantenimiento: Poole y Huisman (2001) reportan uso exitoso de XP en mantenimiento de un sistema grande originalmente basado en plan, previa reingeniería de su estructura. [lectura1.md, L322-327]

### 1.4 Costo del cambio / desarrollo vs mantenimiento

- Invertir esfuerzo extra en diseño e implementación durante el desarrollo **reduce costos de cambios futuros**; las "buenas técnicas de ingeniería de software, como la especificación precisa, el uso de desarrollo orientado a objetos y la administración de la configuración, contribuyen a reducir los costos de mantenimiento". [lectura2.md, L131-143]
- "Es posible que el trabajo realizado durante el desarrollo para hacer que el software sea más fácil de entender, y de cambiar, reduzca los costos de evolución." [lectura2.md, L136-139]
- "Desarrollar software para hacerlo más mantenible es efectivo en costo, si se toman en cuenta todos los costos de por vida." [lectura2.md, L160-163]
- Ejemplo hipotético: $25.000 extra en desarrollo → ahorro de $100.000 en mantenimiento durante la vida del sistema. [lectura2.md, L150-156]

---

## 2. Mantenimiento de software

### 2.1 Definición

"El mantenimiento del software es el proceso general de cambiar un sistema después de que éste se entregó. El término usualmente se aplica a software personalizado, en el que grupos de desarrollo separados intervienen antes y después de la entrega." [lectura2.md, L37-41]

Incluye actividades adicionales a las del desarrollo, principalmente **comprensión del programa**. [lectura1.md, L121-126]

### 2.2 Tipos de mantenimiento (Sommerville)

> Sommerville reconoce **tres** tipos y aclara que la nomenclatura tradicional (correctivo/adaptativo/perfectivo) no se usa de manera universal. [lectura2.md, L48-88]

1. **Reparaciones de fallas** (≡ mantenimiento correctivo, "universalmente usado"). Cambios van desde simples correcciones de codificación hasta corrección de errores de diseño o de especificación/incorporación de nuevos requerimientos; se modifican componentes existentes y se agregan nuevos donde sea necesario. [lectura2.md, L37-47, L77-79]
   - Errores de codificación: relativamente baratos.
   - Errores de diseño: más costosos, implican reescritura de muchos componentes.
   - Errores de requerimientos: los más costosos; extenso rediseño del sistema. [lectura2.md, L49-54]

2. **Adaptación ambiental** (≡ mantenimiento adaptativo, **en uno de sus sentidos**). "Este tipo de mantenimiento se requiere cuando algún aspecto del entorno del sistema, como el hardware, la plataforma operativa del sistema u otro soporte, cambia." [lectura2.md, L56-60]

3. **Adición de funcionalidad**. "Este tipo de mantenimiento es necesario cuando varían los requerimientos del sistema, en respuesta a un cambio organizacional o empresarial. La escala de los cambios requeridos en el software suele ser mucho mayor que en los otros tipos de mantenimiento." [lectura2.md, L61-65]

**Aclaración importante sobre nombres** (muy preguntado en parciales):

- "**Mantenimiento correctivo**" = universalmente usado para reparación de fallas de desarrollo.
- "**Mantenimiento adaptativo**" a veces = adaptarse a un nuevo entorno; otras veces = adaptar el software a nuevos requerimientos.
- "**Mantenimiento perfectivo**" a veces = implementar nuevos requerimientos; otras veces = mejorar estructura y rendimiento.
- "En este capítulo se evitó el uso de tales términos." [lectura2.md, L74-88]

**Otros términos que pueden aparecer en preguntas**: **mantenimiento preventivo** = actividad de mejorar la estructura del software sin agregar funcionalidad (Lehman 2da ley; §6.1 de esta kb). **Mantenimiento predictivo** = predecir el número de peticiones de cambio (Lec 2 de la lectura 2 — "Predicción de mantenimiento"). [lectura2.md, L242-313]

> ⚠️ En las actividades de repaso aparecen "Mantenimiento Preventivo" y "Mantenimiento Predictivo" como opciones a reconocer junto con los tres tipos de Sommerville. [lectura2.md, L441-449]

### 2.3 Costos del mantenimiento

- "El mantenimiento del software toma una proporción más alta de presupuestos de TI que el nuevo desarrollo (**casi dos tercios en mantenimiento y un tercio en desarrollo**)." [lectura2.md, L101-103]
- "Una mayor parte del presupuesto de mantenimiento se destina a la implementación de nuevos requerimientos, y no a la reparación de bugs." [lectura2.md, L103-107]
- "Evolucionar el sistema para enfrentar nuevos entornos y requerimientos nuevos o cambiantes consume más esfuerzo de mantenimiento." [lectura2.md, L110-113]
- **Guimaraes (1983)**: en sistemas de aplicación empresarial, los costos de mantenimiento son ampliamente comparables con los de desarrollo. En sistemas embebidos de tiempo real, los costos de mantenimiento fueron hasta **cuatro veces mayores** que los costos de desarrollo. [lectura2.md, L114-121]
- "Los requerimientos de alta fiabilidad y rendimiento de dichos sistemas [embebidos] significan que los módulos deben estar estrechamente ligados y, por lo tanto, son difíciles de cambiar." [lectura2.md, L125-128]

### 2.4 Proceso de mantenimiento

Cíclico: incluye análisis del cambio → planeación de la versión → implementación → validación → liberación; se repite con un nuevo conjunto de cambios propuestos. [lectura1.md, L195-211]

**Etapas clave (implementación del cambio)**:
- Análisis del cambio y estimación del costo e impacto. [lectura1.md, L196-202]
- Planeación de la versión (se aceptan cambios, se decide cuáles incluir). [lectura1.md, L202-211]
- Comprensión del programa (especialmente si el equipo de desarrollo original no es responsable del cambio). [lectura1.md, L215-223]
- Modificación de especificación, diseño e implementación; si es adecuado, elaboración de prototipos. [lectura1.md, L224-232]
- Liberación de una nueva versión y validación. [lectura1.md, L206-211]

### 2.5 ¿Por qué es más caro agregar funcionalidad después? (4 razones)

1. **Estabilidad del equipo**: el equipo de desarrollo original se separa tras la entrega; el nuevo equipo no entiende el sistema ni los antecedentes de las decisiones de diseño y debe invertir tiempo en comprenderlo. [lectura2.md, L178-185]
2. **Práctica de desarrollo deficiente**: el contrato de mantenimiento puede otorgarse a otra compañía, sin incentivo para escribir software mantenible. [lectura2.md, L186-195]
3. **Habilidades del personal**: el personal de mantenimiento con frecuencia es inexperto y no está familiarizado con el dominio. El mantenimiento "tiene una mala imagen entre los ingenieros de software" y se asigna a personal novato; sistemas antiguos pueden estar escritos en lenguajes obsoletos. [lectura2.md, L197-206]
4. **Antigüedad y estructura del programa**: la estructura se degrada con los cambios; sistemas antiguos pueden no estar bien estructurados, optimizados para eficiencia (no comprensibilidad), con documentación perdida o inconsistente y sin gestión rigurosa de configuración. [lectura2.md, L207-219]

### 2.6 Predicción del mantenimiento

Para evaluar la relación sistema-entorno se debe valorar: [lectura2.md, L250-265]
1. Número y complejidad de las interfaces.
2. Número de requerimientos inherentemente inestables.
3. Procesos empresariales donde se usa el sistema.

**Complejidad ciclomática (McCabe, 1976)** y otros estudios (Banker et al. 1993; Coleman et al. 1994; Kafura y Reddy 1987; Kozlov et al. 2008): cuanto más complejo, más costoso de mantener. **Kafura y Reddy**: el esfuerzo de mantenimiento se enfoca en un pequeño número de componentes complejos; para reducir costos se deben sustituir por alternativas más sencillas. [lectura2.md, L266-281]

**Métricas de proceso** que auxilian a predecir mantenibilidad: [lectura2.md, L284-308]
1. Número de peticiones para mantenimiento correctivo.
2. Tiempo promedio requerido para análisis del impacto.
3. Tiempo promedio tomado para implementar una petición de cambio.
4. Número de peticiones de cambio pendientes.

### 2.7 Reingeniería de software

> "La reingeniería puede implicar volver a documentar el sistema, refactorizar su arquitectura, traducir los programas a un lenguaje de programación moderno, y modificar y actualizar la estructura y los valores de los datos del sistema. **La funcionalidad del software no cambia** y, normalmente, conviene tratar de evitar grandes cambios a la arquitectura de sistema." [lectura2.md, L331-337]

**Beneficios respecto de la sustitución**:
1. **Reducción del riesgo**: alto riesgo en desarrollo de software empresarial crítico; errores de especificación o desarrollo, demoras. [lectura2.md, L341-346]
2. **Reducción de costos**: Ulrich (1990) cita un sistema comercial: reimplementación estimada en **$50 millones**, reingeniería exitosa por **$12 millones**. [lectura2.md, L348-355]

**Actividades del proceso de reingeniería** (ordenadas): [lectura2.md, L362-391]
1. **Traducción del código fuente** (herramienta automática): convierte el programa de un lenguaje antiguo a versión moderna o a otro lenguaje.
2. **Ingeniería inversa**: analizar y extraer información del programa para documentar su organización y funcionalidad; generalmente automatizada.
3. **Mejoramiento de la estructura del programa**: analizar y modificar estructura de control para facilitar lectura/comprensión; parcialmente automatizada con intervención manual.
4. **Modularización del programa**: agrupar partes relacionadas, eliminar redundancia; puede incluir refactorización arquitectónica (ej.: consolidar varios almacenes de datos en un solo depósito). Proceso manual.
5. **Reingeniería de datos**: redefinición de esquemas de BD, conversión a nueva estructura, limpieza (corregir errores, eliminar duplicados).

**No todas las actividades son obligatorias**:
- No se necesita traducción si todavía se usa el mismo lenguaje.
- Si toda la reingeniería es automática, quizá no sea necesaria la ingeniería inversa.
- Reingeniería de datos sólo si cambian las estructuras de datos. [lectura2.md, L392-401]

**Espectro de enfoques (de menor a mayor costo)** [lectura2.md, L404-412]:
- Traducción del código fuente (más barata) → Modularización → Reingeniería de datos → Reingeniería como parte de la migración arquitectónica (más costosa).

**Límites prácticos**: "No es posible, por ejemplo, convertir un sistema escrito con un enfoque funcional, a un sistema orientado a objetos. Los grandes cambios arquitectónicos o la reorganización radical de la gestión de los datos del sistema no pueden realizarse automáticamente". [lectura2.md, L413-419]
Aunque la reingeniería podría mejorar la mantenibilidad, **el sistema con reingeniería probablemente no será tan mantenible como un sistema nuevo desarrollado usando modernos métodos de ingeniería de software**. [lectura2.md, L420-427]

### 2.8 Refactorización

> "La refactorización es el proceso de hacer mejoras a un programa para frenar la degradación mediante el cambio (Opdyke y Johnson, 1990). Ello significa modificar un programa para mejorar su estructura, reducir su complejidad o hacerlo más fácil de entender." [lectura3.md, L44-47]

- "A veces se considera que la refactorización está limitada al desarrollo orientado a objetos, pero los principios son aplicables a cualquier enfoque de desarrollo." [lectura3.md, L48-50]
- "Mientras se refactorice un programa, no se debe agregar funcionalidad, sino que hay que concentrarse en la mejora del programa. Por ende, se puede considerar la refactorización como el **'mantenimiento preventivo'** que reduce los problemas de cambios futuros." [lectura3.md, L51-55]
- Parte inherente de métodos ágiles (XP); sin embargo "no depende de otras 'actividades ágiles' y se utiliza con cualquier enfoque al desarrollo". [lectura3.md, L68-79]
- Las pruebas de regresión (énfasis en ágiles) reducen el riesgo de introducir nuevos errores durante la refactorización. [lectura3.md, L73-77]

**"Malos olores" (Fowler y col., 1999)** — situaciones estereotípicas donde el código es susceptible de mejorarse: [lectura3.md, L80-104]
1. **Código duplicado**: el mismo código (o muy similar) en diferentes lugares; descartar o implementar como un solo método/función.
2. **Métodos largos**: rediseñar en varios métodos más cortos.
3. **Enunciados de switch (case)**: implican duplicación, donde el cambio depende del tipo de algún valor; en OO normalmente se reemplaza por polimorfismo.
4. **Aglomeración de datos**: el mismo grupo de objetos de datos (campos en clases, parámetros en métodos) en muchos lugares; reemplazable por un objeto que encapsule todos los datos.
5. **Generalidad especulativa**: generalidad incluida "por si se requiere en el futuro"; normalmente puede eliminarse.

**Transformaciones primitivas de refactorización (Fowler)** [lectura3.md, L106-118]:
- **Extract (extraer)**: elimina duplicados y crea un nuevo método.
- **Consolidate (consolidar expresión condicional)**: sustituye una secuencia de pruebas con una sola prueba.
- **Pull up (subir)**: sustituye métodos similares en subclases con un solo método en la superclase.
- Entornos como Eclipse incluyen soporte para refactorización en sus editores.

**Refactorización del diseño**: si la estructura está significativamente degradada, puede requerirse refactorización del diseño: "identificar patrones de diseño relevantes y sustituir el código existente con código que implemente dichos patrones de diseño" (Kerievsky, 2004). Es un problema más costoso y difícil que la refactorización del código. [lectura3.md, L123-130]

### 2.9 Diferencia entre reingeniería y refactorización

- **Reingeniería**: "se lleva a cabo después de haber mantenido un sistema durante cierto tiempo y, por consiguiente, los costos de mantenimiento aumentan. Se usan herramientas automatizadas para procesar y someter a reingeniería un sistema heredado y así crear un nuevo sistema que sea más mantenible." [lectura3.md, L56-63]
- **Refactorización**: "proceso continuo de mejoramiento debido al proceso de desarrollo y evolución. Tiene la intención de evitar la degradación de la estructura y el código que aumentan los costos y las dificultades por mantener un sistema." [lectura3.md, L63-67]
- Ambas intentan "hacer el software más fácil de entender y cambiar", pero no son lo mismo. [lectura3.md, L56-58]

---

## 3. Sistemas heredados (legacy)

### 3.1 Definición

> "Los sistemas heredados son sistemas antiguos que todavía son útiles y en ocasiones críticos para la operación de la empresa. Pueden implementarse usando lenguajes y tecnología obsoletos, o utilizar otros sistemas que sean costosos de mantener. Normalmente su estructura se ha degradado por cambios y la documentación está extraviada o desactualizada. No obstante, quizá no sea efectivo en costo sustituir tales sistemas. Quizá sólo se usen algunas veces al año o sea demasiado riesgoso sustituirlos porque se hayan perdido las especificaciones." [lectura3.md, L134-144]

### 3.2 Administración de sistemas heredados

- "Todavía existen muchos sistemas heredados que son sistemas empresariales críticos. Éstos tienen que extenderse y adaptarse a las cambiantes prácticas del comercio electrónico." [lectura3.md, L154-157]
- "La mayoría de las organizaciones, por lo general, tienen un portafolio de sistemas heredados, que se usan con un presupuesto limitado para mantenimiento y actualización. Deben decidir cómo obtener el mejor retorno de la inversión." [lectura3.md, L158-161]
- Las decisiones no son excluyentes: "Cuando un sistema está compuesto por muchos programas, es posible aplicar diferentes opciones a cada programa." [lectura3.md, L195-197]

### 3.3 Las 4 estrategias / opciones estratégicas (Sommerville)

[lectura3.md, L165-193]

1. **Desechar completamente el sistema**. Elegir cuando el sistema no vaya a realizar una aportación efectiva a los procesos empresariales. Ocurre cuando los procesos empresariales cambiaron desde la instalación del sistema y ya no se apoyan en el sistema heredado.
2. **Dejar sin cambios el sistema y continuar el mantenimiento regular**. Elegir cuando el sistema todavía se requiera, pero sea bastante estable y los usuarios hagan relativamente pocas peticiones de cambio.
3. **Someter el sistema a reingeniería para mejorar su mantenibilidad**. Elegir cuando la calidad del sistema se haya degradado por el cambio y todavía se propone un nuevo cambio. Puede incluir desarrollo de nuevos componentes de interfaz para que el sistema original logre trabajar con sistemas más recientes.
4. **Sustituir todo o parte del sistema con un nuevo sistema**. Elegir cuando factores como hardware nuevo signifiquen que el viejo sistema no pueda continuar en operación, o cuando sistemas comerciales (off-the-shelf) permitirían al nuevo sistema desarrollarse a costo razonable.
   - **Sustitución evolutiva**: grandes componentes del sistema se sustituyen con sistemas comerciales y otros componentes se reutilizan siempre que sea posible. [lectura3.md, L189-193]

### 3.4 Valoración de sistemas heredados — matriz calidad × valor

> "Cuando se valora un sistema heredado, tiene que observarse desde las perspectivas empresarial y técnica (Warren, 1998)." [lectura3.md, L198-200]

Cuatro grupos resultantes (figura 1 del original) [lectura3.md, L216-239]:
1. **Baja calidad + bajo valor empresarial** → **descartar**. Mantenerlos será costoso y la tasa de retorno pequeña.
2. **Baja calidad + alto valor empresarial** → **reingeniería** (o sustituir si hay sistema comercial adecuado). Aportación importante pero mantenimiento costoso.
3. **Alta calidad + bajo valor empresarial** → **continuar mantenimiento normal** (mientras no se requieran cambios costosos y el hardware siga en uso); si los cambios costosos son necesarios, **desechar**.
4. **Alta calidad + alto valor empresarial** → **mantener en operación con mantenimiento normal**. No invertir en transformación ni sustitución.

### 3.5 Valor empresarial — 4 temas básicos

Para calcular el valor empresarial: identificar participantes (usuarios finales, administradores) y plantear preguntas. [lectura3.md, L244-247]

1. **El uso del sistema**: si sólo se usa ocasionalmente o por pocos individuos → bajo valor. Cuidado con uso ocasional pero importante (ej.: sistema de registro de estudiantes que sólo se usa al comenzar el año escolar pero es esencial). [lectura3.md, L249-260]
2. **Los procesos empresariales que se mantienen**: si el sistema es inflexible, los procesos se vuelven obsoletos → bajo valor porque fuerza procesos ineficientes. [lectura3.md, L262-269]
3. **Confiabilidad del sistema**: no sólo problema técnico sino empresarial. Si los problemas afectan clientes o distraen trabajadores → bajo valor. [lectura3.md, L270-276]
4. **Las salidas del sistema**: clave = importancia de las salidas para el funcionamiento exitoso de la empresa. Si la empresa depende de ellas → alto valor; si pueden generarse fácilmente de otra forma o rara vez se utilizan → bajo valor. [lectura3.md, L277-283]

### 3.6 Valoración técnica — entorno

> "Para valorar un sistema de software desde una perspectiva técnica, se necesita considerar tanto el sistema de aplicación en sí como el entorno donde opera el sistema." [lectura3.md, L307-310]

**Factores del entorno** (Tabla 1 del original, Sommerville 2011, p. 255) [lectura3.md, L333-389]:
- **Estabilidad del proveedor** — ¿el proveedor todavía está en operación? ¿es financieramente estable y probable que continúe?
- **Tasa de falla** — ¿el hardware tiene alta tasa de fallas reportadas? ¿el software de soporte se cae y fuerza reinicio?
- **Edad** — antigüedad de hardware y software; cuanto más viejos, más obsoletos.
- **Rendimiento** — ¿el rendimiento del sistema es adecuado? ¿los problemas tienen efecto relevante sobre los usuarios?
- **Requerimiento de soporte** — costos de mantenimiento de hardware y de licencias de software de soporte.
- **Interoperabilidad** — ¿hay problemas con otros sistemas? ¿se pueden usar los compiladores con versiones actuales del SO? ¿se requiere emulación de hardware?

**Datos útiles**: costos de mantenimiento del hardware y software de soporte; número de fallas de hardware en algún periodo; frecuencia con la que se aplican "parches" y correcciones al software de soporte. [lectura3.md, L317-324]

### 3.7 Valoración técnica — calidad de la aplicación

> "Para valorar la calidad técnica de un sistema de aplicación, quizá se deban valorar diversos factores (tabla 2) que se relacionan principalmente con la confiabilidad del sistema, las dificultades de mantener el sistema y su documentación." (Sommerville, 2011, p. 255) [lectura3.md, L391-396]

**Factores** (Tabla 2 del original) [lectura3.md, L398-464]:
1. **Entendimiento** — dificultad de entender el código fuente actual; complejidad de las estructuras de control; nombres significativos.
2. **Documentación** — qué documentación del sistema está disponible; si está completa, consistente y actualizada.
3. **Datos** — existencia de modelo de datos explícito; duplicación de datos a través de archivos; datos actualizados y consistentes.
4. **Rendimiento** — ¿es adecuado? ¿los problemas tienen efecto significativo sobre los usuarios?
5. **Lenguaje de programación** — ¿hay compiladores modernos disponibles? ¿el lenguaje todavía se usa para nuevos sistemas?
6. **Administración de configuración** — ¿todas las versiones de las partes del sistema se administran mediante un sistema administrativo? ¿Existe una descripción explícita de las versiones de componentes en uso?
7. **Datos de prueba** — ¿hay datos de prueba para el sistema? ¿hay registro de pruebas de regresión realizadas al agregar nuevas características?
8. **Habilidades del personal** — ¿hay personal disponible con habilidades para mantener la aplicación? ¿hay personal con experiencia en el sistema?

**Datos útiles para juzgar la calidad** [lectura3.md, L466-482]:
1. **Número de peticiones de cambio del sistema**: cuanto más alto el valor acumulado, más baja la calidad (los cambios corrompen la estructura).
2. **Número de interfaces de usuario**: cada forma puede considerarse una interfaz separada; más interfaces → más probabilidad de inconsistencias y redundancias.
3. **Volumen de datos usados por el sistema**: más alto el volumen (número de archivos, tamaño de BD) → más probable que haya inconsistencias.

### 3.8 Consideraciones políticas / no técnicas

> "En muchos casos, las decisiones en realidad no son objetivas, sino que se basan en consideraciones políticas u organizacionales." [lectura3.md, L485-487]

Ejemplos:
- Fusión de dos empresas: el socio políticamente más poderoso conserva sus sistemas y desecha los demás. [lectura3.md, L488-490]
- Gerente ejecutivo que decide moverse a nueva plataforma → puede requerir sustitución de aplicaciones. [lectura3.md, L490-493]
- Falta de presupuesto para transformación → se continúa el mantenimiento aunque dé costos más altos a largo plazo. [lectura3.md, L494-497]

### 3.9 Migración

Mencionada como parte de las estrategias: la **sustitución evolutiva** y la **reingeniería como parte de la migración arquitectónica** (la opción más costosa dentro del espectro de reingeniería). [lectura2.md, L406-412; lectura3.md, L189-193]

---

## 4. Ingeniería de requerimientos

### 4.1 Lo que aparece en las lecturas

> ⚠️ El archivo `lectura4.md` se titula "Ingeniería de requerimientos" pero el grueso de su contenido se enfoca en **Patrones de diseño, Diseño centrado en el usuario y Sistemas en tiempo real**. Los temas "puros" de ingeniería de requerimientos (tipos, elicitación, proceso ERS, validación) son escasos en estas cuatro lecturas y aparecen principalmente como caso de estudio y preguntas de repaso.

Lo que sí está cubierto (lectura4.md):
- El caso de las cabañas menciona **requerimientos no funcionales**: "poder recibir la visita de 1000 clientes en dos horas"; "disco rígido para almacenar la información de por lo menos 1 terabyte"; "impresora láser color bajo Windows". [lectura4.md, L60-66, L138-140]
- **Requerimientos funcionales del sistema de reservas**: "registrar las reservas, modificar las reservas, consultar las reservas, anular las reservas e imprimir las reservas". [lectura4.md, L92-94]
- **Requerimientos de dominio**: "sistema de facturación con IVA del 25 % para clientes que provienen de Brasil" — surge del dominio impositivo. [lectura4.md, L96-100]
- **Riesgos** y análisis de riesgos: "se requiere la creación de un sistema de reservas que tenga la capacidad de realizar un análisis de riesgos exhaustivo"; "es necesario contemplar los riesgos que comprenden el sistema de facturación". [lectura4.md, L68-71, L102-104]
- **Elicitación**: "llevar a cabo una investigación en la empresa, entrevistando a los encargados del área de Reservas y recopilando información de 200 empleados vinculados con dicha área". [lectura4.md, L73-78]
- **Validación**: "se necesita que el sistema de reservas sea aprobado por los usuarios para verificar que funcione sin errores". [lectura4.md, L134-136]
- **Tipos de pruebas / fallas mencionadas**: fallas de datos, fallas de control, fallas de entrada/salida, fallas de interfaz, fallas de gestión de almacenamiento. [lectura4.md, L128-132]
- **Herramientas gráficas / documentar**: "registrar los requerimientos en un documento gráfico detallado y una herramienta gráfica". [lectura4.md, L84-86]

### 4.2 Elementos de administración de requerimientos (de las preguntas de repaso)

La etapa de "administración de requerimientos" se menciona con los siguientes elementos a decidir: [lectura4.md, L1664-1677]
- **Identificación de requerimientos** ✓
- **Políticas de seguimiento** ✓
- **Herramientas de apoyo** ✓
- **Políticas de comunicación** ✓
- ~~Políticas de herencia~~ ✗

### 4.3 Etapas de la administración del cambio en los requerimientos

Pregunta de repaso — primera etapa entre las opciones: [lectura4.md, L1678-1687]
- **Análisis del problema y especificación del cambio**
- Análisis del cambio y estimación del costo
- Implementación del proceso
- Implementación del cambio

(La primera etapa correcta es "Análisis del problema y especificación del cambio", en línea con el modelo de Sommerville sobre análisis del cambio previo a la estimación de costo e implementación.)

### 4.4 Afirmación "el requerimiento de los grandes sistemas cambia a veces"

Pregunta de repaso — la afirmación es **Verdadero**: los requerimientos de los grandes sistemas cambian frecuentemente (es la base de la evolución del software). [lectura4.md, L1651-1655]

### 4.5 La planeación como primera etapa esencial

Pregunta de repaso — la afirmación es **Verdadero**: "La planeación es una primera etapa esencial en el proceso de administración de requerimientos". [lectura4.md, L1657-1662]

---

## 5. Otros temas M3

### 5.1 Patrones de diseño

Lista de patrones mencionados en lectura4 [lectura4.md, L185-201]:
- **Fachada (Facade)**: "permite ordenar las interfaces en un número de objetos relacionados que a menudo se hayan desarrollado incrementalmente".
- **Iterador (Iterator)**: "proporciona una forma estándar para ingresar a los elementos en una colección, sin importar cómo se implementó dicha colección".
- **Decorador (Decorator)**: "permite la posibilidad de extender la funcionalidad de una clase existente en tiempo de operación".
- **Observer**: "permite señalar a varios objetos que cambiaron el estado de algún otro objeto".

### 5.2 Diseño

- Definición RAE (2022): "Concepción original de un objeto u obra destinados a la producción en serie. Diseño gráfico, de modas, industrial" (definición 3). [lectura4.md, L153-159]
- Sommerville (2015): "la esencia del diseño de software implica la toma de decisiones relacionadas con la estructura lógica del programa. Generalmente, no se parte desde cero al tomar estas decisiones, sino que se basa en experiencias previas de diseño". [lectura4.md, L161-167]
- "El diseño del software es necesariamente un proceso creativo, cada persona aborda el diseño de una manera particular que dependerá de los conocimientos y la experiencia que se tenga." [lectura4.md, L169-173]

### 5.3 Diseño arquitectónico

> "Todo gran sistema se puede descomponer en un grupo de sistemas que proporcionan un conjunto de servicios relacionados. El proceso de diseño inicial, en el cual se identifican estos subsistemas, se establece como un marco para el control y la comunicación de estos sistemas y se denomina **diseño arquitectónico**. El resultado de ese proceso de diseño es una descripción de la arquitectura del software." [lectura4.md, L875-887]

**Ventajas** [lectura4.md, L889-915]:
- **Comunicación con los stakeholders**: punto de discusión común.
- **Análisis del sistema**: decisiones con gran efecto sobre rendimiento, fiabilidad y mantenibilidad.
- **Re-utilización a gran escala**: facilita la reutilización de componentes desde el comienzo.

**Preguntas comunes del diseño arquitectónico** [lectura4.md, L935-953]:
- ¿Existe alguna plantilla de aplicación genérica?
- ¿Cómo se distribuirá el sistema entre varios procesadores?
- ¿Qué estilo(s) arquitectónico(s) son apropiados?
- ¿Cuál es la aproximación fundamental para estructurar el sistema?
- ¿Cómo será la descomposición en módulos?
- ¿Qué estrategia para controlar el funcionamiento de las unidades?
- ¿Cómo se evaluará el sistema arquitectónico?
- ¿Cómo se documentará la arquitectura del sistema?

**Subsistema vs módulo** [lectura4.md, L957-969]:
- **Subsistema**: sistema en sí mismo, cuyo funcionamiento no depende de servicios de otros subsistemas; se compone de módulos y tiene interfaces definidas.
- **Módulo**: componente que proporciona uno o más servicios y usa los de otros módulos.

**Estrategias de descomposición** [lectura4.md, L971-989]:
- a) **Descomposición orientada a objetos**: colección de objetos que se comunican entre sí, con estado privado y operaciones específicas.
- b) **Descomposición orientada a flujo de funciones**: módulos funcionales que reciben datos de entrada y los transforman en salida; no mantienen estado interno persistente.

**Modelos dentro del modelado orientado a objetos** [lectura4.md, L999-1045]:
- **Modelos de herencia**: ej. biblioteca → artículo publicado / artículo registrado → libro, revista / película, programa ordenador.
- **Modelos de agregado**: un objeto es agregado de otros; notación UML = diamante sobre el elemento fuente del enlace. Ej. paquete de estudio = apuntes + ejercicios + soluciones + transparencias + vídeos.

**Modelos de comportamiento** [lectura4.md, L1059-1071]:
- Describen el comportamiento del sistema en su totalidad (ej. modelo de adquisición de un equipo).

**Modelo de flujo de datos** [lectura4.md, L1073-1088]:
- Sommerville (2015): "muestran una perspectiva funcional en donde cada transformación representa un único proceso o función. Son particularmente útiles durante el análisis de requerimientos… muestra la secuencia completa de acciones que tienen lugar a partir de una entrada que se está procesando hasta la correspondiente salida que constituye la respuesta al sistema." (p. 158)

**Modelo máquina de estados** [lectura4.md, L1090-1113]:
- "Describe cómo responde un sistema a eventos internos o externos. El modelo muestra los estados del sistema y los eventos que provocan las transiciones de un estado a otro. No muestra el flujo de datos dentro del sistema."
- "Se utiliza a menudo para modelar sistemas de tiempo real debido a que estos sistemas suelen estar dirigidos por estímulos procedentes del entorno del sistema."
- En cualquier momento el sistema está en uno de varios estados posibles; al recibir un estímulo, puede disparar una transición a otro estado.

**Modelo cliente-servidor** [lectura4.md, L1115-1153]:
- "El sistema se organiza como un conjunto de servicios y servidores asociados junto con un conjunto de clientes que acceden y usan estos servicios."
- Componentes principales: (1) conjunto de servidores que ofrecen los servicios; (2) conjunto de clientes que llaman los servicios; (3) red que permite acceder a los clientes a esos servicios. (Sommerville, 2015, p. 226)
- **Ventaja más importante**: "es una arquitectura distribuida. Se puede hacer uso efectivo de los sistemas de red con muchos sistemas distribuidos. Es fácil añadir un nuevo servidor e integrarlo con el resto del sistema…"
- **Desventaja**: "Puede no haber un modelo de datos compartido entre los servidores." (Sommerville, 2015, p. 227)

**Modelo de capas** [lectura4.md, L1155-1176]:
- "Organiza el sistema en capas, cada una de las cuales proporciona un conjunto de servicios. Cada capa puede presentarse como una máquina abstracta cuyo lenguaje de máquina se define por los servicios proporcionados por la capa, este lenguaje es que se utiliza para implementar el siguiente nivel de la máquina abstracta." (Sommerville, 2015, p. 227)
- **Ventajas**: (1) Facilita la comprensión al dividir un problema complejo en partes más simples; (2) Evita los problemas de compatibilidad (ej. de red); (3) Detalla las capas para su mejor aprendizaje.

### 5.4 Diseño centrado en el usuario (DCU)

**Origen** [lectura4.md, L207-227]:
- "El concepto de 'diseño centrado en el usuario' se utilizó como marco de trabajo, investigación y desarrollo de principios del diseño de interfaces de usuario."
- Tres términos a valorar (Norman, 1983):
  - **El modelo conceptual**: ofrecido por el diseñador del sistema.
  - **Interfaz**: la imagen que el sistema presenta al usuario.
  - **El modelo mental**: desarrollado por el usuario a partir de la imagen.
- "La imagen del sistema guía al usuario en la adquisición y construcción de un modelo mental ajustado al modelo conceptual creado por el diseñador." (Norman, 1983)

**Objetivo — preguntas a responder** [lectura4.md, L233-237]:
- ¿Quién usará este sistema?
- ¿Qué es lo que va a hacer con él?
- ¿Qué información necesitará para alcanzar sus objetivos?

**Enfoques alternativos de diseño (Kalbach, 2007)** [lectura4.md, L249-263]:
- **Diseño centrado en el diseñador (designer-centered design)**: el diseñador, a partir de su visión personal, sabe qué es lo mejor.
- **Diseño centrado en la empresa (Enterprise-centered design)**: el sitio se diseña atendiendo a la estructura y necesidades de la empresa.
- **Diseño centrado en el contenido (content-centered design)**: el cuerpo de información es la base para organizar el sitio y la estructura de navegación.
- **Diseño centrado en la tecnología (technology-centered design)**: todo gira en torno a la tecnología.

**Usabilidad vs DCU** [lectura4.md, L277-283]:
- "La usabilidad es un atributo de calidad del diseño, mientras que el diseño centrado en el usuario es una vía para alcanzar y mejorar empíricamente la usabilidad del producto. Es decir, la usabilidad representa el 'qué', mientras el diseño centrado en el usuario representa el 'cómo'."

**Proceso cíclico** [lectura4.md, L298-301]:
- "El diseño centrado en el usuario es un proceso cíclico en el que las decisiones de diseño están dirigidas por el usuario y los objetivos que pretende satisfacer el producto, y donde la usabilidad del diseño es evaluada de forma iterativa y mejorada incrementalmente."

**4 fases según ISO 13407** [lectura4.md, L303-327]:
1. **Entender y especificar el contexto de uso**: identificar a las personas a las que se dirige el producto, para qué lo usarán y en qué condiciones.
2. **Especificar requisitos**: identificar los objetivos del usuario y del proveedor del producto que deberán satisfacerse.
3. **Producir soluciones de diseño**: desde las primeras soluciones conceptuales hasta la solución final.
4. **Evaluación**: la fase más importante — se validan las soluciones o se detectan problemas de usabilidad a través de test con usuarios.

**Modelo MIG-DCU (Marmolejo)** [lectura4.md, L394-397]:
- Estructura: Recopilación criterial (RC) + Construcción del proceso (CP) + Aplicación metodológica (AM) → **MIG-DCU**.
- Fases: **Planificación → Gestión → Control/Evaluación → Implementación (+ Monitorización)**. [lectura4.md, L481-486]
- **Iteración**: si en evaluación se cumplen parámetros de utilidad, usabilidad y deseabilidad, se pasa a Implementación; si no, se regresa a Gestión. [lectura4.md, L616-622]

**6 Principios DCU** (Marmolejo, tabla 1) [lectura4.md, L449-479]:
1. Entendimiento explícito del usuario, actividades y entornos.
2. Intervención del usuario en todo el proceso de diseño.
3. Diseño coherente con la evaluación.
4. Iteración en el proceso.
5. La experiencia integral del usuario justifica al diseño.
6. Integralidad del equipo multidisciplinar.

### 5.5 Sistemas en tiempo real

**Definición** [lectura4.md, L1180-1189]:
- "Un sistema de tiempo real es un sistema software cuyo correcto funcionamiento depende de los resultados producidos por este y del instante de tiempo en el que se producen estos resultados."
- **Tiempo real blando (soft)**: "es un sistema cuyo funcionamiento se degrada si los resultados no se producen de acuerdo con los requerimientos temporales especificados."
- **Tiempo real duro (hard)**: "es un sistema cuyo funcionamiento es incorrecto si los resultados no se producen de acuerdo con la especificación temporal."

**Modelo estímulo/respuesta** [lectura4.md, L1191-1201]:
- "Una forma de ver un sistema de tiempo real es como un sistema de estímulo/respuesta. Dado un determinado estímulo de entrada, el sistema debe producir la correspondiente salida."
- Se define el comportamiento listando estímulos, respuestas asociadas y tiempo en que deben producirse.

**Tipos de estímulos** [lectura4.md, L1203-1214]:
1. **Estímulos periódicos**: ocurren en intervalos predecibles (ej.: examinar un sensor cada 50 ms).
2. **Estímulos aperiódicos**: ocurren de forma irregular; provocados normalmente por interrupciones (ej.: transferencia de E/S completada, datos disponibles en búfer).

**Arquitectura genérica — 3 tipos de procesos** [lectura4.md, L1243-1253]:
- Procesos de **gestión del sensor** (uno por cada sensor).
- Procesos **computacionales** que calculan la respuesta requerida.
- Procesos de **control de actuadores** que controlan el funcionamiento del actuador.

**Lenguajes para tiempo real** [lectura4.md, L1255-1276]:
- Deben incluir facilidades para acceder al hardware y permitir predecir la duración de operaciones.
- Los sistemas duros todavía se programan a veces en ensamblador para cumplir deadlines estrictos.
- C permite código eficiente pero no incluye construcciones para concurrencia o gestión de recursos compartidos (se implementan vía llamadas al SO de tiempo real).
- "Los programas son también a menudo más difíciles de comprender debido a que las características de tiempo real no están explícitas en el programa." (Sommerville, 2015, p. 311)

**Diseño del sistema en tiempo real** [lectura4.md, L1282-1330]:
- "Los eventos (estímulos) deberían ser elementos centrales del proceso de diseño de software de tiempo real, en lugar de los objetos o funciones."
- Etapas:
  1. Identificar los estímulos y las respuestas asociadas.
  2. Identificar las restricciones temporales.
  3. Elegir plataforma de ejecución (hardware + SO de tiempo real).
  4. Incorporar procesamiento de estímulos y respuestas a procesos concurrentes.
  5. Diseñar algoritmos para los cálculos requeridos.
  6. Diseñar un sistema de planificación de procesos que asegure que comiencen a tiempo para cumplir sus plazos.
- Regla: "asociar un proceso con cada tipo de estímulo y respuesta".

**Modelado con máquina de estados** [lectura4.md, L1336-1371]:
- "Los rectángulos redondeados representan estados del sistema; y las flechas representan estímulos que fuerzan una transición de un estado a otro."
- "Es posible que no se pueda usar el desarrollo orientado a objetos para sistemas de tiempo real" (debido a las restricciones temporales).

**Sistemas operativos de tiempo real (RTOS)** [lectura4.md, L1376-1392]:
- "Un sistema operativo de tiempo real gestiona los procesos y asignación de recursos en un sistema de tiempo real. Lanza y detiene los procesos para que los estímulos puedan ser manejados y asigna memoria y recursos del procesador."

**5 componentes de un RTOS** [lectura4.md, L1406-1425]:
1. **Reloj de tiempo real**: información para planificar procesos periódicos.
2. **Manejador de interrupciones**: gestiona solicitudes aperiódicas.
3. **Planificador**: examina procesos que pueden ejecutarse y elige uno.
4. **Gestor de recursos**: asigna memoria y recursos del procesador.
5. **Despachador**: inicia la ejecución de un proceso.

**Niveles de prioridad** [lectura4.md, L1454-1466]:
1. **Nivel de interrupción** (prioridad más alta) — respuestas muy rápidas, incluye proceso del reloj.
2. **Nivel de reloj** — procesos periódicos.
3. (opcional) Procesos en segundo plano (autocomprobación) sin deadline — se planifican cuando el procesador está ocioso.

**Estrategias de planificación** [lectura4.md, L1533-1548]:
1. **Planificador sin reemplazo (non-preemptive)**: una vez planificado, se ejecuta hasta el final o hasta bloquearse (ej.: espera de entrada). Problema: un proceso de prioridad más alta debe esperar a que termine uno de menor prioridad.
2. **Planificación con reemplazo (preemptive)**: la ejecución puede detenerse si un proceso de prioridad más alta requiere el procesador.

**Algoritmos de planificación mencionados** [lectura4.md, L1550-1556]:
- **Round-robin**: cada proceso se ejecuta por turnos.
- **Frecuencia monótona (rate monotonic)**: prioridad al proceso con el periodo más corto.
- **Ejecutar primero el proceso con el plazo más corto**.

**Sistemas de monitorización y control** [lectura4.md, L1571-1604]:
- "Comprueban los sensores que proporcionan información sobre el entorno del sistema y llevan a cabo acciones dependiendo de la lectura del sensor."
- **Sistemas de monitorización**: realizan una acción cuando se detecta algún valor excepcional del sensor.
- **Sistemas de control**: controlan continuamente los actuadores dependiendo del valor de los sensores.
- Cada tipo de sensor tiene su propio proceso de monitorización, así como cada tipo de actuador tiene su proceso de control. Un proceso de monitorización recopila e integra datos antes de enviarlos a un proceso de control.

---

## 6. Definiciones y frases textuales "para tener a mano"

Estas frases son las más probables de aparecer textualmente como respuesta correcta en una pregunta de opción múltiple:

1. **Definición de mantenimiento**: "El mantenimiento del software es el proceso general de cambiar un sistema después de que éste se entregó. El término usualmente se aplica a software personalizado, en el que grupos de desarrollo separados intervienen antes y después de la entrega." [lectura2.md, L37-41]

2. **Tres tipos de mantenimiento (Sommerville)**: "Reparaciones de fallas / Adaptación ambiental / Adición de funcionalidad". [lectura2.md, L48-65]

3. **Distribución del esfuerzo**: "casi dos tercios en mantenimiento y un tercio en desarrollo". [lectura2.md, L101-103]

4. **Sistemas embebidos**: "los costos de mantenimiento fueron hasta cuatro veces mayores que los costos de desarrollo" (Guimaraes, 1983, sobre sistemas embebidos de tiempo real). [lectura2.md, L118-121]

5. **1ª Ley de Lehman (cambio continuo)**: "Un programa usado en un entorno real debe cambiar; de otro modo, en dicho entorno se volvería progresivamente inútil." [lectura1.md, L453-458]

6. **2ª Ley de Lehman (complejidad creciente)**: "A medida que cambia un programa en evolución, su estructura tiende a volverse más compleja. Deben dedicarse recursos adicionales para conservar y simplificar su estructura." [lectura1.md, L459-467]

7. **5ª Ley de Lehman (conservación de familiaridad)**: "A lo largo de la existencia de un sistema, el cambio incremental en cada liberación es casi constante." [lectura1.md, L485-491]

8. **7ª Ley (crecimiento de calidad)**: "La calidad de los sistemas declinará, a menos que se modifiquen para reflejar los cambios en su entorno operacional." [lectura1.md, L498-503]

9. **Costo de evolución (Erlikh)**: "entre el 85 y 90% de los costos del software organizacional son costos de evolución". [lectura1.md, L51-54]

10. **Definición de refactorización (Opdyke y Johnson, 1990)**: "La refactorización es el proceso de hacer mejoras a un programa para frenar la degradación mediante el cambio… modificar un programa para mejorar su estructura, reducir su complejidad o hacerlo más fácil de entender." [lectura3.md, L44-47]

11. **Refactorización vs reingeniería**: "se puede considerar la refactorización como el 'mantenimiento preventivo' que reduce los problemas de cambios futuros". [lectura3.md, L53-55]

12. **Definición de sistema heredado**: "Los sistemas heredados son sistemas antiguos que todavía son útiles y en ocasiones críticos para la operación de la empresa. Pueden implementarse usando lenguajes y tecnología obsoletos… Normalmente su estructura se ha degradado por cambios y la documentación está extraviada o desactualizada." [lectura3.md, L134-144]

13. **Reingeniería — regla clave**: "La funcionalidad del software no cambia y, normalmente, conviene tratar de evitar grandes cambios a la arquitectura de sistema." [lectura2.md, L334-337]

14. **Ulrich (1990) — caso de costo**: "los costos de reimplementación se estimaron en $50 millones. El sistema tuvo reingeniería exitosa por $12 millones." [lectura2.md, L348-355]

15. **4 opciones estratégicas para sistemas heredados**: (1) "Desechar completamente el sistema"; (2) "Dejar sin cambios el sistema y continuar el mantenimiento regular"; (3) "Someter el sistema a reingeniería para mejorar su mantenibilidad"; (4) "Sustituir todo o parte del sistema con un nuevo sistema". [lectura3.md, L165-188]

16. **Diseño centrado en el usuario (esencia)**: "La usabilidad es un atributo de calidad del diseño, mientras que el diseño centrado en el usuario es una vía para alcanzar y mejorar empíricamente la usabilidad del producto. Es decir, la usabilidad representa el 'qué', mientras el diseño centrado en el usuario representa el 'cómo'." [lectura4.md, L277-283]

17. **Definición de sistema de tiempo real**: "Un sistema de tiempo real es un sistema software cuyo correcto funcionamiento depende de los resultados producidos por este y del instante de tiempo en el que se producen estos resultados." [lectura4.md, L1180-1183]

18. **Tiempo real duro vs blando**: "Un sistema de tiempo real blando (soft) es un sistema cuyo funcionamiento se degrada si los resultados no se producen de acuerdo con los requerimientos temporales especificados. Un sistema de tiempo real duro (hard) es un sistema cuyo funcionamiento es incorrecto si los resultados no se producen de acuerdo con la especificación temporal." [lectura4.md, L1183-1189]

19. **Modelo cliente-servidor (Sommerville)**: "el sistema se organiza como un conjunto de servicios y servidores asociados junto con un conjunto de clientes que acceden y usan estos servicios." [lectura4.md, L1119-1123]

20. **Modelo de capas (Sommerville, 2015)**: "Organiza el sistema en capas, cada una de las cuales proporciona un conjunto de servicios. Cada capa puede presentarse como una máquina abstracta cuyo lenguaje de máquina se define por los servicios proporcionados por la capa." [lectura4.md, L1157-1163]

21. **Definición de diseño arquitectónico**: "Todo gran sistema se puede descomponer en un grupo de sistemas que proporcionan un conjunto de servicios relacionados. El proceso de diseño inicial, en el cual se identifican estos subsistemas, se establece como un marco para el control y la comunicación de estos sistemas y se denomina diseño arquitectónico." [lectura4.md, L875-883]

22. **Modelo de máquina de estados (Sommerville, 2015)**: "Un modelo de máquina de estados describe cómo responde un sistema a eventos internos o externos… se utiliza a menudo para modelar sistemas de tiempo real debido a que estos sistemas suelen estar dirigidos por estímulos procedentes del entorno del sistema." [lectura4.md, L1093-1103]

---

## 7. Resumen "trampa de parcial" — cosas a recordar sí o sí

| Tema | Dato "trampa" |
|------|---------------|
| Mantenimiento — % del presupuesto | 2/3 mantenimiento vs 1/3 desarrollo (NO 50/50) |
| Costos de evolución | Erlikh: 85-90% ; otros: ~2/3 |
| Lehman — 1ª ley | Cambio continuo (no complejidad creciente) |
| Lehman — 2ª ley | Complejidad creciente |
| Lehman — 5ª ley | Conservación de familiaridad (incremento casi constante) |
| Lehman — 7ª ley | Crecimiento de calidad (decrece si no se modifica) |
| Tipos mantenimiento (Sommerville) | 3 tipos: fallas / adaptación ambiental / adición funcionalidad (no 4 ni 5) |
| Mantenimiento correctivo | Reparación de fallas — uso universal |
| Mantenimiento adaptativo | Ambigüedad: entorno o requerimientos |
| Mantenimiento perfectivo | Ambigüedad: nuevos requerimientos o mejorar estructura/rendimiento |
| Refactorización | NO agrega funcionalidad; es "mantenimiento preventivo" |
| Reingeniería | NO cambia funcionalidad; evita grandes cambios arquitectónicos |
| Sistemas heredados | 4 estrategias: desechar / dejar / reingeniería / sustituir |
| Valoración heredado | Perspectiva empresarial + técnica |
| Sustitución evolutiva | Grandes componentes con sistemas comerciales + reutilización de otros |
| Caso Ulrich 1990 | $50M reimplementación vs $12M reingeniería |
| Sistemas embebidos tiempo real | Costos de mantenimiento hasta 4× los de desarrollo |
| Diseño centrado en el usuario | Modelo conceptual (diseñador) + interfaz (imagen) + modelo mental (usuario) — Norman 1983 |
| DCU vs usabilidad | Usabilidad = "qué"; DCU = "cómo" |
| DCU — proceso ISO 13407 | 4 fases: contexto de uso, requisitos, soluciones, evaluación |
| Sistema tiempo real duro | Incorrecto si no se cumple la especificación temporal |
| Sistema tiempo real blando | Se degrada si no se cumple |
| RTOS — componentes | 5: reloj, manejador interrupciones, planificador, gestor recursos, despachador |
| Niveles de prioridad | 3: interrupción > reloj > segundo plano |
| Planificación sin reemplazo vs con reemplazo | Non-preemptive vs preemptive |
| Algoritmos planificación | Round-robin, rate monotonic, plazo más corto |
| Requerimientos — errores de especificación | Los más caros de reparar |
| Requerimientos (lectura4) | Primera etapa del cambio = "Análisis del problema y especificación del cambio" |