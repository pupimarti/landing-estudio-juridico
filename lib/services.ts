export interface ServiceDetail {
  slug: string;
  title: string;
  shortDescription: string;
  footer: string;
  heroDescription: string;
  overviewTitle: string;
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
    heroDescription: "Amparos urgentes para que accedas a la cobertura médica indicada sin más demoras.",
    overviewTitle: "¿Tu obra social o prepaga no cumple con la cobertura que necesitás?",
    overview: [
      "¿Te negaron un tratamiento, un medicamento, cirugías, internaciones geriátricas o domiciliarias, o siguen demorando una autorización médica?",
      "Cuando hay una indicación médica concreta y la cobertura no responde en tiempo o directamente la rechaza, se puede presentar un amparo de salud. Es una herramienta legal rápida, que permite reclamar judicialmente para que se garantice la prestación de forma urgente.",
      "En nuestro estudio brindamos un acompañamiento claro, profesional y rápido. Sabemos que en cuestiones de salud, el tiempo importa, y actuamos con responsabilidad para que accedas a lo que necesitás sin más demoras: seguimiento continuo hasta el cumplimiento efectivo de la sentencia.",
    ],
    highlights: [
      "Presentación de amparos con medidas cautelares urgentes.",
      "Cobertura de medicamentos, cirugías, internaciones y tratamientos especiales.",
      "Acompañantes terapéuticos, traslados y prestaciones por discapacidad.",
      "Desafiliaciones, urgencias y demoras en autorizaciones.",
      "Otros conflictos de salud que requieren intervención legal.",
    ],
    approach: [
      {
        title: "Análisis inmediato",
        description: "Revisamos indicación médica, rechazos y documentación para definir la estrategia judicial más efectiva.",
      },
      {
        title: "Acción urgente",
        description: "Presentamos amparo y cautelares para exigir la cobertura en el menor tiempo posible.",
      },
      {
        title: "Seguimiento efectivo",
        description: "Acompañamos todo el proceso hasta el cumplimiento concreto de la sentencia.",
      },
    ],
    closing: "La salud no puede esperar. Actuamos con rapidez y precisión para proteger tu derecho.",
    cta: "Quiero iniciar mi amparo de salud",
    metaDescription: "Amparos de salud urgentes para exigir cobertura de tratamientos, medicamentos, cirugías e internaciones.",
  },
  {
    slug: "accidentes-transito-seguros",
    title: "Accidentes de Tránsito - Seguros",
    shortDescription: "¿Tu aseguradora rechazó el siniestro o te pagó menos de lo que corresponde? Reclamamos por incumplimientos, rechazos injustificados y demoras en el pago.",
    footer: "Te ayudamos a hacer valer tu póliza.",
    heroDescription: "Reclamos frente a aseguradoras para que se respete tu cobertura y cobres lo que corresponde.",
    overviewTitle: "¿Tu aseguradora rechazó un reclamo, te ofrece menos de lo que corresponde o directamente no responde?",
    overview: [
      "Si contrataste un seguro, tenés derecho a que se respete lo acordado. Si tenés dudas sobre el cumplimiento o el alcance de la cobertura, escribinos y te ayudamos a evaluarlo.",
      "En nuestro estudio te asesoramos en lo que necesitás saber para actuar con respaldo y seguridad, ya sea a través de gestiones directas o acciones judiciales para resolver el problema de manera correcta.",
      "¿Cómo trabajamos?",
      "Revisamos tu documentación, evaluamos la viabilidad del reclamo y te guiamos en cada paso.",
      "Actuamos con compromiso, claridad y buscando una solución efectiva en el menor tiempo posible.",
    ],
    highlights: [
      "Rechazos injustificados de cobertura.",
      "Demoras excesivas en el pago del seguro.",
      "Indemnizaciones por siniestros mal liquidadas.",
      "Incumplimientos en seguros de auto, vivienda, salud, vida, etc.",
      "Cláusulas abusivas o condiciones contractuales no respetadas.",
      "Negativas a cubrir accidentes, robos u otros siniestros.",
    ],
    approach: [
      {
        title: "Revisión documental",
        description: "Analizamos póliza, constancias del siniestro y respuesta de la compañía.",
      },
      {
        title: "Reclamo estratégico",
        description: "Impulsamos gestiones directas y administrativas para obtener una respuesta rápida.",
      },
      {
        title: "Acción judicial",
        description: "Si persiste el incumplimiento, iniciamos demanda para exigir indemnización completa.",
      },
    ],
    closing: "Tu póliza tiene valor legal. Nos ocupamos de que la aseguradora cumpla.",
    cta: "Quiero reclamar a mi aseguradora",
    metaDescription: "Reclamos por rechazos de seguros, demoras e indemnizaciones mal liquidadas en siniestros y accidentes.",
  },
  {
    slug: "derecho-consumidor-danos",
    title: "Derecho del Consumidor - Daños",
    shortDescription: "¿Te vaciaron la cuenta, te estafaron con un link o te sacaron un crédito sin permiso? Defendemos tus derechos frente a bancos, empresas, comercios y plataformas.",
    footer: "Iniciamos reclamos administrativos y judiciales. Trato directo, sin vueltas.",
    heroDescription: "Defensa legal frente a incumplimientos de consumo, cobros indebidos, estafas y daños.",
    overviewTitle: "¿Te cobraron algo que no corresponde, incumplieron con un producto o servicio y no te dan respuesta?",
    overview: [
      "Como consumidor, tenés derechos. Y si una empresa, comercio, banco o prestador de servicios no cumple, podés reclamar por vía administrativa o judicial para exigir una solución.",
      "En nuestro estudio te asesoramos de forma clara y actuamos para que obtengas una respuesta concreta y efectiva.",
      "También intervenimos en litigios más complejos.",
      "Cuando el incumplimiento de una empresa o proveedor genera un perjuicio significativo, evaluamos iniciar acciones judiciales completas por daños y perjuicios.",
      "¿Cómo trabajamos?",
      "Revisamos tu caso, redactamos el reclamo y lo presentamos por la vía que corresponda.",
      "Te acompañamos en cada paso con asesoramiento legal profesional y seguimiento personalizado.",
    ],
    highlights: [
      "Compras con problemas, ya sean online, en persona o telefónicas.",
      "Cancelaciones o incumplimientos en viajes y reservas.",
      "Débitos indebidos o cobros no autorizados.",
      "Estafas digitales o bancarias.",
      "Problemas con servicios como internet, cable, luz, telefonía, etc.",
      "Incumplimientos contractuales o comerciales que afecten tus derechos como consumidor y otros.",
    ],
    approach: [
      {
        title: "Evaluación del caso",
        description: "Reunimos comprobantes y antecedentes para definir la mejor vía de reclamo.",
      },
      {
        title: "Gestión administrativa",
        description: "Presentamos reclamos formales frente a empresas, organismos y plataformas.",
      },
      {
        title: "Demanda por daños",
        description: "Cuando corresponde, promovemos acciones judiciales para reparación integral.",
      },
    ],
    closing: "Defendemos tus derechos como consumidor con estrategia clara y ejecución rápida.",
    cta: "Quiero iniciar un reclamo como consumidor",
    metaDescription: "Reclamos por estafas, cobros indebidos, incumplimientos y daños en relaciones de consumo.",
  },
  {
    slug: "sucesiones-patrimonio",
    title: "Sucesiones y Patrimonio",
    shortDescription: "¿Una propiedad o cuenta sigue a nombre de un familiar fallecido? Tramitamos sucesiones de forma clara, rápida y sin vueltas. También asesoramos en organización y protección patrimonial.",
    footer: "Consultas online o presenciales.",
    heroDescription: "Gestión integral de sucesiones y planificación patrimonial para ordenar y proteger tus bienes.",
    overviewTitle: "¿Necesitás iniciar una sucesión o regularizar una situación?",
    overview: [
      "Cuando fallece un familiar o una persona cercana, es necesario tramitar la sucesión para poder disponer legalmente de los bienes, cuentas, propiedades o derechos que haya dejado. Nosotros nos encargamos de todo: desde el inicio hasta la inscripción final, para que puedas resolverlo de manera ordenada, sin demoras y con información clara.",
      "Además, te asesoramos en planificación patrimonial y protección patrimonial: donaciones, pactos familiares, testamentos y acuerdos entre herederos para evitar conflictos futuros y proteger tus bienes. Además, te asesoramos para regularizar tus bienes.",
      "¿Cómo trabajamos?",
      "Estamos presentes en cada instancia del proceso.",
      "Nos destacamos por nuestra eficiencia y claridad en la comunicación.",
    ],
    highlights: [
      "Inicio de sucesiones judiciales.",
      "Particiones y cesiones hereditarias.",
      "Acceso y regularización de bienes registrables.",
      "Asesoramiento para herederos en conflicto o sin vínculo con otros.",
      "Testamentos, planificación patrimonial y donaciones en vida.",
      "Protección y regularización de bienes.",
    ],
    approach: [
      {
        title: "Relevamiento inicial",
        description: "Identificamos bienes, herederos y documentación para iniciar el trámite sin demoras.",
      },
      {
        title: "Gestión completa",
        description: "Impulsamos todas las etapas del expediente hasta la inscripción final de los bienes.",
      },
      {
        title: "Planificación futura",
        description: "Definimos herramientas patrimoniales para prevenir conflictos y proteger activos.",
      },
    ],
    closing: "Ordenamos procesos sucesorios con claridad para que avances con seguridad jurídica.",
    cta: "Quiero iniciar una sucesión",
    metaDescription: "Sucesiones, regularización de bienes, testamentos y planificación patrimonial con acompañamiento integral.",
  },
  {
    slug: "derecho-trabajador",
    title: "Derecho del Trabajador",
    shortDescription: "¿Te despidieron o sufriste un accidente laboral? Revisamos tu caso y reclamamos lo que te corresponde.",
    footer: "Consulta sin compromiso.",
    heroDescription: "Defensa laboral frente a despidos, accidentes de trabajo y condiciones irregulares.",
    overviewTitle: "¿Fuiste despedido, tuviste un accidente en el trabajo o estás atravesando una situación laboral injusta?",
    overview: [
      "Cuando se vulneran tus derechos como trabajador, podés reclamar lo que te corresponde por vía legal, de forma clara y con acompañamiento profesional.",
      "En nuestro estudio te ayudamos a analizar tu situación, evaluar los posibles reclamos y llevar adelante las acciones necesarias, tanto en casos de despido como frente a la ART o por condiciones laborales irregulares.",
      "Sabemos que estos conflictos generan preocupación e incertidumbre. Por eso trabajamos con seriedad, rapidez y un trato cercano, para que cuentes con el respaldo que necesitás.",
      "¿Cómo trabajamos?",
      "Revisamos tu documentación, calculamos lo que te corresponde y te guiamos en cada paso, ya sea por vía extrajudicial o judicial.",
      "Nuestro objetivo es que accedas a una solución concreta en el menor tiempo posible.",
    ],
    highlights: [
      "Despidos sin causa o con causa discutible.",
      "Liquidaciones finales incorrectas o incompletas.",
      "Diferencias salariales o falta de aportes.",
      "Accidentes laborales y reclamos ante ART.",
      "Trabajo no registrado o parcialmente registrado.",
      "Suspensiones injustificadas o cambios de condiciones de trabajo.",
    ],
    approach: [
      {
        title: "Revisión laboral",
        description: "Analizamos recibos, telegramas y antecedentes para calcular correctamente cada reclamo.",
      },
      {
        title: "Estrategia de reclamo",
        description: "Definimos la vía extrajudicial o judicial más conveniente según tu caso.",
      },
      {
        title: "Acompañamiento total",
        description: "Seguimos el proceso de principio a fin con información clara y trato directo.",
      },
    ],
    closing: "Protegemos tus derechos laborales para que obtengas una respuesta concreta y justa.",
    cta: "Necesito asesoramiento laboral",
    metaDescription: "Reclamos laborales por despidos, accidentes de trabajo, ART, salarios y registración irregular.",
  },
  {
    slug: "derecho-privado-general",
    title: "Derecho Privado - General",
    shortDescription: "¿Dudas sobre un contrato, un reclamo por daños o la posesión de un inmueble? Te damos asesoramiento legal claro para consultas y conflictos cotidianos.",
    footer: "Respaldo profesional. Soluciones concretas.",
    heroDescription: "Asesoramiento legal civil y comercial para conflictos patrimoniales y contractuales del día a día.",
    overviewTitle: "Consultas legales cotidianas y conflictos civiles: asesoramiento claro para tus derechos.",
    overview: [
      "El derecho civil regula los vínculos entre personas, bienes, contratos y responsabilidades. En situaciones cotidianas -como la firma de un contrato, la posesión de un inmueble, un accidente o un conflicto por deudas- contar con orientación legal puede marcar la diferencia.",
      "Así trabajamos:",
      "En nuestro estudio brindamos acompañamiento legal personalizado para ayudarte a entender tus derechos y elegir el camino más adecuado. Ya sea que necesites redactar un acuerdo, resolver un conflicto con otra persona, reclamar por daños o cobrar una deuda, te ofrecemos respuestas claras y estrategias legales efectivas.",
      "Nos enfocamos en prevenir litigios cuando es posible, y en defender tus intereses cuando el conflicto ya está planteado.",
      "Nos involucramos con tu caso para encontrar soluciones viables, legales y sostenibles que te den tranquilidad y respaldo en cada paso.",
    ],
    highlights: [
      "Incumplimientos de contrato.",
      "Reclamos por daños y responsabilidad civil.",
      "Alquileres, desalojo y locaciones.",
      "Posesión y usucapión de inmuebles.",
      "Cobros de deudas entre particulares.",
      "Redacción y revisión de acuerdos civiles.",
      "Otras consultas civiles y comerciales que requieran intervención profesional.",
      "Regularización y negociación de deudas personales.",
      "Embargos, inhibiciones y medidas cautelares.",
      "Estrategias patrimoniales preventivas.",
      "Concursos y quiebras personales.",
      "Protección y renegociación de deudas.",
    ],
    approach: [
      {
        title: "Diagnóstico jurídico",
        description: "Estudiamos antecedentes, contratos y riesgos para definir un plan legal claro.",
      },
      {
        title: "Prevención y negociación",
        description: "Priorizamos acuerdos sostenibles para evitar costos y tiempos de litigio innecesarios.",
      },
      {
        title: "Defensa activa",
        description: "Si hay conflicto, actuamos en mediación o juicio para proteger tus intereses.",
      },
    ],
    closing: "Te damos respaldo legal práctico para resolver conflictos privados con seguridad.",
    cta: "Quiero asesoramiento legal integral",
    metaDescription: "Asesoramiento en contratos, daños, inmuebles, deudas y conflictos civiles y comerciales.",
  },
];

export const servicesMap = new Map(services.map((service) => [service.slug, service]));
