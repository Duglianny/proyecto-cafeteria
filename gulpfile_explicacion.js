/*se coloca la opcion terminal arriba luego new terminal lo cual abrira la termianl de vsc 
    
    lo que se hace es crear una carpeta o archivo package.jason  para ello se coloca 
  
  npm init   lo cual crea esa carpeta con el nombre de mi carpeta principal que seria proyecto 5 

  para gulp local 
  
  para instalar la primera dependencia en la terminal se coloca    

npm i --save-dev gulp

en el cual se crearan dos carpetas package.jason la del proyecto y la local 

se necesita otro archivo dentro del proyecto llamado gulpfile.js   es el archivo donde gulp buscara las tareas y realizar todo lo que uno pida

para crear la primera tarea de gulp se va al archivo de js  y alli se escribe la propiedad de fuction ya que las tareas de gulp spn funciones*/

// primera tarea para gulp 

// debido a que las tareas son funciones de javascripts se coloca primero function segudio del nombre en este caso se le puso tarea tienen que ser nombres validos 


function tarea( done) {
  console.log('desde mi primer tarea...');

  done(); /* es para indicar a gulp que cuando llegue a esta linea finaliza la tarea */ 
}

//ahora se necesita para que google pueda manadar a llamar esa tarea para ello se hace :

exports.PrimerTarea = tarea;


/*lo que se tenga en export es lo que sera ejecutable por gulp tiene dos parte la primera es como se va a mandar a llamar la tarea que es lo que se coloca despues del . en spirts en este caso primertarea

y la segunda es que despues del = se asigna que tarea de las funciones que se tienen en function es la que se va a ejecutar cuando se escriba primertarea en este caso se coloca tarea es decir que cuando se coloque primertarea este buscara la funcion tarea y va ejecutar todo lo que este dentro de tarea e imprimir el console.log que es el mensaje que le saldra en la consola al usuario 


dentro del parentesis de la tarea se coloca cuando es finalizado la tarea en este caso se coloco done es una funcion en la cual se llama par indicar que ya finalizo la tarea 


para ls tareas de gulp en la consola se coloca gulp y el nombre del exports  en este caso 

$  gulp primertarea 

ojo todo esto en la carpeta raiz del proyecto que seria proyecto-5...


para la compilacio en sass con gulp primero se crea una carpeta en la carpeta raiz con el nombre de src  y dentro de ella otra carpeta que tendra el nombre de scss  en donde estaran los archivos originales dentro de la carpeta scss se creara un archivo app.scss

para declarar variables es sass se declara con  

$color: red; 

para poder compilar sass se necesitan dos dependencias la primera es la dependencia de sass que es la que entiende el lenguaje y gramatica de sass y la otra es la que  permite conectar con gulpfile 

(1)  npm i --save-dev sass (2) gulp-sass 

ambas esla misma linea separados por un solo espacio 
*/


// tarea de proyecto


const{ src, dest, watch, series, parallel } = require('gulp');   //es para extraer lo que se instalo e exportar esos modulos exportar el gulp en este caso es decir se inatalas las dependencias etc y con el require se exportan para ser utilizados en el gulpfile en el require lo que esta dentro de el es la dependencia que se esta exportando     las {}  significa que la dependencia que esta dentro del require en este caso gulp exporta multiples funciones que iran dentro de esas llaves cuando no aparezca las llaves significa que solamente exporta una sola funcion 

//el src es la funcion que nos permitira identificar que archivo que va a compilar  y se debe colocar en las funciones para que este las ejecute 

//el dest es la funcion para almavcenar en el disco duro 

const sass = require('gulp-sass')(require('sass'));  //en este const cmo no estan las {} siginifica que solo esta exportando una sola funcion que es sass la cual es solamente compilar la hoja de estilos los dos require significan que se estan importando dos dependencias la de gulp-sass y la de sass dentro de una sola funcionn que es sass 

const postcss = require('gulp-postcss'); //se esta importando las dos ultimas depemdencia instaladas 

const autoprefixer = require('autoprefixer')

function css(done){
  //compilar sass
  //pasos: 1- identificar archivo, 2- compilarla, 3- guardar el .css

  src('./src/scss/app.scss')  //para identificar el documento que se va a compilar este es el paso 1 
    .pipe(sass({outputStyle: 'compressed'})) // el pipe lo que hace es que cuando la identificacion del archivo termine inmediatamente pase a la compilacion    el outputstyle  es para minificar la hoja de estilos con el compressed se coloca todos los estilos en forma lineal 
      .pipe(postcss([autoprefixer()]))  //  los []  significan que se le pueden agregr multiples funciones a ese postcss y no solo el autoprefixer 
        .pipe(dest('build/css'))   //aqui ya se va a almacenar la hoja de estilos compilada    se coloca el nombre de la funcion y se le tiene que colocar donde se quiere que quede almacenado 

      done()
}

function dev(){

  watch('src/scss/**/*.scss', css) //debido a que los cambios hecho en el _header.scss no se compilan automaticamente es por que no tiene el watch se le agrega de esta manera y con el **/*.scss se dice que se le gregue a watch a los archivos que tenga de extesion .scss para que de esta manera se compilen de forma automatica 

  watch('./src/scss/app.scss', css);    //este watch toma dos valores  1- estara pendiente de src el cual es el documento de los estilos si llega haber cambios en ese archivo este llamara al otro valor que seria   2- si hay cambios el watch llamara a la funcion css de nuevo y se ejecutara esa tarea es decir una es el archivo que tiene que estar revisando y la otra la funcio que va a ejecutir si en este llega haber cambios 
}

exports.css = css;

exports.dev = dev;

// lo mismo en la consola se coloca gulp mas el nombre de export que es el nombre con el que se va a buscar 

/*una vez hecho todo eso se puede ver que se creo la carpeta build y dentro de ella otra carpeta css en el cual tendra adebtro el archivo app.css   cuyo archivo al abrirlo estaran los estilos que se colocaron en el archivo .scss lo que hace es inyectar las variables en ese selector ya que en el archivo css no aparece las variables que se declararon en el .scss

caa vez que se haga un cambio en la hoja de estilos de sass esta se debe compilar y se actualizara automaticamente en el css que es el que esta linkeado al index


-----creando un watch

un watch se utiliza para que que se compilen los cambios que se vayan haciendo al guardarlos 

se debe imprtar igual como una funcion en el const y crearle su function   lo que hace es revisar constamente los cmbios y si hay cambios llama automaticamente a la funcion y se compila 

al meterlo en la consola de sebe colocar 

gulp dev     y este realizara esa tarea de que cada vez que halla cambios se compile se hacen los cambios en .scss y apareceran en .css

------autoprefixr y postcss 

son dependencias que se instalan en la consola de la siguiente manera 

(1)  npm i --save-dev autoprefixer  (2)  gulp-postcss      ambas se coloca una al lado de la otra separa por un solo espacio 

luego se importan en el const de arriba 


package.jaso    para darle soporte a todos los navegadores  ya que algunos no soportan las nuevas caracteristicas de css con esta propiedad en el package.jason creara una version complatible para todos los navegadores 

"browserslist": [
      "last 1 version",
      "> 1%"
    ]
    

    
    tareas por default
    
    las tareas por defaul son las que se ejecutan al poner en la consola solamente gulp ejemplo  */
    
    exports.default = series (css, dev ); //en el cual se agregan en el const src estas dos funciones series y parllel  y en los exports se aplica asi en el cual indica que aplicara primero la tarea css y luego la tarea dev una despues de la otra como en serie 

    // series  se inica la primera tarea y cuando esta finaliza empieza la segunda

    //parallel   se inican ambas tareas al mismo toempo 

    //estas 2 son las tareas por default y se deben colocar .default se pueden agregar multiples tareas como se vio siempre la que tenga el watch se deja al final en este caso dev para que cada vez que se haga un camio este lo compile al guardar
    
