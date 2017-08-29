# Proyecto 2 telemática

## 1. Documento 1

### 1.1 Definición del equipo, proyecto y aplicación

* Itegrantes: David Medina, Samuel Eduardo Sarabia, Daniel Alejandro Martínez 
* Selección del proyecto: Se escogió la aplicación de Samuel Sarabia
* Descripción: Photosite es una red social que permite a diferentes fotógrafos de todo el mundo compartir su trabajo con personas que aprecien su arte. Además que permite a admiradores comentar y hacer parte del trabajo de los fotógrafos.
* Requisitos funcionales: 
  1. El sistema permitirá al usuario registrarse y loguearse.
  2. El sistema permitirá al usuario enlazar sus fotos y publicarlas.
  3. El sistema permitirá al usuario borrar y modificar los posts de fotos que publique.
  4. El sistema permitirá al usuario comentar las fotos subidas.
  5. El sistema permitirá al usuario elegir si quiere que sus fotos sean públicas o privadas.
  6. El sistema permitirá al usuario buscar entre las diferentes fotos subidas en la plataforma. 

### 1.2 Detalles técnicos del proceso para la incorporación de la gestión de contenids en el proyecto2

 Se implementó la gestión de imágenes en NodeJS con Multer y file system, guardando las imágenes en una carpeta local y haciendo una referencia al path estático de la foto en el campo src del modelo photo en Mongo

### 1.3 Aplicación completa desplegada en el Data Center Académico 

[Data Center Academico](10.131.137.221)


## 2. Documento 2

Atributos de calidad seleccionados: 
 * **QA1:** Disponibilidad - Daniel Alejandro Martínez
 * **QA2:** Rendimiento    - David Medina
 * **QA3:** Seguridad - Samuel Sarabia Osorio

### 2.1 Disponibilidad 

#### 2.1.1 ¿Qué es?
La disponibilidad es la habilidad que posee un sistema de estar constantemente disponible para los usuarios sin que se caiga el servicio. Es indicado mediante la cantidad de tiempo en general que el sistema se encuentra disponible para cumplir con las peticiones de los usuarios.
La disponibilidad es un factor crítico de calidad, el cual no puede ser obviado, para la continuidad del negocio y éxito en cuanto al cumplimiento de los objetivos del software, lo que aumenta la lealtad de los usuarios y brinda mayor competitividad en el mercado.

#### 2.1.2 ¿Qué patrones se pueden emplear?
 * **Failover:**  Un sistema de clusters de nodos, cada nodo con código y datos similares, para así poder pasar de un servidor principal a uno secundario en caso de que el principal se caiga (por cualquier motivo), sin complicaciones y de manera transparente.

 * **Failback:** Una vez el servidor principal se recupera y se encuentra completamente funcional. Esto requiere copiar los datos que fueron creados durante el tiempo que este servidor principal se encontraba caído. 

 * **Replication:** Copiar los datos del servidor principal a todos los servidores de backup, para que sea fácil cambiar de servidor en caso de una falla. 
    * **Active:** Cada petición que se haga, se procesa por todos los nodos a la vez. Utilizado por sistemas en tiempo real.
    * **Pasive:** La petición es procesada por el nodo principal, y luego copiada al resto de nodos.

* **Redundancy:**  Múltiples nodos redundantes en información para facilitar hacer failover.

* **Virtualization:**  Reducir los costos causados por hardware mediante virtualización de las máquinas, para tener un manejo mejor de la distribución de la carga, enrutamiento de las peticiones, y mejora en cuanto al “hardware” de cada máquina sin mayores complicaciones.

* **Continuous maintenance:**  Mantenimiento regular al hardware para mantenerlo en buen estado. Incrementa la confiabilidad del sistema, y prolonga la vida del hardware.  
    * **Corrective:**  Arreglar el problema una vez ha sido encontrado.
    * **Preventive:** Realizar mantenimientos periódicos, y monitoreo constante, para prevenir que el sistema falle

* **Perfective maintenance:**  Son realizadas para mejorar la experiencia del usuario. Incluye actividades como agregar más hardware para mejorar tiempos de respuesta, desarrollar un código que responda mejor para mejorar la experiencia del usuario, mejorar la navegación, etc.

* **Step-wise functionality degradation:** En un escenario de inevitable caída, el sistema debe ser capaz de degradar sus funcionalidades menos necesarias para dejar en completa funcionalidad las más importantes y liberar la carga.

* **Asynchronous and services-based integration with external interfaces:** Remover la dependencia en la carga de servicios externos para el tiempo de carga de la aplicación, se vuelven asincrónicos, lo que me brinda una mayor velocidad de carga, y en caso de que uno de los servicios esté caido, que sólo esa funcionalidad se encuentre desactivada.

* **Stateless and lightweight application components:**  Entre más componentes no posean un estado y sean más atómicos, se facilita su replicación, lo que mejora la disponibilidad del sistema.

* **Continuous incremental code and data replication:**  Establecer procesos de replicación de datos a través de diferentes nodos, para que sea realizada continuamente.

* **Availability trade-off using the CAP theorem:**  No es posible lograr tolerancia en Consistencia, Disponibilidad y Particionamiento al mismo tiempo.
  

#### 2.1.3 Especificación mediante escenarios
 * Source of stimulus: El lugar de donde viene el estímulo, si es interno o externo, y dependiendo de la fuente la respuesta puede ser diferente.
 * Stimulus: Puede ser de los siguientes diferentes tipos:
    * Omission: El sistema falla al responder a un estímulo.
    * Crash: El componente repetidamente tiene fallas de omisión.
    * Timing: El componente responde a destiempo, o muy temprano o muy tarde.
    * Response: El componente responde con un valor incorrecto.
 * Artifact: Este es el recurso que se necesita que tenga alta disponibilidad. 
 * Environment: El estado del sistema cuando la falla ocurre, ya que este también puede afectar la respuesta. 
 * Response: Diferentes tipos de respuestas, primero se debe detectar y aislar el error antes de dar una respuesta. Una vez es detectada, el sistema debe recuperarse de esta.
 * Response measure: Especifica el cambio % en la disponibilidad debido a la respuesta brindada por la falla.

#### 2.1.4 ¿Qué tácticas se pueden emplear?
 * **Fault prediction:** Predecir fallas potenciales, las cuales se detectan adoptando modelos que usan técnicas de probabilidad, y los cuales se soportan en datos históricos de otros proyectos.

 * **Fault prevention:** Identificar áreas donde potencialmente pueden ocurrir fallas y buscar maneras de solucionar dichos problemas.

 * **Fault detection:** Se realiza a través de técnicas de validación, como testing, integración continua, testeo automático, entre otros. Un monitoreo robusto ayuda a la detección temprana. 

* **Fault tolerance:** Esto se soluciona mediante los diferentes patrones.

#### 2.1.5 ¿Qué herramientas se pueden utilizar para lograrlo?

La herramientas utilizadas para disponibilidad son herramientas de monitoreo continuo, testeo y manejo de la aplicación, tales como: 
* www.aremysitesup.com 
* www.site24x7.com 


### 2.2 Seguridad  

#### 2.2.1 ¿Qué es?
La seguridad es un requisito fundamental para las aplicaciones empresariales. Ésta envuelve una ámplia gama de temas como la protección de datos confidenciales, prevención de ataques internos o externos, adopción de estándares de cifrado, uso de buenas prácticas de seguridad al nivel de componentes de hardware y software, entre otros.

La seguridad tiene un impacto directo en los tres atributos de calidad. Ataques como un DDoS pueden poner en riesgo la disponibilidad, o pueden reducir el rendimiento de la aplicación. Otros impactos adversos que se pueden presentar son: la pérdida material, la erosión de la base de clientes o la fidelidad y la puesta en riesgo de la propiedad intelectual.

#### 2.2.2 ¿Qué patrones se pueden emplear?
Los patrones de seguridad pueden ser aplicados para lograr objetivos en el área de seguridad informática.
Todos los patrones de diseño clásicos tienen diferentes instanciaciones para satisfacer un objetivo de seguridad, tales como: confidencialidad, integridad y disponibilidad.
**Patrones de sistema disponible:**
  * Check pointed system describe un diseño para usar replicación y recuperarse cuando un componente falla.
  * Standby pattern tiene el objetivo de proveer un componente de respaldo para restablecer el servicio del mismo.
  * Comparator-checked fault tolerant system provee una forma de monitorear el comportamiento de un componente.
  * Replicated system pattern describe un diseño de componentes redundantes y balanceo de carga
  * Subject descriptor pattern
  * Secure communication
  * Security Context
  * Security Association
  * Secure proxy
  * Authentication enforcer es usado para manejar y delegar procesos de autenticación
  * Authorization enforcer es usado para manejar y delegar procesos de autorización
  * Intercepting validator ayuda validando las entradas de datos de los clientes
  * Secure base action muestra un manejo centralizado de tareas de seguridad
  * Secure logger puede ser usado para hacer un log de datos sensibles
  * Secure session manager muestra información de sesión centralizada de forma segura
  * Web agent interceptor muestra cómo usar un mecanismo interceptor para dar seguridad a aplicaciones web
  * Obfuscated transfer object muestra cómo proteger datos pasados en objetos de transferencia y entre tiers de aplicaciones.
  * Audit interceptor muestra cómo capturar eventos relacionados con seguridad para ayudar con el logging y las auditorías.
  * Mensaje inspector muestra la verificación y validación de seguridad a nivel de mecanismos de mensajes de XML.
  * Message interceptor gateway muestra una solución con un solo punto de entrada para la centralización del aseguramiento de seguridad en mensajes XML entrantes y salientes.
  * Secure message router facilita la comunicación segura por medio de XML con puntos puntos de salida que adoptan seguridad a nivel de mensaje.
  * Single Sign-On Delegator describe cómo construir un agente delegador para manejar un sistema legacy para single-sign on.
  * Assertion Builder define como una afirmación de identidad puede ser construida.
  * Credential Synchroniser describe cómo sincronizar credenciales y principales a través de aplicaciones múltiples.

  
#### 2.2.3 Especificación mediante escenarios
Los diferentes escenarios de seguridad se pueden describir por medio de las diferentes variables que componen el mismo, éstas se pueden resumir en seis aspectos:
  * Fuente del estímulo: La fuente de un ataque puede ser de origen humano o puede provenir de otro sistema.  Un atacante humano puede pertenecer o no a la compañía.
  * Estímulo: El estímulo es el ataque en sí. Se caracterizan por ser intentos no autorizados de mostrar o cambiar datos, acceder a servicios del sistema, cambiar el comportamiento del sistema o reducir la disponibilidad.
  * Objetivo: El objetivo del ataque pueden ser los servicios del sistema, los datos en él o los datos producidos o consumidos por éste.
  * Ambiente: El ataque puede ocurrir cuando el sistema está online o offline, conectado o desconectado de una red, tras un firewall o en una red abierta, completamente operacional, parcialmente operacional o no operacional.
  * Respuesta: El sistema debe asegurar que las transacciones son llevadas de tal manera que los datos o servicios no sean vistos o manipulados sin autorización. Además, el sistema debe llevar registro de las actividades de acceso o modificación, intentos de acceder a ciertos datos, recursos o servicios.
  * Medida de respuesta: Es la medida de la respuesta del sistema, la cual incluye que porción del sistema está comprometida cuando un componente o valor de datos está comprometido, cuanto tiempo pasa antes de que el ataque sea detectado, cuantos ataques fueron resistidos, cuánto tiempo tomó recuperarse de un ataque exitoso y cuantos datos estuvieron vulnerables durante un ataque particular.


#### 2.2.4 ¿Qué tácticas se pueden emplear?
  #### **Detectar ataques:**
  * Detectar una intrusión: Es la comparación del tráfico de la red o patrones de request de servicio con un set de patrones conocidos de comportamientos maliciosos guardados en una base de datos.
  * Detectar negación del servicio: Es la comparación de patrones del tráfico de la red viniendo hacia un sistema con perfiles históricos de ataques de denegación de servicios conocidos.
  * Verificar la integridad de los mensajes: Esta táctica utiliza técnicas como checksums o valores hash para verificar la integridad de mensajes y archivos.
  * Detectar demoras en los mensajes: Es utilizada para detectar ataques de “man-in-the-middle”. Por medio de la medición del tiempo que tarda un mensaje, se pueden detectar comportamientos extraños e intersecciones a los request.
  #### **Resister ataques:**
  * Identificar actores: Se trata de identificar el origen de cualquier entrada externa al sistema.
  * Autenticar actores: Asegurar que un actor es en realidad quien pretende ser.
  * Autorizar actores: Autorización significa que un actor autenticado tiene derechos de acceder o modificar datos o servicios. No todos los autores suelen tener el mismo nivel de libertad de interactuar con el sistema.
  * Limitar acceso: Se trata de controlar qué y quién tiene acceso a qué partes del sistema. Esto suele incluir la limitación de acceso a recursos como procesadores, memoria y conexión a la red.
  * Limitar exposición: Se refiere a reducir la probabilidad de que ocurra un ataque exitoso, o restringir la cantidad de daño potencial. Se puede lograr distribuyendo los recursos críticos para que la explotación de una debilidad no comprometa completamente algún recurso.
  * Cifrar datos: Se puede lograr aplicando alguna forma de cifrado a los datos y la comunicación.
  * Separar entidades: Se puede lograr mediante la separación física en diferentes servidores que están adheridos a diferentes redes.
  * Cambiar los ajustes por defecto: Muchos sistemas tienen ajustes por defecto cuando el sistema es entregado. Forzar al usuario a cambiar estos ajustes puede prevenir ataques relacionados con adquirir acceso a través de datos que generalmente están disponibles públicamente.
  #### **Reaccionar ataques:**
  * Revocar acceso: Si el sistema o el administrador del mismo creen que un ataque está en camino, el acceso puede ser severamente limitado a recursos sensibles, incluso para usuarios y usos legítimos.
  * Bloquear computador: Varios intentos de login fallidos pueden representar un ataque potencial. Muchos sistemas limitan el acceso a un computador particular si hay intentos repetidamente fallidos de login provenientes del mismo.
  * Informar actores: Los ataques pueden requerir acciones de los operadores, por lo que estos deben ser notificados cuando el sistema se encuentre en peligro.
  #### **Recuperarse ataques:**
  * Una vez que el sistema ha detectado y tratado de resistir un ataque, necesita recuperarse. Parte de esta recuperación es la restauración de servicios. Por ejemplo, servidores o conexiones de red adicionales deben ser mantenidos para tal propósito.

#### 2.2.5 ¿Qué herramientas se pueden utilziar para lograrlo? 
  * **Herramientas Comerciales:**
    * Acunetix WVS
    * AppScan
    * Burp Suite Professional
    * Hailstorm
    * N-Stalker
  * **Proveedores de Software-as-a-Service:**
    * AppScan OnDemand by IBM
    * ClickToSecure by Cenzic
    * QualysGuard Web Application Scanning by Qualys
    * Sentinel by WhiteHat
    * Veracode Web Application Security by Veracode
  * **Herramientas open source:**
    * Arachni by Tasos Laskos
    * Grabber by Romain Gaucher
    * Grendel-Scan by David Byrne and Eric Duprey
    * Paros by Chinotec
      * Andiparos
      * Zed Attack Proxy
    * Powerfuzzer by Marcin Kozlowski
    * SecurityQA Toolbar by iSEC Partners
    * Skipfish by Michal Zalewski
    * W3AF by Andres Riancho

### 2.3 Disponibilidad

#### 2.3.1 ¿Qué es?
Se define como el tiempo de respuesta que tiene un sistema(o un componente específico del sistema) dado un evento específico. Normalmente las páginas web rápidas y responsive brindan una experiencia de usuario mejor y tienden a presentar mayores probabilidades de éxito como productos. 
Con la proliferación de múltiples plataformas y dispositivos y siendo la web un sistema unificado, su velocidad es más importante que nunca. En general la optimización de rendimiento en la web se centra en que los componentes se ejecuten más rápido y se carguen de la manera más óptima en cualquier dispositivo que el usuario use.  Igualmente, el hardware juega un rol importante en la optimización y el rendimiento de una aplicación. 

#### 2.3.2 ¿Qué patrones se pueden emplear?
* Cache-Aside: Cargar los datos que tienen mucha demanda en una memoria caché para no ir hasta los servidores de datos. 
* CQRS: Segregar operaciones de leer datos de las operaciones de actualizar datos usando interfaces separadas. 
* Index Table: Se recomienda crear punteros o referencias a los datos que son frecuentemente referenciados en colas.
* Priority Queue: Priorizar los request que tienen más importancia ayuda a que las operaciones más críticas se realicen antes que las que tienen menos importantes. 
* Static Content Hosting: Desplegar contenido estático permite mandar contenido directamente al cliente.  

#### 2.3.3 Especificación mediante escenarios
* Latencia: Es tiempo que existe entre la llegada del estímulo y la respuesta del sistema a este. 
* Tiempo límite de procesamiento: Significa que los procesos se deben de ejecutar antes de su tiempo máximo límite para optimizar la pipeline, por ejemplo, no se puede operar una variable antes de procesar 100% su valor.
* Capacidad de carga: Usualmente dado como el número de transacciones que puede ejecutar un sistema en una unidad de tiempo. 
* Jitter: Entendido como la variación permitida en la latencia.
* El número de eventos que no procesó el sistema porque estaba demasiado ocupado para responder. 

#### 2.3.4 ¿Qué tácticas se pueden emplear?
Existen dos categorías principales para hacer un sistema más eficiente: Control en la demanda de recursos y manejo de recursos.

* **Control en la demanda de recursos:**
  * Manejo de la taza de discretización: Consiste en disminuir la tasa en la que se comprimen los archivos para ocupar menos espacio sacrificando fidelidad de los datos.
  * Límite de respuesta de eventos: Normalmente se hace una restricción para la cantidad máxima de eventos que puede recibir un sistema.
  * Priorizar eventos: Si existen eventos dentro del sistema que tienen más importancia que otros, se pueden asignar órdenes para que se ejecuten más con mayor rapidez. 
  * Reducir sobrecarga: Puede que existan eventos dentro del sistema que puedan ser delegados para otros componentes bajando el sobrestres del sistema aumentando la latencia, lo cual podría ser considerado un tradeoff. 
  * Limitar tiempos de ejecución: Para optimizar la cola de procesos en un sistema se puede poner un tiempo límite en el cual un proceso tenga que correr, si toma más tiempo del impuesto, se acaba. 
  * Incrementar la eficiencia de los recursos: Incrementar la eficiencia de los algoritmos usados en las zonas críticas de la aplicación puede ayudar a reducir la latencia.
* **Manejo de recursos:**
  * Aumentar los recursos: Procesadores más rápidos, más número de procesadores, memoria adicional e incrementar la velocidad de las redes, todas estas cosas ayudan a reducir la latencia.
  * Introducir la concurrencia: Si existen procesos que se pueden hacer en paralelo, se pueden añadir más threads para hacer más eficiente los tiempos de respuesta de varios eventos juntos. 
  * Dividir las computaciones: Mantener todas las computaciones en un mismo servidor puede ocasionar que se colapse cuando muchos request intentan hacer computaciones al mismo tiempo, por eso se recomienda dividir las computaciones en distintos servidores. 
  * Mantener copias de datos: Usar la técnica de caché para reducir los tiempos en los que va hasta la base de datos por la información, así, un dato muy apetecido no se tiene que cargar n veces desde la base de datos sino que se guarda en un almacenamiento intermedio.  

#### 2.3.5 ¿Qué tácticas se pueden emplear?
* JMeter
* Pingdom 


### 2.4 Diseño de la aplicación

#### 2.4.1 Vistas de arquitectura
![](http://i.imgur.com/850U3WO.png)  























