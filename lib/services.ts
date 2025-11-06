export interface ServiceDetail {
  slug: string;
  title: string;
  shortDescription: string;
  footer: string;
  heroDescription: string;
  overview: string[];
  highlights: string[];
  approach: {
    title: string;
    description: string;
  }[];
  closing: string;
  cta: string;
  metaDescription: string;
}

export const services: ServiceDetail[] = [
  {
    slug: "derecho-salud-amparos",
    title: "Derecho de Salud - Amparos",
    shortDescription: "¿Tu obra social o prepaga te negó un tratamiento? Hacemos amparos urgentes para que accedas a lo que necesitás.",
    footer: "Atención rápida. Trato directo.",
    heroDescription: "Revertimos negativas injustificadas de obras sociales, prepagas y aseguradoras para que recibas el tratamiento o medicamento indicado por tu médico.",
    overview: ["Cuando la salud está en juego, cada día cuenta. En Estudio Conti presentamos amparos de salud urgentes para que obtengas la cobertura integral de tratamientos, cirugías, medicación de alto costo y prestaciones especiales.", "Trabajamos junto a tu profesional tratante para reunir la evidencia médica y legal necesaria, redactamos la demanda en tiempo récord y gestionamos las medidas cautelares que obligan a la cobertura inmediata.", "Sabemos que este proceso puede resultar abrumador. Te acompañamos en cada paso, manteniéndote al tanto de cada avance y explicando la estrategia de forma clara y humana."],
    highlights: ["Presentación de amparos con medidas cautelares urgentes.", "Cobertura de medicamentos, cirugías, internaciones y tratamientos especiales.", "Seguimiento continuo hasta el cumplimiento efectivo de la sentencia."],
    approach: [
      {
        title: "Diagnóstico legal veloz",
        description: "Analizamos la documentación médica y los rechazos administrativos para definir la vía judicial más efectiva.",
      },
      {
        title: "Acciones urgentes",
        description: "Preparamos presentaciones completas que solicitan cautelares de cumplimiento inmediato ante la Justicia Federal o Provincial.",
      },
      {
        title: "Defensa integral",
        description: "Controlamos la ejecución de la sentencia para que la obra social o prepaga cumpla en tiempo y forma.",
      },
    ],
    closing: "La salud es un derecho. Nuestro equipo se encarga de la estrategia judicial para que puedas concentrarte en recuperarte.",
    cta: "Quiero iniciar mi amparo de salud",
    metaDescription: "Amparos de salud urgentes: logramos que obras sociales y prepagas cubran tratamientos, medicamentos y cirugías sin demoras.",
  },
  {
    slug: "derecho-trabajador",
    title: "Derecho del Trabajador",
    shortDescription: "¿Te despidieron o sufriste un accidente laboral? Revisamos tu caso y reclamamos lo que te corresponde.",
    footer: "Consulta sin compromiso.",
    heroDescription: "Defendemos tus derechos laborales frente a despidos, accidentes de trabajo, sanciones injustas y falta de registración.",
    overview: ["Cada relación laboral tiene obligaciones claras. Si el empleador las incumple, podés reclamar indemnizaciones, salarios impagos y regularización.", "Auditamos tu historia laboral, calculamos lo adeudado y te asesoramos sobre la estrategia más conveniente: conciliación, demanda judicial o denuncia ante el Ministerio de Trabajo.", "Nos enfocamos en lograr acuerdos rápidos, justos y transparentes que te permitan seguir adelante con tranquilidad."],
    highlights: ["Revisión completa de liquidaciones e indemnizaciones.", "Acciones por accidentes y enfermedades laborales.", "Reclamos por trabajo no registrado o parcialmente registrado."],
    approach: [
      {
        title: "Evaluación inicial",
        description: "Reunimos documentación, testimonios y recibos para identificar incumplimientos y calcular montos adeudados.",
      },
      {
        title: "Negociación estratégica",
        description: "Representamos tus intereses en audiencias de conciliación y negociaciones privadas buscando resoluciones rápidas.",
      },
      {
        title: "Juicio laboral",
        description: "Si no hay acuerdo, iniciamos la demanda judicial con un enfoque sólido y prueba contundente.",
      },
    ],
    closing: "Tu trabajo merece respeto. Estamos para defender tus derechos y que obtengas cada peso que te corresponde.",
    cta: "Necesito asesoramiento laboral",
    metaDescription: "Despidos, accidentes laborales y salarios adeudados: asesoramiento completo para trabajadores. Defendemos tus derechos.",
  },
  {
    slug: "derecho-consumidor-danos",
    title: "Derecho del Consumidor - Daños",
    shortDescription: "¿Tu obra social o prepaga te negó un tratamiento? Hacemos amparos urgentes para que accedas a lo que necesitás.",
    footer: "Atención rápida. Trato directo.",
    heroDescription: "Protegemos tus derechos frente a incumplimientos de empresas de servicios, comercios, bancos y aseguradoras.",
    overview: ["Los consumidores cuentan con amparo legal para reclamar por incumplimientos, mala calidad de servicios, débito indebido o daños provocados por productos defectuosos.", "Evaluamos tu caso, reunimos la prueba documental y de comunicación y gestionamos reclamos administrativos y judiciales buscando soluciones efectivas.", "Priorizamos acuerdos ágiles que reparen el daño económico y moral sufrido, sin que tengas que atravesar procesos innecesarios."],
    highlights: ["Reclamos por incumplimientos contractuales y servicios defectuosos.", "Indemnizaciones por daños y perjuicios.", "Defensa ante cláusulas abusivas y cobros indebidos."],
    approach: [
      {
        title: "Relevamiento de evidencia",
        description: "Analizamos facturas, contratos, comprobantes y comunicaciones para construir un reclamo sólido.",
      },
      {
        title: "Gestión administrativa",
        description: "Iniciamos reclamos ante organismos de defensa del consumidor y cámaras sectoriales para presionar soluciones tempranas.",
      },
      {
        title: "Acción judicial",
        description: "Cuando es necesario, promovemos demandas para obtener indemnizaciones completas por daños materiales y morales.",
      },
    ],
    closing: "No estás solo frente a una empresa poderosa. Defendemos tus derechos y buscamos reparaciones efectivas.",
    cta: "Quiero iniciar un reclamo como consumidor",
    metaDescription: "Reclamos de consumo: cobranzas indebidas, servicios defectuosos, cláusulas abusivas y daños. Representación integral.",
  },
  {
    slug: "derecho-familia",
    title: "Derecho de Familia",
    shortDescription: "¿Problemas con la cuota alimentaria, visitas, divorcio o tenencia? Te ayudamos a resolver situaciones familiares de forma clara, rápida y cuidando lo que más importa.",
    footer: "Trato humano. Soluciones reales.",
    heroDescription: "Acompañamos procesos familiares sensibles con cercanía, discreción y estrategias orientadas a proteger tus vínculos y tu patrimonio.",
    overview: ["Cada familia es única. Escuchamos tu historia y diseñamos soluciones legales que priorizan el bienestar de los niños y la paz familiar.", "Intervenimos en divorcios, convenios de parentalidad, alimentos, cuidado personal, adopciones y medidas urgentes de protección.", "Promovemos acuerdos equilibrados, pero si es necesario litigamos con firmeza para hacer valer tus derechos."],
    highlights: ["Divorcios express y convencionales.", "Convenios integrales de parentalidad y cuidado personal.", "Medidas cautelares y protección contra la violencia familiar."],
    approach: [
      {
        title: "Escucha activa",
        description: "Generamos un espacio de confianza para comprender tu contexto y las necesidades de tu núcleo familiar.",
      },
      {
        title: "Estrategias integrales",
        description: "Diseñamos acuerdos o demandas que contemplen aspectos patrimoniales, emocionales y prácticos.",
      },
      {
        title: "Acompañamiento continuo",
        description: "Seguimos a tu lado durante todo el proceso para ajustar medidas y resguardar a la familia.",
      },
    ],
    closing: "Tu familia merece soluciones claras y seguras. Estás en manos de un equipo empático y comprometido.",
    cta: "Necesito asesoramiento familiar",
    metaDescription: "Divorcios, acuerdos de parentalidad, alimentos y cuidado personal. Acompañamiento legal humano y efectivo.",
  },
  {
    slug: "accidentes-transito-seguros",
    title: "Accidentes de Tránsito - Seguros",
    shortDescription: "¿Tu aseguradora rechazó el siniestro o te pagó menos de lo que corresponde? Reclamamos frente a compañías de seguros por incumplimientos, rechazos injustificados y demoras en el pago.",
    footer: "Te ayudamos a hacer valer tu póliza.",
    heroDescription: "Hacemos valer tu póliza y reclamamos indemnizaciones completas por daños materiales, lesiones y lucro cesante.",
    overview: ["Un accidente es una situación inesperada que requiere respuestas claras. Evaluamos la póliza, la responsabilidad y el daño para presentar un reclamo contundente ante la aseguradora o el responsable civil.", "Trabajamos con peritos y especialistas para cuantificar los daños físicos, económicos y morales sufridos.", "Si la compañía dilata o rechaza el pago, accionamos judicialmente para que recibas la indemnización íntegra que marca la ley."],
    highlights: ["Reclamos por rechazos infundados de siniestros.", "Indemnizaciones por incapacidad, gastos médicos y reparación del vehículo.", "Gestión integral ante aseguradoras y responsables civiles."],
    approach: [
      {
        title: "Análisis técnico",
        description: "Revisamos tu póliza y el siniestro para determinar coberturas, exclusiones y responsabilidades.",
      },
      {
        title: "Recolección probatoria",
        description: "Reunimos pericias, presupuestos y testimonios para respaldar el reclamo.",
      },
      {
        title: "Negociación y juicio",
        description: "Negociamos acuerdos justos y, si no responden, demandamos para obtener una sentencia favorable.",
      },
    ],
    closing: "No dejes que tu aseguradora minimice tu situación. Defendemos tu derecho a ser indemnizado.",
    cta: "Quiero reclamar a mi aseguradora",
    metaDescription: "Reclamos por accidentes de tránsito y seguros: indemnizaciones completas por daños materiales y personales.",
  },
  {
    slug: "sucesiones-patrimonio",
    title: "Sucesiones y Patrimonio",
    shortDescription: "¿Una propiedad o cuenta sigue a nombre de un familiar fallecido? Tramitamos sucesiones de forma clara, rápida y sin vueltas. También te asesoramos en la organización y protección de tu patrimonio.",
    footer: "Consultas online o presenciales.",
    heroDescription: "Ordenamos situaciones patrimoniales complejas con un enfoque estratégico que reduce tiempos y conflictos entre herederos.",
    overview: ["Iniciamos sucesiones en todo el país, ya sean judiciales o notariales, según la complejidad del patrimonio y los acuerdos familiares.", "Gestionamos la documentación, cálculos fiscales y oficios necesarios para inscribir bienes inmuebles, vehículos y cuentas bancarias.", "También planificamos estructuras patrimoniales (donaciones, fideicomisos, capitulaciones) para evitar conflictos futuros."],
    highlights: ["Sucesiones judiciales y abreviadas en todo el país.", "Planificación patrimonial y donaciones con reserva de usufructo.", "Negociación de acuerdos entre herederos y mediaciones privadas."],
    approach: [
      {
        title: "Relevamiento patrimonial",
        description: "Identificamos bienes, deudas, herederos y documentación para iniciar el trámite sin demoras.",
      },
      {
        title: "Trámite integral",
        description: "Gestionamos escritos, presentaciones y oficios hasta la inscripción definitiva de los bienes.",
      },
      {
        title: "Planificación futura",
        description: "Diseñamos estrategias para proteger y ordenar tu patrimonio familiar a largo plazo.",
      },
    ],
    closing: "Transformamos los trámites sucesorios en procesos previsibles para que la familia avance en paz.",
    cta: "Quiero ordenar mi patrimonio",
    metaDescription: "Sucesiones, donaciones y planificación patrimonial: resolvemos conflictos y protegemos tus bienes familiares.",
  },
  {
    slug: "derecho-previsional",
    title: "Derecho Previsional",
    shortDescription: "¿Problemas con su jubilación, pensión o el reajuste de haberes? Te ayudamos a obtener el beneficio que te merecés de forma clara, ágil y cuidando tu futuro.",
    footer: "Trato humano. Soluciones efectivas.",
    heroDescription: "Gestionamos jubilaciones, pensiones y reajustes de haberes frente a ANSES y organismos provinciales.",
    overview: ["Revisamos tu historia laboral, aportes y documentación para definir la mejor vía para acceder al beneficio previsional.", "Tramitamos jubilaciones ordinarias, régimen de autónomos, moratorias, pensiones por fallecimiento y PUAM.", "También accionamos por reajustes y retroactivos cuando la liquidación no respeta la normativa vigente."],
    highlights: ["Jubilaciones con moratoria y reconocimiento de servicios.", "Pensiones y PUAM con seguimiento personalizado.", "Reajuste de haberes y ejecución de retroactivos."],
    approach: [
      {
        title: "Análisis de aportes",
        description: "Completamos tu historia previsional y evaluamos si aplican moratorias u otros regímenes especiales.",
      },
      {
        title: "Gestión administrativa",
        description: "Presentamos la documentación en ANSES y hacemos seguimiento continuo del expediente.",
      },
      {
        title: "Reclamos judiciales",
        description: "Promovemos demandas cuando ANSES demora o rechaza injustificadamente el beneficio.",
      },
    ],
    closing: "Tu futuro merece previsibilidad. Nos ocupamos de todo el proceso para que recibas lo que la ley reconoce.",
    cta: "Necesito iniciar mi trámite previsional",
    metaDescription: "Jubilaciones, pensiones y reajustes de haberes. Representación previsional completa frente a ANSES y cajas provinciales.",
  },
  {
    slug: "derecho-privado-general",
    title: "Derecho Privado - General",
    shortDescription: "¿Dudas sobre un contrato, un reclamo por daños o la posesión de un inmueble? Te damos asesoramiento legal claro para tus consultas y conflictos cotidianos.",
    footer: "Respaldo profesional. Soluciones concretas.",
    heroDescription: "Brindamos asesoramiento legal integral en contratos, responsabilidad civil, propiedad y conflictos cotidianos.",
    overview: ["La vida diaria presenta situaciones que requieren respaldo legal: contratos de alquiler, reclamos por daños, conflictos vecinales o comerciales.", "Analizamos tu caso, explicamos tus opciones y diseñamos estrategias preventivas o litigiosas para proteger tus derechos.", "Nuestro enfoque combina experiencia jurídica y sensibilidad comercial para evitar sorpresas y reducir riesgos."],
    highlights: ["Redacción y revisión de contratos civiles y comerciales.", "Acciones por daños y perjuicios.", "Negociación y mediación en conflictos privados."],
    approach: [
      {
        title: "Análisis personalizado",
        description: "Interpretamos tus contratos y antecedentes para detectar riesgos u oportunidades.",
      },
      {
        title: "Estrategias preventivas",
        description: "Diseñamos acuerdos y documentos claros que resguardan tus intereses.",
      },
      {
        title: "Resolución de conflictos",
        description: "Te representamos en mediaciones, conciliaciones o juicios según la complejidad del caso.",
      },
    ],
    closing: "Tomar decisiones informadas es la mejor forma de proteger tu patrimonio y tu tranquilidad.",
    cta: "Quiero asesoramiento legal integral",
    metaDescription: "Contratos, daños y conflictos privados. Asesoramiento civil y comercial para personas y empresas.",
  },
  {
    slug: "cobros-judiciales-estrategias-financieras",
    title: "Cobros Judiciales y Estrategias Financieras Personales",
    shortDescription: "¿Problemas con deudas, embargos o cobros judiciales? Te ayudamos a defender tu patrimonio de forma clara, estratégica y cuidando tu tranquilidad.",
    footer: "Protección patrimonial. Soluciones directas.",
    heroDescription: "Defendemos tus finanzas frente a ejecuciones, embargos, tarjetas y cobranzas agresivas, diseñando planes realistas y sostenibles.",
    overview: ["Si atravesás problemas financieros, necesitás respuestas concretas. Analizamos tu situación y negociamos con acreedores, bancos y estudios externos.", "También intervenimos en juicios ejecutivos, embargos y concursos para resguardar tus bienes y establecer planes de pago viables.", "Nuestro objetivo es devolver previsibilidad a tu economía personal o familiar mediante estrategias legales y financieras a medida."],
    highlights: ["Defensas en ejecuciones y embargos.", "Negociación integral con acreedores y bancos.", "Planes de regularización y protección patrimonial."],
    approach: [
      {
        title: "Radiografía financiera",
        description: "Relevamos tus obligaciones, ingresos y bienes para trazar un plan que se adapte a tu realidad.",
      },
      {
        title: "Negociación inteligente",
        description: "Abrimos canales de diálogo con acreedores para frenar intereses abusivos y fijar cuotas razonables.",
      },
      {
        title: "Defensa judicial",
        description: "Actuamos en tribunales para levantar embargos, contestar demandas y proteger tu patrimonio.",
      },
    ],
    closing: "Con un plan claro es posible recuperar el control de tus finanzas y dejar atrás el estrés de la deuda.",
    cta: "Necesito ordenar mis deudas",
    metaDescription: "Defensas en cobranzas judiciales, embargos y negociaciones con acreedores. Estrategias financieras legales a medida.",
  },
];

export const servicesMap = new Map(services.map((service) => [service.slug, service]));
