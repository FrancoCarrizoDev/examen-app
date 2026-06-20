# M4 — Base de conocimiento

Base de conocimiento del Módulo 4 de Ingeniería de Software, elaborada a partir de las cuatro lecturas obligatorias:
- **Lec 1**: `modulo4-lectura1.md` — Administración de la configuración (Sommerville 2011, 9a ed.)
- **Lec 2**: `modulo4-lectura2.md` — Calidad del software (Sommerville 2011, 9a ed.)
- **Lec 3**: `modulo4-lectura3.md` — Mejora del proceso parte I (Sommerville 2005; Humphrey 1989)
- **Lec 4**: `modulo4-lectura4.md` — Mejora del proceso parte II (Sommerville 2005)

Las citas usan el formato `[archivo.md, Lec N de X, §título]` o `[archivo.md, Lec N de X, párrafo Z]` (los números de párrafo coinciden con el número de línea del archivo original).

---

## 1. Administración de la configuración (Lec 1)

### 1.1. Definición general y justificación
- La **administración de la configuración** "es útil para proyectos individuales, ya que es fácil para una persona olvidar qué cambios se realizaron. Es esencial para los proyectos de equipo en los que muchos desarrolladores trabajan al mismo tiempo en un sistema de software." `[modulo4-lectura1.md, Lec 2 de 11, ¶44-54]`
- Su objetivo: "garantiza que los equipos tengan acceso a información sobre un sistema que está bajo desarrollo sin que se interfiera con el trabajo de los demás." `[Lec 2 de 11, ¶51-54]`
- Abarca "un gran volumen de información, por lo que se han desarrollado numerosas herramientas de administración de la configuración para dar soporte a los procesos de CM". `[Lec 2 de 11, ¶80-83]`
- Las **políticas y los procesos** de CM "definen cómo registrar y procesar los cambios propuestos al sistema, cómo decidir qué componentes del sistema modificar, cómo gestionar las diferentes versiones del sistema y sus componentes, y cómo distribuir estos cambios a los clientes." `[Lec 2 de 11, ¶89-94]`
- Las **herramientas** "se usan para rastrear las propuestas de cambio, almacenar versiones de componentes del sistema, construir sistemas a partir de dichos componentes, y rastrear liberaciones de las versiones del sistema para los clientes." `[Lec 2 de 11, ¶95-99]`

### 1.2. Cuatro actividades estrechamente relacionadas
"La administración de la configuración de un producto de sistema de software comprende cuatro actividades estrechamente relacionadas:" `[Lec 2 de 11, ¶55-57]`
1. **Administración del cambio** (gestión de cambios). Seguimiento de peticiones, estimación de costos/efectos, decisión de implementar.
2. **Gestión de versiones** (version management, VM). Seguimiento de las versiones de los componentes e ítems de configuración y los sistemas donde se usan.
3. **Construcción del sistema**. Ensamblar componentes, datos y librerías, compilarlos y vincularlos para crear un sistema ejecutable.
4. **Gestión de entregas (release)**. Preparar el software para entrega externa y llevar seguimiento de las versiones del sistema entregadas.
`[Lec 2 de 11, ¶56-75]`

### 1.3. Administración del cambio (gestión de cambios)
- "El cambio es un hecho en la vida de los grandes sistemas de software. Las necesidades y los requerimientos organizacionales cambian durante la vida de un sistema, los bugs deben repararse y los sistemas adaptarse a cambios en su entorno." `[Lec 3 de 11, ¶123-126]`
- Propósito: "asegurar que la evolución del sistema sea un proceso gestionado en el que se da prioridad a los cambios más urgentes y rentables." `[Lec 3 de 11, ¶130-132]`
- El proceso "se ocupa de analizar los costos y beneficios de los cambios propuestos, aprobar aquellos que lo ameritan e indagar cuál o cuáles de los componentes del sistema se modificaron." `[Lec 3 de 11, ¶133-136]`
- "Para ser efectivos, los procesos de administración del cambio deben tener siempre un medio que compruebe, costee y apruebe los cambios." `[Lec 3 de 11, ¶139-142]`

#### 1.3.1. Petición de cambio (CRF — Change Request Form)
- "El proceso de administración del cambio se inicia cuando un 'cliente' completa y envía una petición de cambio en que se describe el cambio requerido al sistema." `[Lec 3 de 11, ¶146-149]`
- Una petición "podría ser el reporte de un bug… o una petición para agregar alguna funcionalidad al sistema. Algunas compañías tratan por separado los reportes de bug y los nuevos requerimientos, pero, en principio, ambos son simplemente peticiones de cambio." `[Lec 3 de 11, ¶153-157]`
- CRF: "Las peticiones de cambio pueden enviarse mediante un formato de petición de cambio (CRF, por las siglas de change request form)." `[Lec 3 de 11, ¶157-159]`
- "Aquí se usa el término cliente para incluir a cualquier participante que no sea parte del equipo de desarrollo" `[Lec 3 de 11, ¶159-162]`.
- "Los formatos electrónicos de petición de cambios registran información que se comparte entre todos los grupos implicados en la administración del cambio. Conforme se procesa la petición del cambio, se agrega información al CRF para registrar las decisiones tomadas en cada etapa del proceso." `[Lec 3 de 11, ¶163-166]`
- "En cualquier momento representa una fotografía instantánea del estado de petición del cambio." `[Lec 3 de 11, ¶166-168]`
- El CRF registra: "el cambio requerido, las recomendaciones concernientes al cambio, los costos estimados del cambio, y las fechas cuando se solicitó, aprobaron, implementó y validó el cambio." `[Lec 3 de 11, ¶170-173]`

#### 1.3.2. Etapas del proceso de cambio
1. **Comprobación**: tras enviarse la petición se verifica su validez. "Si la petición de cambio es un reporte de bug, tal vez éste ya haya sido reportado… Algunas veces, las personas solicitan características que ya se implementaron, pero que desconocen." `[Lec 3 de 11, ¶182-194]`
2. **Evaluación y costeo**: a cargo del equipo de desarrollo o mantenimiento. "Debe comprobarse el efecto del cambio sobre el resto del sistema. Para hacer esto, hay que identificar todos los componentes afectados por el cambio." `[Lec 3 de 11, ¶197-205]`
3. **Aprobación por CCB / grupo de desarrollo del producto**: "decide si el cambio en cuestión está justificado económicamente y prioriza los cambios aceptados para su implementación." `[Lec 3 de 11, ¶212-216]`

#### 1.3.3. Factores para aprobar o rechazar un cambio
"Los factores significativos que deben tomarse en cuenta para decidir si un cambio debe aprobarse o no son los siguientes:" `[Lec 3 de 11, ¶219-221]`
1. **Las consecuencias de no realizar el cambio** (gravedad de la falla).
2. **Los beneficios del cambio** (a cuántos usuarios beneficia).
3. **El número de usuarios afectados por el cambio**.
4. **Los costos de hacer el cambio** (componentes afectados, tiempo).
5. **El ciclo de liberación del producto**.
`[Lec 3 de 11, ¶222-252]`

#### 1.3.4. Registro del cambio (historial de derivación)
- "Conforme el equipo de desarrollo modifica los componentes de software, debe mantener un registro de los cambios hechos a cada componente. Algunas veces a esto se le conoce como historial de derivación de un componente." `[Lec 3 de 11, ¶269-273]`
- "Una buena forma de conservar el historial de derivación es en un comentario estandarizado al principio del código fuente del componente." `[Lec 3 de 11, ¶273-275]`
- En métodos ágiles (XP): "los clientes participan directamente en la decisión de implementar un cambio… La refactorización, en la que el software se mejora de manera continua, no se ve como una carga, sino como parte necesaria del proceso de desarrollo." `[Lec 3 de 11, ¶256-268]`

### 1.4. Gestión de versiones (Version Management, VM)
- Definición: "La gestión de versiones (VM, por las siglas de version management) es el proceso de hacer un seguimiento de las diferentes versiones de los componentes de software o ítems de configuración, y los sistemas donde se usan dichos componentes. También incluye asegurar que los cambios hechos a dichas versiones por los diferentes desarrolladores no interfieran unos con otros." `[Lec 4 de 11, ¶285-292]`
- "Se puede considerar a la gestión de versiones como el proceso de administrar líneas de código y líneas base." `[Lec 4 de 11, ¶293-295]`

#### 1.4.1. Línea de código y línea base
- **Línea de código**: "una secuencia de versiones de código fuente con las versiones más recientes en la secuencia derivadas de las versiones anteriores. Las líneas de código se aplican regularmente a componentes de sistemas, de manera que existen diferentes versiones de cada componente." `[Lec 4 de 11, ¶298-302]`
- **Línea base**: "una definición de un sistema específico. Por consiguiente, la línea base especifica las versiones del componente que se incluyen en el sistema más una especificación de las librerías usadas, archivos de configuración, etc." `[Lec 4 de 11, ¶302-306]`
- **Línea principal**: "una secuencia de versiones del sistema desarrolladas a partir de una línea base original." `[Lec 4 de 11, ¶311-313]`

#### 1.4.2. Características de los sistemas de gestión de versiones
"Los sistemas de gestión de versiones ofrecen a menudo varias características:" `[Lec 4 de 11, ¶318-319]`
1. **Identificación de versión y entrega**: basada en nombre del ítem (p. ej. `ButtonManager`) seguido de uno o más números; p. ej. `ButtonManager 1.3` = tercera versión en codeline 1. Acepta referencias abreviadas (p. ej. `*.V2`). `[Lec 4 de 11, ¶320-334]`
2. **Gestión de almacenamiento**: almacena **deltas** (listas de diferencias) entre versiones, no copias completas; "Al aplicar esto a una versión fuente (por lo regular, la versión más reciente), puede recrearse una versión objetivo." La versión más reciente suele guardarse completa y las deltas reconstruyen las anteriores. `[Lec 4 de 11, ¶335-344; ¶370-384]`
3. **Registro del historial de cambios**: cambios al código se registran y enumeran; permite etiquetar componentes con palabras clave (tags) para seleccionar versiones a incluir en una línea base. `[Lec 4 de 11, ¶345-352]`
4. **Desarrollo independiente**: el sistema rastrea componentes marcados para edición y asegura que no interfieran los cambios de distintos desarrolladores. `[Lec 4 de 11, ¶354-359]`
5. **Soporte de proyecto**: ejemplo CVS. Permite hacer check-in/check-out de "todos los archivos asociados con un proyecto en lugar de tener que trabajar a la vez con un archivo o directorio." `[Lec 4 de 11, ¶360-366]`

### 1.5. Ramificación (branch) y merge
- "Una consecuencia del desarrollo independiente del mismo componente es que las líneas de código pueden ramificarse (branch). En vez de una secuencia lineal de versiones que refleje los cambios al componente con el paso del tiempo, puede haber varias secuencias independientes." `[Lec 5 de 11, ¶391-398]`
- **Merge**: "su función es combinar lo existente y crear una versión nueva (su nombre proviene del inglés, donde 'merge' significa combinar)." `[Lec 5 de 11, ¶407-409]`
- Ejemplo: las versiones `2.1.2` y `2.3` se combinan para crear la versión `2.4`. `[Lec 5 de 11, ¶401-405]`
- **Branch / rama**: "sirve para trabajar con las modificaciones que se deban realizar en las versiones y no perder los cambios anteriores en caso de que sea necesario recuperarlos. Se llama así porque cada versión es una 'rama' que se desprende del original y el camino de retorno es fácilmente detectable, en caso de necesitar recuperar algún cambio realizado." `[Lec 5 de 11, ¶410-415]`

### 1.6. Construcción del sistema (build)
- Definición: "La construcción del sistema es el proceso de crear un sistema ejecutable y completo al compilar y vincular los componentes del sistema, librerías externas, archivos de configuración, etc." `[Lec 6 de 11, ¶426-429]`
- "Las herramientas de construcción del sistema y las de gestión de versiones deben comunicarse, pues el proceso de construcción implica extraer versiones del componente del repositorio administrado por el sistema de gestión de versiones." `[Lec 6 de 11, ¶430-434]`

#### 1.6.1. Tres plataformas implicadas
"Construir es un proceso complejo, que potencialmente es proclive al error, pues tres diferentes plataformas de sistema pueden estar implicadas:" `[Lec 6 de 11, ¶437-440]`
1. **Sistema de desarrollo**: incluye herramientas (compiladores, editores). "Los desarrolladores sacan código del sistema de gestión de versiones hacia un espacio de trabajo privado antes de hacer cambios al sistema." `[Lec 6 de 11, ¶440-449]`
2. **Servidor de construcción**: usado para construir versiones ejecutables definitivas; interactúa con el sistema de gestión de versiones. `[Lec 6 de 11, ¶450-457]`
3. **Entorno objetivo**: plataforma donde se ejecuta el sistema (puede ser más pequeño y sencillo que el de desarrollo, como un teléfono celular). `[Lec 6 de 11, ¶458-468]`

#### 1.6.2. Características de las herramientas de construcción
1. **Generación de rutinas (scripts) de construcción**: identifica componentes dependientes y genera automáticamente una rutina (a veces "archivo de configuración"); también creación y edición manual. `[Lec 6 de 11, ¶489-495]`
2. **Integración con el sistema de gestión de versiones**: saca versiones de componentes requeridas. `[Lec 6 de 11, ¶496-498]`
3. **Recompilación mínima**: determina qué código fuente necesita volver a compilarse. `[Lec 6 de 11, ¶499-501]`
4. **Creación de sistema ejecutable**: vincula archivos de código de objeto con librerías y archivos de configuración. `[Lec 6 de 11, ¶502-505]`
5. **Automatización de pruebas**: usa herramientas como JUnit; "comprueban que la construcción no se haya 'roto' por los cambios". `[Lec 6 de 11, ¶507-511]`
6. **Informes**: sobre éxito o fracaso de la construcción y pruebas. `[Lec 6 de 11, ¶512-514]`
7. **Generación de documentación**. `[Lec 6 de 11, ¶515-517]`

#### 1.6.3. Compilación: firmas de versión
"Hay dos tipos de firmas que pueden usarse:" `[Lec 7 de 11, ¶539-540]`
1. **Modificación de marca de tiempo (timestamp)**: si el archivo del código fuente se modificó después del archivo del código objeto relacionado, entonces se requiere recompilación. Ejemplo: si `Comp.java` se modificó el `14/02/2009 17:03:05` y `Comp.class` el `12/02/2009 16:34:25`, se recompila automáticamente. `[Lec 7 de 11, ¶541-556]`
2. **Sumas de verificación (checksums)**: número único calculado a partir del texto fuente; "Si se modifica el código fuente (incluso por un carácter), esto generará una suma diferente." `[Lec 7 de 11, ¶557-572]`
- "El enfoque checksum tiene la ventaja de permitir muchas versiones diferentes del código objeto de un componente para mantenerse al mismo tiempo… Es posible la compilación paralela y compilar diferentes versiones de un componente al mismo tiempo." `[Lec 7 de 11, ¶573-584]`

### 1.7. Integración continua
- "Los métodos ágiles recomiendan que los componentes de sistema muy frecuentes deben realizarse con pruebas automatizadas (llamadas en ocasiones pruebas de humo) para descubrir problemas del software." `[Lec 8 de 11, ¶591-597]`
- "La integración continua implica reconstruir frecuentemente la línea principal (mainline), después de realizar pequeños cambios al código fuente." `[Lec 8 de 11, ¶598-601]`

#### 1.7.1. Pasos de la integración continua
1. Saque la línea principal del sistema de gestión de versiones al espacio de trabajo privado. `[Lec 8 de 11, ¶603-604]`
2. Construya el sistema y efectúe pruebas automatizadas. Si falla, la construcción se descompone y hay que informar a quien haya ingresado el último sistema línea base (baseline). `[Lec 8 de 11, ¶605-609]`
3. Realice cambios a los componentes. `[Lec 8 de 11, ¶610]`
4. Construya el sistema en el espacio privado y vuelva a probar. `[Lec 8 de 11, ¶611-613]`
5. Ingréselo al sistema de construcción, pero no confirme como nueva línea base. `[Lec 8 de 11, ¶614-616]`
6. Construya el sistema en el servidor de construcción y efectúe pruebas. `[Lec 8 de 11, ¶617-623]`
7. Si pasa las pruebas, confirme los cambios como nueva línea base en la línea principal. `[Lec 8 de 11, ¶624-626]`

#### 1.7.2. Limitaciones y build diario
- Limitaciones: si el sistema es muy grande, tarda mucho construir y probar; si la plataforma de desarrollo es distinta de la objetivo, no se pueden efectuar pruebas en el espacio privado. `[Lec 8 de 11, ¶627-641]`
- **Sistema que se construya diariamente** (alternativa para sistemas grandes):
  1. La organización fija un tiempo de entrega (p. ej. 14:00). Los desarrolladores entregan nuevas versiones; pueden estar incompletos pero deben ofrecer funcionalidad básica. `[Lec 8 de 11, ¶643-649]`
  2. Se crea una nueva versión del sistema al compilar y vincular los componentes. `[Lec 8 de 11, ¶650-652]`
  3. El equipo de pruebas realiza pruebas de sistema predefinidas; los desarrolladores siguen añadiendo funcionalidad. `[Lec 8 de 11, ¶653-657]`
  4. Las fallas se documentan y regresan a los desarrolladores. `[Lec 8 de 11, ¶658-660]`

### 1.8. Gestión de entregas (release management)
- "Una entrega o release de sistema es una versión de un sistema de software que se ofrece a los clientes." `[Lec 9 de 11, ¶670-672]`
- Tipos de entrega para software de mercado masivo:
  - **Release mayor**: "Proporciona funcionalidad significativamente nueva (estas entregas son muy importantes económicamente para el proveedor de software, pues los clientes tienen que pagar por ellas)." `[Lec 9 de 11, ¶674-682]`
  - **Release menor**: "Repara bugs y corrige problemas reportados por el cliente (generalmente se distribuyen de manera gratuita)." `[Lec 9 de 11, ¶683-689]`

#### 1.8.1. Documentación de una entrega
"Para documentar una entrega, es necesario registrar las versiones específicas de los componentes de código fuente que se usaron en la creación del código ejecutable. Hay que conservar copias de los archivos de código fuente, los ejecutables correspondientes y todos los datos y archivos de configuración. También hay que registrar las versiones del sistema operativo, librerías, compiladores y otras herramientas utilizadas para construir el software." `[Lec 9 de 11, ¶691-702]`

#### 1.8.2. Contenido de una entrega
Una entrega incluye no sólo el código ejecutable, sino también: `[Lec 9 de 11, ¶719-729]`
- Archivos de configuración para la instalación.
- Archivos de datos (p. ej. archivos de mensajes de error).
- Programa de instalación.
- Documentación electrónica y escrita.
- Empaquetado y publicidad asociada.

#### 1.8.3. Creación de la entrega
"La creación de entrega es el proceso de instaurar la colección de archivos y documentación que incluyen todos los componentes de la entrega del sistema. El código ejecutable del programa y todos los archivos de datos asociados deben identificarse en el sistema de gestión de versiones y etiquetarse con el identificador de la entrega (release)." `[Lec 9 de 11, ¶730-735]`
"Cuando toda la información está disponible, debe prepararse una imagen maestra ejecutable del software y transferirse para distribución a los clientes o almacenes de ventas." `[Lec 9 de 11, ¶743-745]`

#### 1.8.4. Problema de clientes que no actualizan
- "No se puede suponer que los clientes siempre instalarán nuevas entregas del sistema. Algunos usuarios del sistema pueden estar satisfechos con un sistema existente y considerarán que no vale la pena el costo de cambiar a una nueva entrega." `[Lec 9 de 11, ¶746-752]`
- Escenario clásico: entrega 1 → entrega 2 requiere archivos nuevos → algunos clientes se quedan en 1 → entrega 3 requiere archivos instalados en 2 → esos clientes quedan incompatibles. `[Lec 9 de 11, ¶753-759]`
- Riesgo de seguridad: "donde el parche está diseñado para reparar vacíos de seguridad, los riesgos de fallar en la instalación del parche pueden significar que la empresa es vulnerable a ataques externos." `[Lec 9 de 11, ¶761-768]`

### 1.9. Estándares relacionados con CM
- "La definición y el uso de los estándares de administración de la configuración son esenciales para la certificación de la calidad tanto en los estándares ISO 9000 como en CMM y CMMI (Ahern et al., 2001; Bamford y Deibler, 2003; Paulk et al., 1995; Peach, 1996)." `[Lec 2 de 11, ¶100-105]`
- "El estándar IEEE 828-1998 es un estándar para planes de administración de la configuración. Estos estándares se enfocan en los procesos CM y en documentos elaborados durante dichos procesos." `[Lec 2 de 11, ¶106-110]`

---

## 2. Calidad del software (Lec 2)

### 2.1. Gestión de calidad — tres niveles de interés
"La gestión de calidad del software para los sistemas de software tiene tres intereses fundamentales:" `[Lec 2 de 10, ¶43-45]`
1. **A nivel de organización**: establecer un marco de proceso y estándares de organización que conduzcan a software de mejor calidad. "Esto supone que el equipo de gestión de calidad debe tener la responsabilidad de definir los procesos de desarrollo del software a usar, los estándares que deben aplicarse al software y la documentación relacionada." `[Lec 2 de 10, ¶45-52]`
2. **A nivel del proyecto**: aplicar procesos específicos de calidad y verificar que continúen los procesos planeados; garantizar que los resultados estén en conformidad con los estándares. `[Lec 2 de 10, ¶53-57]`
3. **A nivel del proyecto — plan de calidad**: establecer un plan de calidad con metas y definir procesos y estándares a usar. `[Lec 2 de 10, ¶58-62]`

### 2.2. Independencia del equipo QA
- "La gestión de calidad proporciona una comprobación independiente sobre el proceso de desarrollo de software. El proceso de gestión de calidad verifica los entregables del proyecto para garantizar que sean consistentes con los estándares y las metas de la organización." `[Lec 2 de 10, ¶73-78]`
- "El equipo QA debe ser independiente del equipo de desarrollo para que pueda tener una perspectiva objetiva del software." `[Lec 2 de 10, ¶79-82]`
- "El equipo debe ser independiente y reportarse ante la administración ubicada sobre el nivel del administrador del proyecto." `[Lec 2 de 10, ¶86-88]`
- Razón: "los administradores de proyecto tienen que mantener el presupuesto y el calendario del proyecto. Si surgen problemas, pueden estar tentados a comprometer la calidad del producto para cumplir con el calendario." `[Lec 2 de 10, ¶90-92]`
- Excepción: "en compañías más pequeñas, esto es prácticamente imposible. La gestión de calidad y el desarrollo de software están inevitablemente vinculados con las personas que tienen responsabilidades tanto de desarrollo como de calidad." `[Lec 2 de 10, ¶98-104]`

### 2.3. Equipo QA y pruebas de liberación
"En la mayoría de las compañías, el equipo QA es el responsable de administrar el proceso de pruebas de liberación… Esto significa que se aplican las pruebas del software antes de que éste se libere a los clientes. El equipo es responsable de comprobar que las pruebas del sistema cubran los requerimientos y de mantener los registros adecuados del proceso de pruebas." `[Lec 2 de 10, ¶63-69]`

### 2.4. Plan de calidad (Humphrey 1989)
"Humphrey (1989), en su clásico libro referente a la gestión del software, sugiere un bosquejo de estructura para un plan de calidad. Éste incluye:" `[Lec 3 de 10, ¶109-111]`
1. **Introducción del producto**: descripción del producto, pretensión de mercado, expectativas de calidad. `[Lec 3 de 10, ¶112-115]`
2. **Planes del producto**: fechas críticas y responsabilidades, distribución y servicio. `[Lec 3 de 10, ¶116-118]`
3. **Descripciones de procesos**: procesos y estándares de desarrollo y servicio a usar. `[Lec 3 de 10, ¶119-121]`
4. **Metas de calidad**: metas y planes de calidad, con identificación y justificación de los atributos esenciales de calidad. `[Lec 3 de 10, ¶122-124]`
5. **Riesgos y gestión del riesgo**: riesgos clave que pueden afectar la calidad y acciones para enfrentarlos. `[Lec 3 de 10, ¶125-127]`

### 2.5. Documentación de la calidad
"La documentación de la calidad es un registro de lo que cada subgrupo realizó en el proyecto. Ayuda a las personas a comprobar que no se olvidaron tareas importantes o que un grupo no hizo suposiciones incorrectas acerca de lo que hicieron otros grupos. La documentación de la calidad también es un medio de comunicación durante la vida del sistema." `[Lec 3 de 10, ¶128-136]`

### 2.6. Concepto de calidad del software
- "La calidad del software no es directamente comparable con la calidad en la fabricación. La idea de tolerancia no es aplicable a los sistemas digitales y es prácticamente imposible llegar a una conclusión objetiva sobre si un sistema de software cumple o no su especificación." `[Lec 4 de 10, ¶144-148]`
- Razones de la subjetividad:
  1. "En la ingeniería de requerimientos, es difícil escribir especificaciones de software completas y sin ambigüedades. Los desarrolladores y clientes de software pueden interpretar los requerimientos de diferentes formas y tal vez sea imposible llegar a acuerdos acerca de si el software se desarrolló conforme a su especificación." `[Lec 4 de 10, ¶149-154]`
  2. "Las especificaciones integran requerimientos de varias clases de participantes… Las partes interesadas excluidas quizá perciban el sistema como uno de mala calidad, a pesar de que implementa los requerimientos acordados." `[Lec 4 de 10, ¶155-161]`
  3. "Es imposible medir de manera directa ciertas características de calidad (por ejemplo, mantenibilidad) y, por ende, no pueden especificarse plenamente sin ambigüedades." `[Lec 4 de 10, ¶163-165]`

### 2.7. Valoración subjetiva de la calidad
"Debido a estos problemas, la valoración de calidad del software es un proceso subjetivo en que el equipo de gestión de calidad tiene que usar su juicio para decidir si se logró un nivel aceptable de calidad. El equipo de gestión de calidad debe considerar si el software se ajusta o no a su propósito pretendido." `[Lec 4 de 10, ¶166-171]`
Preguntas guía:
1. ¿En el proceso de desarrollo se siguieron los estándares de programación y documentación?
2. ¿El software se verificó de manera adecuada?
3. ¿El software es suficientemente confiable para utilizarse?
4. ¿El rendimiento del software es aceptable para uso normal?
5. ¿El software es utilizable?
6. ¿El software está bien estructurado y es comprensible?
`[Lec 4 de 10, ¶172-180]`

### 2.8. Calidad basada en el proceso
- "Una suposición que subyace en la gestión de la calidad del software es que la calidad del software se relaciona directamente con la calidad del proceso de desarrollo del software." `[Lec 4 de 10, ¶186-189]`
- "No hay duda de que el proceso de desarrollo utilizado tiene una influencia importante sobre la calidad del software, y que los buenos procesos tienen más probabilidad de conducir a software de buena calidad. La gestión de la calidad y el mejoramiento del proceso pueden conducir a menores defectos en el software a desarrollar." `[Lec 4 de 10, ¶191-196]`
- Advertencia: "Es difícil valorar los atributos de calidad del software, como la mantenibilidad, sin usar el software durante un largo periodo… debido al papel del diseño y la creatividad en el proceso de software, la estandarización del proceso en ocasiones puede exterminar la creatividad, lo cual, lejos de elevar la calidad, conducirá a un software de calidad inferior." `[Lec 4 de 10, ¶196-204]`

### 2.9. Estándares de calidad — razones
"Los estándares de software son importantes por tres razones:" `[Lec 5 de 10, ¶209-210]`
1. "Los estándares reflejan la sabiduría que es de valor para la organización… Configurarla dentro de un estándar, ayuda a la compañía a reutilizar esta experiencia y a evitar errores del pasado." `[Lec 5 de 10, ¶211-217]`
2. "Los estándares proporcionan un marco para definir, en un escenario particular, lo que significa el término 'calidad'… la calidad del software es subjetiva, y al usar estándares se establece una base para decidir si se logró un nivel de calidad requerido." `[Lec 5 de 10, ¶218-224]`
3. "Los estándares auxilian la continuidad cuando una persona retoma el trabajo iniciado por alguien más… se reduce el esfuerzo de aprendizaje requerido al iniciarse un nuevo trabajo." `[Lec 5 de 10, ¶224-230]`

### 2.10. Tipos de estándares
"Existen dos tipos de estándares de ingeniería de software relacionados que pueden definirse y usarse en la gestión de calidad del software:" `[Lec 5 de 10, ¶230-233]`
1. **Estándares del producto**: se aplican al producto de software a desarrollar. Incluyen estándares de documentos (estructura de documentos de requerimientos), estándares de documentación (encabezado de comentario estándar para una definición de clase) y estándares de codificación (cómo usar un lenguaje de programación). `[Lec 5 de 10, ¶233-240]`
2. **Estándares de proceso**: establecen los procesos a seguir durante el desarrollo. Incluyen definiciones de especificación, procesos de diseño y validación, herramientas de soporte de proceso y descripción de documentos. `[Lec 5 de 10, ¶240-246]`

### 2.11. Organismos de estandarización
"Organismos nacionales e internacionales, como U.S. DoD, ANSI, BSI, OTAN y el IEEE, apoyan la determinación de estándares." `[Lec 5 de 10, ¶261-264]`
"Entidades tales como la OTAN y otras organizaciones de defensa pueden requerir que sus propios estándares se usen en el desarrollo de contratos que suscriben con compañías de software." `[Lec 5 de 10, ¶266-269]`
"Estándares más especializados, como IEC 61508 (IEC, 1998), se desarrollaron para sistemas críticos de protección y seguridad." `[Lec 5 de 10, ¶276-278]`

### 2.12. Recomendaciones para implementar estándares
"Para minimizar el descontento y alentar la participación en los estándares, los administradores de calidad que establezcan los estándares deben dar los siguientes pasos:" `[Lec 5 de 10, ¶288-291]`
1. **Involucrar a los ingenieros** en la selección de estándares de producto. `[Lec 5 de 10, ¶292-298]`
2. **Revisar y modificar regularmente** los estándares para reflejar las tecnologías cambiantes. "Los estándares son costosos de desarrollar y tienden a guardarse como reliquias en un manual de estándares de una compañía." `[Lec 5 de 10, ¶299-305]`
3. **Ofrecer herramientas de software** para soportar los estándares; p. ej. "los estándares de documento pueden implementarse mediante estilos de procesador de texto." `[Lec 5 de 10, ¶306-316]`

### 2.13. ISO 9001
- "Existe un conjunto internacional de estándares que pueden utilizarse en el desarrollo de los sistemas de administración de calidad en todas las industrias, llamado ISO 9000." `[Lec 6 de 10, ¶330-333]`
- "ISO 9001, el más general de dichos estándares, se aplica a organizaciones que diseñan, desarrollan y mantienen productos, incluido software. El estándar ISO 9001 se desarrolló originalmente en 1987, y su revisión más reciente fue en 2008." `[Lec 6 de 10, ¶334-339]`
- "El estándar ISO 9001 no define ni prescribe los procesos de calidad específicos que deben usarse en una compañía." `[Lec 6 de 10, ¶343-344]`
- "Para estar de conformidad con ISO 9001, una compañía debe especificar los tipos de proceso que se muestran en la figura 24.5 y tener procedimientos que demuestren que se siguen sus procesos de calidad." `[Lec 6 de 10, ¶344-351]`
- "El estándar ISO 9001 se enfoca en garantizar que la organización tenga procedimientos de gestión de calidad y que siga dichos procedimientos. No hay seguridad de que las compañías con certificación ISO 9001 empleen las mejores prácticas de desarrollo de software o que sus procesos conduzcan a software de alta calidad." `[Lec 6 de 10, ¶364-369]`
- Ejemplo: "una compañía podría definir estándares de cobertura de pruebas que especifiquen que todos los métodos en los objetos deben llamarse al menos una vez. Lamentablemente, este estándar puede cumplirse mediante pruebas de software incompletas, que no incluyen pruebas con diferentes parámetros de métodos. En tanto se sigan los procedimientos de prueba definidos y se conserven registros de las pruebas realizadas, la compañía podría tener la certificación ISO 9001." `[Lec 6 de 10, ¶371-379]`
- "Esta certificación define la calidad como la conformidad con estándares, y toma en cuenta la calidad como la advierten los usuarios del software." `[Lec 6 de 10, ¶379-382]`
- Modelo de Ince (1994): "explica cómo puede usarse el estándar general ISO 9001 como base para procesos de gestión de calidad de software." Bamford y Dielbler (2003): "explica cómo puede aplicarse el más reciente estándar ISO 9001:2000 en las compañías de software." `[Lec 6 de 10, ¶356-363]`

### 2.14. Revisiones e inspecciones — propósito y diferencias
- "El propósito de las revisiones e inspecciones es mejorar la calidad del software, no de valorar el rendimiento de los miembros del equipo de desarrollo." `[Lec 7 de 10, ¶390-392]`
- "La revisión es un proceso público de detección de errores, comparado con el proceso más privado de prueba de componentes. Es necesario que los errores cometidos por los individuos se revelen a todo el equipo de programación." `[Lec 7 de 10, ¶392-395]`
- Cultura: "los administradores de proyecto tienen que ser sensibles a las preocupaciones individuales. Deben desarrollar una cultura de trabajo que brinde apoyo y no culpar cuando se descubran errores." `[Lec 7 de 10, ¶397-401]`
- Diferencia con revisión administrativa: "Las revisiones de avance comparan el avance real en un proyecto de software frente al avance planeado. Su principal preocupación es si el proyecto entregará o no el software útil a tiempo y dentro del presupuesto." `[Lec 7 de 10, ¶403-408]`
- "Las revisiones de progreso toman en cuenta factores externos, y circunstancias cambiantes pueden significar que el software en fase de desarrollo ya no se requiera o que tenga que cambiarse radicalmente. Tal vez se cancelen los proyectos que desarrollaron software de alta calidad debido a cambios en la empresa o su entorno operacional." `[Lec 7 de 10, ¶408-414]`

### 2.15. Proceso de revisión — tres fases
"Aunque existen numerosas variaciones en los detalles de las revisiones, el proceso de revisión se estructura por lo general en tres fases:" `[Lec 7 de 10, ¶419-422]`
1. **Actividades previas a la revisión**: planeación (establecer equipo, tiempo, lugar, distribuir documentos) y preparación (el equipo lee y entiende el software/documentos, trabaja de manera independiente para encontrar errores, omisiones y distanciamiento de estándares; los revisores que no puedan asistir pueden hacer comentarios por escrito). `[Lec 7 de 10, ¶423-436]`
2. **La reunión de revisión**: "un autor del documento o programa a revisar debe repasar el documento con el equipo de revisión. La revisión en sí debe ser relativamente corta, dos horas a lo sumo. Un miembro del equipo debe dirigir la revisión y otro registrar formalmente todas las decisiones y acciones de revisión a tomar." `[Lec 7 de 10, ¶437-446]`
3. **Actividades posteriores a la revisión**: tratar conflictos y problemas; puede implicar "corregir bugs de software, refactorizar el software de modo que esté conforme con los estándares de calidad, o reescribir los documentos"; a veces requiere revisión administrativa adicional; el director debe comprobar que se hayan considerado todos los comentarios. `[Lec 7 de 10, ¶447-462]`

### 2.16. Inspecciones del programa (Gilb y Graham, 1993)
- "Las inspecciones del programa son 'revisiones de pares' en las que los miembros del equipo colaboran para encontrar bugs en el programa en desarrollo… Complementan las pruebas, puesto que no requieren la ejecución del programa. Esto quiere decir que es posible verificar versiones incompletas del sistema y comprobar representaciones como los modelos UML." `[Lec 7 de 10, ¶464-473]`
- "Gilb y Graham (1993) sugieren que una de las formas más efectivas de usar las inspecciones es revisar los casos de prueba para un sistema." `[Lec 7 de 10, ¶469-473]`
- "Las inspecciones del programa incluyen a miembros del equipo con diferentes antecedentes que realizan una cuidadosa revisión, línea por línea, del código fuente del programa. Buscan defectos y problemas, y los informan en una reunión de inspección. Los defectos pueden ser errores lógicos, anomalías en el código que indican una condición errónea o ciertas características que se hayan omitido del código." `[Lec 7 de 10, ¶475-484]`
- Listas de verificación: "Gilb y Graham (1993) enfatizan que cada organización debe desarrollar su lista de verificación de inspección con base en estándares y prácticas locales. Dichas listas de verificación deben actualizarse regularmente, conforme se encuentren nuevos tipos de defectos. Los ítems en la lista de verificación varían según el lenguaje de programación, debido a diferentes niveles de comprobación posibles en el tiempo de compilación. Por ejemplo, un compilador Java comprueba que las funciones tengan el número correcto de parámetros; un compilador C no lo hace." `[Lec 7 de 10, ¶490-500]`

### 2.17. Métricas de software — definición y tipos
- "Una métrica de software es una característica de un sistema de software, documentación de sistema o proceso de desarrollo que puede medirse de manera objetiva." `[Lec 8 de 10, ¶508-510]`
- Ejemplos: "el tamaño de un producto en líneas de código; el índice Fog (Gunning, 1962), que es una medida de la legibilidad de un pasaje de texto escrito; el número de fallas reportadas en un producto de software entregado, y el número de días-hombre requerido para desarrollar un componente de sistema." `[Lec 8 de 10, ¶510-516]`

#### 2.17.1. Métricas de control vs de predicción
"Las métricas de software pueden ser métricas de control o de predicción. Las métricas de control apoyan la gestión del proceso, y las métricas de predicción ayudan a predecir las características del software." `[Lec 8 de 10, ¶517-520]`
- **Control (de proceso)**: asociadas con procesos de software. Ejemplos: "el esfuerzo promedio y el tiempo requerido para reparar los defectos reportados." `[Lec 8 de 10, ¶521-524]`
- **Predicción (de producto)**: asociadas con el software en sí. `[Lec 8 de 10, ¶524-526]`
- "Los administradores usan mediciones de proceso para decidir si deben hacerse cambios al proceso, y las métricas de predicción ayudan a estimar el esfuerzo requerido para hacer cambios al software." `[Lec 8 de 10, ¶530-535]`

#### 2.17.2. Usos de las mediciones
"Existen dos formas en que pueden usarse las mediciones de un sistema de software:" `[Lec 8 de 10, ¶537-538]`
1. "Para asignar un valor a los atributos de calidad del sistema. Al medir las características de los componentes del sistema, como su complejidad ciclomática, y luego agregar dichas mediciones, es posible valorar los atributos de calidad del sistema, tales como la mantenibilidad." `[Lec 8 de 10, ¶539-543]`
2. "Para identificar los componentes del sistema cuya calidad está por debajo de un estándar. Las mediciones pueden identificar componentes individuales con características que se desvían de la norma. Por ejemplo, es posible medir componentes para descubrir aquéllos con la complejidad más alta. Éstos tienen más probabilidad de tener bugs porque la complejidad los hace más difíciles de entender." `[Lec 8 de 10, ¶544-551]`

#### 2.17.3. Condiciones para que una medida interna prediga calidad externa (Kitchenham, 1990)
"Si la medida del atributo interno debe ser un factor de predicción útil de la característica externa del software, deben sostenerse tres condiciones (Kitchenham, 1990):" `[Lec 8 de 10, ¶561-563]`
1. "El atributo interno debe medirse con exactitud. Esto no siempre es un proceso directo y tal vez se requiera de herramientas de propósito especial para hacer las mediciones." `[Lec 8 de 10, ¶564-566]`
2. "Debe existir una relación entre el atributo que pueda medirse y el atributo de calidad externo que es de interés. Esto es, el valor del atributo de calidad debe relacionarse, en alguna forma, con el valor del atributo que puede medirse." `[Lec 8 de 10, ¶567-571]`
3. "Esta relación entre los atributos interno y externo debe comprenderse, validarse y expresarse en términos de una fórmula o un modelo. La formulación de un modelo implica identificar la manera funcional del modelo (lineal, exponencial, etc.) mediante el análisis de datos recopilados, identificar los parámetros que se incluirán en el modelo, y calibrar dichos parámetros usando los datos existentes." `[Lec 8 de 10, ¶572-577]`

#### 2.17.4. Métricas del producto — dinámicas vs estáticas
"Las métricas del producto se dividen en dos clases:" `[Lec 8 de 10, ¶589-590]`
1. **Métricas dinámicas**: "se recopilan mediante mediciones hechas de un programa en ejecución. Dichas métricas pueden recopilarse durante las pruebas del sistema o después de que el sistema está en uso. Un ejemplo es el número de reportes de bugs o el tiempo necesario para completar un cálculo." `[Lec 8 de 10, ¶590-594]`
2. **Métricas estáticas**: "se recopilan mediante mediciones hechas de representaciones del sistema, como el diseño, el programa o la documentación. Ejemplos de mediciones estáticas son el tamaño del código y la longitud promedio de los identificadores que se usaron." `[Lec 8 de 10, ¶595-599]`
- "Las métricas dinámicas ayudan a valorar la eficiencia y fiabilidad de un programa. Las métricas estáticas ayudan a valorar la complejidad, comprensibilidad y mantenibilidad de un sistema de software o de los componentes del sistema." `[Lec 8 de 10, ¶600-603]`

### 2.18. Análisis de componentes de software — etapas
"Las etapas clave en este proceso de medición de componentes son:" `[Lec 9 de 10, ¶627-628]`
1. **Elegir las mediciones a realizar**: formular preguntas y definir mediciones; descartar mediciones irrelevantes. `[Lec 9 de 10, ¶629-633]`
2. **Seleccionar componentes a valorar**: muestra representativa o enfocarse en componentes centrales en uso constante. `[Lec 9 de 10, ¶634-644]`
3. **Medir las características de los componentes**: procesar la representación mediante una herramienta automatizada. `[Lec 9 de 10, ¶645-652]`
4. **Identificar mediciones anómalas**: comparar con otras mediciones y con una base de datos histórica; observar valores inusualmente altos o bajos. `[Lec 9 de 10, ¶653-659]`
5. **Analizar componentes anómalos**: "Un valor de métrica anómalo para la complejidad (al parecer) no necesariamente significa un componente de mala calidad. Podría haber alguna otra razón para el valor alto, por lo que no necesariamente significa que haya problemas con la calidad del componente." `[Lec 9 de 10, ¶660-670]`

---

## 3. Mejora de procesos — Parte I (Lec 3)

### 3.1. Definición de mejora de procesos
- "La mejora de procesos significa comprender los procesos existentes y cambiarlos para incrementar la calidad del producto o reducir los costos y el tiempo de desarrollo." `[modulo4-lectura3.md, Lec 2 de 4, ¶63-67]`

### 3.2. Dos enfoques para la mejora
"Se usan dos enfoques muy diferentes para la mejora y el cambio de procesos:" `[Lec 2 de 4, ¶69-71]`

#### 3.2.1. Enfoque de madurez de procesos
"Se orienta a mejorar el proceso y a la gestión del proyecto. Introduce buenas prácticas de ingeniería de software. El nivel de madurez del proceso refleja la adopción de buenas prácticas (técnicas y administrativas) en los procesos de desarrollo de software organizacional. Las metas principales de este enfoque consisten en mejorar la calidad del producto y la previsibilidad del proceso." `[Lec 2 de 4, ¶75-87]`

#### 3.2.2. Enfoque ágil
"Se orienta al desarrollo iterativo y a la reducción de las sobrecargas en el proceso de software. Los métodos ágiles permiten una rápida entrega de funcionalidad y una capacidad de respuesta eficiente ante las exigencias de los clientes." `[Lec 2 de 4, ¶91-97]`

### 3.3. Deming y el control estadístico de calidad
- "Deming, entre otros autores, introdujo la idea del control estadístico de calidad. Esta herramienta se basa en medir el número de defectos de productos para relacionarlos con el proceso. En ese sentido, su objetivo es analizar y modificar el proceso para detectar y reducir las posibilidades de introducir defectos." `[Lec 2 de 4, ¶99-107]`
- "Una vez lograda la reducción en el conteo de defectos, el proceso se estandariza y comienza un ciclo más de la mejora." `[Lec 2 de 4, ¶109-111]`
- "W. E. Deming, en su trabajo con la industria japonesa después de la Segunda Guerra Mundial, aplicó a la industria los conceptos de control estadístico de procesos. Si bien existen importantes diferencias, estos conceptos pueden aplicarse al software, a los automóviles, a las cámaras, a los relojes de pulsera y a la producción de acero." `[Lec 2 de 4, ¶119-127]`
- Aplicabilidad al software: "Humphrey (1989), en un libro de gran influencia sobre gestión de procesos, argumenta que pueden aplicarse las mismas técnicas a la ingeniería de software." `[Lec 2 de 4, ¶113-117]`

### 3.4. Factores que afectan la calidad del producto
"Para productos de software o cualquier producto intelectual (como libros o películas) donde la calidad depende del diseño, hay cuatro factores elementales que afectan la calidad del producto" (según Sommerville 2005, p. 707): `[Lec 2 de 4, ¶133-139]`
- (Ver figura "Factores" — Sommerville 2005, p. 707). Los cuatro factores elementales son, según la pregunta de repaso del propio material:
  - **Calidad del proceso**
  - **Tecnología de desarrollo**
  - **Calidad de personal** (calidad del equipo)
  - **Diseño del proceso**
  `[Lec 3 de 4, ¶593-606]`

### 3.5. Influencia de los factores según el tamaño del proyecto
- **Proyectos grandes** (muchos equipos, posiblemente distribuidos): "el factor principal que afecta a la calidad del producto es el proceso de software." "Los principales problemas con los proyectos grandes son la integración, la gestión del proyecto y las comunicaciones. Por lo general, existe una mezcla de habilidades y experiencia entre los miembros del equipo y, puesto que el proceso de desarrollo requiere de varios años, el equipo de desarrollo es volátil. Puede cambiar por completo durante la vida del proyecto." (Sommerville, 2005, p. 610) `[Lec 2 de 4, ¶145-169]`
- "En los proyectos grandes, es esencial un nivel básico de tecnología de desarrollo para la gestión de la información. No obstante, paradójicamente, las herramientas sofisticadas de software son menos importantes en los proyectos grandes (Sommerville, 2005)." `[Lec 2 de 4, ¶171-177]`
- **Proyectos pequeños** (pocos miembros): "la calidad del equipo de desarrollo es más importante que el proceso de desarrollo utilizado. Si el equipo tiene un nivel alto de habilidad y experiencia, la calidad del producto probablemente sea alta. Si el equipo no tiene experiencia y habilidades, un buen proceso delimita el daño, pero no conducirá, por sí mismo, a software de alta calidad." (Sommerville, 2005, p. 610) `[Lec 2 de 4, ¶179-193]`
- "Si los equipos son pequeños, es importante contar con una buena tecnología de desarrollo. El equipo no puede dedicar mucho tiempo a procedimientos administrativos tediosos. Los ingenieros invierten mucho de su tiempo diseñando y programando el sistema, por lo que las buenas herramientas afectan de forma importante a su productividad." (Sommerville, 2005, p. 610) `[Lec 2 de 4, ¶195-211]`

### 3.6. Ciclo de mejora de procesos — tres subprocesos
"El proceso de mejora de procesos es cíclico. Incluye tres subprocesos:" `[Lec 2 de 4, ¶225-226]`
1. **Proceso de medición**: de los atributos del proyecto actual o del producto. "El objetivo es mejorar las mediciones de acuerdo con las metas de la organización involucrada en el proceso de mejora." `[Lec 2 de 4, ¶227-233]`
2. **Proceso de análisis**: "El proceso actual es valorado, y se identifican puntos flacos y cuellos de botella. En esta etapa se suelen desarrollar los procesos que describen los modelos de proceso." `[Lec 2 de 4, ¶235-241]`
3. **Introducción de los cambios** del proceso identificados en el análisis. (Sommerville, 2005, pp. 608-609) `[Lec 2 de 4, ¶243-245]`

### 3.7. Consideraciones prácticas del ciclo
- "Sin datos concretos respecto de un proceso, es imposible estimar el valor de la mejora del proceso. Sin embargo, es improbable que las compañías que inician el proceso de mejora de procesos cuenten con datos de proceso disponibles como una línea de referencia para la mejora." `[Lec 2 de 4, ¶247-252]`
- "La mejora del proceso es una actividad de largo plazo, así que cada una de las etapas en el proceso de mejora puede durar varios meses. También es una actividad continua pues, independientemente de los procesos introducidos, el ambiente de negocios cambiará y los nuevos procesos tendrán que evolucionar para tomar en cuenta dichos cambios." `[Lec 2 de 4, ¶261-273]`

### 3.8. Medición del proceso — definición
"Las mediciones del proceso son datos cuantitativos acerca del proceso de software, como el tiempo que tarda en realizarse cierta actividad del proceso. Por ejemplo, es posible medir el tiempo requerido para desarrollar casos de prueba del programa." `[Lec 3 de 4, ¶281-287]`
- "Humphrey (1989) argumenta que la medición del proceso y los atributos del producto son esenciales para la mejora de los procesos. Además, este autor refiere que la medición desempeña un importante papel en la mejora de procesos personales a pequeña escala, donde los individuos tratan de ser más productivos." `[Lec 3 de 4, ¶289-298]`

### 3.9. Limitación de las mediciones
"Las mediciones de procesos pueden usarse para valorar si la eficiencia de un proceso mejoró o no… No obstante, las mediciones del proceso, por sí mismas, no pueden usarse para determinar si mejoró la calidad del producto." `[Lec 3 de 4, ¶299-309]`

### 3.10. Tres tipos de métricas de proceso (Sommerville 2005, p. 613)
"Según Sommerville (2005), se pueden recopilar tres tipos de métricas de proceso:" `[Lec 3 de 4, ¶311-313]`
1. **El tiempo que tarda en completarse un proceso particular**: tiempo total, tiempo calendario, tiempo empleado por ciertos ingenieros. `[Lec 3 de 4, ¶315-321]`
2. **Los recursos requeridos para un proceso particular**: esfuerzo total en días-hombre, costos de viaje o recursos de cómputo. `[Lec 3 de 4, ¶323-327]`
3. **El número de ocurrencias de un evento particular**: ejemplos: "número de defectos descubiertos durante la inspección del código, número de cambios solicitados a los requerimientos y el número promedio de líneas de código modificadas en respuesta a un cambio de requerimientos." `[Lec 3 de 4, ¶329-341]`

### 3.11. Paradigma GQM
"El paradigma GQM se usa en la mejora de procesos para ayudar a responder tres preguntas fundamentales:" `[Lec 3 de 4, ¶349-351]`
1. ¿Por qué se introduce la mejora de procesos?
2. ¿Qué información se necesita para ayudar a identificar y valorar las mejoras?
3. ¿Qué mediciones de proceso y producto se requieren para obtener esta información?
`[Lec 3 de 4, ¶357-367]`

#### 3.11.1. Las tres abstracciones del GQM
"Siguiendo a Sommerville (2005), estas preguntas se relacionan directamente con las abstracciones (metas, preguntas, métricas) en el paradigma GQM." `[Lec 3 de 4, ¶369-371]`
1. **Metas**: "algún objetivo que la organización pretende lograr. No debe ocuparse directamente de los atributos del proceso, sino más bien de cómo el proceso afecta a los productos o a la organización en sí. Ejemplos de metas pueden ser un mejor nivel de madurez de procesos, un tiempo de desarrollo de producto más corto o un aumento en la fiabilidad del producto." `[Lec 3 de 4, ¶377-385]`
2. **Preguntas**: "mejoras de las metas, en las que se identifican áreas específicas de incertidumbre relacionadas con las metas. Por lo general, una meta tendrá algunas preguntas asociadas que necesiten responderse." Ejemplos (meta: acotar tiempos de desarrollo): `[Lec 3 de 4, ¶391-396]`
   - ¿Dónde están los cuellos de botella en el proceso actual?
   - ¿Cómo puede reducirse el tiempo requerido para finalizar los requerimientos de producto con los clientes?
   - ¿Cuántas pruebas son efectivas para descubrir defectos de producto?
   `[Lec 3 de 4, ¶401-416]`
3. **Métricas**: "mediciones que deben recopilarse para ayudar a responder las preguntas y confirmar si las mejoras del proceso lograron o no las metas deseadas." Ejemplos: "el tiempo que tarda en completarse cada actividad del proceso (normalizado por tamaño de sistema), el número de comunicaciones formales entre clientes y usuarios para cada cambio de requerimientos, y la cantidad de defectos descubiertos mediante la ejecución de pruebas." `[Lec 3 de 4, ¶421-437]`

#### 3.11.2. Ventaja del GQM
"La ventaja de este enfoque cuando se aplica a la mejora de procesos es que separa las cuestiones organizacionales (las metas) de las cuestiones específicas del proceso (las preguntas). Se centra en la recolección de datos y señala que estos datos se deben analizar de diferentes formas, dependiendo de la pregunta que se pretenda contestar." `[Lec 3 de 4, ¶439-455]`

#### 3.11.3. Basili y Green
"Basili y Green (Basili y Green, 1993) describen cómo se utilizó este enfoque en un programa a largo plazo de mejora de procesos basado en las mediciones." `[Lec 3 de 4, ¶455-461]`

#### 3.11.4. Método AMI
"En el método AMI de mejora de procesos del software (Pulford et al., 1996), el enfoque GQM se desarrolló y combinó con el modelo de madurez de la capacidad del SEI. Los desarrolladores del método AMI proponen un enfoque de etapas para la mejora de procesos en la que las mediciones se incluyen después de que la organización haya introducido algún tipo de disciplina en sus procesos. Esto proporciona guías y consejos prácticos al implementar la mejora de procesos basada en mediciones." (Sommerville, 2005, p. 614) `[Lec 3 de 4, ¶463-479]`

### 3.12. Cautela al interpretar cambios en métricas
"Cuando se observan cambios en una métrica, siempre es tentador atribuir dichos cambios a los cambios de proceso introducidos. Sin embargo, es peligroso hacer suposiciones simplistas en lo tocante a las mejoras. Los cambios en una métrica pueden ser causa de algo completamente diferente, por ejemplo: un cambio del personal en el equipo de proyecto, cambios a la calendarización del proyecto o cambios administrativos." `[Lec 3 de 4, ¶481-491]`

Razones por las que se observan cambios en el caso de herramientas para reportar errores:
1. "El nuevo sistema puede tener carga reducida y, así, más tiempo disponible para reparar bugs. Esto conduce a una reducción en los tiempos promedios para 'reparar bugs'. La mejora del proceso pudo hacer una diferencia real." `[Lec 3 de 4, ¶499-505]`
2. "El nuevo sistema tal vez no haga la diferencia con el tiempo que en verdad se tarda en corregir los bugs, pero puede facilitar el registro de información. Por lo tanto, los tiempos de reparación de bugs se miden más exactamente con el nuevo sistema. No hay un cambio real en el tiempo promedio para corregir bugs." `[Lec 3 de 4, ¶507-517]`
3. "Las mediciones antes de que el nuevo sistema se introdujera se hicieron, tal vez, a través de las pruebas de un sistema. Los bugs que eran más fáciles y rápidos de corregir ya se habían corregido y sólo permanecieron los 'bugs duros' que tardaban más en repararse. Sin embargo, después de introducir el sistema de reporte de bugs, las mediciones se hicieron al comienzo de las pruebas del nuevo sistema. Los bugs corregidos fueron los 'bugs sencillos' que podían repararse rápidamente." `[Lec 3 de 4, ¶519-535]`
4. "Un nuevo gerente del equipo de pruebas pudo instruir a los miembros del equipo para reportar las inconsistencias de la interfaz de usuario como bugs, mientras que antes se ignoraban. Esto significó el reporte de muchos más 'bugs sencillos' que podían corregirse rápidamente." `[Lec 3 de 4, ¶539-547]`

### 3.13. Medición con valoración cualitativa
"La medición es una forma de generar evidencia respecto a un proceso y los cambios de proceso. No obstante, esta evidencia tiene que interpretarse junto con otra información sobre el proceso antes de poder estar seguros de que son efectivos los cambios. Siempre se debe usar la medición en conjunto con la valoración cualitativa de los cambios. Esto implica hablar con las personas implicadas en el proceso acerca de los cambios que se introdujeron y obtener su impresión de la efectividad de los mismos." `[Lec 3 de 4, ¶549-561]`
"Esto no sólo revela otros factores que pudieron influir en el proceso, sino también la medida en la que el equipo adoptó los cambios propuestos y cómo éstos afectaron la práctica de desarrollo actual." `[Lec 3 de 4, ¶563-567]`

---

## 4. Mejora de procesos — Parte II (Lec 4)

### 4.1. Análisis de procesos — definición
"El análisis del proceso es el estudio de los procesos para ayudar a entender sus características clave y cómo las personas implicadas realizan en la práctica dichos procesos." `[modulo4-lectura4.md, Lec 2 de 5, ¶65-68]`
- Relación con la medición: "Se sugiere que el análisis del proceso sigue a la medición. Esta es una simplificación porque, en realidad, tales actividades están entrelazadas. Es necesario realizar cierto análisis para saber qué medir y, al hacer las mediciones, se desarrolla inevitablemente una comprensión más a fondo del proceso." `[Lec 2 de 5, ¶69-77]`

### 4.2. Objetivos del análisis del proceso
"El análisis del proceso tiene un número de objetivos relacionados estrechamente:" `[Lec 2 de 5, ¶79-82]`
1. Comprender las actividades implicadas en el proceso y las relaciones entre dichas actividades. `[Lec 2 de 5, ¶89-91]`
2. Entender las relaciones entre las actividades del proceso y las mediciones realizadas. `[Lec 2 de 5, ¶93-95]`
3. Relacionar el proceso o procesos específicos analizados con procesos comparables en otras partes de la organización, o idealizar procesos del mismo tipo. `[Lec 2 de 5, ¶97-101]`

### 4.3. Qué se busca durante el análisis
"Durante el análisis del proceso se trata de comprender lo que sucede en un proceso. Se busca información acerca de los problemas e ineficiencias del proceso. También se debe estar interesado en la medida en que el proceso se utiliza, las herramientas de software empleadas para apoyar el proceso y en cómo el proceso está influido por restricciones de la organización." `[Lec 2 de 5, ¶103-129]`

### 4.4. Técnicas de análisis del proceso
"Las técnicas usadas más comúnmente para el análisis del proceso son:" `[Lec 2 de 5, ¶131-134]`

#### 4.4.1. Cuestionarios y entrevistas
"A los ingenieros que trabajan en un proyecto se les pregunta sobre lo que sucede realmente. Las respuestas a un cuestionario formal se refinan durante las entrevistas personales con los involucrados en el proceso." `[Lec 2 de 5, ¶135-141]`
- **Cuestionarios**: "se lleva a cabo rápidamente una vez que se han diseñado las preguntas correctas. Sin embargo, si las preguntas no están bien redactadas o son inapropiadas, esto conducirá a un modelo incompleto o impreciso del proceso. Más aún, el análisis basado en cuestionarios es parecido a un formulario de evaluación. Los ingenieros encuestados dan las respuestas que creen que el encuestador desea escuchar en lugar de la verdad acerca del proceso utilizado." `[Lec 2 de 5, ¶153-173]`
- **Entrevistas**: "son más flexibles que los cuestionarios. Se puede empezar con un guion de preguntas previamente preparado, pero adaptando estas a las respuestas que se espera obtener de las diferentes personas. Si se da la oportunidad a los participantes de dialogar más ampliamente, se puede observar que estos hablan acerca de los problemas del proceso, los cambios que está experimentando el proceso, etc." `[Lec 2 de 5, ¶175-195]`

#### 4.4.2. Estudios etnográficos
"Los estudios etnográficos se utilizan para comprender la naturaleza del desarrollo de software como una actividad humana. Tal análisis revela la sutileza y complejidades no descubiertas por otras técnicas." `[Lec 2 de 5, ¶143-151]`
- "Es una actividad costosa y a largo plazo que puede durar por lo menos varios meses. Se basa en la observación externa del proceso. Un análisis completo debe continuar desde las primeras etapas del proyecto hasta la entrega y mantenimiento del producto. Probablemente esto no es práctico en proyectos largos que duran varios años. El análisis etnográfico, por lo tanto, es más útil cuando se requiere un conocimiento profundo de los fragmentos del proceso. Deben llevarse a cabo estudios a pequeña escala centrándose en los detalles de proceso." (Sommerville, 2005, p. 620) `[Lec 2 de 5, ¶197-221]`

### 4.5. Cambios en los procesos — definición y alcance
"El cambio al proceso implica hacer modificaciones al proceso existente. Como se sugirió, esto incluye introducir nuevas prácticas, métodos o herramientas; cambiar el orden de las actividades del proceso; introducir o eliminar entregables del proceso; mejorar las comunicaciones, o introducir nuevos roles y responsabilidades." `[Lec 3 de 5, ¶237-245]`
- "Los cambios al proceso deben estar dirigidos por metas de mejora, tales como 'reducir en un 25 % el número de defectos descubiertos durante las pruebas de integración'." `[Lec 3 de 5, ¶247-251]`
- "Después de implementar los cambios, se usan las mediciones del proceso para valorar la efectividad de estos." `[Lec 3 de 5, ¶253-255]`

### 4.6. Cinco etapas clave del cambio de proceso
"Existen cinco etapas clave en el proceso de cambios al proceso:" `[Lec 3 de 5, ¶257-258]`
1. **Identificación de mejoras**: "Esta etapa se ocupa de usar los resultados del análisis del proceso para identificar las formas de enfrentar los problemas de calidad, los cuellos de botella en la programación o las ineficiencias en costo que se identificaron durante el análisis del proceso. Se pueden sugerir nuevos procesos, estructuras de proceso, métodos y herramientas para enfrentar los problemas de los procesos." Ejemplo: identificar prácticas de ingeniería de requerimientos a partir de una guía de mejores prácticas. `[Lec 3 de 5, ¶259-291]`
2. **Priorización de las mejoras**: "Esta etapa se ocupa de valorar los posibles cambios a los procesos y priorizarlos para su implementación. Cuando se identifican muchos posibles cambios, por lo general es imposible introducirlos todos a la vez, y determinar cuáles son los más importantes. Estas decisiones se pueden tomar con base en la necesidad de mejorar áreas de proceso específicas, los costos de introducir un cambio, los efectos de un cambio en la organización u otros factores." Ejemplo: introducir gestión de requerimientos para administrar requerimientos en evolución. `[Lec 3 de 5, ¶293-319]`
3. **Introducción de cambios a los procesos**: "La introducción de cambios al proceso significa establecer nuevos procedimientos, métodos y herramientas, e integrarlos con otras actividades de proceso. Hay que permitir suficiente tiempo para introducir cambios y garantizar que éstos sean compatibles con otras actividades de proceso, así como con estándares y procedimientos organizacionales." `[Lec 3 de 5, ¶321-337]`
4. **Capacitación de proceso**: "Sin capacitación es imposible obtener todos los beneficios de los cambios al proceso. Los ingenieros implicados necesitan comprender los cambios que se propusieron y cómo realizar los procesos nuevos y modificados. Con demasiada frecuencia, los cambios a los procesos se imponen sin adecuada capacitación y el efecto de dichos cambios es degradar, antes que mejorar, la calidad del producto." `[Lec 3 de 5, ¶339-351]`
5. **Afinación del cambio**: "Los cambios de proceso propuestos nunca serán completamente efectivos al momento de introducirlos. Se requiere una fase de afinación en que puedan descubrirse problemas menores, para entonces proponer e introducir modificaciones al proceso. Esta fase de afinación debe durar varios meses hasta que los ingenieros de desarrollo estén satisfechos con el nuevo proceso." (Sommerville, 2005, pp. 623-624) `[Lec 3 de 5, ¶361-375]`

### 4.7. CMMI — marco de trabajo para mejora de procesos
"El marco de trabajo para la mejora de procesos CMMI. Según Sommerville (2005), los principales componentes del modelo son:" `[Lec 3 de 5, ¶381-383]`
1. "Un conjunto de áreas de proceso que se relacionan con las actividades de proceso del software. El CMMI identifica 22 áreas de proceso que son relevantes para la capacidad y la mejora del proceso de software. Están organizadas en cuatro grupos en el modelo CMMI continuo." `[Lec 3 de 5, ¶387-397]`
2. **Algunas metas**: "Estas son descripciones abstractas de un estado deseable que debe lograr una organización. El CMMI tiene metas específicas que se asocian con cada área de proceso y definen el estado deseable de dicha área. También define metas genéricas asociadas con la institucionalización de la buena práctica." `[Lec 3 de 5, ¶401-409]`
3. "Un conjunto de buenas prácticas. Estas son descripciones de formas para lograr una meta. Muchas prácticas específicas y genéricas pueden asociarse con cada meta dentro de un área de proceso." `[Lec 3 de 5, ¶413-419]`

### 4.8. Escala de seis puntos para áreas de proceso CMMI
"La siguiente es la escala de seis puntos que asigna un determinado nivel de madurez a un área de proceso:" `[Lec 3 de 5, ¶427-429]`
1. **No productivo**: "No se satisfacen una o más de las metas específicas asociadas con el área de proceso." `[Lec 3 de 5, ¶431-433]`
2. **Productivo**: "Se satisfacen las metas asociadas al área de proceso, y para todos los procesos el ámbito del trabajo a realizar es fijado y comunicado a los miembros del equipo." `[Lec 3 de 5, ¶435-439]`
3. **Gestionado**: "A este nivel, las metas asociadas con el área de proceso son conocidas y tienen lugar políticas organizacionales que definen cuándo se debe utilizar cada proceso. Debe haber planes documentados, gestión de recursos y monitorización de procedimientos a través de la institución." `[Lec 3 de 5, ¶441-449]`
4. **Definido**: "Este nivel se centra en la estandarización organizacional y el desarrollo de procesos. Cada proyecto de la organización tiene un proceso de gestión creado a medida desde un conjunto de procesos organizacionales. La información y las medidas del proceso son recogidas y utilizadas para las mejoras futuras del proceso." `[Lec 3 de 5, ¶451-463]`
5. **Gestionado cuantitativamente**: "En este nivel, existe una responsabilidad organizacional de usar métodos estadísticos y otros métodos cuantitativos para controlar los subprocesos. Esto significa que en el proceso de gestión debemos utilizar medidas del proceso y del producto." `[Lec 3 de 5, ¶465-473]`
6. **Optimizado**: "En este nivel superior, la organización debe utilizar medidas de proceso y de producto para dirigir el proceso de mejora. Debemos analizar las tendencias y adaptar los procesos a las necesidades de los cambios del negocio." (Sommerville, 2005, p. 622) `[Lec 3 de 5, ¶475-482]`

### 4.9. CMMI en etapas — cinco niveles
"Los niveles:" `[Lec 3 de 5, ¶493-494]`

#### Nivel 1 — Inicial (o a medida)
- "Basado en la competencia y acciones individuales de las personas." `[Lec 3 de 5, ¶495-497]`

#### Nivel 2 — Gestionado (gestión básica de procesos)
Incluye las siguientes áreas/procesos: `[Lec 3 de 5, ¶499-519]`
- Gestión de los requisitos del producto y del proyecto.
- Planificación de los proyectos.
- Seguimiento y control de los proyectos.
- Gestión de acuerdos con los proveedores de productos y servicios.
- Selección y supervisión de los proveedores.
- Medición y análisis.
- Aseguramiento de la calidad del producto y del proceso.
- Gestión de la configuración.

#### Nivel 3 — Definido (estandarización de procesos)
Incluye: `[Lec 3 de 5, ¶521-557]`
- Desarrollo de los requisitos del cliente, producto y componente del producto.
- Diseño, desarrollo y puesta en práctica de soluciones técnicas.
- Asegurar la integración del producto.
- Verificación.
- Validación.
- Enfoque a la organización hacia la gestión de los procesos.
- Correcta definición de los procesos de la organización.
- Educación y entrenamiento para mejorar la eficacia y la eficiencia.
- Gestión integrada de los proyectos (proceso + productos).
- Gestión de riesgos.
- Análisis sistemático y puesta en práctica de las decisiones acordadas.
- Ambiente organizativo adecuado para el desarrollo integrado del producto y del proceso.
- Formar y mantener un equipo para el desarrollo integrado.
- Gestión integrada de proveedores.

#### Nivel 4 — Gestionado en forma cuantitativa
Incluye: `[Lec 3 de 5, ¶559-569]`
- Evaluación de los procesos de la organización (datos del rendimiento de los procesos).
- Gestión cuantitativa de los proyectos.
- Gestión cuantitativa de los proveedores.

#### Nivel 5 — Optimizado
Incluye: `[Lec 3 de 5, ¶571-583]`
- Innovación y despliegue a lo largo de toda la organización (mejoras incrementales y su posterior generalización).
- Gestión de cambios tecnológicos.
- Análisis y resolución de las causas que generan los diferentes problemas y errores.

---

## 5. Otros temas / aclaraciones

### 5.1. Referencias bibliográficas del módulo
- **Lec 1**: Sommerville, I. (2011). *Ingeniería de software* (9a ed.). México, Editorial Pearson. `[modulo4-lectura1.md, Lec 11 de 11, ¶806-809]`
- **Lec 2**: Sommerville, I. (2011). *Ingeniería de software* (9a ed.). México, Editorial Pearson. `[modulo4-lectura2.md, Lec 10 de 10, ¶702-705]`
- **Lec 3**: Humphrey, W. (1989). *Managing the software process*. Estados Unidos: Addison-Wesley. Sommerville, I. (2005). *Ingeniería de software*. Madrid: Editorial Pearson. `[modulo4-lectura3.md, Lec 4 de 4, ¶625-631]`
- **Lec 4**: Sommerville, I. (2005). *Ingeniería de software*. Madrid: Editorial Pearson. `[modulo4-lectura4.md, Lec 4 de 5, ¶633-635]`

### 5.2. Caso de análisis — Cabañas (transversal a las 4 lecturas)
En todas las lecturas se usa el mismo caso: una cadena de hoteles "Cabañas" en Argentina con reserva web de habitaciones, tarifas por temporada (alta/media/baja), confirmación un mes antes, asignación de cabaña al llegar, catálogo enviado dos veces por año, sistema multi-sucursal. El equipo de sistemas atraviesa un proceso de mejora de calidad / configuración. La idea del caso es contratar a un profesional que asesore sobre gestión de cambios de software, mejora de procesos, configuración, calidad, etc.

### 5.3. Diferencia entre las dos ediciones de Sommerville usadas
- **Lec 1 y Lec 2** (Administración de la configuración y Calidad) usan **Sommerville 2011 (9a ed.)**.
- **Lec 3 y Lec 4** (Mejora de procesos I y II) usan **Sommerville 2005** y **Humphrey 1989**.
Esto explica cambios menores de paginación y de citación.

### 5.4. Conceptos que aparecen pero conviene tener en cuenta
- **CCB (Configuration Control Board)**: grupo responsable de aprobar cambios. "El CCB o el grupo de desarrollo del producto consideran el efecto del cambio desde un punto de vista estratégico y organizacional más que técnico." `[modulo4-lectura1.md, Lec 3 de 11, ¶212-214]`
- **Línea base (baseline)**: definición de un sistema específico (versiones de componentes + librerías + archivos de configuración). `[modulo4-lectura1.md, Lec 4 de 11, ¶302-306]`
- **Codeline (línea de código)**: secuencia de versiones de código fuente de un componente. `[modulo4-lectura1.md, Lec 4 de 11, ¶298-302]`
- **Mainline (línea principal)**: secuencia de versiones del sistema desarrolladas a partir de una línea base original. `[modulo4-lectura1.md, Lec 4 de 11, ¶311-313]`
- **COTS**: productos comerciales listos para usar. "Para sistemas grandes, el entorno objetivo puede incluir bases de datos y otros sistemas COTS que no pueden instalarse en máquinas de desarrollo." `[modulo4-lectura1.md, Lec 6 de 11, ¶463-466]`
- **Complejidad ciclomática**: ejemplo clásico de métrica estática / atributo interno del software. `[modulo4-lectura2.md, Lec 8 de 10, ¶540-543]`
- **Índice Fog** (Gunning, 1962): "medida de la legibilidad de un pasaje de texto escrito" — ejemplo de métrica de software. `[modulo4-lectura2.md, Lec 8 de 10, ¶512-513]`
- **IEEE 828-1998**: estándar para planes de administración de la configuración. `[modulo4-lectura1.md, Lec 2 de 11, ¶106-107]`
- **IEC 61508** (IEC, 1998): estándar especializado para sistemas críticos de protección y seguridad. `[modulo4-lectura2.md, Lec 5 de 10, ¶277-278]`
- **JUnit**: herramienta de automatización de pruebas mencionada como ejemplo. `[modulo4-lectura1.md, Lec 6 de 11, ¶508-511]`
- **CVS** (Vesperman, 2003): ejemplo de sistema de soporte de proyecto con check-in/check-out por proyecto completo. `[modulo4-lectura1.md, Lec 4 de 11, ¶362-365]`
- **SEI**: Software Engineering Institute; el método AMI "se desarrolló y combinó con el modelo de madurez de la capacidad del SEI." `[modulo4-lectura3.md, Lec 3 de 4, ¶465-468]`
- **Método AMI** (Pulford et al., 1996): método de mejora de procesos del software basado en GQM + CMM del SEI. `[modulo4-lectura3.md, Lec 3 de 4, ¶463-479]`

---

## 6. Definiciones y frases textuales "para tener a mano"

Estas son frases literales del material que probablemente coincidan con opciones de multiple-choice.

1. **Definición de administración de la configuración (resumen conceptual)**:
   "La administración de la configuración de un producto de sistema de software comprende cuatro actividades estrechamente relacionadas: 1. Administración del cambio… 2. Gestión de versiones… 3. Construcción del sistema… 4. Gestión de entregas (release)." `[modulo4-lectura1.md, Lec 2 de 11, ¶55-75]`

2. **Definición de gestión de versiones**:
   "La gestión de versiones (VM, por las siglas de version management) es el proceso de hacer un seguimiento de las diferentes versiones de los componentes de software o ítems de configuración, y los sistemas donde se usan dichos componentes." `[modulo4-lectura1.md, Lec 4 de 11, ¶285-290]`

3. **Definición de merge**:
   "su función es combinar lo existente y crear una versión nueva (su nombre proviene del inglés, donde 'merge' significa combinar)." `[modulo4-lectura1.md, Lec 5 de 11, ¶407-409]`

4. **Definición de branch**:
   "el branch o 'rama' sirve para trabajar con las modificaciones que se deban realizar en las versiones y no perder los cambios anteriores en caso de que sea necesario recuperarlos." `[modulo4-lectura1.md, Lec 5 de 11, ¶410-412]`

5. **Definición de construcción del sistema**:
   "La construcción del sistema es el proceso de crear un sistema ejecutable y completo al compilar y vincular los componentes del sistema, librerías externas, archivos de configuración, etc." `[modulo4-lectura1.md, Lec 6 de 11, ¶426-429]`

6. **Plataformas de construcción**:
   "tres diferentes plataformas de sistema pueden estar implicadas: 1. El sistema de desarrollo… 2. El servidor de construcción… 3. El entorno objetivo." `[modulo4-lectura1.md, Lec 6 de 11, ¶437-468]`

7. **Definición de integración continua**:
   "La integración continua implica reconstruir frecuentemente la línea principal (mainline), después de realizar pequeños cambios al código fuente." `[modulo4-lectura1.md, Lec 8 de 11, ¶598-601]`

8. **Definición de release/entrega**:
   "una entrega o release de sistema es una versión de un sistema de software que se ofrece a los clientes." `[modulo4-lectura1.md, Lec 9 de 11, ¶670-672]`

9. **Tipos de entrega**:
   "Release mayor: Proporciona funcionalidad significativamente nueva (estas entregas son muy importantes económicamente para el proveedor de software, pues los clientes tienen que pagar por ellas). Release menor: Repara bugs y corrige problemas reportados por el cliente (generalmente se distribuyen de manera gratuita)." `[modulo4-lectura1.md, Lec 9 de 11, ¶674-689]`

10. **Definición de gestión de calidad (Sommerville 2011)**:
    "La gestión de calidad del software para los sistemas de software tiene tres intereses fundamentales: 1. A nivel de organización… 2. A nivel del proyecto… 3. A nivel del proyecto [plan de calidad]." `[modulo4-lectura2.md, Lec 2 de 10, ¶43-62]`

11. **Independencia del equipo QA**:
    "El equipo QA debe ser independiente del equipo de desarrollo para que pueda tener una perspectiva objetiva del software." `[modulo4-lectura2.md, Lec 2 de 10, ¶79-82]`

12. **Plan de calidad (Humphrey 1989)** — cinco componentes:
    "Introducción del producto… Planes del producto… Descripciones de procesos… Metas de calidad… Riesgos y gestión del riesgo." `[modulo4-lectura2.md, Lec 3 de 10, ¶112-127]`

13. **Calidad del software — concepto**:
    "La calidad del software no es directamente comparable con la calidad en la fabricación. La idea de tolerancia no es aplicable a los sistemas digitales y es prácticamente imposible llegar a una conclusión objetiva sobre si un sistema de software cumple o no su especificación." `[modulo4-lectura2.md, Lec 4 de 10, ¶144-148]`

14. **Definición de métrica de software**:
    "Una métrica de software es una característica de un sistema de software, documentación de sistema o proceso de desarrollo que puede medirse de manera objetiva." `[modulo4-lectura2.md, Lec 8 de 10, ¶508-510]`

15. **Métricas de control vs predicción**:
    "Las métricas de control apoyan la gestión del proceso, y las métricas de predicción ayudan a predecir las características del software." `[modulo4-lectura2.md, Lec 8 de 10, ¶517-520]`

16. **Métricas dinámicas vs estáticas**:
    "Métricas dinámicas, que se recopilan mediante mediciones hechas de un programa en ejecución… Métricas estáticas, las cuales se recopilan mediante mediciones hechas de representaciones del sistema, como el diseño, el programa o la documentación." `[modulo4-lectura2.md, Lec 8 de 10, ¶589-599]`

17. **Inspecciones de programa (Gilb y Graham 1993)**:
    "Las inspecciones del programa son 'revisiones de pares' en las que los miembros del equipo colaboran para encontrar bugs en el programa en desarrollo… Complementan las pruebas, puesto que no requieren la ejecución del programa." `[modulo4-lectura2.md, Lec 7 de 10, ¶464-468]`

18. **Fases del proceso de revisión**:
    "el proceso de revisión se estructura por lo general en tres fases: 1. Actividades previas a la revisión… 2. La reunión de revisión… 3. Actividades posteriores a la revisión." `[modulo4-lectura2.md, Lec 7 de 10, ¶419-462]`

19. **Definición de ISO 9001**:
    "ISO 9001, el más general de dichos estándares, se aplica a organizaciones que diseñan, desarrollan y mantienen productos, incluido software. El estándar ISO 9001 se desarrolló originalmente en 1987, y su revisión más reciente fue en 2008." `[modulo4-lectura2.md, Lec 6 de 10, ¶334-339]`

20. **Advertencia sobre ISO 9001**:
    "No hay seguridad de que las compañías con certificación ISO 9001 empleen las mejores prácticas de desarrollo de software o que sus procesos conduzcan a software de alta calidad." `[modulo4-lectura2.md, Lec 6 de 10, ¶364-369]`

21. **Definición de mejora de procesos**:
    "La mejora de procesos significa comprender los procesos existentes y cambiarlos para incrementar la calidad del producto o reducir los costos y el tiempo de desarrollo." `[modulo4-lectura3.md, Lec 2 de 4, ¶63-67]`

22. **Enfoques de mejora**:
    "Enfoque de madurez de procesos. Se orienta a mejorar el proceso y a la gestión del proyecto… Enfoque ágil. Se orienta al desarrollo iterativo y a la reducción de las sobrecargas en el proceso de software." `[modulo4-lectura3.md, Lec 2 de 4, ¶75-97]`

23. **Tres subprocesos del ciclo de mejora**:
    "1. Proceso de medición de los atributos del proyecto actual o del producto… 2. Proceso de análisis… 3. Introducción de los cambios del proceso identificados en el análisis." (Sommerville, 2005, pp. 608-609) `[modulo4-lectura3.md, Lec 2 de 4, ¶225-245]`

24. **Tres tipos de métricas de proceso (Sommerville 2005)**:
    "1. El tiempo que tarda en completarse un proceso particular… 2. Los recursos requeridos para un proceso particular… 3. El número de ocurrencias de un evento particular." `[modulo4-lectura3.md, Lec 3 de 4, ¶315-341]`

25. **Paradigma GQM — tres preguntas**:
    "1. ¿Por qué se introduce la mejora de procesos? 2. ¿Qué información se necesita para ayudar a identificar y valorar las mejoras? 3. ¿Qué mediciones de proceso y producto se requieren para obtener esta información?" `[modulo4-lectura3.md, Lec 3 de 4, ¶357-367]`

26. **Paradigma GQM — tres abstracciones**:
    "estas preguntas se relacionan directamente con las abstracciones (metas, preguntas, métricas) en el paradigma GQM." `[modulo4-lectura3.md, Lec 3 de 4, ¶369-371]`

27. **Análisis del proceso — definición**:
    "El análisis del proceso es el estudio de los procesos para ayudar a entender sus características clave y cómo las personas implicadas realizan en la práctica dichos procesos." `[modulo4-lectura4.md, Lec 2 de 5, ¶65-68]`

28. **Técnicas de análisis del proceso**:
    "1. Cuestionarios y entrevistas… 2. Estudios etnográficos." `[modulo4-lectura4.md, Lec 2 de 5, ¶131-151]`

29. **Cinco etapas del cambio de proceso**:
    "1. Identificación de mejoras… 2. Priorización de las mejoras… 3. Introducción de cambios a los procesos… 4. Capacitación de proceso… 5. Afinación del cambio." `[modulo4-lectura4.md, Lec 3 de 5, ¶257-375]`

30. **CMMI — 22 áreas de proceso**:
    "El CMMI identifica 22 áreas de proceso que son relevantes para la capacidad y la mejora del proceso de software. Están organizadas en cuatro grupos en el modelo CMMI continuo." `[modulo4-lectura4.md, Lec 3 de 5, ¶388-397]`

31. **CMMI — escala de seis puntos**:
    "1. No productivo… 2. Productivo… 3. Gestionado… 4. Definido… 5. Gestionado cuantitativamente… 6. Optimizado." `[modulo4-lectura4.md, Lec 3 de 5, ¶427-482]`

32. **CMMI en etapas — 5 niveles**:
    "1. Inicial (o a medida)… 2. Gestionado… 3. Definido… 4. Gestionado en forma cuantitativa… 5. Optimizado." `[modulo4-lectura4.md, Lec 3 de 5, ¶493-583]`

33. **Definición de inspección de programa (Gilb y Graham 1993)**:
    "Las inspecciones del programa incluyen a miembros del equipo con diferentes antecedentes que realizan una cuidadosa revisión, línea por línea, del código fuente del programa." `[modulo4-lectura2.md, Lec 7 de 10, ¶475-479]`

34. **Factores elementales de la calidad del producto (Sommerville 2005, p. 707)**:
    "hay cuatro factores elementales que afectan la calidad del producto" — los cuatro factores que la pregunta de repaso confirma como correctos son: **Calidad del proceso, Tecnología de desarrollo, Calidad de personal, Diseño del proceso**. `[modulo4-lectura3.md, Lec 2 de 4, ¶133-139]` y `[Lec 3 de 4, ¶593-606]`

35. **Cinco factores para aprobar o rechazar un cambio** (en gestión de cambios):
    "1. Las consecuencias de no realizar el cambio… 2. Los beneficios del cambio… 3. El número de usuarios afectados por el cambio… 4. Los costos de hacer el cambio… 5. El ciclo de liberación del producto." `[modulo4-lectura1.md, Lec 3 de 11, ¶219-252]`

---

## Apéndice — Cheatsheet rápido de nombres propios

| Concepto | Referencia breve |
|----------|------------------|
| Sommerville 2011 (9a ed.) | Lec 1 y Lec 2 |
| Sommerville 2005 | Lec 3 y Lec 4 |
| Humphrey 1989, *Managing the software process* | Lec 3 y Lec 4 (cita también en Lec 2) |
| Gilb y Graham, 1993 | Inspecciones de programa (Lec 2) |
| Kitchenham, 1990 | Condiciones de medición interna vs externa (Lec 2) |
| Ince, 1994 | Modelo de ISO 9001 para software (Lec 2) |
| Bamford y Deibler, 2003 | Aplicación de ISO 9001:2000 (Lec 1 y Lec 2) |
| Ahern et al., 2001; Paulk et al., 1995; Peach, 1996 | Estándares CM y CMM/CMMI (Lec 1) |
| Gunning, 1962 | Índice Fog (Lec 2) |
| IEEE 828-1998 | Estándar para planes de CM (Lec 1) |
| IEC 61508 (IEC, 1998) | Sistemas críticos (Lec 2) |
| U.S. DoD, ANSI, BSI, OTAN, IEEE | Organismos de estandarización (Lec 2) |
| Basili y Green, 1993 | GQM aplicado a mejora de procesos (Lec 3) |
| Pulford et al., 1996 (método AMI) | GQM + CMM del SEI (Lec 3) |
| Deming | Control estadístico de calidad (Lec 3) |
| Vesperman, 2003 | CVS (Lec 1) |
| CMM/CMMI | Lec 1 (mención), Lec 3 (modelo de capacidad del SEI), Lec 4 (CMMI niveles) |
| ISO 9000 / ISO 9001 | Lec 1 (estándar CM) y Lec 2 (marco de calidad) |
| JUnit | Ejemplo de herramienta de pruebas automatizadas (Lec 1) |
| CVS | Ejemplo de VCS con check-in/check-out por proyecto (Lec 1) |
| UML | Ejemplo de modelo revisable por inspección (Lec 2) |